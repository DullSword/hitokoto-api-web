// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Image, Row, Col, Checkbox, Select, Option, Input, InputNumber, Button, Link } from 'element-ui'
import App from './App'
import router from './router'
import axios from 'axios'
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(Image)
  .use(Row)
  .use(Col)
  .use(Checkbox)
  .use(Select)
  .use(Option)
  .use(Input)
  .use(InputNumber)
  .use(Button)
  .use(Link)
  .use(VueClipboard)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
