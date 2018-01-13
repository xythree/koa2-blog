let mon = require("../modules/model")
const validator = require("validator")

module.exports = (router, render) => {

    router.use("/usercenter/*", async(ctx, next) => {
        let username = ctx.session.username

        if (username) {
            let userinfo = await mon.Users.find({ username })

            ctx.session.userinfo = userinfo[0]
            await next()
        } else {
            ctx.redirect("/login")
        }
    })

    router.get("/usercenter/index", async ctx => {
        let html = await render("usercenter/index", {
            userinfo: {
                username: ctx.session.userinfo.username,
                level: ctx.session.userinfo.level
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
                    tags: params.tags,
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
                params.plus.split(",").forEach(async t => {
                    await mon.Tags.update({
                        name: t
                    }, {
                        $inc: {
                            num: 1
                        }
                    })
                })
                params.minus.split(",").forEach(async t => {
                    await mon.Tags.update({
                        name: t
                    }, {
                        $inc: {
                            num: -1
                        }
                    })
                })
                result.code = 200
                result.result = await mon.Article.update({
                    _id: params.id
                }, {
                    $set: {
                        tags: params.tags,
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


    router.get("/article/tags/list", async ctx => {
        let result = {}

        result.data = await mon.Tags.find({}, { name: 1, num: 1 })

        ctx.body = await result
    })

    router.post("/article/tags/add", async ctx => {
        let params = ctx.request.body
        let result = { code: 500, data: [] }

        if (ctx.session.userinfo.level != 9) {
            result.message = "权限不足"
        } else {
            if (params.tags) {
                let data = await mon.Tags.find({ name: params.tags })

                if (data.length) {
                    result.message = "标签已存在"
                } else {
                    result.data = await mon.Tags.create({
                        name: params.tags
                    })
                    result.code = 200
                    result.message = "添加成功"
                }
            } else {
                result.message = "请输入标签名"
            }
        }

        ctx.body = await result
    })

    router.post("/article/tags/remove", async ctx => {
        let params = ctx.request.body
        let result = { code: 500, data: [] }

        if (ctx.session.userinfo.level != 9) {
            result.message = "权限不足"
        } else {
            if (params.id) {
                let data = await mon.Tags.remove({ _id: params.id })

                if (data.result.ok == 1) {
                    result.code = 200
                    result.message = "删除成功"
                    result.data = data
                } else {
                    result.message = "删除失败"
                }
            } else {
                result.message = "请输入标签名"
            }
        }

        ctx.body = await result
    })
}