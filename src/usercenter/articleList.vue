<style lang="scss" scoped>
.imusic {
    margin: 30px 80px;
    padding-bottom: 30px;

    .ivu-table-wrapper {
        margin-bottom: 10px;
    }
    .ipage {
        margin-top: 30px;
        margin-bottom: 30px;
    }
}
</style>


<template>
    <div class="imusic">
        <Table border :loading="loading" ref="selection" @on-selection-change="onSelect" size="small" @on-select-all="onSelect" :columns="columns" :data="data"></Table>
        <Button @click="handleSelectAll">{{this.selectAllStatus?"反选":"全选"}}</Button>
        <Button @click="showModal">删除</Button>

        <div class="ipage">
            <Page :total="total" :page-size="pageSize" @on-change="page" show-elevator></Page>
        </div>

        <Modal v-model="modal" title="提示" @on-ok="ok" @on-cancel="cancel">
            {{modalMessage}}
        </Modal>
    </div>
</template>
<script>

export default {
    data() {
        return {
            loading: false,
            columns: [
                {
                    type: "selection",
                    width: 55,
                    align: "center"
                },
                {
                    type: "index",
                    width: 60,
                    align: "center"
                },
                {
                    title: "作者",
                    key: "author",
                    width: 150
                },
                {
                    title: "标题",
                    key: "title"
                },
                {
                    title: "操作",
                    key: "action",
                    align: "center",
                    width: 120,
                    render: (h, params) => {
                        let _t = this
                        return h("div", [
                            h("Button", {
                                props: {
                                    type: "text",
                                    size: "small"
                                },
                                on: {
                                    click() {
                                        _t.$router.push("/editor/" + _t.data[params.index]._id)
                                    }
                                }
                            }, "编辑"),
                            h("Button", {
                                props: {
                                    type: "text",
                                    size: "small"
                                },
                                on: {
                                    click() {
                                        _t.onSelect([_t.data[params.index]])
                                        _t.showModal()
                                    }
                                }
                            }, "删除")
                        ]);
                    }
                }
            ],
            data: [],
            total: 0,
            pageSize: 15,
            deleteArr: [],
            deleteArrInd: [],
            selectAllStatus: false,
            modal: false,
            modalMessage: ""
        }
    },
    methods: {
        handleSelectAll() {
            if (this.loading) return
            this.selectAllStatus = !this.selectAllStatus
            this.$refs.selection.selectAll(this.selectAllStatus)
        },
        onSelect(arr) {
            this.deleteArrInd = []
            this.deleteArr = arr.map((t, i) => {
                this.deleteArrInd.push(i)
                return t._id
            })
        },
        page(num) {
            this.selectAllStatus = !this.selectAllStatus
            this.getList(num - 1)
        },
        getList(skip = 0) {
            this.loading = true
            this.$axios.get("/article/article-list", {
                params: {
                    skip
                }
            }).then(d => {
                this.loading = false
                this.total = d.data.count
                this.data = d.data.result
            })
        },
        deleteFn() {
            if (!this.deleteArr.length) return

            this.$axios.get("/article/remove-article", {
                params: {
                    type: "delete",
                    id: JSON.stringify(this.deleteArr)
                }
            }).then(d => {
                if (d.data.code == 200) {
                    this.$Message.info({
                        content: "删除成功",
                        closable: true,
                        duration: 3
                    })
                    let tmp = this.data.slice(0)
                    this.deleteArrInd.reverse().forEach(t => {
                        tmp.splice(t, 1)
                    })
                    this.data = tmp
                } else {
                    this.$Message.error({
                        content: "删除失败",
                        closable: true,
                        duration: 3
                    })
                }
            })
        },
        showModal() {
            if (!this.deleteArr.length) return
            this.modal = true
            this.modalMessage = "确定删除吗?"
        },
        ok() {
            this.deleteFn()
        },
        cancel() {
            this.modal = false
        }
    },
    created() {
        this.getList()		
    }
}
</script>
