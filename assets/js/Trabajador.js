String.prototype.replaceEnter = function ($replace = '') {
	return this.replace(/^\s+|\s+$/gm, '').split('\n').join($replace);
};
class Trabajador {
	constructor(
		{
			nombres,
			apellidos,
			sueldoActual,
			sueldoSemestreAnterior,
			cantidadCargasFamiliares,
			fechaNacimiento,
			fechaIngreso,
			trabajadorActivo = true,
			tieneCargasFamiliares = false
		}
	) {
		console.log('constructor');
		let opciones={
			nombres,
			apellidos,
			sueldoActual,
			sueldoSemestreAnterior,
			cantidadCargasFamiliares,
			fechaNacimiento,
			fechaIngreso,
			trabajadorActivo,
			tieneCargasFamiliares
		}
		console.log('opciones',opciones);
		this.nombres = nombres;
		this.apellidos = apellidos;
		this.sueldoActual = sueldoActual;
		this.sueldoSemestreAnterior = sueldoSemestreAnterior;
		this.cantidadCargasFamiliares = cantidadCargasFamiliares;
		this.fechaNacimiento = `${fechaNacimiento.substring(0, 10)}T00:00:00`;
		this.fechaIngreso = `${fechaIngreso.substring(0, 10)}T00:00:00`;
		this.trabajadorActivo = trabajadorActivo;
		this.tieneCargasFamiliares = tieneCargasFamiliares;
		this.sueldoFinal = 0;
		this.montoTotalCarga = 0;
		this.tramoCarga = null;
		if (
			Number.isInteger(this.cantidadCargasFamiliares) &&
			this.cantidadCargasFamiliares > 0
		) {
			this.tieneCargasFamiliares = true;
		}
	}
	calcularMiEdad() {
		let fechaActual = new Date(Date.now());
		let fechaNacimiento = new Date(this.fechaNacimiento);
		return this.calcularEdad(fechaNacimiento, fechaActual);
	}

	cargaFamiliarYSueldoFinal() {
		let montoCarga = 0;

		switch (this.sueldoSemestreAnterior) {
			case this.sueldoSemestreAnterior <= 429899:
				montoCarga = 16828;
				this.tramoCarga = 'Tramo A';
				break;
			case this.sueldoSemestreAnterior > 429899 &&
				this.sueldoSemestreAnterior <= 627913:
				montoCarga = 10327;
				this.tramoCarga = 'Tramo B';
				break;
			case this.sueldoSemestreAnterior > 627913 &&
				this.sueldoSemestreAnterior <= 979330:
				montoCarga = 3264;
				this.tramoCarga = 'Tramo C';
				break;
			default:
				montoCarga = 0;
				this.tramoCarga = 'Tramo D';
				break;
		}

		let montoTotalCarga = montoCarga * this.cantidadCargasFamiliares;
		this.montoTotalCarga = montoTotalCarga;
		this.sueldoFinal = this.sueldoActual + montoTotalCarga;
		let resultado = {
			nombreYApellido: `${this.nombres} ${this.apellidos}`,
			sueldoActual: this.sueldoActual,
			sueldoSemestreAnterior:this.sueldoSemestreAnterior,
			montoCarga,
			montoTotalCarga,
			sueldoFinal: this.sueldoFinal
		};

		let mensaje = `${resultado.nombreYApellido},
		El cálculo de su sueldo ha sido realizado con éxito. 
		A continuación se detallan los resultados:
		- Sueldo Actual: ${resultado.sueldoActual}$
		- Monto de la carga: ${resultado.montoCarga}$
		- Monto total de la carga: ${resultado.montoTotalCarga} 
		- Sueldo Semestre Anterior: ${resultado.sueldoSemestreAnterior}$
		- Sueldo Final: ${resultado.sueldoFinal}$`;
		return mensaje.replaceEnter();
	}
	calcularMiPermanenciaEnLaOrganizacion() {
		let fechaActual = new Date(Date.now());
		let fechaIngreso = new Date(Date.parse(this.fechaIngreso));
		console.log(fechaIngreso,this)
		return this.calcularPermanenciaEnLaOrganizacion(fechaIngreso, fechaActual).mensajeCompleto.replaceEnter();
	}
	mostrarMensajeConTodosLosDatosAsociadosAlTrabajador() {
		let datosTrabajador = this.mostrarTodosLosDatosAsociadosAlTrabajador();
		let mensaje = `El trabajador ${datosTrabajador.nombres} ${datosTrabajador.apellidos} tiene un sueldo actual de ${datosTrabajador.sueldoActual} 
		y un sueldo del semestre anterior de ${datosTrabajador.sueldoSemestreAnterior} 
		y tiene ${datosTrabajador.cantidadCargasFamiliares} cargas familiares 
		y su fecha de nacimiento es ${datosTrabajador.fechaNacimiento} 
		y su fecha de ingreso es ${datosTrabajador.fechaIngreso} 
		y su estado es ${datosTrabajador.trabajadorActivo} 
		y tiene cargas familiares ${datosTrabajador.tieneCargasFamiliares} 
		y su sueldo final es ${datosTrabajador.sueldoFinal} 
		y el monto total de carga es ${datosTrabajador.montoTotalCarga} 
		y su tramo de carga es ${datosTrabajador.tramoCarga}`;
		return mensaje.replaceEnter();
	}

