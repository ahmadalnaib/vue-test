<template>
  <div class="container mx-auto p-4">
    <h1 class="text-center  text-2xl font-bold mb-20">Reporting View</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- First Column: Filter Options -->
      <div class="bg-white p-4 shadow rounded ">
        <FilterOptions :stores="stores" :products="products" @filter="fetchFilteredData" />
      </div>

      <!-- Second Column: DataView with Scroll -->
      <div class="bg-white p-4 shadow rounded overflow-y-auto h-96">
        <DataView :data="filteredData" />
      </div>

      <!-- Third Column: Chart -->
      <div class="bg-white p-4  rounded">
        <div class="chart-parent">
          <canvas ref="chartCanvas"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Chart from 'chart.js/auto';
import FilterOptions from '@/components/FilterOptions.vue';
import DataView from '@/components/DataView.vue';
import api from '@/api';

export default {
  components: {
    FilterOptions,
    DataView,
  },
  data() {
    return {
      stores: [],
      products: [],
      deliveries: [],
      recommendations: [],
      sales: [],
      selectedStore: null,
      selectedProduct: null,
      filteredData: [],
      loading: true,
    }
  },
  methods: {
    fetchFilteredData(store, product) {
  this.selectedStore = store;
  this.selectedProduct = product;

  const filteredDeliveries = this.deliveries.filter(delivery => 
        (!this.selectedStore || delivery.id_store === this.selectedStore) &&
        (!this.selectedProduct || delivery.id_product === this.selectedProduct)
      );

this.filteredData = filteredDeliveries.map(delivery => {
  const matchingRecommendation = this.recommendations.find(recommendation => 
    recommendation.target_date === delivery.target_date &&
    recommendation.id_store === delivery.id_store &&
    recommendation.id_product === delivery.id_product 
  );


  const matchingSales = this.sales.find(sale => 
    sale.target_date === delivery.target_date &&
    sale.id_store === delivery.id_store &&
    sale.id_product === delivery.id_product
  );



  return {
      ...delivery,
      recommendation: matchingRecommendation ? matchingRecommendation.recommendation : null,
      sales_qty: matchingSales ? matchingSales.sales_qty : null,
      recommendation_value_by_price: matchingRecommendation ? matchingRecommendation.recommendation_value_by_price : null, 
    };
  });

      this.updateChart();
    },
    updateChart() {
      const ctx = this.$refs.chartCanvas.getContext('2d');
      if (this.chart) {
        this.chart.destroy(); 
      }
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Delivery Quantity', 'Recommendation', 'Sales Quantity'],
          datasets: [{
            label: 'Data',
            data: [
              this.filteredData.reduce((sum, item) => sum + item.delivery_qty, 0),
              this.filteredData.reduce((sum, item) => sum + item.recommendation, 0),
              this.filteredData.reduce((sum, item) => sum + item.sales_qty, 0)
            ],
            backgroundColor: [
              'rgba(220, 192, 192, 0.2)',
              'rgba(22, 159, 64, 0.2)',
              'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
              'rgba(239, 192, 192, 1)',
              'rgba(22, 159, 64, 1)',
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
    
      maintainAspectRatio: false,
         
          
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  },
  created() {
    api.get('/stores').then(response => this.stores = response.data);
    api.get('/products').then(response => this.products = response.data);
    api.get('/deliveries').then(response => this.deliveries = response.data);
    api.get('/recommendations').then(response => this.recommendations = response.data);
    api.get('/sales').then(response => this.sales = response.data);
  }
}
</script>

<style scoped>

.chart-parent{
   position: relative;
   width: 90vw;
   height: 50vh;
   max-width: 1420px;
}
</style>
