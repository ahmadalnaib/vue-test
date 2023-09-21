<template>
  <div class="p-4 container mx-auto">
    <label class="block mb-2" for="storeSelect">Select Store:</label>
    <select v-model="selectedStore" id="storeSelect" class="w-full p-2 border border-gray-300 rounded">
      <option disabled value="Please select a store">Please select a store</option>
      <option v-for="store in stores" :value="store.id_store" :key="store.id_store">{{ store.store_label }}</option>
    </select>

    <label class="block mt-4 mb-2" for="productSelect">Select Product:</label>
    <select v-model="selectedProduct" id="productSelect" class="w-full p-2 border border-gray-300 rounded">
      <option disabled value="Please select a product">Please select a product</option>
      <option v-for="product in products" :value="product.id_product" :key="product.id_product">{{ product.name_product }}</option>
    </select>

    <button @click="filterData" class="mt-4 p-2 bg-black text-white rounded hover:bg-green-700">Filter Data</button>
  </div>
</template>

<script>
import { useFilterOptionsStore } from '@/stores/FilterOptionsStore'; 
import { ref } from 'vue';

export default {
  props: ['stores', 'products'],
  setup(props, { emit }) {
    const filterOptionsStore = useFilterOptionsStore();
    const selectedStore = ref(filterOptionsStore.getSelectedStore);
    const selectedProduct = ref(filterOptionsStore.getSelectedProduct);

    const filterData = () => {
      if (selectedStore.value !== null && selectedProduct.value !== null) {
        emit('filter', selectedStore.value, selectedProduct.value);
      }
    }

    return {
      selectedStore,
      selectedProduct,
      filterData,
     
    }
  }
}
</script>
