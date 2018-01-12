const mongoose = require("mongoose")
const config = require("../config")

//防止报错:(node:7664) DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise


//const db = mongoose.createConnection("127.0.0.1", "koa_blog")
const db = mongoose.connect("mongodb://localhost/" + config.database)

global.MgTypes = mongoose.Types

module.exports = {
    mongoose,
    Schema: mongoose.Schema,
    model: mongoose.model,
    db
}