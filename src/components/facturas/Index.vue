<template>
  <div class="container mx-auto px-6">
    <router-link to="/facturas/crear" class="py-3 px-2 bg-indigo-300 text-white font-bold rounded">
      <font-awesome-icon icon="plus-circle"/>
      Nueva factura
    </router-link>
    <table class="w-full my-5">
      <thead class="bg-gray-300 px-4">
      <tr>
        <th class="py-3">Detalle</th>
        <th class="py-3">Porcentaje</th>
        <th class="py-3">Fecha</th>
        <th class="py-3">Total</th>
        <th class="py-3">Productos comprados</th>
      </tr>
      </thead>
      <tbody class="text-center">
      <tr v-for="item in invoices" v-bind:key="item.id">
        <td class="py-4">{{ item.promocion.descripcion }}</td>
        <td class="py-4">{{ item.promocion.porcentaje }}</td>
        <td class="py-4">{{ item.fecha_crear }}</td>
        <td class="py-4">{{ item.pago_total.toFixed(2) }}</td>
        <td class="py-4">
          <div>
            <multiselect
                v-model="value"
                placeholder="Medicamentos"
                label='medicamentos' track-by="id"
                :options="item.items"
                :multiple="false"
                :taggable="false"
            ></multiselect>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {ref, onMounted} from 'vue'
import axios from 'axios'
import Multiselect from "@vueform/multiselect";

export default {
  setup() {
    let invoices = ref([])
    onMounted(() => {
      getInvoices();
    })

    const getInvoices = () => {
      axios.get(`${process.env.VUE_APP_HOST}/v1/factura`)
          .then(response => {
            invoices.value = response.data;
          })
          .catch((err) => {
            console.log(err)
          });
    }

    return {
      invoices
    }
  },
  components: {
    Multiselect,
  }
}
</script>

<style>
tr > td {
  border-bottom: 1px solid black;
}
</style>