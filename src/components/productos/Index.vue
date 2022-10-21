<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto">
      <div class="py-3 pl-2">
        <div class="relative max-w-xs">
          <label for="search" class="sr-only"> Search </label>
          <input
            type="text"
            name="search"
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
            placeholder="Search..."
          />
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
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="py-3 pl-4">
                  <div class="flex items-center h-5">
                    <input
                      id="checkbox-all"
                      type="checkbox"
                      class="
                        text-blue-600
                        border-gray-200
                        rounded
                        focus:ring-blue-500
                      "
                    />
                    <label for="checkbox" class="sr-only"> Checkbox </label>
                  </div>
                </th>
                <th
                  scope="col"
                  class="
                    flex
                    items-center
                    px-6
                    py-3
                    text-xs
                    font-bold
                    text-left text-gray-500
                    uppercase
                  "
                >
                  ID
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17 13l-5 5m0 0l-5-5m5 5V6"
                    />
                  </svg>
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-xs
                    font-bold
                    text-left text-gray-500
                    uppercase
                  "
                >
                  <span class="inline-flex items-center">
                    Name
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M7 11l5-5m0 0l5 5m-5-5v12"
                      />
                    </svg>
                  </span>
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-xs
                    font-bold
                    text-left text-gray-500
                    uppercase
                  "
                >
                  <span class="inline-flex items-center">
                    Email
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17 13l-5 5m0 0l-5-5m5 5V6"
                      />
                    </svg>
                  </span>
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-xs
                    font-bold
                    text-right text-gray-500
                    uppercase
                  "
                >
                  Edit
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-xs
                    font-bold
                    text-right text-gray-500
                    uppercase
                  "
                >
                  Delete
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr>
                <td class="py-3 pl-4">
                  <div class="flex items-center h-5">
                    <input
                      type="checkbox"
                      class="
                        text-blue-600
                        border-gray-200
                        rounded
                        focus:ring-blue-500
                      "
                    />
                    <label for="checkbox" class="sr-only"> Checkbox </label>
                  </div>
                </td>
                <td
                  class="
                    px-6
                    py-4
                    text-sm
                    font-medium
                    text-gray-800
                    whitespace-nowrap
                  "
                >
                  1
                </td>
                <td class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  Jone Doe
                </td>
                <td class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  jonne62@gmail.com
                </td>
                <td
                  class="
                    px-6
                    py-4
                    text-sm
                    font-medium
                    text-right
                    whitespace-nowrap
                  "
                >
                  <a class="text-green-500 hover:text-green-700" href="#">
                    Edit
                  </a>
                </td>
                <td
                  class="
                    px-6
                    py-4
                    text-sm
                    font-medium
                    text-right
                    whitespace-nowrap
                  "
                >
                  <a class="text-red-500 hover:text-red-700" href="#">
                    Delete
                  </a>
                </td>
              </tr>
              <tr>
                <td class="py-3 pl-4">
                  <div class="flex items-center h-5">
                    <input
                      type="checkbox"
                      class="
                        text-blue-600
                        border-gray-200
                        rounded
                        focus:ring-blue-500
                      "
                    />
                    <label for="checkbox" class="sr-only"> Checkbox </label>
                  </div>
                </td>
                <td
                  class="
                    px-6
                    py-4
                    text-sm
                    font-medium
                    text-gray-800
                    whitespace-nowrap
                  "
                >
                  1
                </td>
                <td class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  Jone Doe
                </td>
                <td class="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  jonne62@gmail.com
                </td>
                <td
                  class="
                    px-6
                    py-4
                    text-sm
                    font-medium
                    text-right
                    whitespace-nowrap
                  "
                >
                  <a class="text-green-500 hover:text-green-700" href="#">
                    Edit
                  </a>
                </td>
                <td
                  class="
                    px-6
                    py-4
                    text-sm
                    font-medium
                    text-right
                    whitespace-nowrap
                  "
                >
                  <a class="text-red-500 hover:text-red-700" href="#">
                    Delete
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    let productos = ref([]);
    onMounted(() => {
      getMedicines();
    });

    const getMedicines = () => {
      axios
        .get(
          `https://aveonline.co/api/nal/v1.0/estado_guia.php?guia=764100140016`
        )
        .then((res) => {
          productos.value = res.data.response.guias;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return {
      productos,
    };
  },
};
</script>

<style>
tr > td {
  border-bottom: 1px solid black;
}
table tr {
  text-align: center;
}
</style>