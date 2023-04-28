/**
 * b) A partir de lo realizado en la partir de la función calcularHorasTrabajadas(fecha1, fecha2) crear una función que reciba dos parámetros de fecha (fecha de ingreso a la organización y fecha posterior o más actual), con lo cual se pide entregar las siguientes respuestas:
- Su permanencia en la organización es de: 999 días
- Su permanencia en la organización es de: 999 meses
- Su permanencia en la organización es de: 99 años y 99 meses y 99 días
- Para completar el año de permanencia faltan: 999 días
 */

function calcularPermanenciaEnLaOrganizacion(fechaIngreso, fechaActual) {
  let resultado = calcularEdad(fechaIngreso, fechaActual)

  let result = {
    dias: resultado.edadEnDias,
    meses: resultado.edadEnMeses,
    anios: resultado.edad.anio,
    diasParaCompletarAnio: resultado.diasRestantesParaSuProximoCumpleanios,
    tiempo: resultado.edad,
    mensajeCompleto: `Su permanencia en la organización es de: ${resultado.edadEnDias} días
    Su permanencia en la organización es de: ${resultado.edadEnMeses} meses
    Su permanencia en la organización es de: ${resultado.edad.anio} años y ${resultado.edad.mes} meses y ${resultado.edad.dias} días
    Para completar el año de permanencia faltan: ${resultado.diasRestantesParaSuProximoCumpleanios} días`
  }
  return result;
}
// Ejemplo de uso de la función
// calcularPermanenciaEnLaOrganizacion("2023-01-26", "2023-01-26")