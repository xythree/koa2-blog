const fs = require("fs")
const path = require("path")
const { uploadFile } = require("../modules/upload")
const qrcode = require("../modules/qrcode")()
const { base64, mkdirsSync, cleardir } = require("../modules/function")()

module.exports = (router, render) => {

    router.get("/tools", async ctx => {
        ctx.body = await render("tools/index")
    })

    router.post("/qrcode", async ctx => {
        let params = ctx.request.body
        let result = {}

        if (params.text == "") {
            result.code = 0
            result.msg = "内容不能为空"
        } else {
            result.result = await qrcode({
                text: params.text,
                type: params.type || "png",
                size: params.size || 6,
                margin: params.margin || 1
            })
        }

        ctx.body = await result
    })

    router.post("/base64", async ctx => {
        let originalPath = "/static/images/"
        let serverFilePath = path.join(__dirname, originalPath)
        let result = {}

        // 上传文件事件
        result = await uploadFile(ctx, {
            fileType: "base64", // common or album
            path: serverFilePath,
            originalPath: originalPath
        })

        if (result.state == "SUCCESS") {
            let _url = "./static" + result.url

            result = await base64(_url)

        }

        ctx.body = await result
    })

    router.get("/qrcode", async ctx => {
        ctx.body = await render("tools/qrcode")
    })

    router.get("/md", async ctx => {
        ctx.body = await render("tools/markdown")
    })

    router.post("/generate", async ctx => {
        let params = ctx.request.body
        let _url = "./static/tmp"
        let ext = params.ext == "md" ? ".md" : ".html"
        let filename = params.filename + ext
        let _path = path.resolve(_url, filename)

        await cleardir(_url)

        mkdirsSync(_url)

        let result = await new Promise((resolve, reject) => {
            let data = params.data

            if (params.ext == "html") {
                data = `<!DOCTYPE HTML>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <title>${params.filename}</title>
</head>
<body>
    ${params.data}
</body>
</html>`
            }

            fs.writeFile(_path, data, "utf8", async(err, data) => {
                if (err) {
                    resolve(false)
                } else {
                    resolve("/tmp/" + filename)
                }
            })
        })

        ctx.body = await result
    })

}