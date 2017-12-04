import Vue from "vue"

import axios from "axios"

import home from "@vue/home/homeBox.vue"

Vue.prototype.$axios = axios

let vm = new Vue({
    el: "#app",
    render: h => h(home)
})