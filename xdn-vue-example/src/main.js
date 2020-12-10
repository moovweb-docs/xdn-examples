import Vue from 'vue'
import App from './App.vue'
import './assets/styles/index.css'
import routes from './routes'

Vue.config.productionTip = false

const app = new Vue({
  data() {
    return {
      currentRoute: window.location.pathname,
    }
  },
  computed: {
    ViewComponent() {
      const matchingView = routes[this.currentRoute]
      console.log(this.currentRoute)
      return matchingView ? require(`./pages/${matchingView}.vue`) : require('./pages/404.vue')
    },
  },
  render: h => h(App),
}).$mount('#app')

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
})
