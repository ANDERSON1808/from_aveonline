<template>
  <div class="min-h-screen bg-gray-100 flex items-center">
    <div class=" mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300">
      <div class="py-12 p-10 bg-white rounded-xl">
        <div class="mb-6">
          <label class="mr-4 text-gray-700 font-bold inline-block mb-2">Descripción:</label>
          <input type="text" @blur="validate('descripcion')" :class="validateClass.descripcion"
                 v-model="promotion.descripcion"/>
        </div>
        <div class="mb-6">
          <label class="mr-4 text-gray-700 font-bold inline-block mb-2">Porcentaje:</label>
          <input type="number" step="0.1" @blur="validate('porcentaje')" :class="validateClass.porcentaje"
                 v-model="promotion.porcentaje"/>
        </div>
        <div class="mb-6">
          <label class="mr-4 text-gray-700 font-bold inline-block mb-2">Fecha de Inicio:</label>
          <input type="date" @blur="validate('fechaInicio')" :class="validateClass.fechaInicio"
                 v-model="promotion.fechaInicio"/>
        </div>
        <div class="mb-6">
          <label class="mr-4 text-gray-700 font-bold inline-block mb-2">Fecha de Final:</label>
          <input type="date" @blur="validate('fechaFin')" :class="validateClass.fechaFin"
                 v-model="promotion.fechaFin"/>
        </div>
        <button
            class="w-full mt-6 text-indigo-50 font-bold bg-red-400 py-3 rounded-md hover:bg-indigo-500 transition duration-300"
            @click="save">Guardar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import axios from 'axios'
import Swal from "sweetalert2";

export default {
  setup() {
    let promotion = ref({
      descripcion: '',
      porcentaje: 0.0,
      fechaInicio: '',
      fechaFin: ''
    })
    let validateClass = ref({
      descripcion: "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded",
      porcentaje: "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded",
      fechaInicio: "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded",
      fechaFin: "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded",
    })
    const save = () => {
      axios.post(`${process.env.VUE_APP_HOST}/v1/promocion`, promotion.value)
          .then((response) => {
            if (response.data.error) {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: response.data.error,
              })
            } else {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Tu trabajo ha sido guardado.',
                showConfirmButton: true,
                timer: 1500
              }).then(function () {
                location.href = "/#/promociones";
              })
            }
          }).catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Lo sentimos no se guardo!',
          footer: '' + err
        })
      });
    }

    const validate = (flag) => {
      if (flag === "descripcion" && (promotion.value.descripcion === "" || promotion.value.descripcion.lenght > 120)) {
        validateClass.value.descripcion = "border border-red-300 bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
      } else if (flag === "descripcion") {
        validateClass.value.descripcion = "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
      }
      if (flag === "porcentaje" && (promotion.value.porcentaje === "" || promotion.value.porcentaje < 0.1)) {
        validateClass.value.porcentaje = "border border-red-300 bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
      } else if (flag === "porcentaje") {
        validateClass.value.porcentaje = "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
      }
      if (flag === "fechaInicio" && (promotion.value.fechaInicio === "")) {
        validateClass.value.fechaInicio = "border border-red-300 bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
      } else if (flag === "fechaInicio") {
        validateClass.value.fechaInicio = "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
      }
      if (flag === "fechaFin" && (promotion.value.fechaFin === "")) {
        validateClass.value.fechaFin = "border border-red-300 bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
      } else if (flag === "fechaFin") {
        validateClass.value.fechaFin = "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
      }
    }

    return {
      promotion,
      save,
      validateClass,
      validate,
    }
  }
}
</script>

<style>

</style>