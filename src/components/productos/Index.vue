<template>
  <div class="container mx-auto px-6">
      <router-link to="/medicinas/crear" class="py-3 px-2 bg-blue-400 text-white font-bold rounded"><font-awesome-icon icon="plus-circle" />
        Crear nuevo producto</router-link>
    <table class="w-full my-5">
        <thead class="bg-red-100 px-4">
          <tr>
              <th class="py-3">Nombre</th>
              <th class="py-3">Precio</th>
              <th class="py-3">Ubicación</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="data in medicamentos" v-bind:key="data.id">
            <td class="py-4">{{ data.nombre }}</td>
            <td class="py-4">{{ data.precio }}</td>
            <td class="py-4">{{ data.ubicacion }}</td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
import {ref, onMounted} from 'vue'
import axios from 'axios'

export default {
  setup() {
    let medicamentos = ref([])
    onMounted(() => {
      getMedicines();
    })

    const getMedicines = () => {
      axios.get(`${process.env.VUE_APP_HOST}/v1/medicamento`)
          .then(response => {
            medicamentos.value = response.data;
          })
          .catch((err) => {
            console.log(err)
          });
    }

    return {
      medicamentos,
    }
  },
}
</script>

<style>
tr > td {
  border-bottom: 1px solid black;
}
table tr {
  text-align: center;
}
</style>