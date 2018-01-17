import Vue from "vue"
import app from "template/vue/chat/default.vue"

let vm = new Vue({
    el: "#app",
    render: h => h(app)
})