<style lang="scss" scoped>
.word {
    margin-top: 50px;
    margin-left: 100px;
}
</style>

<template>
    <div class="word">
        <span>每次条数：</span>
        <RadioGroup v-model="animal">
            <Radio label="10"></Radio>
            <Radio label="15"></Radio>
            <Radio label="20"></Radio>
            <Radio label="25"></Radio>
            <Radio label="30"></Radio>
        </RadioGroup>
    </div>
</template>

<script>

export default {
    data() {
        return {
            animal: 0
        }
    },
    created() {
        this.$axios.get("/api/usercenter/recite").then(d => {
            this.animal = d.data[0].limit

            this.$watch("animal", v => {
                this.$axios.get("/api/usercenter/recite?limit=" + v).then(d => {
                    if (d.data.ok != 1) {
                        this.$Message.error({
                            content: "设置失败",
                            closable: true,
                            duration: 5
                        })
                    }
                })
            })
        })
    }
}
</script>

