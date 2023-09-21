<template>
  <div class="container mx-auto ">
    <div class="flex  sticky -top-7  z-40 bg-white  p-4">
      <button @click="showAllData" class="p-2 mr-2 bg-neutral-200 text-black rounded">Show All</button>
      <button @click="filterByRecommendation(true)" class="mr-2 p-2 bg-green-100 text-green-600 rounded">Recommendation </button>
      <button @click="filterByRecommendation(false)" class=" mr-2 p-2 bg-red-100 text-red-600 rounded">Not Recommendation</button>
      <input v-model="selectedWeek" type="week" class=" mr-2 p-2 border border-gray-300 rounded" />
      <button @click="filterByWeek" class=" mr-2 p-2 bg-neutral-200 text-dark rounded">Filter by Week</button>
    </div>
    <transition-group name="fade" mode="out-in" v-if="filteredData.length > 0">
      <div v-for="item in filteredData" :key="item.id_product" class="mb-4">

        <div class="p-4 border border-gray-300 rounded shadow-lg" :class="itemClass(item)">
          <!-- Recommendation Icon -->
          <div class="flex items-center justify-center mb-10">
            <i v-if="item.recommendation >= item.delivery_qty" class="fas fa-check-circle fa-2xl text-green-700 text-2xl"></i>
            <i v-else class="fas fa-times-circle text-red-700 text-2xl"></i>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <!-- Delivery Quantity -->
            <div class="flex items-center">
              <i class="fas fa-truck text-slate-500"></i>
              <span class="ml-2 text-gray-700 font-semibold">Delivery Quantity:</span>
              <span class="ml-2 text-slate-500 font-medium">{{ item.delivery_qty }}</span>
            </div>

            <!-- Recommendation Text -->
            <div class="flex items-center">
              <i class="fas fa-truck text-slate-500"></i>
              <span class="ml-2 text-gray-700 font-semibold">Delivery Recommendation:</span>
              <span class="ml-2" :class="recommendationClass(item)">{{ item.recommendation !== null ? item.recommendation : 0 }}</span>
            </div>

            <!-- Sales Quantity -->
            <div class="flex items-center">
              <i class="fas fa-shopping-cart text-slate-500"></i>
              <span class="ml-2 text-gray-700 font-semibold">Sales Quantity:</span>
              <span class="ml-2 text-slate-500 font-medium">{{ item.sales_qty }}</span>
            </div>

            <!-- Price Recommendation -->
            <div class="flex items-center">
              <i class="fas fa-euro-sign text-slate-500"></i>
              <span class="ml-2 text-gray-700 font-semibold">Price Recommendation :</span>
              <span class="ml-2 text-slate-500 font-medium">{{ item.recommendation_value_by_price !== null ? item.recommendation_value_by_price : 'N/A' }}</span>
            </div>
          </div>
        </div>
      </div>
    </transition-group>
    <div v-else class="text-center mt-4 text-red-700">
    No data available 😕.
  </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {
      filteredData: this.data,
      selectedWeek: null,
    };
  },
  methods: {
    itemClass(item) {
      return {
        'bg-green-100': item.recommendation >= item.delivery_qty,
        'bg-red-100': item.recommendation < item.delivery_qty
      };
    },
    recommendationClass(item) {
      return {
        'text-green-700': item.recommendation >= item.delivery_qty,
        'text-red-700': item.recommendation < item.delivery_qty
      };
    },
    filterByRecommendation(isRecommendation) {
      this.filteredData = this.data.filter(item => {
        return isRecommendation ? item.recommendation >= item.delivery_qty : item.recommendation < item.delivery_qty;
      });
    },
    showAllData() {
      this.filteredData = this.data;
    },
    // filterByDate() {
    //   if (this.selectedDate) {
    //     this.filteredData = this.data.filter(item => item.target_date === this.selectedDate);
    //   } else {
    //     this.filteredData = this.data; 
    //   }
    // },
    filterByWeek() {
      if (this.selectedWeek) {
        
        const [year, week] = this.selectedWeek.split('-W');
        const startDate = new Date(year, 0, (week - 1) * 7 + 1);
        const endDate = new Date(year, 0, week * 7);

        this.filteredData = this.data.filter(item => {
          const targetDate = new Date(item.target_date);
          return targetDate >= startDate && targetDate <= endDate;
        });
      } else {
        this.filteredData = this.data;
      }
    },
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
