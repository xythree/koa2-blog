module.exports = (router, render) => {


    require("./home")(router, render)

    require("./cloudmusic")(router, render)

    require("./component")(router, render)

    require("./word")(router, render)

    require("./tools")(router, render)

    require("../modules/download")(router, render)

    require("./upload")(router, render)

    require("./usercenter")(router, render)

    require("./login_register")(router, render)

    router.get("/poetry", async ctx => {
        ctx.body = await render("poetry")
    })

}