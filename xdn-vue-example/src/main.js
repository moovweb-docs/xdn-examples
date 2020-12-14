import Vue from 'vue'
import App from './App.vue'
import './assets/styles/index.css'
import router from './router'
import install from '@xdn/prefetch/window/install'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

document.addEventListener('DOMContentLoaded', () => {
  install()
})
