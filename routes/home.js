const mon = require("../modules/model")

module.exports = (router, render) => {


    router.get("/", async ctx => {

        ctx.body = await render("home/home")

    })

    router.get("/article", async ctx => {

        let result = await mon.Article.find({}).limit(3).skip(0)
        console.log(result)

        ctx.body = await { articleList: [], count: 0 }

    })


}