	mostrarTodosLosDatosAsociadosAlTrabajador() {
		let datosTrabajador = {
			nombres: this.nombres,
			apellidos: this.apellidos,
			sueldoActual: this.sueldoActual,
			sueldoSemestreAnterior: this.sueldoSemestreAnterior,
			cantidadCargasFamiliares: this.cantidadCargasFamiliares,
			fechaNacimiento: this.fechaNacimiento,
			fechaIngreso: this.fechaIngreso,
			trabajadorActivo: this.trabajadorActivo,
			tieneCargasFamiliares: this.tieneCargasFamiliares,
			sueldoFinal: this.sueldoFinal,
			montoTotalCarga: this.montoTotalCarga,
			tramoCarga: this.tramoCarga,
		};
		return datosTrabajador;
	}

	calcularPermanenciaEnLaOrganizacion(fechaIngreso, fechaActual) {
		console.log(fechaIngreso);
		console.log(fechaActual);
		let resultado = this.calcularEdad(fechaIngreso, fechaActual);

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
			if (this.calcularAñoBisiesto(i)) {
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
				if (this.calcularAñoBisiesto(anio)) {
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
			let calcularMes = this.calcularDiasDelMes(mesNac + 1, añoActual);
			diaEdad = calcularMes - diaNac + diaActual;
		}

		let mesesEnDias = 0;
		if (mesNac > mesActual) {
			for (let i = 0; i < mesActual; i++) {
				mesesEnDias += this.calcularDiasDelMes(i + 1, añoActual);
			}
			for (let i = mesNac - 1; i < 12; i++) {
				mesesEnDias += this.calcularDiasDelMes(i + 1, añoActual);
			}
		} else {
			for (let i = mesNac; i < mesActual; i++) {
				mesesEnDias += this.calcularDiasDelMes(i + 1, añoActual);
			}
		}

		let diasAcum = this.diasAcumuladorAnioBisiestos(añoNac, añoActual);

		let diasTotales = añoEdad * 365 + mesesEnDias + diaEdad + diasAcum;

		let mensaje = `
			El día que nació fue: ${this.diaDeLaSemana(numeroDiaDelaSemana)} 
			Su edad es: ${añoEdad} años y ${mesEdad} meses y ${diaEdad} días 
			La cantidad de meses que tiene son: ${añoEdad * 12 + mesEdad} meses 
			La cantidad de días que tiene son: ${diasTotales} días  
			${mesEdad == 0 && diaEdad == 0
				? `Felicidades estás de cumpleaños`
				: `Para su próximo cumpleaños faltan: ${mesEdad == 2
					? this.diasAcumuladorAnioBisiestos(añoActual + 1, añoActual + 1)
					: 0 + 365 - diaEdad
				} días`
			}
			La hora en que ha realizado su consulta es: ${fechaActual.getHours()}:${fechaActual.getMinutes()}:${fechaActual.getSeconds()}`;

		let resultado = {
			diaDeLaSemanaNacio: this.diaDeLaSemana(numeroDiaDelaSemana),
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
					? this.diasAcumuladorAnioBisiestos(añoActual + 1, añoActual + 1)
					: 0 + 365 - diaEdad,
			horaDeConsulta: `${fechaActual.getHours()}:${fechaActual.getMinutes()}:${fechaActual.getSeconds()}`,
			mensajeCompleto: mensaje,
		};

		return resultado;
	}


}




export default Trabajador