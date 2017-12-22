let mon = require("../modules/model")
const validator = require("validator")

module.exports = (router, render) => {

    router.use("/usercenter/*", async(ctx, next) => {
        let username = ctx.session.username

        if (username) {
            ctx.userinfo = await mon.Users.find({ username })
            await next()
        } else {
            ctx.redirect("/login")
        }
    })

    router.get("/usercenter/index", async ctx => {
        let html = await render("usercenter/index", {
            userinfo: {
                username: ctx.userinfo[0].username,
                level: ctx.userinfo[0].level
            }
        })

        ctx.body = html
    })

    router.get("/api/usercenter/recite", async ctx => {
        let params = ctx.request.query
        let username = ctx.session.username
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
        let username = ctx.session.username

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

    router.post("/article/add-edit-article", async ctx => {
        let params = ctx.request.body
        let result = {}
        let author = ctx.session.username
        let time = Date.now()

        if (author) {
            params.title = validator.escape(params.title)
            params.content = validator.escape(params.content)

            if (!params.id) {

                result.code = 200
                result.result = await mon.Article.create({
                    author: author,
                    title: params.title,
                    content: params.content,
                    md: params.md,
                    text: params.text,
                    create_time: time,
                    last_modify_time: time,
                    flag: "flag" + time + Math.round(Math.random() * 9999)
                })

            } else {
                result.code = 200
                result.result = await mon.Article.update({
                    _id: params.id
                }, {
                    $set: {
                        title: params.title,
                        content: params.content,
                        md: params.md,
                        text: params.text,
                        last_modify_time: time
                    }
                })


            }
        }

        ctx.body = await result
    })

    router.get("/article/remove-article", async ctx => {
        let params = ctx.request.query
        let result = {}
        let id = JSON.parse(params.id)

        if (id.length) {
            result.code = 200
            result.result = await new Promise((resolve, reject) => {
                let i = 0
                id.forEach(t => {
                    mon.Article.remove({ _id: t }).limit(1).then(() => {
                        ++i
                        if (i == id.length) {
                            resolve({ ok: 1 })
                        }
                    })
                })
            })
        } else {
            result.code = 500
            result.result = "id不存在"
        }

        ctx.body = await result
    })

    router.get("/article/article-info", async ctx => {
        let params = ctx.request.query
        let result = {}

        if (params.id) {
            result.code = 200
            result.result = await mon.Article.find({ _id: global.MgTypes.ObjectId(params.id) })
            if (result.result.length) {
                result.result.forEach(t => {
                    t.title = validator.unescape(t.title)
                    t.content = validator.unescape(t.content)
                })
            }
        } else {
            result.code = 500
        }
        ctx.body = await result
    })

    router.get("/article/article-list", async ctx => {
        let username = ctx.session.username
        let params = ctx.request.query
        let result = {}
        let limit = +params.limit || 15
        let skip = params.skip

        skip = skip < 0 ? 0 : skip

        result.count = await mon.Article.find({ author: username }).count()
        result.result = await mon.Article.find({ author: username }).sort({ _id: -1 }).limit(+limit).skip(skip * limit)


        ctx.body = await result
    })

}