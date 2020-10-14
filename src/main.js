import Vue from 'vue'
import App from './App.vue'
//import Home from './Home.vue'
//import CustomerView from './CustomerView.vue'
import router from './router'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
