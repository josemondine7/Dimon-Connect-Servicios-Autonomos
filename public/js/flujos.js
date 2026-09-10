importScripts('./almacenamiento.js');
importScripts('./idioma.js');

const SERVICIOS_PREDEFINIDOS = [
  "Pintura", "Electricidad", "Carpintería", "Albañilería", "Limpieza",
  "Cocina", "Plomería", "Jardinería", "Mecánica", "Informática",
  "Cuidado de personas", "Traducción", "Diseño", "Otros"
];

function obtenerListaServicios() {
  const ofertas = Almacenamiento.ofertas.todas();
  const demandas = Almacenamiento.demandas.todas();
  const todos = new Set(SERVICIOS_PREDEFINIDOS);
  
  ofertas.forEach(item => { if (item.servicio) todos.add(item.servicio.trim()); });
  demandas.forEach(item => { if (item.servicio) todos.add(item.servicio.trim()); });
  
  return Array.from(todos).sort((a, b) => a.localeCompare(b));
}

function obtenerRubrosConCantidad(modo = 'ofertas') {
  const servicios = obtenerListaServicios();
  const clave = modo === 'ofertas' ? Almacenamiento.ofertas : Almacenamiento.demandas;
  
  return servicios.map(nombre => ({
    nombre: nombre,
    cantidad: clave.porServicio(nombre).length
  })).filter(item => item.cantidad > 0 || SERVICIOS_PREDEFINIDOS.includes(item.nombre));
}

function registrarOferta(datos) {
  const obligatorios = ['nombre', 'correo', 'pais', 'localidad', 'servicio', 'descripcion', 'precio', 'metodoPago'];
  for (const campo of obligatorios) {
    if (!datos[campo] || datos[campo].trim() === '') {
      return { exito: false, mensaje: `Completar el campo: ${campo}` };
    }
  }

  if (!Validacion.correo(datos.correo)) {
    return { exito: false, mensaje: t('mensajeCorreoInvalido') };
  }

  const nueva = Almacenamiento.ofertas.agregar(datos);
  
  const usuario = Almacenamiento.usuario.obtener();
  if (!usuario || usuario.correo !== datos.correo) {
    Almacenamiento.usuario.guardar({
      nombre: datos.nombre,
      correo: datos.correo,
      pais: datos.pais,
      localidad: datos.localidad,
      telefono: datos.telefono || '',
      metodoPagoPreferido: datos.metodoPago,
      paypalCorreo: datos.paypalCorreo || ''
    });
  }

  return { exito: true, dato: nueva };
}

function registrarDemanda(datos) {
  const obligatorios = ['nombre', 'correo', 'pais', 'localidad', 'servicio', 'descripcion', 'presupuesto'];
  for (const campo of obligatorios) {
    if (!datos[campo] || datos[campo].trim() === '') {
      return { exito: false, mensaje: `Completar el campo: ${campo}` };
    }
  }

  if (!Validacion.correo(datos.correo)) {
    return { exito: false, mensaje: t('mensajeCorreoInvalido') };
  }

  const nueva = Almacenamiento.demandas.agregar(datos);
  
  const usuario = Almacenamiento.usuario.obtener();
  if (!usuario || usuario.correo !== datos.correo) {
    Almacenamiento.usuario.guardar({
      nombre: datos.nombre,
      correo: datos.correo,
      pais: datos.pais,
      localidad: datos.localidad,
      telefono: datos.telefono || ''
    });
  }

  return { exito: true, dato: nueva };
}

function contactarPersona(datosContacto) {
  if (!datosContacto.nombre || !datosContacto.correo || !datosContacto.mensaje) {
    return { exito: false, mensaje: t('mensajeCampos') };
  }

  if (!Validacion.correo(datosContacto.correo)) {
    return { exito: false, mensaje: t('mensajeCorreoInvalido') };
  }

  Almacenamiento.notificaciones.agregar({
    deNombre: datosContacto.nombre,
    deCorreo: datosContacto.correo,
    paraCorreo: datosContacto.paraCorreoDestinatario,
    servicio: datosContacto.servicio,
    mensaje: datosContacto.mensaje,
    tipo: 'contacto'
  });

  console.log('=== NOTIFICACIÓN DE CONTACTO ===');
  console.log('De:', datosContacto.nombre, '-', datosContacto.correo);
  console.log('Para:', datosContacto.paraCorreoDestinatario);
  console.log('Servicio:', datosContacto.servicio);
  console.log('Mensaje:', datosContacto.mens
