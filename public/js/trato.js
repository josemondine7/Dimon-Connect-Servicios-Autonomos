importScripts('./almacenamiento.js');

const CONFIGURACION_COMISIONES = {
  porcentajeDimon: 4,
  porcentajeReserva: 4,
  porcentajeInversion: 1,
  porcentajeTotalPlataforma: 8,
  porcentajePrestador: 92
};

const ESTADOS_TRATO = {
  PROPUESTA: 'propuesta',
  ACEPTADO: 'aceptado',
  SEÑA_DEPOSITADA: 'sena_depositada',
  EN_CURSO: 'en_curso',
  COMPLETADO: 'completado',
  CANCELADO_SOLICITANTE: 'cancelado_solicitante',
  CANCELADO_PRESTADOR: 'cancelado_prestador',
  FINALIZADO: 'finalizado'
};

function calcularDesglose(montoTotal) {
  const monto = parseFloat(montoTotal) || 0;
  return {
    montoTotal: monto.toFixed(2),
    comisionDimon: (monto * CONFIGURACION_COMISIONES.porcentajeDimon / 100).toFixed(2),
    fondoReserva: (monto * CONFIGURACION_COMISIONES.porcentajeReserva / 100).toFixed(2),
    inversionComunitaria: (monto * CONFIGURACION_COMISIONES.porcentajeInversion / 100).toFixed(2),
    totalPlataforma: (monto * CONFIGURACION_COMISIONES.porcentajeTotalPlataforma / 100).toFixed(2),
    paraPrestador: (monto * CONFIGURACION_COMISIONES.porcentajePrestador / 100).toFixed(2),
    porcentajes: CONFIGURACION_COMISIONES
  };
}

function crearTrato(datosTrato) {
  const desglose = calcularDesglose(datosTrato.monto);
  const trato = {
    id: 'TRATO-' + Date.now(),
    idSolicitante: datosTrato.idSolicitante,
    idPrestador: datosTrato.idPrestador,
    servicio: datosTrato.servicio,
    descripcion: datosTrato.descripcion,
    montoTotal: datosTrato.monto,
    montoSena: datosTrato.montoSena || (datosTrato.monto * 0.3).toFixed(2),
    desglose: desglose,
    estado: ESTADOS_TRATO.PROPUESTA,
    fechaCreacion: new Date().toISOString(),
    fechaAceptacion: null,
    fechaDepositoSena: null,
    fechaCompletado: null,
    metodoPago: datosTrato.metodoPago,
    correoPrestador: datosTrato.correoPrestador,
    correoSolicitante: datosTrato.correoSolicitante,
    paypalCorreo: datosTrato.paypalCorreo || null,
    observaciones: datosTrato.observaciones || ''
  };

  Almacenamiento.transacciones.registrar(trato);
  return trato;
}

function aceptarTrato(idTrato) {
  const tratos = Almacenamiento.transacciones.todas();
  const indice = tratos.findIndex(t => t.id === idTrato);
  
  if (indice === -1) return { exito: false, mensaje: 'Trato no encontrado' };
  
  tratos[indice].estado = ESTADOS_TRATO.ACEPTADO;
  tratos[indice].fechaAceptacion = new Date().toISOString();
  Almacenamiento.transacciones.registrar(tratos[indice]);
  
  Almacenamiento.notificaciones.agregar({
    para: tratos[indice].correoSolicitante,
    asunto: 'Trato aceptado',
    mensaje: `El prestador aceptó tu propuesta para el servicio: ${tratos[indice].servicio}`,
    idTrato: idTrato
  });
  
  return { exito: true, trato: tratos[indice] };
}

function depositarSena(idTrato, comprobante = null) {
  const tratos = Almacenamiento.transacciones.todas();
  const indice = tratos.findIndex(t => t.id === idTrato);
  
  if (indice === -1) return { exito: false, mensaje: 'Trato no encontrado' };
  
  tratos[indice].estado = ESTADOS_TRATO.SEÑA_DEPOSITADA;
  tratos[indice].fechaDepositoSena = new Date().toISOString();
  tratos[indice].comprobanteSena = comprobante;
  Almacenamiento.transacciones.registrar(tratos[indice]);
  
  Almacenamiento.notificaciones.agregar({
    para: tratos[indice].correoPrestador,
    asunto: 'Seña depositada',
    mensaje: `La seña fue recibida y está protegida en la plataforma para el servicio: ${tratos[indice].servicio}`,
    idTrato: idTrato
  });
  
  return { exito: true, trato: tratos[indice] };
}

