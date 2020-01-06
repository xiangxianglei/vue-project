import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import Vant,{Lazyload} from 'vant';
import 'vant/lib/index.css';
import './assets/Adaptive';
import {post,get,patch,put} from './http/http'
//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$get=get;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;

// options 为可选参数，无则不传
Vue.use(Lazyload);
Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
