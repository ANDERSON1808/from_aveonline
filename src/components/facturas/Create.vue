<template>
  <div class="min-h-screen bg-gray-100 flex items-center">
    <div class=" mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300">
      <div class="py-12 p-10 bg-white rounded-xl">
        <div class="mb-6">
          <label class="mr-4 text-gray-700 font-bold inline-block mb-2">Promoción:</label>
          <select @blur="validate('promocion_id')" :class="validateClass.promocion_id" v-model="invoice.promocion_id">
            <option v-for="item in promotions" v-bind:key="item.id" :value="item.id">{{ item.descripcion }}</option>
          </select>
        </div>
        <div class="">
          <label class="mr-4 text-gray-700 font-bold inline-block mb-2">Medicinas</label>
          <Multiselect
              @click="addMedicine"
              v-model="invoice.productos"
              mode="tags"
              :closeOnSelect="false"
              :searchable="true"
              :createTag="true"
              :options="productos"
              :class="validateClass.productos"
          />
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
import {ref, onMounted} from 'vue'
import axios from 'axios'
import Multiselect from '@vueform/multiselect'

export default {
  setup() {
    const today = ref(new Date())
    let invoice = ref({
      promocion_id: '',
      productos: []
    })
    let promotions = ref([])
    let productos = ref([])
    let productosCompled = ref([])
    onMounted(() => {
      getPromotions();
      getMedicines();
    })


    const getMedicines = () => {
      axios.get(`${process.env.VUE_APP_HOST}/v1/medicamento`)
          .then(response => {
            productosCompled.value = response.data;
            productos.value = response.data.map(item => {
              return {value: item.id, label: item.nombre}
            });
          })
          .catch((err) => {
            console.log(err)
          });
    }

    const getPromotions = () => {
      axios.get(`${process.env.VUE_APP_HOST}/v1/promocion`)
          .then(response => {
            response.data.map(item => {
              let fechaInicio = new Date(`${item.fecha_inicio.substring(0, 10)} 00:00:00`)
              let fechaFin = new Date(`${item.fecha_fin.substring(0, 10)} 23:59:59`)
              if (today.value.getTime() >= fechaInicio.getTime() && today.value.getTime() <= fechaFin.getTime()) {
                promotions.value.push(item)
              }
            });
          })
          .catch((err) => {
            console.log(err)
          });
    }

    let validateClass = ref({
      promocion_id: "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded",
      totalPay: "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded",
      productos: "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
    })
    const save = () => {
      invoice.value.productos = invoice.value.productos.map(item => {
        return item
      })
      axios.post(`${process.env.VUE_APP_HOST}/v1/factura`, invoice.value)
          .then((response) => {
            console.log(response)
            alert("Factura guardada")
            window.location.href = "/#/facturas";
          })
          .catch((err) => {
            console.log(err)
            alert("Error al crear factura")
          });
    }

    const validate = (flag) => {
      if (flag === "promocion_id" && (invoice.value.promocion_id === "" || invoice.value.promocion_id < 0)) {
        validateClass.value.promocion_id = "border border-red-300 bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
      } else if (flag === "promocion_id") {
        validateClass.value.promocion_id = "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
      }
      if (flag === "productos" && (invoice.value.productos === "" || invoice.value.productos.length > 0)) {
        validateClass.value.productos = "border border-red-300 bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
      } else if (flag === "productos") {
        validateClass.value.productos = "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
      }
    }

    return {
      invoice,
      save,
      validateClass,
      validate,
      promotions,
      productos,
    }
  },
  components: {
    Multiselect,
  }
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style>

</style>