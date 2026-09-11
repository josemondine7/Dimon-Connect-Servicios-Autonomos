const traduccionesComunes = {
  es: {
    volver: "Volver",
    inicio: "Inicio",
    buscar: "Buscar",
    buscarPlaceholder: "Buscar servicios...",
    ofertaDemanda: "Oferta y Demanda",
    brindarServicio: "Brindar mi Servicio",
    solicitarServicio: "Solicitar un Servicio",
    normas: "Normas y Seguridad",
    privacidad: "Privacidad",
    terminos: "Términos de Servicio",
    descargarApp: "Descargar Aplicación",
    contacto: "Contacto",
    serviciosQueSeBrindan: "Servicios que se brindan",
    serviciosQueSeSolicitan: "Servicios que se solicitan",
    anotarseBrindar: "Ofrecer mi servicio",
    anotarseSolicitar: "Solicitar un servicio",
    nombreCompleto: "Nombre completo",
    correoElectronico: "Correo electrónico",
    telefono: "Teléfono / WhatsApp",
    tipoServicio: "Tipo de servicio",
    precioEstimado: "Precio estimado",
    descripcion: "Descripción breve",
    horariosDisponibles: "Horarios disponibles",
    dondeRealizar: "¿Dónde hay que realizar el trabajo?",
    cuandoNecesita: "¿Cuándo lo necesita?",
    detallesAdicionales: "Detalles adicionales",
    aceptoNormas: "Acepto las normas y condiciones",
    enviarRegistro: "Enviar registro",
    graciasPorRegistrarte: "¡Registrado con éxito! Ya aparecés en el listado.",
    errorCampos: "Completá todos los campos obligatorios.",
    errorCorreo: "Ingresá un correo electrónico válido.",
    noHayServicios: "No hay servicios publicados todavía.",
    mensajeSiNoEncontraste: "Si no encontrás lo que buscás, dejá tus datos igual — si alguien se suma te avisa.",
    anotarseIgual: "Dejar mis datos igual",
    contactar: "Contactar",
    volverAlInicio: "Volver al inicio",
    ingresarContrasenaLira: "Ingresá la contraseña de acceso",
    contrasenaIncorrecta: "Contraseña incorrecta. Intentá de nuevo.",
    acceder: "Acceder",
    enviarMensaje: "Enviar",
    escribeTuMensaje: "Escribí tu mensaje...",
    mensajeEnviado: "Mensaje enviado",
    contraseña: "Contraseña",
    campoObligatorio: "Este campo es obligatorio",
    presupuestoEstimado: "Presupuesto estimado"
  },
  en: {
    volver: "Back",
    inicio: "Home",
    buscar: "Search",
    buscarPlaceholder: "Search services...",
    ofertaDemanda: "Offer & Demand",
    brindarServicio: "Offer my Service",
    solicitarServicio: "Request a Service",
    normas: "Rules & Security",
    privacidad: "Privacy",
    terminos: "Terms of Service",
    descargarApp: "Download App",
    contacto: "Contact",
    serviciosQueSeBrindan: "Services offered",
    serviciosQueSeSolicitan: "Services requested",
    anotarseBrindar: "Offer a service",
    anotarseSolicitar: "Request a service",
    nombreCompleto: "Full name",
    correoElectronico: "Email address",
    telefono: "Phone / WhatsApp",
    tipoServicio: "Type of service",
    precioEstimado: "Estimated price",
    descripcion: "Brief description",
    horariosDisponibles: "Available hours",
    dondeRealizar: "Where does the work need to be done?",
    cuandoNecesita: "When do you need it?",
    detallesAdicionales: "Additional details",
    aceptoNormas: "I accept the rules and terms",
    enviarRegistro: "Submit registration",
    graciasPorRegistrarte: "Registered successfully! You now appear in the list.",
    errorCampos: "Please fill in all required fields.",
    errorCorreo: "Enter a valid email address.",
    noHayServicios: "No services published yet.",
    mensajeSiNoEncontraste: "If you don't find what you're looking for, leave your details anyway — someone may contact you.",
    anotarseIgual: "Leave my details anyway",
    contactar: "Contact",
    volverAlInicio: "Back to Home",
    ingresarContrasenaLira: "Enter access password",
    contrasenaIncorrecta: "Incorrect password. Try again.",
    acceder: "Access",
    enviarMensaje: "Send",
    escribeTuMensaje: "Type your message...",
    mensajeEnviado: "Message sent",
    contraseña: "Password",
    campoObligatorio: "This field is required",
    presupuestoEstimado: "Estimated budget"
  }
};

let idiomaActual = localStorage.getItem('idioma') || 'es';

function cambiarIdioma(codigo) {
  idiomaActual = codigo;
  localStorage.setItem('idioma', codigo);
  aplicarTraducciones();
  const boton = document.getElementById('boton-idioma');
  if (boton) boton.textContent = codigo.toUpperCase();
}

function aplicarTraducciones() {
  const traducciones = traduccionesComunes[idiomaActual];
  if (!traducciones) return;

  document.querySelectorAll('[data-txt]').forEach(el => {
    const clave = el.getAttribute('data-txt');
    if (traducciones[clave]) {
      el.textContent = traducciones[clave];
    }
  });

  document.querySelectorAll('[data-placeholder]').forEach(el => {
    const clave = el.getAttribute('data-placeholder');
    if (traducciones[clave]) {
      el.placeholder = traducciones[clave];
    }
  });

  document.documentElement.lang = idiomaActual;
}

function t(clave) {
  return traduccionesComunes[idiomaActual][clave] || clave;
}

if (typeof aplicarTraducciones === 'function') {
  document.addEventListener('DOMContentLoaded', () => {
    aplicarTraducciones();
    const boton = document.getElementById('boton-idioma');
    if (boton) boton.textContent = idiomaActual.toUpperCase();
  });
}
