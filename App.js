// ==================================================
// 🚀 DIMON CONNECT — SERVICIOS AUTÓNOMOS
// Proyecto Oficial · Mundial · Transparente
// ==================================================

// 📋 INFORMACIÓN OFICIAL — PÚBLICA Y TRANSPARENTE
const plataforma = {
  nombre: "Dimon Connect",
  tipo: "Plataforma Mundial de Servicios Autónomos",
  pais: "Uruguay",
  version: "1.0.0",
  // 📄 ACTA DE SUCESIÓN — Información oficial
  actaSucesion: {
    numero: "",
    fecha: "",
    registro: "",
    objetoSocial: "Conectar oferta y demanda de servicios sin discriminación, con comisiones justas y transparentes. Fondo de desarrollo del 1% para sostenimiento y crecimiento del sistema.",
    autoridad: ""
  },
  // 💰 DATOS DE PAGO — DÓNDE DEPOSITAR
  pagos: {
    plataforma: "PayPal",
    correoDeposito: "",
    moneda: "USD",
    comisionComprador: 0.03,
    comisionVendedor: 0.03,
    fondoDesarrollo: 0.01,
    detalleComisiones: "3% comprador + 3% vendedor = 6% total. El 1% se destina automáticamente al Fondo de Desarrollo para el mantenimiento y evolución de la plataforma."
  },
  dominio: "",
  sitioWeb: ""
};

// 🔒 CLAVES SECRETAS — SE CONFIGURAN DESPUÉS EN RENDER
const ENV = {
  SUPABASE_URL: "",
  SUPABASE_KEY: "",
  NEON_URL: "",
  GROQ_API_KEY: "",
  GITHUB_TOKEN: "",
  RENDER_URL: ""
};

// ⚙️ CONFIGURACIÓN GENERAL
const config = {
  appName: plataforma .nombre,
  version: plataforma.version,
  region: "global",
  idiomaDefault: "es",
  asistenteVoz: true,
  multiIdioma: true,
  authMetodo: "biometrico_o_pin",
  baseDatos: {
    proveedor: "supabase",
    url: ENV.SUPABASE_URL,
    key: ENV.SUPABASE_KEY
  },
  asistenteIA: {
    nombre: "Lira",
    modelo: "Llama 3.2 11B Vision",
    proveedor: "Groq",
    apiKey: ENV.GROQ_API_KEY
  },
  servidor: {
    url: ENV.RENDER_URL,
    dominio: plataforma.dominio
  },
  asociacion: plataforma
};

// 📱 PANTALLAS DE LA APLICACIÓN
const PANTALLAS = {
  Login: {
    id: "login",
    authRequerido: true,
    metodos: ["biometrico", "pin"],
    logo: "rombo",
    titulo: "Dimon Connect",
    subtitulo: "Servicios Autónomos — Mundial",
    pie: "Plataforma transparente · Comisiones justas"
  },
  Principal: {
    id: "principal",
    botones: [
      { id: "ofrecer", etiqueta: "Ofrecer Servicio", icono: "mano-corazon" },
      { id: "buscar", etiqueta: "Buscar Servicio", icono: "lupa" },
      { id: "transacciones", etiqueta: "Transacciones", icono: "billetes" },
      { id: "perfil", etiqueta: "Mi Perfil", icono: "usuario" },
      { id: "lira", etiqueta: "Asistente Lira", icono: "robot" }
    ]
  },
  Transacciones: {
    id: "transacciones",
    columnas: ["Fecha", "Servicio", "Monto", "Estado", "Comisión"],
    reglasComision: plataforma.pagos
  },
  ChatLira: {
    id: "chat-lira",
    asistente: "Lira",
    rol: "Asistente administrativa de Dimon Connect",
    modelo: "Llama 3.2",
    descripcion: "Gestiona consultas, reglas, transacciones y soporte general"
  },
  Reglas: {
    id: "reglas",
    contenido: plataforma
  }
};

// Exportar para uso completo de la aplicación
module.exports = { config, PANTALLAS, plataforma };
https://www.canva.com/design/DAHS4hrqMR0/n83vPCgnKMKIMRtbgvcfPg/view?embed
