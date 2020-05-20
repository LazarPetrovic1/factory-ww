import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import Statistics from '@/components/Statistics'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/statistics',
      name: 'Statistics',
      component: Statistics
    }
  ]
})
