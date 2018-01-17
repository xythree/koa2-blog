const sql = require("../modules/sql")

module.exports = (router, render) => {

    router.get("/", async ctx => {

        ctx.body = await render("home/home")
    })

    router.get("/article", async ctx => {
        let params = ctx.request.query
        let result = {},
            limit = params.limit || 15,
            skip = params.skip || 0,
            obj = {}

        result.data = {}

        if (params.id) {

            await sql.article.update({ _id: params.id }, {
                $inc: {
                    views: 1
                }
            })

            result.data = await sql.article.findArticleComment(params.id)
            result.prev = await sql.article.prev(params.id)
            result.next = await sql.article.next(params.id)

        } else if (params.search) {

            result.data = await sql.article.findTitle(params.search, +skip, +limit)

        } else if (skip != void 0) {

            result.data = await sql.article.find({}, +skip, +limit)
            result.count = await sql.article.count({})

        }

        ctx.body = await result
    })

}