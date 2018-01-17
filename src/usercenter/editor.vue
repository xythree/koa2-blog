<style lang="scss">
#app {
    margin-bottom: 100px;
}
#editor {
    height: 650px;
}
.ql-toolbar {
    height: 45px;
}
.title {
    width: 100%;
    margin-bottom: 20px;
    border: 1px solid #dddee1;    
    height: 35px;
    line-height: 35px;
    padding: 5px 15px;
    outline: none;
}
.tagsList {
    margin: 20px;

    li {
        display: inline-block;
        margin-right: 10px;
    }
}
.submit {
    margin: 20px;
    width: 60px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    border: 1px solid #dddee1;
    background: #2d8cf0;
    color: #fff;
    border-radius: 4px;
}
</style>

<template>
    
    <div id="app">
        <input class="title" placeholder="文章标题" v-model="title" />
        <vue-editor id="editor" v-model="content" placeholder="文章内容" ></vue-editor>
        <div class="tagsList" >
            <p>文章标签：</p>
            <ul>
                <li v-for="(item, key) in tagsList">
                    <Tag :name="item.name" :class="{'tag': true}" checkable :checked="item.checked" @on-change="getTags" color="blue">{{item.name}}</Tag>
                </li>
            </ul>
        </div>
        <button @click="submitFn" class="submit" >提交</button>
        <div ref="text" v-show="false" v-html="content"></div>
    </div>

</template>

<script>

import { VueEditor } from "vue2-editor"

export default {
    data() {
       return {
            id: "",
            title: "",
            content: "",
            tagsNew: [],
            tagsOld: [],
            tagsList: []
       }
    },
    components: {
        VueEditor
    },
    methods: {
        restTag() {
            let tag = document.querySelectorAll(".tag")

            this.tagsList.forEach((t, i) => {
                if (t.checked) {
                    tag[i].click()
                }
            })
        },
        getTags(e, name) {
            this.tagsList.forEach(t => {
                if (t.name == name) {
                    t.checked = e
                }
            })
            this.tagsNew = []
            this.tagsList.forEach(t => {
                if (t.checked) {
                    this.tagsNew.push(t.name)
                }
            })
        },
        getTagList() {
            this.$axios.get("/article/tags/list").then(d => {
                this.tagsList = d.data.data
                this.tagsList.forEach(t => {
                    t.checked = this.tagsNew.indexOf(t.name) != -1 ? true : false
                })
            })
        },
        comparison() {
            let plus = [], minus = []

            this.tagsNew.forEach(t => {
                if (this.tagsOld.indexOf(t) == -1) {
                    plus.push(t)
                }
            })
            this.tagsOld.forEach(t => {
                if (this.tagsNew.indexOf(t) == -1) {
                    minus.push(t)
                }
            })
            return { plus, minus }
        },
        submitFn() {

            if (!this.title || !this.content) {
                this.$Message.error("请输入内容!")
            } else {
                let { plus, minus } = this.comparison()

                this.addArticle({
                    tags: this.tagsNew.join(","),
                    plus: plus.join(","),
                    minus: minus.join(","),
                    id: this.id == "new" ? "" : this.id,
                    title: this.title,
                    md: "",
                    text: this.$refs.text.textContent,
                    content: this.content
                })
            }
        },
        clear() {
            this.title = ""
            this.content = ""
            this.id = ""
            this.restTag()
        },
        addArticle(d) {
            this.$axios.post("/article/add-edit-article", d).then(result => {
                if (result.data.code == 200) {
                    //this.clear()
                    this.$Message.success("提交成功!")
                }
            })
        },
        getInfo() {
            this.id = this.$route.params.id

            return new Promise((resolve, reject) => {
                if (this.id != "new") {
                    this.$axios.get("/article/article-info", {
                        params: {
                            id: this.id
                        }
                    }).then(result => {
                        let data = result.data
                        if (data.code == 200) {
                            let result = data.result[0]

                            this.title = result.title
                            this.content = result.content
                            this.tagsNew =result.tags.split(",")
                            this.tagsOld = this.tagsNew
                        }
                        resolve(1)
                    })
                } else {
                    this.clear()
                    resolve(1)
                }
            })
        }
    },
    watch: {
        $route: "getInfo"
    },
    mounted() {
        this.getInfo().then(() => {
            this.getTagList()
        })
    }
}

</script>

