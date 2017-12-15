let mon = require("../modules/model")
    //let { isLogin } = require("../modules/function")(mon)
let md5 = require("md5")

module.exports = (router, render) => {

    router.get("/login", async ctx => {

        ctx.body = await render("login")
    })


    router.get("/api/login", async ctx => {
        let params = ctx.request.query
        let result = { code: 0 }

        if (params.username && params.password) {

            result = await mon.Users.find({
                username: params.username,
                password: md5(params.password)
            })

            if (result.length) {
                ctx.session.username = result[0].username
                result = { code: 200 }
            }
        } else {
            result = { code: 1 }
        }

        ctx.body = await result
    })

    router.get("/api/logout", async ctx => {
        ctx.session.username = null
        ctx.body = { code: 200 }
    })

}