<style lang="scss" scoped>
.usercenter_box {

    .leftMenu {
        float: left;
        width: auto;

        &>.ivu-menu {
            min-height: 600px;
        }
    }

    .ivu-menu-item {
        a {
            display: block;
            color: #495060;
        }
        .router-link-active {
            color: #2d8cf0;
        }
    }

    .irouterview {
        margin-left: 240px;
        padding: 10px;
        max-width: 90%;
    }
}

.float_right {
    float: right;
}

</style>


<template>
    <div class="usercenter_box">
        <Menu mode="horizontal" ref="topMenu" :theme="theme1" @on-select="select" active-name="people">
            <MenuItem name="home">
            <Icon type="home"></Icon>
            主页
            </MenuItem>
            <MenuItem name="people">
            <Icon type="ios-people"></Icon>
            用户中心
            </MenuItem>
            <MenuItem name="logout" :class="{float_right: true}" >
            <Icon type="log-out"></Icon>
            退出
            </MenuItem>
        </Menu>

        <Col span="4" :class="{leftMenu: true}">
        <Menu @on-select="select" ref="leftMenu" :theme="theme1" :open-names="openNames" :active-name="activeName">
            <Submenu name="admin" v-if="userinfo.level == 9">
                <template slot="title">
                    <Icon type="ios-paper"></Icon>
                    内容管理
                </template>
                <MenuItem name="addArticle">
                    <router-link to="/editor/new">添加文章</router-link>
                </MenuItem>
                <MenuItem name="articleList">
                    <router-link to="/articleList">文章管理</router-link>
                </MenuItem>
                <MenuItem name="comment">评论管理</MenuItem>
            </Submenu>

            <Submenu name="user" v-if="userinfo.level == 9">
                <template slot="title">
                    <Icon type="ios-people"></Icon>
                    用户管理
                </template>
                <MenuItem name="userlist">用户列表</MenuItem>
            </Submenu>

            <Submenu name="set">
                <template slot="title">
                    <Icon type="settings"></Icon>
                    设置
                </template>
                <MenuItem name="word">
                    <router-link to="/word">单词</router-link>
                </MenuItem>
                <MenuItem name="music">
                    <router-link to="/music">音乐</router-link>
                </MenuItem>
            </Submenu>

            <MenuItem name="chat">
            <Icon type="chatbubbles"></Icon>
            聊天室
            </MenuItem>

            <MenuItem name="robot">
            <Icon type="social-snapchat-outline"></Icon>
            机器人robot
            </MenuItem>
        </Menu>
        </Col>

        <div class="irouterview">
            <router-view></router-view>
        </div>

    </div>
</template>

<script>

let routerActive = {
    word: "set",
    music: "set",
    "editor/new": "admin",
    articleList: "admin"
}

export default {
    data() {
        return {
            show: false,
            activeName: "",
            openNames: [],
            theme1: "light",
            userinfo: {
                username: userinfo.username || "",
                level: userinfo.level || 0
            } 
        }
    },
    methods: {
        select(name) {
            if (name == "home") {
                location.href = "/"
            } else if (name == "logout") {
                this.$axios.get("/api/logout").then(d => {
                    if (d.data.code == 200) {
                        location.href = "/"
                    }
                })
            } else if (name == "robot") {
                window.open("/robot")
            } else if (name == "chat") {
                window.open("/chatroom/html")
            }
        }
    },
    watch: {
        $route(to, from) {
            this.activeName = to.path.replace("/", "").replace(/editor\/(.*)/,"editor/new")
            this.openNames = [routerActive[this.activeName]]
            this.$nextTick(() => {
                this.$refs.leftMenu.updateOpened()
            })
        }
    }
}

</script>
