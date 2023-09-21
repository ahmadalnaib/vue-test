
import { defineStore } from 'pinia';

export const useFilterOptionsStore = defineStore('filterOptions', {
  state: () => ({
    selectedStore: "Please select a store",
    selectedProduct: "Please select a product"
  }),
  getters: {
    getSelectedStore() {
      return this.selectedStore;
    },
    getSelectedProduct() {
      return this.selectedProduct;
    }
  },
  actions: {
    setSelectedStore(store) {
      this.selectedStore = store;
    },
    setSelectedProduct(product) {
      this.selectedProduct = product;
    }
  }
});
