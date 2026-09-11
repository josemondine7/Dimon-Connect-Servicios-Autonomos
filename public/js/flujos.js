const CONTRASEÑA_LIRA = 'mondine5781lira';

function validarFormularioBrindar(formData) {
  if (!formData.nombre || !formData.correo || !formData.telefono || !formData.servicio) {
    return { valido: false, mensaje: t('errorCampos') };
  }
  if (!validarCorreo(formData.correo)) {
    return { valido: false, mensaje: t('errorCorreo') };
  }
  return { valido: true };
}

function validarFormularioSolicitar(formData) {
  if (!formData.nombre || !formData.correo || !formData.telefono || !formData.servicioNecesitado) {
    return { valido: false, mensaje: t('errorCampos') };
  }
  if (!validarCorreo(formData.correo)) {
    return { valido: false, mensaje: t('errorCorreo') };
  }
  return { valido: true };
}

function manejarEnvioBrindar(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = {
    nombre: form.nombre?.value?.trim(),
    correo: form.correo?.value?.trim(),
    telefono: form.telefono?.value?.trim(),
    servicio: form.servicio?.value?.trim(),
    precio: form.precio?.value?.trim(),
    descripcion: form.descripcion?.value?.trim(),
    horarios: form.horarios?.value?.trim()
  };

  const validacion = validarFormularioBrindar(formData);
  if (!validacion.valido) {
    mostrarMensaje(validacion.mensaje, 'error');
    return;
  }

  guardarServicio(formData);
  guardarPerfil({ nombre: formData.nombre, correo: formData.correo, telefono: formData.telefono });
  
  mostrarMensaje(t('graciasPorRegistrarte'), 'exito');
  form.reset();
  
  setTimeout(() => {
    window.location.href = 'oferta-demanda.html';
  }, 1500);
}

function manejarEnvioSolicitar(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = {
    nombre: form.nombre?.value?.trim(),
    correo: form.correo?.value?.trim(),
    telefono: form.telefono?.value?.trim(),
    servicioNecesitado: form.servicioNecesitado?.value?.trim(),
    presupuesto: form.presupuesto?.value?.trim(),
    ubicacion: form.ubicacion?.value?.trim(),
    fechaNecesidad: form.fechaNecesidad?.value?.trim(),
    detalles: form.detalles?.value?.trim()
  };

  const validacion = validarFormularioSolicitar(formData);
  if (!validacion.valido) {
    mostrarMensaje(validacion.mensaje, 'error');
    return;
  }

  guardarSolicitud(formData);
  guardarPerfil({ nombre: formData.nombre, correo: formData.correo, telefono: formData.telefono });
  
  mostrarMensaje(t('graciasPorRegistrarte'), 'exito');
  form.reset();
  
  setTimeout(() => {
    window.location.href = 'oferta-demanda.html';
  }, 1500);
}

function mostrarMensaje(texto, tipo) {
  const contenedor = document.querySelector('.contenedor-mensaje') || crearContenedorMensaje();
  const clase = tipo === 'exito' ? 'mensaje-exito' : 'mensaje-error';
  
  contenedor.innerHTML = `<div class="${clase}" style="display:block">${texto}</div>`;
  
  setTimeout(() => {
    contenedor.innerHTML = '';
  }, 4000);
}

function crearContenedorMensaje() {
  const contenedor = document.createElement('div');
  contenedor.className = 'contenedor-mensaje';
  contenedor.style.marginTop = '16px';
  contenedor.style.marginBottom = '16px';
  const form = document.querySelector('form');
  if (form) form.parentNode.insertBefore(contenedor, form.nextSibling);
  return contenedor;
}

function verificarContrasenaLira() {
  const input = document.getElementById('contrasena-lira');
  const valor = input?.value?.trim().toLowerCase();
  
  if (valor === CONTRASEÑA_LIRA) {
    localStorage.setItem('lira_acceso', 'permitido');
    window.location.href = 'chat-lira.html';
  } else {
    mostrarMensaje(t('contrasenaIncorrecta'), 'error');
  }
}

function verificarAccesoLira() {
  const acceso = localStorage.getItem('lira_acceso');
  if (acceso !== 'permitido') {
    window.location.href = 'acceso-lira.html';
  }
}

