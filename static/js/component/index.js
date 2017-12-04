import Vue from "vue"
import VueRouter from "vue-router"

import app from "../../../vue_component/app_component.vue"

Vue.use(VueRouter)


//import pagination from "../../../vue_component/index/pagination.vue"
//import selectBox from "../../../vue_component/index/selectBox.vue"
//import selectList from "../../../vue_component/index/selectList.vue"
//import waveButton from "../../../vue_component/index/waveButton.vue"
//import calendar from "../../../vue_component/index/calendar.vue"
//import calendarSelect from "../../../vue_component/index/calendarSelect.vue"
//import alertBox from "../../../vue_component/index/alert.vue"
//import city from "../../../vue_component/index/city.vue"
//import scrollBox from "../../../vue_component/index/scrollBox.vue"
//import processBox from "../../../vue_component/index/processBox.vue"
//import tree from "../../../vue_component/index/tree.vue"
//import dragBox from "../../../vue_component/index/dragBox.vue"
//import dragLayout from "../../../vue_component/index/dragLayout.vue"


let routes = [{
    path: "/",
    component: {
        template: "<div>随手写的一些Vue2.0组件例子。</div>"
    }
}, {
    path: "/pagination",
    components: {
        default: r => require(["../../../vue_component/index/pagination.vue"], r)
    }
}, {
    path: "/selectBox",
    component: r => require(["../../../vue_component/index/selectBox.vue"], r)
}, {
    path: "/selectList",
    component: r => require(["../../../vue_component/index/selectList.vue"], r)
}, {
    path: "/calendar",
    component: r => require(["../../../vue_component/index/calendar.vue"], r)
}, {
    path: "/calendarSelect",
    component: r => require(["../../../vue_component/index/calendarSelect.vue"], r)
}, {
    path: "/waveButton",
    component: r => require(["../../../vue_component/index/waveButton.vue"], r)
}, {
    path: "/alert",
    component: r => require(["../../../vue_component/index/alert.vue"], r)
}, {
    path: "/city",
    component: r => require(["../../../vue_component/index/city.vue"], r)
}, {
    path: "/scrollBox",
    component: r => require(["../../../vue_component/index/scrollBox.vue"], r)
}, {
    path: "/processBox",
    component: r => require(["../../../vue_component/index/processBox.vue"], r)
}, {
    path: "/tree",
    component: r => require(["../../../vue_component/index/tree.vue"], r)
}, {
    path: "/drag",
    component: r => require(["../../../vue_component/index/dragBox.vue"], r)
}, {
    path: "/dragLayout",
    component: r => require(["../../../vue_component/index/dragLayout.vue"], r)
}]


let router = new VueRouter({
    routes
})


router.beforeEach((to, from, next) => {
    setTimeout(() => {
        document.querySelectorAll("pre code").forEach(function(t) {
            var texts = t.textContent.replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
                .replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/"/g, '&quot;')
            var temp = texts.split(/\n/)
            var code = ""

            temp.forEach(function(_t) {
                code += "<li>" + _t + "</li>"
            })
            t.innerHTML = "<ol>" + code + "</ol>"
            hljs.highlightBlock(t)
        })
    }, 100)
    next()
})





let vm = new Vue({
    el: "#component",
    router,
    /*
    components: {
        app
    }
    */
    render: h => h(app)
})