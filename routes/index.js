module.exports = (router, render) => {


    require("./upload")(router, render)
    require("./usercenter")(router, render)
    require("./login_register")(router, render)


}