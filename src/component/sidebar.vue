<style lang="scss">
$w: 250px;
.iarticle_box {
    padding-bottom: 50px;
}
.sidebar {    
    
    .sidebar_box {
        position: fixed;
        left: 0;
        width: $w;
        height: 100%;
        background: #333;
        border-right: 2px solid #666;
        z-index: 10;
        transition: left .5s;
    }

    .content {
        $v: 20px;
        position: relative;
        padding: $v;
        left: $w+2px;
        top: 93px;
        width: 960px;

        .listBox {
            min-height: 700px;
        }
        .icopy {
            font-size: 12px;
            text-align: center;
        }
    }
}
$c: #fff;
.head {
    $h: 100px;
    height: $h;
    width: $h;
    margin: 30px auto;
    border-radius: 50%;
    overflow: hidden;
    img {
        display: block;
        width: 100%;
        opacity: .85;
        border-radius: 50%;
    }
}
.nav {
    margin: 20px;
    $h: 35px;
    li {
        height: $h;
        line-height: $h;
        text-align: right;
        a {
            display: block;
            font-size: 14px;
            span {
                $v: 10px;
                display: inline-block;
                vertical-align: middle;
                width: $v;
                height: $v;
                background: #eee;
                border-radius: 50%;
                margin-right: $v/2;
                opacity: 0;
                transition: all .5s ease-out;
            }
            i {
                margin-right: 5px;
            }
            &:hover {
                span {
                    opacity: 1;
                }
            }
        }
    }
}
a {
    color: $c;
}

.long_white {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%,-10%);
    width: 219px;
    height: 300px;
    background: url(/images/long_white.png) no-repeat center;
    opacity: .05;
    z-index: -1;
}
@media screen and (max-width: 768px) {
    .sidebar{
        .sidebar_box {
            left: -($w+2px);

            &.showMenu {
                left: 0;
            }
        }
        .content {
            left: 0;
            width: auto;
            transition: left .5s;
        }
        .showMenu {
            left: $w;
        }
    }
}
</style>

<template>
  
    <div class="sidebar">

        <div class="sidebar_box" :class="{'showMenu': showMenu}">
         
            <div class="head">
                <img src="/images/qq.jpg" />
            </div>
            <ul class="nav">
                <li>
                    <router-link :to="home">
                        <span></span>
                        <i class="fa fa-home"></i>首页</router-link>
                </li>
                <li>
                    <a href="/music">
                        <span></span>
                        <i class="fa fa-music"></i>音乐</a>
                </li>
                <li>
                    <a href="/poetry" target="_blank">
                        <span></span>
                        <i class="fa fa-heart"></i>诗·词·曲</a>
                </li>
                <li>
                    <a href="/component/">
                        <span></span>
                        <i class="fa fa-navicon"></i>vue2.0组件</a>
                </li>
                <li>
                    <a href="/word" target="_blank">
                        <span></span>
                        <i class="fa fa-file-word-o"></i>单词</a>
                </li>
                <li>
                    <a href="/tools">
                        <span></span>
                        <i class="fa fa-wrench"></i>工具</a>
                </li>
                <!--
                <li>
                    <a href="javascript:;">
                        <span></span>
                        <i class="fa fa-tags"></i>标签</a>
                </li>
                <li>
                    <a href="javascript:;">
                        <span></span>
                        <i class="fa fa-user"></i>关于</a>
                </li>
                -->
            </ul>
            <div class="long_white"></div>
        </div>

        <menuSearch :class="{'showMenu': showMenu}" :showMenuCallBack="showMenuCallBack" />

        <div class="content" :class="{'showMenu': showMenu}" >
            
            <div class="listBox">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </div>
            
            <div class="icopy">
                <p>Copyright © 2017-2020 All Rights Reserved!</p>
                <p>Powered by koa2 & xythree</p>
            </div>
        </div>
        <repload />
        <backtop />
    </div>
    
</template>

<script>

import menuSearch from "@vue/component/menuSearch.vue"
import repload from "vue_component/repload/repload.vue"
import backtop from "template/vue/backTop.vue"

export default {
    data() {
        return {
            home: "/",
            showMenu: false,
            disready: true,
            skip: 0,
            index: 0,
            list: [],
            total: 3
        }
    },
    filters: {
        routerId(value) {
            return "/article?id=" + value
        }
    },
    components: {
        menuSearch,
        repload,
        backtop
    },
    methods: {
        showMenuCallBack() {
            this.showMenu = !this.showMenu
        }
    },
    mounted() {
        
    }
}
</script>

