/**
 * 
 * NOMBRE,
o APELLIDOS
o Sueldo actual,
o Sueldo semestre anterior
o Valor lógico para indicar si corresponde cargas familiares o no
o Cantidad de cargas familiares (sólo leerá a quienes si corresponda)
 */

function Trabajador(nombre, apellidos, sueldoActual, sueldoSemestreAnterior, cantidadCargasFamiliares) {
  this.nombre = nombre
  this.apellidos = apellidos
  this.sueldoActual = sueldoActual
  this.sueldoSemestreAnterior = sueldoSemestreAnterior
  this.cantidadCargasFamiliares = cantidadCargasFamiliares
  this.tieneCargasFamiliares = false
  if (Number.isInteger(this.cantidadCargasFamiliares) && this.cantidadCargasFamiliares > 0) {
    this.tieneCargasFamiliares = true
  }
}

/**
 * Cree una función que muestre los datos de:
o Nombre y Apellidos
o Sueldo actual
o Monto de Carga familiar
o Sueldo Final (al que se le suma el valor de carga familiar.
 */

function mostrarDatos() {
  let montoCarga = 0
  switch (this.sueldoSemestreAnterior) {
    case this.sueldoSemestreAnterior <= 429899:
      montoCarga = 16828
      break;
    case this.sueldoSemestreAnterior > 429899 && this.sueldoSemestreAnterior <= 627913:
      montoCarga = 10327
      break;
    case this.sueldoSemestreAnterior > 627913 && this.sueldoSemestreAnterior <= 979330:
      montoCarga = 3264
      break;
    default:
      montoCarga = 0
      break;
  }

  let montoTotalCarga = montoCarga * this.cantidadCargasFamiliares

  return {
    nombreYApellido: `${this.nombre} ${this.apellidos}`,
    sueldoActual: this.sueldoActual,
    montoCargaFamiliarTramo: montoCarga,
    sueldoFinal: montoTotalCarga+this.sueldoActual
  }
} 

Trabajador.prototype.mostrarDatos = mostrarDatos