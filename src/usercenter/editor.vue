<style lang="scss">
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
            content: ""
       }
    },
    components: {
        VueEditor
    },
    methods: {
        submitFn() {
            
            if (!this.title || !this.content) {
                alert("请输入内容!")
            } else {
                this.addArticle({
                    id: this.id,
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
        },
        addArticle(d) {
            this.$axios.post("/article/add-edit-article", d).then(result => {
                if (result.data.code == 200) {
                    this.clear()
                    alert("提交成功!")
                }
            })
        },
        getInfo() {
            this.id = this.$route.params.id

            if (this.id != "new") {
                this.$axios.get("/article/article-info", {
                    params: {
                        id: this.id
                    }
                }).then(result => {
                    let data = result.data
                    if (data.code == 200) {
                        this.title = data.result[0].title
                        this.content = data.result[0].content
                    }
                })
            } else {
                this.clear()
            }
        }
    },
    watch: {
        $route: "getInfo"
    },
    mounted() {
        this.getInfo()
    }
}

</script>

