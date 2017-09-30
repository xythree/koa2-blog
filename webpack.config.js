const webpack = require("webpack");
const path = require("path");
//const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//const UglifyJSPlugin = require("uglifyjs-webpack-plugin")

module.exports = {
    entry: {
        //vendor: ["vue", "axios"],
        index: "./static/js/index.js",
        usercenter: "./static/js/usercenter/index.js",
        login: "./static/js/login.js"
    },
    output: {
        path: path.resolve(__dirname, "static/dist/js"),
        filename: "[name].js",
        //filename: "[name].[chunkhash:8].js",
        chunkFilename: "../../dist/js/[name].min.js"
    },
    plugins: [
        //new UglifyJSPlugin(),
        /*
            //自动加载模块
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            })
            */
        new ExtractTextPlugin({
            filename: "../css/[name].css",
            allChunks: true
        })
        /*
            new ExtractTextPlugin("[name].[contenthash:8].css")
        
            new HtmlWebpackPlugin({
                inject: true,
                chunks: ["demo"],
                cache: true
            })

            new webpack.optimize.CommonsChunkPlugin({
                //names: ["vendor", "manifest"]
                names: ["vendor"]
            })
            */
    ],
    module: {
        rules: [{
                test: /\.vue$/,
                use: [{
                    loader: "vue-loader",
                    options: {
                        postcss: function() {
                            return [require("autoprefixer")({ browsers: ["last 5 versions"] })];
                        },
                        plugins: ["transform-vue-jsx"]
                    }
                }, {
                    loader: "iview-loader",
                    options: {
                        prefix: false
                    }
                }]
            },
            {
                test: /\.js$/,
                use: ["babel-loader"],
                exclude: /mode_modules/
            },
            {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader?minimize", "sass-loader?minimize", "postcss-loader"]
                })
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: "url-loader?limit=1024"
            },
            {
                test: /iview.src.*?js$/,
                loader: "babel-loader"
            },
            {
                test: /iview\/.*?js$/,
                loader: "babel-loader"
            }
        ]
    },
    resolve: {
        alias: {
            vue$: "vue/dist/vue.common.js",
            "@vue": path.resolve(__dirname, "src"),
            js: path.resolve(__dirname, "static/js"),
            css: path.resolve(__dirname, "static/css")
        }
    }
};