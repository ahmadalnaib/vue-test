import { createRouter, createWebHistory } from 'vue-router'
import ReportingView from '@/views/ReportingView.vue';
import HomeView from '@/views/HomeView.vue';





const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'home',
      component: HomeView
     
    },

    {
      path: '/reporting-view',
      name: 'reportingView',
      component: ReportingView
    },



    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
   
  ]
})

export default router
