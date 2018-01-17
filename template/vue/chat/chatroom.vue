<style lang="scss" >
*{margin:0;padding:0;}

$h: 35px;

$c1: #eee;
$c2: #ddd;
$c3: #fff;

.ichatroom {
    max-width: 760px;
}

.ilist_box {
    padding: 10px 10px $h 10px;
    overflow: auto;
}

.isay_box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: $h;
    background: $c3;
    border-top: 1px solid $c2;
    display: flex;

    .isay_ipt {
        flex-grow: 10;
        $mgv: 3px;
        text-indent: $mgv;
        height: $h;
        line-height: $h;
        border: none;
        outline: none;
    }
    .isend_btn {
        display: inline-block;
        width: 80px;
        height: $h;
        line-height: $h;
        text-align: center;
        background: #00a3f0;
        color:#fff;
        border-left: 1px solid $c2;
        cursor: pointer;
        
        &:hover {
            opacity: .8;
        }
    }
}

.info {
    position: fixed;
    width: 95%;
    top: 0;
    left: 0;
    padding-top: 10px;
    padding-bottom: 5px;
    padding-left: 10px;
    font-size: 12px;
    background: $c3;
    z-index: 999;

    .change_avatar {
        margin-left: 10px;
        color: blue;
        cursor: pointer;

        img {
            width: 15px;
            vertical-align: top;
            margin-right: 3px;
        }
    }
    .iall_list {
        position: absolute;
        right: 10px;
        cursor: pointer;
    }
}
.iall_list_box {
    position: absolute;
    width: 100%;
    top: 30px;
    left: 0;
    max-height: 600px;
    background: $c3;
    font-size: 12px;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 999;

    ul {
        width: 100%;
        border-top: 1px dotted $c2;
        border-bottom: 1px dotted $c2;
        padding-bottom: 30px;
        overflow: hidden;

        li {
            padding: 2px;
            list-style: none;
            float: left;
            margin-left: 10px;
            cursor: pointer;

            img {
                width: 25px;
            }
        }
    }
}

