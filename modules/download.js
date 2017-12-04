const fs = require("fs")
const path = require("path")
const { mkdirsSync, cleardir } = require("./function")()

module.exports = (router, render) => {

    router.get("/download", async ctx => {
        let params = ctx.request.query
        let _u = "./static" + params.url

        let result = await new Promise((resolve, reject) => {
            fs.stat(_u, async(err, stats) => {
                if (err) {
                    ctx.redirect("/404")
                } else {
                    if (stats.isFile()) {
                        let _nu = _u.split("/")

                        ctx.status = 200
                        ctx.set({
                            "Content-type": "application/octet-stream",
                            "Content-Disposition": "attachment; filename=" + _nu[_nu.length - 1],
                            "Content-Length": stats.size
                        })
                        resolve(fs.createReadStream(_u))
                    } else {
                        resolve(0)
                    }
                }
            })
        })

        ctx.body = await result
    })

}