function completarServicio(idTrato) {
  const tratos = Almacenamiento.transacciones.todas();
  const indice = tratos.findIndex(t => t.id === idTrato);
  
  if (indice === -1) return { exito: false, mensaje: 'Trato no encontrado' };
  
  tratos[indice].estado = ESTADOS_TRATO.COMPLETADO;
  tratos[indice].fechaCompletado = new Date().toISOString();
  Almacenamiento.transacciones.registrar(tratos[indice]);
  
  liberarFondos(tratos[indice]);
  
  return { exito: true, trato: tratos[indice] };
}

function liberarFondos(trato) {
  const desglose = trato.desglose;
  
  console.log('=== LIBERACIÓN DE FONDOS - TRATO:', trato.id, '===');
  console.log('Monto total:', trato.montoTotal);
  console.log('4% Dimon Connect: $', desglose.comisionDimon, '- Cuenta administrativa');
  console.log('4% Fondo de Reserva: $', desglose.fondoReserva, '- Cuenta de reserva');
  console.log('1% Fondo de Inversión: $', desglose.inversionComunitaria, '- Cuenta de inversión');
  console.log('8% Total plataforma: $', desglose.totalPlataforma);
  console.log('92% Prestador del servicio: $', desglose.paraPrestador, '-', trato.correoPrestador);
  console.log('Método de cobro:', trato.metodoPago);
  if (trato.paypalCorreo) console.log('PayPal:', trato.paypalCorreo);
  console.log('========================================');
  
  trato.estado = ESTADOS_TRATO.FINALIZADO;
  Almacenamiento.transacciones.registrar(trato);
  
  Almacenamiento.notificaciones.agregar({
    para: trato.correoPrestador,
    asunto: 'Pago liberado',
    mensaje: `El servicio "${trato.servicio}" fue completado. El 92% del monto ha sido liberado a tu cuenta.`,
    idTrato: trato.id
  });
  
  Almacenamiento.notificaciones.agregar({
    para: trato.correoSolicitante,
    asunto: 'Servicio completado',
    mensaje: `Confirmamos que el servicio "${trato.servicio}" ha finalizado correctamente. Gracias por usar Dimon Connect.`,
    idTrato: trato.id
  });
}

function cancelarPorSolicitante(idTrato) {
  const tratos = Almacenamiento.transacciones.todas();
  const indice = tratos.findIndex(t => t.id === idTrato);
  
  if (indice === -1) return { exito: false, mensaje: 'Trato no encontrado' };
  
  tratos[indice].estado = ESTADOS_TRATO.CANCELADO_SOLICITANTE;
  Almacenamiento.transacciones.registrar(tratos[indice]);
  
  if (tratos[indice].fechaDepositoSena) {
    console.log('=== DEVOLUCIÓN DE SEÑA ===');
    console.log('Trato:', idTrato);
    console.log('Motivo: Cancelación por solicitante — prestador no cumplió');
    console.log('Seña devuelta al solicitante: $', tratos[indice].montoSena);
    console.log('==========================');
    
    Almacenamiento.notificaciones.agregar({
      para: tratos[indice].correoSolicitante,
      asunto: 'Seña devuelta',
      mensaje: 'El trato fue cancelado. Tu seña ha sido devuelta en su totalidad.',
      idTrato: idTrato
    });
  }
  
  return { exito: true };
}

function cancelarPorPrestador(idTrato) {
  const tratos = Almacenamiento.transacciones.todas();
  const indice = tratos.findIndex(t => t.id === idTrato);
  
  if (indice === -1) return { exito: false, mensaje: 'Trato no encontrado' };
  
  tratos[indice].estado = ESTADOS_TRATO.CANCELADO_PRESTADOR;
  Almacenamiento.transacciones.registrar(tratos[indice]);
  
  if (tratos[indice].fechaDepositoSena) {
    console.log('=== COMPENSACIÓN DE SEÑA ===');
    console.log('Trato:', idTrato);
    console.log('Motivo: Cancelación por solicitante');
    console.log('Seña liberada al prestador como compensación: $', tratos[indice].montoSena);
    console.log('============================');
    
    Almacenamiento.notificaciones.agregar({
      para: tratos[indice].correoPrestador,
      asunto: 'Seña recibida como compensación',
      mensaje: 'El solicitante canceló el trato. La seña ha sido liberada a tu cuenta como compensación.',
      idTrato: idTrato
    });
  }
  
  return { exito: true };
}

function obtenerMisTratos(correoUsuario) {
  return Almacenamiento.transacciones.todas().filter(t => 
    t.correoSolicitante === correoUsuario || t.correoPrestador === correoUsuario
  );
}

const Trato = {
  ESTADOS: ESTADOS_TRATO,
  calcularDesglose,
  crear: crearTrato,
  aceptar: aceptarTrato,
  depositarSena,
  completar: completarServicio,
  cancelarPorSolicitante,
  cancelarPorPrestador,
  obtenerMis: obtenerMisTratos,
  CONFIGURACION: CONFIGURACION_COMISIONES
};