.ilist {
    margin-top: 25px;

    li {
        list-style: none;
    }

    .ispeak_list {
        display: flex;
        margin: 10px 0;

        .iportrait {
            $w: 25px;
            width: $w;
            height: $w;
            background: $c1;
            border-radius: 3px;
            overflow: hidden;

            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .ispeak_box {
            flex-grow: 2;
            margin-left: 15px;
            font-size: 14px;

            .iname {
                font-size: 12px;
                padding-left: 2px;
                border-left: 3px solid $c1;
            }
            .ispeak {
                position: relative;
                display: inline-block;
                $pdv: 5px;
                padding:$pdv;
                margin-top: $pdv;
                background: $c1;
                border-radius: 5px;
                word-wrap: break-word;
                word-break: normal;
                word-break:break-all;

                &:after {
                    position: absolute;
                    content: "";
                    font-size: 0;
                    height: 0;
                    width: 0;
                    top: 7px;
                    left: -12px;
                    border-width: 7px;
                    border-style: solid;
                    border-color: transparent $c1 transparent transparent;
                }
            }
        }
    }
    .iself {
        .ispeak_box {
            margin-right: 15px;
            margin-left: 0;
            text-align: right;

            .ispeak {

                &:after{
                    left: auto;
                    right: -12px; 
                    border-color: transparent transparent transparent $c1;
                }
            }
        }
    }
    .itip {
        margin: 3px 0;
        font-size: 12px;
        color: $c2;
        text-align: center;
    }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s
}
.fade-enter,
.fade-leave-to {
  opacity: 0
}
</style>


<template>
    <div class="ichatroom">
        <div class="ilist_box" ref="ilist_box">
            <div class="info">
                当前在线人数：{{rooms.length}}
                <span class="change_avatar" @click="changeAvatar"><img :src="avatar"/>换个头像</span>
                <span class="iall_list" @click="showAllListFn" >在线人数列表</span>
            </div>
            <transition name="fade">
            <div class="iall_list_box" v-show="showAllAvatar">
                <ul>
                    <li v-for="(item,index) in avatarArr" @click="changeAvatarFn(index)"><img :src="item" /></li>
                </ul>
            </div>
            </transition>
            <transition name="fade">
            <div class="iall_list_box" v-show="showAllListStatus">
                <ul>
                    <li v-for="item in rooms">{{item.username}}</li>
                </ul>
            </div>
            </transition>
            <ul class="ilist" ref="ilist">
                <li v-for="item in records" :class="{'iself': item.username == username}">
                    <transition name="fade">
                        <div v-if="item.type == 'join' && item.username != username" class="itip">
                            {{item.username}} 进入了房间
                        </div>
                        <div v-else-if="item.type == 'leave' && item.username != username" class="itip">
                            {{item.username}} 离开了房间
                        </div>
                        <div class="ispeak_list" v-else-if="!item.type && item.username == username && item.ip == ip">
                            <div class="ispeak_box">
                                <div class="ispeak">{{item.value}}</div>
                            </div>
                            <div class="iportrait"><img :src="avatar"/></div>
                        </div>
                        <div v-else-if="item.value" class="ispeak_list">
                            <div class="iportrait"><img :src="avatarArr[item.avatar]"/></div>
                            <div class="ispeak_box">
                                <p class="iname">{{item.username}}</p>
                                <div class="ispeak">{{item.value}}</div>
                            </div>
                        </div>
                    </transition>
                </li>
            </ul>
        </div>
        <div class="isay_box">
            <input class="isay_ipt" placeholder="to say something..." @keyup.enter="say" type="text" v-model="value" />
            <a class="isend_btn" @click="say">发送</a>
        </div>
    </div>
</template>


<script>

import axios from "axios"
import io from "socket.io-client"
import { ua } from "js/xythree"


if (!ua().mobile && top == window) {
    location.href = "/chatroom"
}

const socket = io()

export default {
    data() {
        return {
            showAllAvatar: false,
            avatarArr: [],
            avatar: "",
            avatarNum: localStorage.avatar || "",
            showAllListStatus: false,
            rooms: [],
            isLogin: false,
            wh: 0,
            h: 0,
            value: "",
            records: [],
            username: localStorage.chatname || "",
            ip: info.ip
        }
    },
    methods: {
        changeAvatarFn(ind) {
            localStorage.avatar = this.avatarNum = ind
            this.avatar = this.avatarArr[ind]
            this.changeAvatar()
        },
        changeAvatar() {
            this.showAllAvatar = !this.showAllAvatar
        },
        showAllListFn() {
            this.showAllListStatus = !this.showAllListStatus
        },
        say() {
            if (this.username) {
                if (!this.value) return
                socket.emit("message", {
                    username: this.username,
                    value: this.value,
                    avatar: this.avatarNum
                })
                this.value = ""
            } else {
                this.getUsername()
            }
        },
        init() {
            let refs = this.$refs

            this.wh = window.innerHeight
            this.h = this.wh - 80

            refs.ilist_box.style.height = this.h + "px"

            this.getUsername()
        },
        getUsername() {
            if (this.username) {
                socket.emit("join", this.username)
            } else {
                let chatname = window.prompt("请先输入昵称")

                if (chatname) {
                    localStorage.chatname = this.username = chatname
                    socket.emit("join", this.username)
                } else if (typeof chatname == "string" && !chatname.trim()) {
                    this.getUsername()
                }
            }
        },
        getAvatar() {

            return axios.get("/json/avatar.json").then(data => {
                this.avatarArr = data.data.headerImg

                if (this.avatarNum == "") {
                    this.avatarNum = localStorage.avatar = Math.round(Math.random() * this.avatarArr.length)
                }

                this.avatar = this.avatarArr[this.avatarNum]
            })

        }
    },
    filters: {
        formatTime(time) {
            let d = new Date(time)

            return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
        }
    },
    mounted() {

        this.getAvatar().then(() => {

            this.init()

            socket.on("join", (data, rooms) => {
                this.records = data
                this.rooms = rooms
            })

            socket.on("leave", (data, rooms) => {
                this.records = data
                this.rooms = rooms
            })

            socket.on("message", data => {
                this.records = this.records.concat([data])

                this.$nextTick(() => {
                    let refs = this.$refs
                    refs.ilist_box.scrollTop = refs.ilist.offsetHeight
                })
            })

        })

    }
}
</script>
