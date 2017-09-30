import Vue from "vue"
import VueRouter from "vue-router"

import iview from "iview"

import axios from "axios"

import "iview/dist/styles/iview.css"


import app from "@vue/usercenter/index.vue"

Vue.prototype.$axios = axios

Vue.use(iview)

Vue.use(VueRouter)


let routes = [{
    path: "/word",
    component: r => {
        require.ensure([], () => {
            return r(require("@vue/usercenter/recite.vue"))
        }, "usercenter_recite")
    }
}, {
    path: "/music",
    component: r => {
        require.ensure([], () => {
            return r(require("@vue/usercenter/music.vue"))
        }, "usercenter_music")
    }
}]


let router = new VueRouter({
    routes
})


let vm = new Vue({
    el: "#usercenter",
    router,
    render: h => h(app)
})