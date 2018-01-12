<style lang="scss">
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

</style>

<template>
    <div class="iarticle_box">
        <ul class="iarticle" >
            <template v-if="articleList.length == 0">
                <li>什么也没有~
                    <br />
                    <br />
                    <br />
                </li>
            </template>
            <template v-else>
                <li v-for="item in articleList">
                    <div class="ibox_ani_1">
                        <div class="ibox_ani_2">
                            <h5>
                                <router-link :to="item._id | routerId">
                                    <i class="fa fa-hashtag"></i>{{item.title}}
                                </router-link>
                            </h5>
                            <p>{{item.content|formatHtml}}</p>
                            <router-link class="iread_more" :to="item._id | routerId">阅读全文</router-link>
                        </div>
                    </div>
                </li>
            </template>
        </ul>
        <pagination_box :total="total" :paginationCallBack="paginationCallBack" ></pagination_box>
    </div>
</template>

<script>

import pagination_box from "vue_component/pagination/pagination.vue"

export default {
    data() {
        return {
            articleList: [],
            skip: 0,
            total: 0
        }
    },
    filters: {
        routerId(value) {
            return "/article?id=" + value
        },
        formatHtml(value) {
            let val = ""
            let div = document.createElement("div")

            div.innerHTML = value
            val = div.textContent

            return val.length > 120 ? val.substring(0, 120) + "..." : val
        }
    },
    components: {
        pagination_box
    },
    methods: {
        paginationCallBack(ind) {
            (document.documentElement || document.body).scrollTop = 0

            this.skip = typeof ind == "object" ? 0 : ind - 1

            this.$axios.get("/article", {
                params: {
                    search: this.$route.query.search || "",
                    skip: this.skip
                }
            }).then(data => {
                let d = data.data

                this.articleList = d.data
                this.total = d.count
            })
        }
    },
    watch: {
        "$route": "paginationCallBack"
    }
}
</script>
