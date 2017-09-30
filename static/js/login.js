import Vue from "vue"

import app from "@vue/login_register/login.vue"


/*
import icon from "iview/src/components/icon"
import form from "iview/src/components/form"
import input from "iview/src/components/input"
import button from "iview/src/components/button"


Vue.component("Form", form)
Vue.component("FormItem", form.Item)
Vue.component("Input", input)
Vue.component("Icon", icon)
Vue.component("Button", button)
*/

import iview from "iview"


import "iview/dist/styles/iview.css"


Vue.use(iview)

let vm = new Vue({
    el: "#login",
    render: h => h(app)
})