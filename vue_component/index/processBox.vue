<style lang="scss">
.demo {
    width: 55%;
}
</style>


<template>
    <div class="demo" >
        <br /> <br /><br /><br />
        <process_box :value="value" :drag="drag" :processCallBack="processCallBack" ></process_box>
        <br />
        <p>
            <button @click="reduce">&nbsp;减0.1&nbsp;</button> 进度:{{this.v}} <button @click="add">&nbsp;加0.1&nbsp;</button>
        </p>
    </div>
</template>


<script>

import process_box from "./../process_box/process_box.vue"

export default {
    data(){
        return {
            v: 0,
            value: 0.1,
            drag: true
        }
    },
    components: {
        process_box
    },
    methods: {
        processCallBack(n) {
            this.v = n
            this.value = n
        },
        reduce() {
            this.value -= 0.1
        },
        add() {
            this.value += 0.1
        }
    },
    mounted() {

    }
}

</script>
