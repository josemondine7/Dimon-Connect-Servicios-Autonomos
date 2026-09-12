// ==============================================
// DIMON CONNECT — Sistema de Traducción Global
// Versión: 1.0 | Fecha: 2026
// ==============================================

const traducciones = {
  es: {
    volver: "Volver",
    inicio: "Inicio",
    buscar: "Buscar",
    ofertaDemanda: "Oferta y Demanda",
    solicitarServicio: "Solicitar un servicio",
    brindarServicio: "Brindar mi servicio",
    inscribirse: "Inscribirse",
    descargarApp: "Descargar aplicación",
    normas: "Normas y Seguridad",
    privacidad: "Privacidad",
    terminos: "Términos de Servicio",
    cookies: "Cookies",
    contacto: "Contacto",
    buscarPlaceholder: "Buscar servicios, personas, ayuda...",
    todosLosServicios: "Todos los Servicios",
    serviciosQueBrindan: "Servicios que brindan",
    serviciosQueSolicitan: "Servicios que solicitan",
    anotarseBrindar: "Ofrecer mi servicio",
    anotarseSolicitar: "Pedir un servicio",
    nombreCompleto: "Nombre Completo",
    correoElectronico: "Correo Electrónico",
    telefono: "Teléfono / WhatsApp",
    tipoServicio: "Tipo de Servicio",
    descripcion: "Descripción",
    precioEstimado: "Precio estimado",
    enviar: "Enviar",
    cancelar: "Cancelar",
    graciasRegistrado: "¡Gracias! Quedaste registrado correctamente",
    noEncontrasServicio: "¿No encontrás el servicio que buscás? Anotate igual y dejá tus datos.",
    liraSaludo: "¡Hola! Soy Lira, tu asistente. ¿En qué puedo ayudarte hoy?",
    enviarMensaje: "Escribí tu mensaje...",
    enviarBtn: "Enviar",
    bienvenidoLira: "Bienvenido al sistema de administración",
    ingreseContrasena: "Ingresá la contraseña para acceder a Lira",
    contrasena: "Contraseña",
    ingresar: "Ingresar",
    contrasenaIncorrecta: "Contraseña incorrecta. Intentá de nuevo.",
    derechosReservados: "Todos los derechos reservados",
    acuerdoTrato: "Acuerdo del Trato",
    valorServicio: "Valor del Servicio",
    comisionSolicitante: "Comisión — Solicitante (5%)",
    comisionPrestador: "Comisión — Prestador (5%)",
    total: "Total a pagar",
    confirmoLeido: "Confirmo haber leído y acepto las normas",
    confirmar: "Confirmar y Continuar",
    moneda: "Moneda",
    pesosUruguayos: "Pesos Uruguayos",
    dolares: "Dólares USD",
    pesosArgentinos: "Pesos Argentinos",
    euros: "Euros"
  },
  en: {
    volver: "Back",
    inicio: "Home",
    buscar: "Search",
    ofertaDemanda: "Offer & Demand",
    solicitarServicio: "Request a service",
    brindarServicio: "Offer my service",
    inscribirse: "Sign up",
    descargarApp: "Download App",
    normas: "Rules & Security",
    privacidad: "Privacy",
    terminos: "Terms of Service",
    cookies: "Cookies",
    contacto: "Contact",
    buscarPlaceholder: "Search services, people, help...",
    todosLosServicios: "All Services",
    serviciosQueBrindan: "Services available",
    serviciosQueSolicitan: "Services requested",
    anotarseBrindar: "Offer my service",
    anotarseSolicitar: "Request a service",
    nombreCompleto: "Full Name",
    correoElectronico: "Email",
    telefono: "Phone / WhatsApp",
    tipoServicio: "Type of Service",
    descripcion: "Description",
    precioEstimado: "Estimated price",
    enviar: "Submit",
    cancelar: "Cancel",
    graciasRegistrado: "Thank you! Registered successfully",
    noEncontrasServicio: "Can't find what you're looking for? Leave your info anyway.",
    liraSaludo: "Hello! I'm Lira, your assistant. How can I help you today?",
    enviarMensaje: "Type your message...",
    enviarBtn: "Send",
    bienvenidoLira: "Welcome to the administration system",
    ingreseContrasena: "Enter password to access Lira",
    contrasena: "Password",
    ingresar: "Enter",
    contrasenaIncorrecta: "Incorrect password. Try again.",
    derechosReservados: "All rights reserved",
    acuerdoTrato: "Service Agreement",
    valorServicio: "Service Value",
    comisionSolicitante: "Fee — Requester (5%)",
    comisionPrestador: "Fee — Provider (5%)",
    total: "Total to pay",
    confirmoLeido: "I have read and agree to the terms",
    confirmar: "Confirm & Continue",
    moneda: "Currency",
    pesosUruguayos: "UYU",
    dolares: "USD",
    pesosArgentinos: "ARS",
    euros: "EUR"
  }
};

// Idioma por defecto
let idiomaActual = localStorage.getItem('idioma') || 'es';

// Cambiar idioma
function cambiarIdioma(nuevoIdioma) {
  idiomaActual = nuevoIdioma;
  localStorage.setItem('idioma', nuevoIdioma);
  aplicarTraducciones();
}

// Aplicar traducciones a todos los elementos
function aplicarTraducciones() {
  const elementos = document.querySelectorAll('[data-txt]');
  elementos.forEach(el => {
    const clave = el.getAttribute('data-txt');
    if (traducciones[idiomaActual] && traducciones[idiomaActual][clave]) {
      el.textContent = traducciones[idiomaActual][clave];
    }
  });
  
  // Placeholders
  const placeholders = document.querySelectorAll('[data-txt-placeholder]');
  placeholders.forEach(el => {
    const clave = el.getAttribute('data-txt-placeholder');
    if (traducciones[idiomaActual] && traducciones[idiomaActual][clave]) {
      el.placeholder = traducciones[idiomaActual][clave];
    }
  });
}

// Obtener texto traducido
function t(clave) {
  if (traducciones[idiomaActual] && traducciones[idiomaActual][clave]) {
    return traducciones[idiomaActual][clave];
  }
  return clave;
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', () => {
  aplicarTraducciones();
  
  const selector = document.getElementById('selector-idioma');
  if (selector) {
    selector.value = idiomaActual;
    selector.addEventListener('change', (e) => {
      cambiarIdioma(e.target.value);
      // Recargar moneda si corresponde
      if (typeof actualizarSimboloMoneda === 'function') {
        actualizarSimboloMoneda();
      }
    });
  }
});
