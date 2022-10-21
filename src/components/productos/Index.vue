<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto">
      <div class="py-3 pl-2">
        <div class="relative max-w-xs">
          <form>
            <label for="search" class="sr-only"> Search </label>
            <input
                type="number"
                class="
              block
              w-full
              p-3
              pl-10
              text-sm
              border-gray-200
              rounded-md
              focus:border-blue-500 focus:ring-blue-500
              dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400
            "
                placeholder="Buscar guia..."
                v-model="search"
                @change="getSelectProduct"
            />
          </form>
          <div
              class="
              absolute
              inset-y-0
              left-0
              flex
              items-center
              pl-4
              pointer-events-none
            "
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="p-1.5 w-full inline-block align-middle">
        <div class="overflow-hidden border rounded-lg">
          <table class="w-full my-5 divide-y divide-gray-200 text-xs">
            <thead class="bg-gray-300 px-4">
            <tr>
              <th class="py-3">codigo</th>
              <th class="py-3">destinatario</th>
              <th class="py-3">telefono</th>
              <th class="py-3">direccion</th>
              <th class="py-3">estado</th>
              <th class="py-3">origen</th>
              <th class="py-3">destino</th>
              <th class="py-3">fechaentrega</th>
            </tr>
            </thead>
            <tbody class="text-center">
            <tr class="cursor-pointer" v-for="item in productos" v-bind:key="item.dsconsec"
                @click.stop="rutaDigitalizada(item.rutadigitalizada)">
              <td class="py-4">{{ item.dsconsec }}</td>
              <td class="py-4">{{ item.destinatario }}</td>
              <td class="py-4">{{ item.telefono }}</td>
              <td class="py-4">{{ item.direccion }}</td>
              <td class="py-4">{{ item.estado }}</td>
              <td class="py-4">{{ item.origen }}</td>
              <td class="py-4">{{ item.destino }}</td>
              <td class="py-4">{{ item.dsfechaentrega }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <div v-if="loade" class="loader">
    <img src="https://cdn.dribbble.com/users/1299339/screenshots/11116681/media/79bf1ac602445860e4a44bcd4bf80704.gif"
         alt="">
  </div>
</template>

<script>
import {ref, onMounted, defineComponent} from "vue";
import axios from "axios";
import Seal from "sweetalert2";

export default defineComponent({
  components: {},
  setup() {
    let productos = ref([]);
    let search = ref(Number);
    let loade = ref(false)

    const getMedicines = async (obj) => {
      loade.value = true;
      axios.get(`https://aveonline.co/api/nal/v1.0/estado_guia.php?guia=` + obj)
          .then((res) => {
            if (res.data.type_error === "0") {
              productos.value = res.data.response.guias;
            } else {
              Seal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Lo sentimos algo paso!',
                footer: 'codigo error: ' + res.data.type_error
              })
            }
            loade.value = false;
          })
          .catch((err) => {
            Seal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Lo sentimos algo paso!',
              footer: +'codigo error: ' + err
            })
          });
    };

    const getSelectProduct = async () => {
      console.log('v',search.value)
      if (search.value === "" || search.value == null) {
        await Seal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Falta informacion de guia!',
        })
      }else {
        if (!Number.isInteger(search.value)) {
          await Seal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Numero de guia incorrecto',
          })
        }else {
          await getMedicines(search.value)
        }
      }
    }

    const rutaDigitalizada = async (url) => {
      window.open(url, '_blank')
    }

    onMounted(() => {
      getMedicines();
    });
    return {
      productos,
      getSelectProduct,
      search,
      loade,
      rutaDigitalizada,
    };
  },
});
</script>

<style>
tr > td {
  border-bottom: 1px solid black;
}

table tr {
  text-align: center;
}
</style>
<style>
.loader {
  position: fixed;
  left: 450px;
  top: 300px;
  width: 25%;
  height: 25%;
  z-index: 9999;
  background-color: #ffffffcf;
}

.loader img {
  position: center;
  left: 20%;
  top: 20%;
}
</style>
