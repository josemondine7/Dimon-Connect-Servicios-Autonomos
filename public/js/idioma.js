const traducciones = {
  es: {
    volver: "Volver",
    inicio: "Inicio",
    buscar: "Buscar",
    ofertaDemanda: "Oferta y Demanda",
    solicitarServicio: "Solicitar un servicio",
    brindarServicio: "Brindar mi servicio",
    iniciarSesion: "Iniciar sesión",
    inscribirse: "Inscribirse",
    descargarApp: "Descargar aplicación",
    normas: "Normas y Seguridad",
    privacidad: "Privacidad",
    terminos: "Términos de Servicio",
    cookies: "Cookies",
    contacto: "Contacto",
    buscarPlaceholder: "Buscar servicios, personas, ayuda...",
    miPerfil: "Mi Perfil",
    notificaciones: "Notificaciones",
    cerrarSesion: "Cerrar sesión",
    guardar: "Guardar cambios",
    cancelar: "Cancelar",
    confirmar: "Confirmar",
    enviar: "Enviar",
    publicar: "Publicar servicio",
    contactar: "Contactar",
    mensajeExito: "Operación realizada con éxito",
    mensajeCampos: "Completar todos los campos obligatorios",
    mensajeCorreoInvalido: "Ingresar un correo válido",
    señaExplicacion: "La seña queda protegida en la plataforma hasta la confirmación del servicio",
    comisionTitulo: "Desglose de costos",
    comisionDimon: "4% Dimon Connect",
    comisionReserva: "1% Fondo de Reserva",
    comisionInversion: "1% Fondo de Inversión Comunitaria",
    gananciaTotal: "8% Ganancia total de plataforma",
    porcentajePrestador: "92% para el prestador del servicio",
    acuerdoTitulo: "Acuerdo del Trato y Garantía",
    acuerdoPunto1: "La seña se deposita en la plataforma al aceptar el trato",
    acuerdoPunto2: "El prestador confirma la aceptación del trabajo",
    acuerdoPunto3: "Al finalizar el servicio, el solicitante confirma",
    acuerdoPunto4: "La seña más el resto del pago se liberan al prestador",
    acuerdoPunto5: "Si el prestador no cumple: seña devuelta al solicitante",
    acuerdoPunto6: "Si el solicitante no cumple: seña liberada al prestador como compensación",
    aceptoAcuerdo: "He leído y acepto las condiciones del trato y las reglas de la plataforma",
    campoObligatorio: "Campo obligatorio",
    moneda: "Moneda",
    metodoPago: "Método de cobro",
    paypal: "PayPal",
    transferencia: "Transferencia bancaria",
    efectivo: "Efectivo",
    pais: "País",
    localidad: "Localidad / Ciudad",
    nombreCompleto: "Nombre completo",
    correoElectronico: "Correo electrónico",
    telefono: "Teléfono",
    servicio: "Servicio que ofrece o solicita",
    descripcion: "Descripción detallada",
    precio: "Precio del servicio",
    presupuesto: "Presupuesto disponible",
    mensaje: "Tu mensaje",
    sinPublicaciones: "No hay publicaciones todavía. Sé el primero en anotarse.",
    servicioNuevo: "No encontrás el servicio que buscás? Anotate igual. Los servicios nuevos se incorporan automáticamente.",
    cambiarIdioma: "Idioma",
    cuentaAdmin: "Panel de Administración",
    liraAcceso: "Acceso Lira Administradora",
    contraseña: "Contraseña",
    ingresar: "Ingresar",
    contraseñaIncorrecta: "Contraseña incorrecta. Intentar nuevamente."
  },
  en: {
    volver: "Back",
    inicio: "Home",
    buscar: "Search",
    ofertaDemanda: "Offer & Demand",
    solicitarServicio: "Request a service",
    brindarServicio: "Offer my service",
    iniciarSesion: "Log in",
    inscribirse: "Sign up",
    descargarApp: "Download App",
    normas: "Rules & Security",
    privacidad: "Privacy",
    terminos: "Terms of Service",
    cookies: "Cookies",
    contacto: "Contact",
    buscarPlaceholder: "Search services, people, help...",
    miPerfil: "My Profile",
    notificaciones: "Notifications",
    cerrarSesion: "Log out",
    guardar: "Save changes",
    cancelar: "Cancel",
    confirmar: "Confirm",
    enviar: "Send",
    publicar: "Publish service",
    contactar: "Contact",
    mensajeExito: "Operation completed successfully",
    mensajeCampos: "Fill in all required fields",
    mensajeCorreoInvalido: "Enter a valid email address",
    señaExplicacion: "The deposit remains protected on the platform until service completion",
    comisionTitulo: "Cost breakdown",
    comisionDimon: "4% Dimon Connect",
    comisionReserva: "4% Reserve Fund",
    comisionInversion: "1% Community Investment Fund",
    gananciaTotal: "8% platform total revenue",
    porcentajePrestador: "92% to the service provider",
    acuerdoTitulo: "Service Agreement and Guarantee",
    acuerdoPunto1: "Deposit is held on the platform when the deal is accepted",
    acuerdoPunto2: "Provider confirms acceptance of the work",
    acuerdoPunto3: "Upon completion, the requester confirms",
    acuerdoPunto4: "Deposit plus remaining payment are released to the provider",
    acuerdoPunto5: "If provider fails: deposit returned to requester",
    acuerdoPunto6: "If requester cancels: deposit released to provider as compensation",
    aceptoAcuerdo: "I have read and agree to the service terms and platform rules",
    campoObligatorio: "Required field",
    moneda: "Currency",
    metodoPago: "Payment method",
    paypal: "PayPal",
    transferencia: "Bank transfer",
    efectivo: "Cash",
    pais: "Country",
    localidad: "City / Location",
    nombreCompleto: "Full name",
    correoElectronico: "Email address",
    telefono: "Phone number",
    servicio: "Service offered or requested",
    descripcion: "Detailed description",
    precio: "Service price",
    presupuesto: "Available budget",
    mensaje: "Your message",
    sinPublicaciones: "No posts yet. Be the first one to sign up.",
    servicioNuevo: "Can't find the service you're looking for? Sign up anyway. New services are added automatically.",
    cambiarIdioma: "Language",
    cuentaAdmin: "Administration Panel",
    liraAcceso: "Lira Administrator Access",
    contraseña: "Password",
    ingresar: "Enter",
    contraseñaIncorrecta: "Incorrect password. Try again."
  }
};

function obtenerIdioma() {
  return localStorage.getItem('idiomaDimon') || 'es';
}

function cambiarIdioma(nuevoIdioma) {
  localStorage.setItem('idiomaDimon', nuevoIdioma);
  aplicarIdioma();
}

function aplicarIdioma() {
  const idioma = obtenerIdioma();
  const t = traducciones[idioma] || traducciones.es;
  document.documentElement.lang = idioma;
  
  document.querySelectorAll('[data-txt]').forEach(elemento => {
    const clave = elemento.dataset.txt;
    if (t[clave]) {
      elemento.textContent = t[clave];
    }
  });
  
  document.querySelectorAll('[data-txt-placeholder]').forEach(elemento => {
    const clave = elemento.dataset.txtPlaceholder;
    if (t[clave]) {
      elemento.placeholder = t[clave];
    }
  });
  
  const evento = new CustomEvent('idiomaCambiado', { detail: { idioma } });
  document.dispatchEvent(evento);
}

function t(clave) {
  const idioma = obtenerIdioma();
  return traducciones[idioma]?.[clave] || traducciones.es[clave] || clave;
}

document.addEventListener('DOMContentLoaded', aplicarIdioma);
