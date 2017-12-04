const fs = require("fs")
const path = require("path")
const formidable = require("formidable")

let form = new formidable.IncomingForm()

form.multiples = true
form.encoding = "utf-8" //上传编码
form.uploadDir = "./static/tmp" //上传目录，指的是服务器的路径，如果不存在将会报错。
    //form.keepExtensions = true//保留后缀

let maxSize = 2 * 1024 * 1024 //最大可上传大小

let extname = [".jpg", ".gif", ".png"]

module.exports = (router, render) => {

    router.get("/upload", async ctx => {

        ctx.body = await render("upload/index")
    })

    router.post("/upload", async ctx => {
        let allFile = []

        ctx.body = await new Promise((resolve, reject) => {

            form.on("file", function(name, file) {
                if (extname.indexOf(path.extname(file.name)) != -1) {
                    allFile.push([name, file])
                } else {
                    fs.unlinkSync("./" + file.path)
                    this.emit("error", "不支持的文件格式")
                }
            }).on("progress", function(bytesReceived, bytesExpected) {
                //console.log("上传进度:", (bytesReceived / bytesExpected).toFixed(2))
                if (bytesReceived > maxSize) {
                    this.emit("error", "文件大小超出限制，最大不能超过2M")
                }
            }).on("end", function() {
                console.log("上传结束")
            }).on("error", function(message) {
                //console.error("err", message)
                reject({
                    code: -1,
                    msg: message
                })
            }).parse(ctx.req, function(err, fields, files) {
                let fileSrc = []

                allFile.forEach((file, index) => {
                    let _src = "/images/upload/" + +new Date + path.extname(file[1].name)
                    fs.rename("./" + file[1].path, "./static" + _src)
                    fileSrc.push(_src)
                })

                resolve({
                    code: 1,
                    data: fileSrc,
                    msg: "上传成功"
                })
            })

        }).catch(d => d)

    })

}