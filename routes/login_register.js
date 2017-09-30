let mon = require("../modules/model")

module.exports = (router, render) => {

    router.get("/login", async ctx => {

        ctx.body = await render("login")
    })




}