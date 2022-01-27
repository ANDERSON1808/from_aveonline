<template>
  <div class="min-h-screen bg-gray-100 flex items-center">
    <div class=" mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300">
      <div class="py-12 p-10 bg-white rounded-xl">
        <div class="mb-6">
          <label class="mr-4 text-gray-700 font-bold inline-block mb-2">Día de Compra:</label>
          <input type="date" @blur="validate('fechaCompra')" @change="validateDate"
                 :class="validateClass.fechaCompra" v-model="invoice.fechaCompra"/>
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
            @click="save">Simular
        </button>
        <template v-if="simulates.total_neto !=null">
          <div class="container flex justify-center mx-auto">
            <div class="flex flex-col">
              <div class="w-full">
                <div class="border-b border-gray-200 shadow">
                  <table class="divide-y divide-gray-300 ">
                    <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-2 text-xs text-gray-500">
                        totalNeto
                      </th>
                      <th class="px-6 py-2 text-xs text-gray-500">
                        totalConDescuento
                      </th>
                      <th class="px-6 py-2 text-xs text-gray-500">
                        descuentoAplicado
                      </th>
                    </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-300">
                    <tr class="whitespace-nowrap">
                      <td class="px-6 py-4">
                        <div class="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full">
                          {{ simulates.total_neto }}
                        </div>
                      </td>
                      <td class="px-6 py-4">
                        <div class="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full">
                          {{ simulates.total_con_descuento }}
                        </div>
                      </td>
                      <td class="px-6 py-4">
                        <div class="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full">
                          {{ simulates.descuento_aplicado }}
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </template>
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
    let invoice = ref({
      fechaCompra: '',
      productos: []
    })
    const today = ref(new Date())
    const month = ref((today.value.getMonth() + 1).toString().padStart(2, '0'))
    let simulates = ref([])
    let productos = ref([])
    let productosCompled = ref([])
    onMounted(() => {
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

    let validateClass = ref({
      fechaCompra: "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded",
      promotionId: "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded",
      productos: "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
    })

    const save = () => {
      invoice.value.productos = invoice.value.productos.map(item => {
        return item
      })
      axios.post(`${process.env.VUE_APP_HOST}/v1/simulacion`, invoice.value)
          .then((response) => {
            console.log(response)
            simulates.value = response.data;
          })
          .catch((err) => {
            console.log(err)
            alert("Error simulando")
          });
    }

    const validate = (flag) => {
      if (flag === "fechaCompra" && (invoice.value.fechaCompra === "")) {
        validateClass.value.fechaCompra = "border border-red-300 bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
      } else if (flag === "fechaCompra") {
        validateClass.value.fechaCompra = "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
      }
      if (flag === "productos" && (invoice.value.productos === "" || invoice.value.productos.length > 0)) {
        validateClass.value.productos = "border border-red-300 bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
      } else if (flag === "productos") {
        validateClass.value.productos = "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
      }
    }

    const validateDate = () => {
      let date = new Date(`${invoice.value.fechaCompra} 23:59:59`);
      if (date.getTime() < today.value.getTime()) {
        invoice.value.fechaCompra = today.value.getFullYear() + "-" + month.value + "-" + today.value.getDate();
        alert("El día no puede ser menor a la fecha actual");
        validateClass.value.fechaCompra = "border border-red-300 bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
      } else {
        validateClass.value.fechaCompra = "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
      }
    }

    return {
      invoice,
      save,
      validateClass,
      validate,
      simulates,
      productos,
      validateDate
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