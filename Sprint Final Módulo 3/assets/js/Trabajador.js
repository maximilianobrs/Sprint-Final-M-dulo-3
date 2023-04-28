class Trabajador {
	constructor(
		nombre,
		apellidos,
		sueldoActual,
		sueldoSemestreAnterior,
		cantidadCargasFamiliares
	) {
		this.nombre = nombre;
		this.apellidos = apellidos;
		this.sueldoActual = sueldoActual;
		this.sueldoSemestreAnterior = sueldoSemestreAnterior;
		this.cantidadCargasFamiliares = cantidadCargasFamiliares;
		this.tieneCargasFamiliares = false;
		if (
			Number.isInteger(this.cantidadCargasFamiliares) &&
			this.cantidadCargasFamiliares > 0
		) {
			this.tieneCargasFamiliares = true;
		}
	}

	mostrarDatos() {
		let montoCarga = 0;

		switch (this.sueldoSemestreAnterior) {
			case this.sueldoSemestreAnterior <= 429899:
				montoCarga = 16828;
				break;
			case this.sueldoSemestreAnterior > 429899 &&
				this.sueldoSemestreAnterior <= 627913:
				montoCarga = 10327;
				break;
			case this.sueldoSemestreAnterior > 627913 &&
				this.sueldoSemestreAnterior <= 979330:
				montoCarga = 3264;
				break;
			default:
				montoCarga = 0;
				break;
		}

		let montoTotalCarga = montoCarga * this.cantidadCargasFamiliares;

		return {
			nombreYApellido: `${this.nombre} ${this.apellidos}`,
			sueldoActual: this.sueldoActual,
			montoCarga,
			sueldoFinal: montoTotalCarga + this.sueldoActual,
		};
	}

	calcularAñoBisiesto(anio) {
		if (anio % 4 == 0 && (anio % 100 != 0 || anio % 400 == 0)) {
			return true;
		} else {
			return false;
		}
	}

	diasAcumuladorAnioBisiestos(anioInicio, anioFin) {
		var cantidadDeAñosBisiestos = 0;
		for (var i = anioInicio; i <= anioFin; i++) {
			if (calcularAñoBisiesto(i)) {
				cantidadDeAñosBisiestos++;
			}
		}
		return cantidadDeAñosBisiestos;
	}

	calcularDiasDelMes(mes, anio) {
		var diasDelMes = 0;
		switch (mes) {
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				diasDelMes = 31;
				break;
			case 4:
			case 6:
			case 9:
			case 11:
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

	diaDeLaSemana(dia) {
		let diasSemana = [
			'Domingo',
			'Lunes',
			'Martes',
			'Miércoles',
			'Jueves',
			'Viernes',
			'Sabado',
		];
		return diasSemana[dia];
	}

	calcularEdad(fechaNacimiento, hoy = Date.now()) {
		let fechaActual = new Date(hoy);
		let fechaNac = new Date(fechaNacimiento);
		let añoActual = fechaActual.getFullYear();
		let añoNac = fechaNac.getFullYear();
		let mesActual = fechaActual.getMonth();
		let mesNac = fechaNac.getMonth();
		let diaActual = fechaActual.getDate();
		let diaNac = fechaNac.getDate();

		var numeroDiaDelaSemana = fechaNac.getDay();

		let añoEdad = añoActual - añoNac;
		let mesEdad = mesActual - mesNac;
		let diaEdad = diaActual - diaNac;

		if (mesEdad < 0) {
			añoEdad--;
			mesEdad = 12 + mesEdad;
		}

		if (diaEdad < 0) {
			mesEdad--;
			let calcularMes = calcularDiasDelMes(mesNac + 1, añoActual);
			diaEdad = calcularMes - diaNac + diaActual;
		}

		mesesEnDias = 0;
		if (mesNac > mesActual) {
			for (let i = 0; i < mesActual; i++) {
				mesesEnDias += calcularDiasDelMes(i + 1, añoActual);
			}
			for (let i = mesNac - 1; i < 12; i++) {
				mesesEnDias += calcularDiasDelMes(i + 1, añoActual);
			}
		} else {
			for (let i = mesNac; i < mesActual; i++) {
				mesesEnDias += calcularDiasDelMes(i + 1, añoActual);
			}
		}

		let diasAcum = diasAcumuladorAnioBisiestos(añoNac, añoActual);

		let diasTotales = añoEdad * 365 + mesesEnDias + diaEdad + diasAcum;

		let mensaje = `
			El día que nació fue: ${diaDeLaSemana(numeroDiaDelaSemana)} 
			Su edad es: ${añoEdad} años y ${mesEdad} meses y ${diaEdad} días 
			La cantidad de meses que tiene son: ${añoEdad * 12 + mesEdad} meses 
			La cantidad de días que tiene son: ${diasTotales} días  
			${
				mesEdad == 0 && diaEdad == 0
					? `Felicidades estás de cumpleaños`
					: `Para su próximo cumpleaños faltan: ${
							mesEdad == 2
								? diasAcumuladorAnioBisiestos(añoActual + 1, añoActual + 1)
								: 0 + 365 - diaEdad
					  } días`
			}
			La hora en que ha realizado su consulta es: ${fechaActual.getHours()}:${fechaActual.getMinutes()}:${fechaActual.getSeconds()}`;

		let resultado = {
			diaDeLaSemanaNacio: diaDeLaSemana(numeroDiaDelaSemana),
			edad: {
				anio: añoEdad,
				mes: mesEdad,
				dias: diaEdad,
			},
			edadEnMeses: añoEdad * 12 + mesEdad,
			edadEnDias: diasTotales,
			esHoySuCumpleaños: mesEdad == 0 && diaEdad == 0,
			diasRestantesParaSuProximoCumpleanios:
				mesEdad == 2
					? diasAcumuladorAnioBisiestos(añoActual + 1, añoActual + 1)
					: 0 + 365 - diaEdad,
			horaDeConsulta: `${fechaActual.getHours()}:${fechaActual.getMinutes()}:${fechaActual.getSeconds()}`,
			mensajeCompleto: mensaje,
		};

		return resultado;
	}

	calcularPermanenciaEnLaOrganizacion(fechaIngreso, fechaActual) {
		let resultado = calcularEdad(fechaIngreso, fechaActual);

		let result = {
			dias: resultado.edadEnDias,
			meses: resultado.edadEnMeses,
			anios: resultado.edad.anio,
			diasParaCompletarAnio: resultado.diasRestantesParaSuProximoCumpleanios,
			tiempo: resultado.edad,
			mensajeCompleto: `Su permanencia en la organización es de: ${resultado.edadEnDias} días
			Su permanencia en la organización es de: ${resultado.edadEnMeses} meses
			Su permanencia en la organización es de: ${resultado.edad.anio} años y ${resultado.edad.mes} meses y ${resultado.edad.dias} días
			Para completar el año de permanencia faltan: ${resultado.diasRestantesParaSuProximoCumpleanios} días`,
		};

		return result;
	}
}

export default { Trabajador };
