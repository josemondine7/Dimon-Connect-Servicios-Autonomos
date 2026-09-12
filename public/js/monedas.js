// ==============================================
// DIMON CONNECT — Sistema de Monedas
// Versión: 1.0 | Fecha: 2026
// ==============================================

const monedas = {
  UYU: { simbolo: '$', nombre: 'Pesos Uruguayos', decimales: 2 },
  USD: { simbolo: 'US$', nombre: 'Dólares', decimales: 2 },
  ARS: { simbolo: '$', nombre: 'Pesos Argentinos', decimales: 2 },
  EUR: { simbolo: '€', nombre: 'Euros', decimales: 2 }
};

// Mapeo idioma → moneda predeterminada
const monedaPorIdioma = {
  es: 'UYU',
  en: 'USD'
};

let monedaActual = localStorage.getItem('moneda') || monedaPorIdioma[idiomaActual] || 'UYU';

function cambiarMoneda(nuevaMoneda) {
  if (monedas[nuevaMoneda]) {
    monedaActual = nuevaMoneda;
    localStorage.setItem('moneda', nuevaMoneda);
    actualizarSimboloMoneda();
  }
}

function obtenerSimboloMoneda() {
  return monedas[monedaActual].simbolo;
}

function formatearMonto(monto) {
  const simbolo = obtenerSimboloMoneda();
  const decimales = monedas[monedaActual].decimales;
  return `${simbolo}${Number(monto).toFixed(decimales)}`;
}

function actualizarSimboloMoneda() {
  // Actualizar selector de moneda según idioma
  const selectorMoneda = document.getElementById('selector-moneda');
  if (selectorMoneda) {
    selectorMoneda.value = monedaActual;
  }
  
  // Actualizar todos los elementos que muestran el símbolo de moneda
  const simbolos = document.querySelectorAll('[data-moneda-simbolo]');
  simbolos.forEach(el => {
    el.textContent = obtenerSimboloMoneda();
  });
}

// Calcular comisiones
function calcularComisiones(valorManoObra) {
  const valor = Number(valorManoObra) || 0;
  const comision5 = valor * 0.05;
  const total = valor + comision5 + comision5;
  
  return {
    valor: formatearMonto(valor),
    comisionSolicitante: formatearMonto(comision5),
    comisionPrestador: formatearMonto(comision5),
    total: formatearMonto(total),
    valorNeto: valor,
    comisionNeto: comision5
  };
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('selector-moneda');
  if (selector) {
    selector.value = monedaActual;
    selector.addEventListener('change', (e) => {
      cambiarMoneda(e.target.value);
    });
  }
  actualizarSimboloMoneda();
});
