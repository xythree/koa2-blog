<style lang="scss">
*{margin:0;padding:0;}
.chatroom {
    max-width: 760px;
    height: 600px;    
    width: 100%;
    margin: 30px auto;
    border: 1px solid #ddd;

    iframe {
        display: block;
        width: 100%;
        height: 100%;
    }
}
</style>


<template>

    <div class="chatroom" ref="abc"><iframe :src=src frameborder="0" ></iframe></div>

</template>


<script>

import { ua } from "js/xythree"

export default {
    data() {
        return {
            src: "/chatroom/html"
        }
    },
    created() {
        if (ua().mobile) {
            location.href = this.src
        }
    }
}

</script>

