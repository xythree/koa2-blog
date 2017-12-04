let minify = require("html-minifier").minify
let mon = require("../modules/model")

module.exports = (router, render) => {

    router.use("/usercenter/*", async(ctx, next) => {
        let username = ctx.session.username || "xythree"

        if (username) {
            ctx.userinfo = await mon.Users.find({ username })
            await next()
        } else {
            ctx.redirect("/login")
        }
    })

    router.get("/usercenter/index", async ctx => {
        let html = await render("usercenter/index")

        ctx.body = minify(html, {
            removeComments: true, //去除注释
            minifyJS: true,
            minifyCSS: true,
            collapseWhitespace: true
        })
    })

    router.get("/api/usercenter/recite", async ctx => {
        let params = ctx.request.query
        let username = ctx.session.username || "xythree"
        let result = ""

        if (params.limit) {
            result = await mon.recite.update({ username }, { $set: { limit: +params.limit } })
        } else {
            result = await mon.recite.find({ username })
        }

        ctx.body = result
    })

    router.get("/api/usercenter/music", async ctx => {
        let params = ctx.request.query
        let limit = params.limit || 15
        let skip = limit * (params.skip || 0)
        let result = {}
        let username = ctx.session.username || "xythree"

        switch (params.type) {
            case "delete":
                let id = JSON.parse(params.id)

                if (id.length) {
                    result = await new Promise((resolve, reject) => {
                        let i = 0
                        id.forEach(t => {
                            mon.music.remove({ _id: t }).limit(1).then(() => {
                                ++i
                                if (i == id.length) {
                                    resolve({ ok: 1 })
                                }
                            })
                        })
                    })
                }
                break
            default:
                result.total = await mon.music.find({ username }).count()
                result.data = await mon.music.find({ username }).limit(+limit).skip(skip)
        }

        ctx.body = result
    })

}