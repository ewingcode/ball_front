// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from "./tools/router.js"
import store from "./tools/store.js"
import axios from "./tools/axios.js"
import md5 from 'js-md5'
FastClick.attach(document.body);

Vue.prototype.axios = axios;
Vue.prototype.md5 = md5;
Vue.config.productionTip = false
String.prototype.padLeft = function (len, charStr) {
  var s = this + '';
  return new Array(len - s.length + 1).join(charStr) + s;
}
/* eslint-disable no-new

new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
*/
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (store.state.uid) {  // 通过vuex state获取当前的token是否存在
      next();
    }

    else {
      next({
        name: 'login'
      })
    }
  }
  else {
    next();
  }
});



Vue.prototype.instance = new Vue({
  el: "#app-box",
  router: router,
  store: store,
  template: "<App/>",
  components: { App }
});

