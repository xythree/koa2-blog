const koa = require("koa")
const router = require("koa-router")()
const serve = require("koa-static")
const views = require("co-views")
const bodyparser = require("koa-bodyparser")
const session = require("koa-session2")
const app = new koa()
const path = require("path")

const server = require("http").createServer(app.callback())

const io = require("socket.io")(server)

const config = require("./config")

const render = views("./views", {
    ext: "ejs"
})


app.use(require("./modules/request")())

app.use(async(ctx, next) => {

    ctx.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    })

    await next()
})

const minify = require("html-minifier").minify

app.use(async(ctx, next) => {

    await next()

    if (!ctx.response.is('html')) return

    let body = ctx.body
    if (!body || body.pipe) return

    if (Buffer.isBuffer(body)) body = body.toString()
    ctx.body = minify(body, {
        removeComments: true, //去除注释
        minifyJS: true,
        minifyCSS: true,
        collapseWhitespace: true
    })
})


app.use(session({
    maxAge: 1000 * 60 * 60 * 24,
    key: "SESSIONID" //default "koa:sess" 
}))

app.use(require("koa-favicon")(__dirname + '/static/favicon.ico'))

/*
app.use(require("koa-compress")({
    filter: function(content_type) { //配置过滤的压缩文件的类型
        return /text/i.test(content_type)
    },
    threshold: 2048, //要压缩的最小响应字节
    flush: require('zlib').Z_SYNC_FLUSH //同步的刷新缓冲区数据
}))
*/

app.use(bodyparser())

app.use(serve(path.join(__dirname, "static"), {
    //maxAge: 1000 * 60 * 60 * 24
}))

app.use(router.routes())



require("./routes/index")(router, render, io)

router.get("/404", async ctx => {
    ctx.body = await render("404")
})

app.on("error", err => {
    console.log("err", err)
})


server.listen(config.port, () => {
    console.log(`running port: ${config.port}`)
})