function renderizarListaServicios(filtro = 'brindan') {
  const contenedor = document.getElementById('lista-contenedor');
  if (!contenedor) return;

  let elementos = [];
  if (filtro === 'brindan') {
    elementos = obtenerServicios();
  } else if (filtro === 'solicitan') {
    elementos = obtenerSolicitudes();
  }

  if (elementos.length === 0) {
    contenedor.innerHTML = `
      <div class="sin-elementos">
        <p data-txt="noHayServicios">${t('noHayServicios')}</p>
        <p class="mensaje-aviso" data-txt="mensajeSiNoEncontraste">${t('mensajeSiNoEncontraste')}</p>
        ${filtro === 'brindan' 
          ? `<a href="ofrecer-servicio.html" class="boton-enviar" style="display:inline-block;text-decoration:none;text-align:center" data-txt="anotarseIgual">${t('anotarseIgual')}</a>`
          : `<a href="solicitar-servicio.html" class="boton-enviar" style="display:inline-block;text-decoration:none;text-align:center" data-txt="anotarseIgual">${t('anotarseIgual')}</a>`
        }
      </div>
    `;
    aplicarTraducciones();
    return;
  }

  contenedor.innerHTML = elementos.map(item => {
    if (filtro === 'brindan') {
      return `
        <div class="elemento-tarjeta">
          <h3>${item.servicio || 'Servicio'}</h3>
          <p class="subtitulo">${item.nombre || ''}</p>
          ${item.descripcion ? `<p class="descripcion">${item.descripcion}</p>` : ''}
          ${item.precio ? `<p class="precio">${item.precio}</p>` : ''}
          <button class="boton-contactar boton-chico" onclick="iniciarContacto(${JSON.stringify(item).replace(/"/g, '&quot;')})" data-txt="contactar">${t('contactar')}</button>
        </div>
      `;
    } else {
      return `
        <div class="elemento-tarjeta">
          <h3>${item.servicioNecesitado || 'Servicio solicitado'}</h3>
          <p class="subtitulo">${item.nombre || ''}</p>
          ${item.detalles ? `<p class="descripcion">${item.detalles}</p>` : ''}
          ${item.presupuesto ? `<p class="precio">${item.presupuesto}</p>` : ''}
          <button class="boton-contactar boton-chico" onclick="iniciarContacto(${JSON.stringify(item).replace(/"/g, '&quot;')})" data-txt="contactar">${t('contactar')}</button>
        </div>
      `;
    }
  }).join('');
  
  aplicarTraducciones();
}

function cambiarFiltro(filtro) {
  document.querySelectorAll('.filtro-boton').forEach(btn => {
    btn.classList.remove('activo');
    if (btn.dataset.filtro === filtro) {
      btn.classList.add('activo');
    }
  });
  renderizarListaServicios(filtro);
}

function iniciarContacto(item) {
  agregarNotificacion({
    tipo: 'contacto',
    de: item.nombre,
    correo: item.correo,
    telefono: item.telefono,
    mensaje: 'Quiere ponerse en contacto con vos',
    datos: item
  });
  iniciarChat(item);
  alert('¡Solicitud de contacto enviada! Le llegará una notificación a esta persona.');
}

document.addEventListener('DOMContentLoaded', () => {
  const formBrindar = document.getElementById('form-brindar');
  const formSolicitar = document.getElementById('form-solicitar');
  
  if (formBrindar) formBrindar.addEventListener('submit', manejarEnvioBrindar);
  if (formSolicitar) formSolicitar.addEventListener('submit', manejarEnvioSolicitar);
  
  const filtroBotones = document.querySelectorAll('.filtro-boton');
  filtroBotones.forEach(btn => {
    btn.addEventListener('click', () => cambiarFiltro(btn.dataset.filtro));
  });
  
  const botonAccederLira = document.getElementById('boton-acceder-lira');
  if (botonAccederLira) {
    botonAccederLira.addEventListener('click', verificarContrasenaLira);
  }
  
  if (document.getElementById('lista-contenedor')) {
    renderizarListaServicios('brindan');
  }
});
