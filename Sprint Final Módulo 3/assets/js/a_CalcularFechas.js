/**
 * a) A partir de funciones de fecha se requiere que obtenga del usuario la fecha de nacimiento y se le despliegue mensajes (uno o varios) con:
- El día que nació fue: miércoles (por ejemplo, para alguien que nace el 19-04-2023)
- Su edad es: 99 años y 99 meses y 99 días (cambiando los números por el dato calculado por la función que desarrollará)
- La cantidad de meses que tiene son: 99 meses (esta es la cantidad “absoluta de meses”, por ejemplo alguien nacido el 19-04-2022 tendrá 12 meses y quien nació 19-04-2021 tendrá 24 meses)
- La cantidad de días que tiene son: 99999 días (días como número entero, sin decimales)
- Para su próximo cumpleaños faltan: 999 días (si el número es cero, la persona está de cumpleaños y se debe poner mensaje “Felicidades está de cumpleaños”, en otro caso poner el número de días)
- La hora en que ha realizado su consulta es: hh:mm:ss AM/PM (puede ser en formato 24 horas)
 */
function calcularAñoBisiesto(anio) {
  if ((anio % 4 == 0) && ((anio % 100 != 0) || (anio % 400 == 0))) {
    return true;
  } else {
    return false;
  }
}

function diasAcumuladorAnioBisiestos(anioInicio, anioFin) {
  var cantidadDeAñosBisiestos = 0;
  for (var i = anioInicio; i <= anioFin; i++) {
    if (calcularAñoBisiesto(i)) {
      cantidadDeAñosBisiestos++;
    }
  }
  return cantidadDeAñosBisiestos;
}
function calcularDiasDelMes(mes, anio) {
  var diasDelMes = 0;
  switch (mes) {
    case 1: case 3: case 5: case 7: case 8: case 10: case 12:
      diasDelMes = 31;
      break;
    case 4: case 6: case 9: case 11:
      diasDelMes = 30;
      break;
    case 2:
      if (calcularAñoBisiesto(anio)) {
        diasDelMes = 29;
      } else {
        diasDelMes = 28;
      }
      break;
  }
  return diasDelMes;
}

function diaDeLaSemana(dia) {
  let diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sabado"]
  return diasSemana[dia]
}



function calcularEdad(fechaNacimiento, hoy=Date.now()) {
  //Obtengo todos los valores básicos a utilizar
  let fechaActual = new Date(hoy)
  let fechaNac = new Date(fechaNacimiento)
  let añoActual = fechaActual.getFullYear()
  let añoNac = fechaNac.getFullYear()
  let mesActual = fechaActual.getMonth()
  let mesNac = fechaNac.getMonth()
  let diaActual = fechaActual.getDate()
  let diaNac = fechaNac.getDate()

  //Obtengo el día de la semana
  var numeroDiaDelaSemana = fechaNac.getDay();

  //Calculo la edad
  //Primera parte realizar la resta de años, meses y días
  let añoEdad = añoActual - añoNac
  let mesEdad = mesActual - mesNac
  let diaEdad = diaActual - diaNac
  //Segunda parte realizar las validaciones de los meses y días
  //Si mesEdad es menor a 0, se resta un año y se suma 12 meses
  if (mesEdad < 0) {
    añoEdad--
    mesEdad = 12 + mesEdad
  }
  //Si diaEdad es menor a 0, se resta un mes y se suma los días del mes anterior
  if (diaEdad < 0) {
    mesEdad--
    let calcularMes = calcularDiasDelMes(mesNac + 1, añoActual)
    diaEdad = (calcularMes - diaNac) + diaActual
  }
  //Calcular los meses en días
  mesesEnDias = 0
  if (mesNac>mesActual) {
    for(let i=0; i<mesActual; i++){
      mesesEnDias += calcularDiasDelMes(i+1, añoActual)
    }
    for(let i=mesNac-1; i<12; i++){
      mesesEnDias += calcularDiasDelMes(i+1, añoActual)
    }
  }else{
    for(let i=mesNac; i<mesActual; i++){
      mesesEnDias += calcularDiasDelMes(i+1, añoActual)
    }
  }
  //Calcular los días acumulados de los años bisiestos dentro de la edad
  let diasAcum = diasAcumuladorAnioBisiestos(añoNac, añoActual)
  //Calcular los días totales de la edad
  let diasTotales = (añoEdad * 365) + mesesEnDias + diaEdad + diasAcum;
 

  let mensaje = `
    El día que nació fue: ${diaDeLaSemana(numeroDiaDelaSemana)} 
    Su edad es: ${añoEdad} años y ${mesEdad} meses y ${diaEdad} días 
    La cantidad de meses que tiene son: ${((añoEdad * 12) + mesEdad)} meses 
    La cantidad de días que tiene son: ${diasTotales} días  
    ${(mesEdad == 0 && diaEdad == 0) ? `Felicidades estás de cumpleaños` : `Para su próximo cumpleaños faltan: ${(mesEdad==2?diasAcumuladorAnioBisiestos(añoActual+1, añoActual+1):0 + 365 - diaEdad)} días`}
    La hora en que ha realizado su consulta es: ${fechaActual.getHours()}:${fechaActual.getMinutes()}:${fechaActual.getSeconds()}`;
  let resultado={
    diaDeLaSemanaNacio: diaDeLaSemana(numeroDiaDelaSemana),
    edad:{
      anio:añoEdad,
      mes:mesEdad,
      dias:diaEdad
    },
    edadEnMeses:(añoEdad * 12) + mesEdad,
    edadEnDias: diasTotales,
    esHoySuCumpleaños:(mesEdad == 0 && diaEdad == 0),
    diasRestantesParaSuProximoCumpleanios: (mesEdad==2?diasAcumuladorAnioBisiestos(añoActual+1, añoActual+1):0 + 365 - diaEdad),
    horaDeConsulta: `${fechaActual.getHours()}:${fechaActual.getMinutes()}:${fechaActual.getSeconds()}`,
    mensajeCompleto:mensaje
  }
  return resultado
}
// Ejemplo de uso de la función
// console.log(calcularEdad("2014-04-30T00:00:00"))
// console.log(calcularEdad("1990-03-02T00:00:00"))
// console.log(calcularEdad("2023-01-26T00:00:00"))
 