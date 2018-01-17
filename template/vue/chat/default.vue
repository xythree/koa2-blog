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


var sbox = document.createElement('input');

sbox.setAttribute('id', 'el')
sbox.setAttribute('value', 123)
document.body.appendChild(sbox) 

var el = document.getElementById('el')

// check is iOS or not 
if(navigator.userAgent.match(/ipad|iphone/i)) { 
    var editable = el.contentEditable
    var readOnly = el.readOnly

    el.contentEditable = true
    el.readOnly = false

    var range = document.createRange()
    range.selectNodeContents(el)

    var selection = window.getSelection()
    //selection.removeAllRanges()
    selection.addRange(range)

    el.setSelectionRange(0, 999999)
    el.contentEditable = editable
    el.readOnly = readOnly
    console.log(range)
} else { 
    el.select()
} 

//console.log(window.getSelection().toString()); 
document.execCommand('Copy', false, null)

export default {
    data() {
        return {
            src: "/chatroom/html"
        }
    },
    created() {
        if (ua().mobile) {
            //location.href = this.src
        }
    }
}

</script>

