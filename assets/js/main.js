import Trabajador from './Trabajador.js'

function formatDateCL() {
  return new Date(this).toLocaleString().substring(0, 10);
}
String.prototype.formatDateCL = formatDateCL
Date.prototype.formatDateCL = formatDateCL

 

document.addEventListener('DOMContentLoaded', function () {
  
  renderIndex()

  formTrabajador.addEventListener('submit', function (e) {
    e.preventDefault();
    let allSelect = formTrabajador.querySelectorAll('select');
    let formData = new FormData(formTrabajador);
    let object = {}
    allSelect.forEach((select) => {
      formData.append(select.name, select.value);
    });
    formData.forEach((value, key) => {
      object[key] = value;
    });
    let trabajadores = []
    if (localStorage.getItem('trabajadores') === null) {
      trabajadores = []
    } else {
      trabajadores = JSON.parse(localStorage.getItem('trabajadores'))
    }

    let trabajador1 = new Trabajador(object);
    trabajadores.push(trabajador1);
    localStorage.setItem('trabajadores', JSON.stringify(trabajadores));

    htmlTrabajadores(trabajadores)
  });
});

const htmlTrabajadores = (trabajadores) => {
  let resultTbodyHtml = ''
  trabajadores.forEach((trabajador, index) => {
    let trabajador1 = new Trabajador(trabajador)
    
    
    let cargaFamiliarYSueldoFinal = trabajador1.cargaFamiliarYSueldoFinal()
    let calcularPermanencia = trabajador1.calcularMiPermanenciaEnLaOrganizacion()
    let mensajeTodo = trabajador1.mostrarTodosLosDatosAsociadosAlTrabajador()
    trabajador.sueldoActual = cargaFamiliarYSueldoFinal.sueldoActual
    trabajador.sueldoSemestreAnterior = cargaFamiliarYSueldoFinal.sueldoSemestreAnterior 
    trabajador.cantidadCargasFamiliares = cargaFamiliarYSueldoFinal.cantidadCargasFamiliares
    trabajador.tramoCarga = cargaFamiliarYSueldoFinal.tramoCarga
    trabajador.sueldoFinal = cargaFamiliarYSueldoFinal.sueldoFinal
    trabajador.montoCarga = cargaFamiliarYSueldoFinal.montoCarga
    trabajador.montoTotalCarga = cargaFamiliarYSueldoFinal.montoTotalCarga
    console.log(trabajador)
    resultTbodyHtml += `
      <tr>
        <td>${index + 1}</td>
        <td>${trabajador.nombres}</td>
        <td>${trabajador.apellidos}</td>
        <td>${trabajador.fechaNacimiento.formatDateCL()}</td>
        <td>${trabajador.trabajadorActivo}</td>
        <td>${trabajador.fechaIngreso.formatDateCL()}</td>
        <td>$${trabajador.sueldoActual.toLocaleString()}</td>
        <td>$${trabajador.sueldoSemestreAnterior.toLocaleString()}</td>
        <td>${trabajador.tieneCargasFamiliares}</td>
        <td>${trabajador.cantidadCargasFamiliares}</td> 
        <td>
        <div class="btn-group">
        <button type="button" class="btn btn-info dropdown-toggle" data-bs-toggle="dropdown"
          aria-expanded="false">
          Menú 
        </button>
        <ul class="dropdown-menu">
          <li><button type="button" class="dropdown-item" href="#" onclick="show({
            content:'${mensajeTodo.mensajeCompleto}',
            id:'trabajador${index}',
            titulo:'Toda la información del trabajador'
          } )" > Ver todo </button></li>
          <li><button type="button" class="dropdown-item" href="#" onclick="show({
            content:'${calcularPermanencia.mensajeCompleto}',
            id:'trabajador${index}',
            titulo:'Permanencia del trabajdor'
          })" >Calcular Permanencia</button></li>
          <li><button type="button" class="dropdown-item" href="#" onclick="show({
            content: '${cargaFamiliarYSueldoFinal.mensajeCompleto}',
            id:'trabajador${index}',
            titulo:'Carga Familiar y Sueldo Final'
          })">Calcular Tramo Carga y Sueldo Final</button></li>
        </ul>
      </div>
        </td>
      </tr>
      `;
  }); 
  document.querySelector('#resultTbody').innerHTML = resultTbodyHtml;
}
const renderIndex = ()=> {
  let trabajadores = []
  if (localStorage.getItem('trabajadores') === null) {
    trabajadores = []
  } else {
    trabajadores = JSON.parse(localStorage.getItem('trabajadores'))
  }
  htmlTrabajadores(trabajadores)
}


