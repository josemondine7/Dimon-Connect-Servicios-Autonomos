function esCorreoValido(correo) {
  const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return expresion.test(correo);
}

function esTelefonoValido(telefono) {
  if (!telefono) return true;
  const soloNumeros = telefono.replace(/\s/g, '');
  return soloNumeros.length >= 7 && soloNumeros.length <= 15;
}

function tieneLongitudMinima(texto, minimo) {
  return texto && texto.trim().length >= minimo;
}

function tieneLongitudMaxima(texto, maximo) {
  return !texto || texto.trim().length <= maximo;
}

function esNumeroPositivo(valor) {
  const numero = parseFloat(valor);
  return !isNaN(numero) && numero > 0;
}

function validarCampo(campo, reglas) {
  const errores = [];
  const valor = campo.value ? campo.value.trim() : '';
  const nombreCampo = campo.dataset.nombre || campo.name || 'Campo';

  if (reglas.obligatorio && valor === '') {
    errores.push(`El campo "${nombreCampo}" es obligatorio`);
  }

  if (valor !== '' && reglas.correo && !esCorreoValido(valor)) {
    errores.push(`"${nombreCampo}" no tiene un formato válido`);
  }

  if (valor !== '' && reglas.telefono && !esTelefonoValido(valor)) {
    errores.push(`"${nombreCampo}" no tiene un formato válido`);
  }

  if (reglas.minimo && valor.length < reglas.minimo) {
    errores.push(`"${nombreCampo}" debe tener al menos ${reglas.minimo} caracteres`);
  }

  if (reglas.maximo && valor.length > reglas.maximo) {
    errores.push(`"${nombreCampo}" no puede superar los ${reglas.maximo} caracteres`);
  }

  if (reglas.numeroPositivo && valor !== '' && !esNumeroPositivo(valor)) {
    errores.push(`"${nombreCampo}" debe ser un valor mayor a cero`);
  }

  return errores;
}

function validarFormulario(idFormulario, reglasPorCampo) {
  const formulario = document.getElementById(idFormulario);
  if (!formulario) return { valido: false, errores: ['Formulario no encontrado'] };

  let todosValidos = true;
  const todosErrores = [];

  Object.keys(reglasPorCampo).forEach(nombreCampo => {
    const campo = formulario.querySelector(`[name="${nombreCampo}"]`) || 
                   formulario.querySelector(`#${nombreCampo}`);
    if (campo) {
      const errores = validarCampo(campo, reglasPorCampo[nombreCampo]);
      if (errores.length > 0) {
        todosValidos = false;
        todosErrores.push(...errores);
        mostrarErrorEnCampo(campo, errores[0]);
      } else {
        quitarErrorEnCampo(campo);
      }
    }
  });

  return { valido: todosValidos, errores: todosErrores };
}

function mostrarErrorEnCampo(campo, mensaje) {
  quitarErrorEnCampo(campo);
  campo.style.borderColor = 'var(--alerta)';
  campo.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.15)';
  
  const elementoError = document.createElement('div');
  elementoError.className = 'mensaje-error campo-error';
  elementoError.textContent = mensaje;
  campo.parentNode.insertBefore(elementoError, campo.nextSibling);
}

function quitarErrorEnCampo(campo) {
  campo.style.borderColor = '';
  campo.style.boxShadow = '';
  const errorAnterior = campo.parentNode.querySelector('.campo-error');
  if (errorAnterior) errorAnterior.remove();
}

function limpiarFormulario(idFormulario) {
  const formulario = document.getElementById(idFormulario);
  if (!formulario) return;
  formulario.reset();
  formulario.querySelectorAll('.campo-error').forEach(el => el.remove());
}

const Validacion = {
  correo: esCorreoValido,
  telefono: esTelefonoValido,
  longitudMinima: tieneLongitudMinima,
  longitudMaxima: tieneLongitudMaxima,
  numeroPositivo: esNumeroPositivo,
  campo: validarCampo,
  formulario: validarFormulario,
  limpiar: limpiarFormulario
};
