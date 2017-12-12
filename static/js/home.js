import Vue from "vue"

import VueRouter from "vue-router"

import axios from "axios"

import home from "@vue/home/homeBox.vue"

import articleList from "template/vue/articleList.vue"
import articleBox from "template/vue/articleBox.vue"

Vue.prototype.$axios = axios

Vue.use(VueRouter)

let routes = [{
    path: "/",
    component: articleList
}, {
    path: "/article",
    component: articleBox
}]

let router = new VueRouter({
    routes
})

let vm = new Vue({
    el: "#app",
    router,
    render: h => h(home)
})