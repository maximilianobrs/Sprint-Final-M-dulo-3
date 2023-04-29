import Trabajador from './Trabajador.js'
document.addEventListener('DOMContentLoaded', function () {


  let trabajadores = []
  if (localStorage.getItem('trabajadores') === null) {
    trabajadores = []
  } else {
    trabajadores = JSON.parse(localStorage.getItem('trabajadores'))
  }
  htmlTrabajadores(trabajadores)

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
    let mensajeTodo = trabajador1.mostrarMensajeConTodosLosDatosAsociadosAlTrabajador()
    let calcularPermanencia = trabajador1.calcularMiPermanenciaEnLaOrganizacion()
    let cargaFamiliarYSueldoFinal = trabajador1.cargaFamiliarYSueldoFinal()
    resultTbodyHtml += `
      <tr>
        <td>${index + 1}</td>
        <td>${trabajador.nombres}</td>
        <td>${trabajador.apellidos}</td>
        <td>${trabajador.fechaNacimiento}</td>
        <td>${trabajador.trabajadorActivo}</td>
        <td>${trabajador.fechaIngreso}</td>
        <td>${trabajador.sueldoActual}</td>
        <td>${trabajador.sueldoSemestreAnterior}</td>
        <td>${trabajador.tieneCargasFamiliares}</td>
        <td>${trabajador.cantidadCargasFamiliares}</td>
        <td>${trabajador.sueldoFinal}</td>
        <td>${trabajador.tramoCarga}</td>
        <td>${trabajador.montoTotalCarga}</td>
        <td>
        <div class="btn-group">
        <button type="button" class="btn btn-info dropdown-toggle" data-bs-toggle="dropdown"
          aria-expanded="false">
          Menú
        </button>
        <ul class="dropdown-menu">
          <li><button type="button" class="dropdown-item" href="#" onclick="show('${mensajeTodo}','trabajador${index}' )" > Ver todo </button></li>
          <li><button type="button" class="dropdown-item" href="#" onclick="show('${calcularPermanencia}','trabajador${index}')" >Calcular Permanencia</button></li>
          <li><button type="button" class="dropdown-item" href="#" onclick="show('${cargaFamiliarYSueldoFinal}','trabajador${index}')">Calcular Tramo Carga y Sueldo Final</button></li>
        </ul>
      </div>
        </td>
      </tr>
      `;
  });
  resultTbody.innerHTML = resultTbodyHtml;
}