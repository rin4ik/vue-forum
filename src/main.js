// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import AppDate from '@/components/AppDate'
import store from '@/store/index'
import firebase from 'firebase'
Vue.config.productionTip = false
Vue.component('AppDate', AppDate)
/* eslint-disable no-new */

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDdvDilPc5DXx10pPBOF4_vykMHFjoL-Nk',
  authDomain: 'vue-schoolforum.firebaseapp.com',
  databaseURL: 'https://vue-schoolforum.firebaseio.com',
  projectId: 'vue-schoolforum',
  storageBucket: '',
  messagingSenderId: '85756752568'
}
firebase.initializeApp(config)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  beforeCreate () {
    store.dispatch('fetchUser', {id: store.state.authId})
  }
})
