const webpack = require("webpack")
const path = require("path")
    //const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin") //Gzip 压缩


module.exports = {
    entry: {
        vendor: ["vue", "axios"],
        home: "./static/js/home.js",
        music: "./static/js/music/index.js",
        component: "./static/js/component/index.js",
        word: "./static/js/word/index.js",
        poetry: "./static/js/poetry/index.js",
        tools: "./static/js/tools/index.js",
        markdown: "./static/js/tools/markdown.js",
        qrcode: "./static/js/tools/qrcode.js",
        index: "./static/js/index.js",
        usercenter: "./static/js/usercenter/index.js",
        login: "./static/js/login.js"
    },
    output: {
        path: path.resolve(__dirname, "static/dist/js"),
        filename: "[name].js",
        //publicPath: "http://www.xythree.com/",
        //filename: "[name].[chunkhash:8].js",
        chunkFilename: "../../dist/js/[name].min.js"
    },
    //devtool: "source-map",
    plugins: [
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(js|html)$/,
            threshold: 10240,
            minRatio: 0.8
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
                //pure_funcs: ["console.log"]
            },
            sourceMap: false
        }),

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
                    // exclude: /node_modules\/(?!(autotrack|dom-utils))|vendor\.dll\.js/,
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
                // use: ["babel-loader"],
                loader: "babel-loader?cacheDirectory=true",
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
        //extensions: [".js", ".json", ".vue", ".css"],
        alias: {
            "vue$": "vue/dist/vue.js",
            "@vue": path.resolve(__dirname, "src"),
            js: path.resolve(__dirname, "static/js"),
            css: path.resolve(__dirname, "static/css"),
            vue_component: path.resolve(__dirname, "vue_component"),
            template: path.resolve(__dirname, "template")
        }
    }
};