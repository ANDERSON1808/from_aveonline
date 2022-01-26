<template>
  <div class="min-h-screen bg-gray-100 flex items-center">
    <div class=" mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300">
      <div class="py-12 p-10 bg-white rounded-xl">
        <div class="mb-6">
          <label class="mr-4 text-gray-700 font-bold inline-block mb-2">Nombre:</label>
          <input type="text" @blur="validate('nombre')" :class="validateClass.nombre" v-model="producto.nombre"/>
        </div>
        <div class="mb-6">
          <label class="mr-4 text-gray-700 font-bold inline-block mb-2">Precio:</label>
          <input type="number" step="0.1" @blur="validate('precio')" :class="validateClass.precio"
                 v-model="producto.precio"/>
        </div>
        <div class="">
          <label class="mr-4 text-gray-700 font-bold inline-block mb-2">Ubicación</label>
          <input type="text" @blur="validate('ubicacion')" :class="validateClass.ubicacion"
                 v-model="producto.ubicacion"/>
        </div>
        <button
            class="w-full mt-6 text-indigo-50 font-bold bg-indigo-600 py-3 rounded-md hover:bg-indigo-500 transition duration-300"
            @click="save">Guardar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import axios from 'axios'

export default {
  setup() {
    let producto = ref({
      nombre: '',
      precio: '',
      ubicacion: ''
    })
    let validateClass = ref({
      nombre: "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded",
      precio: "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded",
      ubicacion: "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
    })
    const save = () => {
      axios.post(`${process.env.VUE_APP_HOST}/v1/medicamento`, producto.value)
          .then((response) => {
            console.log(response)
            alert("Producto guardado")
            window.ubicacion.href = "/#/medicinas";
          })
          .catch((err) => {
            console.log(err)
            alert("Error al crear producto")
          });
    }

    const validate = (flag) => {
      if (flag === "nombre" && (producto.value.nombre === "" || producto.value.nombre.lenght > 80)) {
        validateClass.value.nombre = "border border-red-300 bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
      } else if (flag === "nombre") {
        validateClass.value.nombre = "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
      }
      if (flag === "precio" && (producto.value.precio === "" || producto.value.precio < 0.1)) {
        validateClass.value.precio = "border border-red-300 bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
      } else if (flag === "precio") {
        validateClass.value.precio = "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
      }
      if (flag === "ubicacion" && (producto.value.ubicacion === "" || producto.value.ubicacion.lenght > 120)) {
        validateClass.value.ubicacion = "border border-red-300 bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
      } else if (flag === "ubicacion") {
        validateClass.value.ubicacion = "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
      }
    }

    return {
      producto,
      save,
      validateClass,
      validate,
    }
  }
}
</script>

<style>

</style>