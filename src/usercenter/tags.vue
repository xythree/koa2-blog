<style lang="scss">
.tags {
    padding: 30px;
}

.tags_list {
    margin-top: 50px;

    li {
        display: inline-block;
        margin-right: 10px;
    }
}
</style>

<template>
    <div class="tags">
        <Input v-model="value" @on-enter="add" placeholder="Enter Tag Name" style="width: 300px"></Input>
        <Button type="primary" @click="add">添加</Button>
        <ul class="tags_list">
            <li v-for="(item, index) in tagsList">
                <Badge :count="item.num">
                    <Tag closable @on-close="showModelFn(item._id, index)">{{item.name}}</Tag>
                </Badge>
            </li>
        </ul>
        <Modal
            v-model="showModel"
            title="提示"
            @on-ok="remove"
            @on-cancel="cancel">
            <p>确定删除吗？</p>
        </Modal>
    </div>
</template>

</template>

<script>

export default {
    data() {
        return {
            showModel: false,
            value: "",
            tagsList: [],
            tagsId: "",
            tagsInd: ""
        }
    },
    methods: {
        add() {
            let v = this.value.trim()
            if (v) {
                this.$axios.post("/article/tags/add", {tags: v}).then(d => {
                    let data = d.data
                    if (data.code == 200) {
                        this.value = ""
                        this.tagsList.push(data.data)
                        this.$Message.success(data.message)
                    }
                })
            }
        },
        remove() {
            this.$axios.post("/article/tags/remove", {id: this.tagsId}).then(d => {
                let data = d.data
                if (data.code == 200) {
                    this.tagsList.splice(this.tagsInd, 1)
                    this.$nextTick(() => {
                        this.$Message.success(data.message)
                    })
                }
            })
        },
        showModelFn(id, index) {
            this.tagsId = id
            this.tagsInd = index
            this.showModel = true
        },
        cancel() {
            this.showModel = false
        }
    },
    created() {
        this.$axios.get("/article/tags/list").then(d => {
            this.tagsList = d.data.data
        })
    }
}    

</script>

