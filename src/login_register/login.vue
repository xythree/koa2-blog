<style lang="scss">
.ifrom {
    position: fixed;
    left: 50%;
    top: 40%;
    transform: translate(-50%,-50%);
    width: 500px;
    animation: ani_show 1s .5s ease-out both;
}
@keyframes ani_show {
    0% {opacity: 0;}
    100% {opacity: 1;}
}

</style>

<template>
    <div class="ifrom">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
            <FormItem prop="user">
                <Input type="text" v-model="formInline.user" @on-keyup="focusFn" placeholder="username">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="formInline.password" @on-keyup="focusFn" placeholder="password">
                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>

export default {
    data () {
        return {
            formInline: {
                user: "",
                password: ""
            },
            ruleInline: {
                user: [
                    { required: true, message: "请填写用户名", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请填写密码", trigger: "blur" },
                    { type: "string", min: 6, message: "密码长度不能小于6位", trigger: "blur" }
                ]
            }
        }
    },
    methods: {
        handleSubmit(name) {
            let username = this.formInline.user
            let password = this.formInline.password
            
            if (username && password) {
                this.$axios.get("/api/login",{
                    params: {
                        username,
                        password
                    }
                }).then(d => {
                    if (d.data.code == 200) {
                        location.href = "/usercenter/index"
                    } else {
                        this.$Message.error("表单验证失败!");
                    }
                })
            } else {
                this.$refs[name].validate()
            }
        },
        focusFn(e) {
            if (e.keyCode == 13) {
                this.handleSubmit("formInline")
            }
            
        }
    }
}
</script>
