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
.iarticle {
    $c: #333;
    background: #fff;
    margin-bottom: 50px;

    li {
        position: relative;
        margin-bottom: 30px;
        word-wrap: break-word;
        word-break: normal;
        i {
            margin-right: 5px;
        }
        a {
            color: $c;
        }
        h5 {
            font-size: 20px;
        }
        border-bottom: 1px dashed #ededed;
        $delayed: .5s;
        &:hover {
            .ibox_ani_1 {
                &:after {
                    animation: box_height_left_ani 4s $delayed ease-out infinite;
                }
                &:before {
                    animation: box_width_bottom_ani 4s $delayed ease-out infinite;
                }
            }
            .ibox_ani_2 {
                &:after {
                    animation: box_height_right_ani 4s $delayed ease-out infinite;
                }
                &:before {
                    animation: box_width_top_ani 4s $delayed ease-out infinite;
                }
            }
        }
        p {
            padding: 10px 0;
            color: #666;
        }
        .iread_more {
            display: inline-block;
            color: #bbb;
            transition: all .5s ease-out;
            &:hover {
                color: $c;
            }
        }
    }
    $b: #999;
    .ibox_ani_1 {
        padding: 10px;
        &:after {
            position: absolute;
            left: 0;
            top: 0;
            content: "";
            height: 0;
            width: 1px;
            background: $b;
        }
        &:before {
            position: absolute;
            content: "";
            left: 0;
            bottom: 0;
            width: 0;
            height: 1px;
            background: $b;
        }
    }
    .ibox_ani_2 {
        &:after {
            position: absolute;
            right: 0;
            bottom: 0;
            content: "";
            height: 0;
            width: 1px;
            background: $b;
        }
        &:before {
            position: absolute;
            content: "";
            right: 0;
            top: 0;
            width: 0;
            height: 1px;
            background: $b;
        }
    }
}

@keyframes box_height_left_ani {
    0% {
        height: 100%;
        opacity: 1;
    }
    24% {
        height: 100%;
        opacity: 0;
    }
    25% {
        height: 0;
        opacity: 0;
    }
    26% {
        height: 0;
        opacity: 1;
    }
    75% {
        height: 0;
        opacity: 1;
    }
    100% {
        height: 100%;
        opacity: 1;
    }
}
@keyframes box_width_bottom_ani {
    0% {
        width: 0;
        opacity: 1;
    }
    25% {
        width: 100%;
    }
    26% {
        opacity: 1;
    }
    50%,
    100% {
        width: 100%;
        opacity: 0;
    }
}
@keyframes box_height_right_ani {
    25% {
        height: 0;
        opacity: 1;
    }
    50% {
        height: 100%;
    }
    51% {
        opacity: 1;
    }
    75%,
    100% {
        height: 100%;
        opacity: 0;
    }
}
@keyframes box_width_top_ani {
    50% {
        width: 0;
        opacity: 1;
    }
    75% {
        width: 100%;
        opacity: 1;
    }
    76% {
        opacity: 1;
    }
    100% {
        width: 100%;
        opacity: 0;
    }
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
                    <a href="/">
                        <span></span>
                        <i class="fa fa-home"></i>首页</a>
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
                <div class="iarticle_box">
                    <ul class="iarticle">
                        <template v-if="list.length == 0">
                            <li>什么也没有~
                                <br />
                                <br />
                                <br />
                            </li>
                        </template>
                        <template v-else>
                            <li v-for="item in list">
                                <div class="ibox_ani_1">
                                    <div class="ibox_ani_2">
                                        <h5>
                                            <a :href="item._id | routerId">
                                                <i class="fa fa-hashtag"></i>{{item.title}}</a>
                                        </h5>
                                        <p>{{item.text}}</p>
                                        <a class="iread_more" :href="item._id | routerId">阅读全文</a>
                                    </div>
                                </div>
                            </li>
                        </template>
                    </ul>

                    <pagination_box :index="index" :total="total" :paginationCallBack="paginationCallBack"></pagination_box>

                </div>
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
import pagination_box from "vue_component/pagination/pagination.vue"
import repload from "vue_component/repload/repload.vue"
import backtop from "template/vue/backTop.vue"

export default {
    data() {
        return {
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
        backtop,
        pagination_box
    },
    methods: {
        showMenuCallBack() {
            this.showMenu = !this.showMenu
        },
        paginationCallBack(ind) {
            (document.documentElement || document.body).scrollTop = 0

            this.skip = ind - 1

            this.$axios.get("/article", {
                params: {
                    type: "list",
                    skip: this.skip
                }
            }).then(data => {
                let d = data.data

                this.list = d.data
                this.total = d.count
            })
        }
    },
    mounted() {
        
    }
}
</script>

