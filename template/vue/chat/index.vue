<style lang="scss" >
*{margin:0;padding:0;}

$c1: #eee;
$c2: #ddd;
$c3: #fff;
$c4: #efefef;

.ichat {
    .ichat_box {
        float: left;
        margin-top: 50px;
        margin-left: 250px;
        width: 600px;
        height: 700px;
        iframe {
            border: 1px solid $c2;
        }
    }
}

.ichatroom_list_box {
    position: fixed;
    left: 0;
    top: 0;
    width: 200px;
    height: 100%;
    background: $c1;
    overflow-y: auto;
    overflow-x: hidden;

    .ichatroom_list {
        width: 200px;

        $h: 35px;
        li {
            list-style: none;
            margin-top: 5px;
            height: $h;
            line-height: $h;
            text-align: center;
            border-top: 1px dotted $c2;
            border-bottom: 1px dotted $c2;
            cursor: pointer;
            transition: all .5s;

            &:hover {
                background: $c2;
            }
        }
        .createRoom {
            background: $c4;
        }
    }
}

</style>


<template>
    <div class="ichat">
        <div class="ichatroom_list_box">
            <h5>房间列表：</h5>
            <ul class="ichatroom_list">
                <li class="createRoom" @click="joinRoom('')">+创建临时房间</li>
                <li v-for="(value, key, index) in roomlist" @click="joinRoom(key)">{{key}}</li>
            </ul>
        </div>
        <ul style="margin-left: 200px;">
            <li v-for="item in avatar">
                <img :src="item" />
            </li>
        </ul>
        <div class="ichat_box">
            <iframe v-show="src" :src="src" width="100%" height="100%" frameborder="0"></iframe>
        </div>
    
    </div>
</template>


<script>

import axios from "axios"
import drag_box from "vue_component/drag_box/drag_box.vue"

import io from "socket.io-client"

const socket = io()

export default {
    data() {
        return {
            src: "",
            dragBoxShow: false,
            isLogin: false,
            roomlist: {},
            avatar: []
        }
    },
    components: {
        
    },
    methods: {
        getRoomId() {
            let id = Math.random().toFixed(6).substr(2).toString(16)

            if (this.roomlist[id]) {
                return this.getRoomId()
            }
            return id
        },
        dragCallBack() {
            this.dragBoxShow = false
        },
        joinRoom(id) {
            let _id = id || this.getRoomId()

            //window.open("/chatroom/" + _id)
            this.src = "/chatroom/" + _id
        },
        init() {
            axios.get("/chat/roomlist").then(data => {
                this.roomlist = data.data
            })
        }
    },
    created() {

    },
    mounted() {

        this.init()

        socket.on("rooms", data => {
            this.roomlist = data
        })

        /*
        axios.get("/json/avatar.json").then(data => {
            this.avatar = data.data.headerImg
        })
        */
        

    }
}
</script>
