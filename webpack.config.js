var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var HelloWorldPlugin = require('hello-world');

module.exports = {
    devtool: process.env.APP_ENV === 'production' ? "eval" : 'cheap-module-eval-source-map',
    devServer: {
        disableHostCheck: true,
        host: "0.0.0.0",
        hot: true,
        port: 3010,
        contentBase: __dirname + '/dist', //本地服务加载的目录
        historyApiFallback:true, //为true时访问不存在的页面都会被重定向到／，也就是index.html文件
    },
    entry: {
        po: [
            './src/assets/i18ns/zh_CN.po',
            './src/assets/i18ns/en_US.po',
        ],
        app: __dirname + "/src/app.jsx",
        // app: __dirname + "/src/loaders/index.js",
    },
    output: {
        path: __dirname + '/dist/',
        publicPath: `${process.env.PUBLIC || '/'}`,
        filename: "[name].[hash].js"
    },
    module: {
        rules: [
            // { test: require.resolve("lodash"), loader: "script-loader" },
            { test: require.resolve("moment"), loader: "expose-loader?moment" }, //将moment暴露到全局export上下文，可通过window.moment访问

            // disable i18n warning
            { test: /node_modules\/react-intl/, loader: 'imports-loader?process=>{env: {NODE_ENV: "production"}}' },

            { test: require.resolve('axios'), loader: 'expose-loader?axios' },

            { test: /zh_CN.po$/, loader: "expose-loader?zh_CN!json-loader!po-loader" },
            { test: /en_US.po$/, loader: "expose-loader?en_US!json-loader!po-loader" },

            {
                test: /\.jsx$|\.js$/,
                include: /src/,
                exclude: [
                    /axios/,    //TODO: 要了解
                    /node_modules/,
                    /src\/assets/,
                ],
                loader: "babel-loader",  // 这个包允许babel和webpack转换javascript文件
                //babel-loader 转换很慢， 尽可能排除不需要的源文件，babel-loader使用非常小的helper来实现常用功能，这将被加到每个需要的文件中。
                // 可以将babel runtime作为一个单独的模块，以避免重复。


                /**
                 * babel-fill使用场景：
                 * babel只转换新的语法不转换新的api，例如：　Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局变量，
                 * 以及一些定义在全局变量上的方法（例如：Object.assign()）都不会被编译，如果要使用这些新的变量和方法就必须使用babel-polyfill,
                 *
                 * babel-runtime使用场景：
                 * babel转化后的代码要实现与源代码相同的功能，就必须借助一些帮助函数，这可能使得帮组函数重复出现在一些模块中，导致编译后的代码提及变大，
                 * babel提供了babel-runtime供编译模块复用工具函数。
                 *
                 * 除此之外，babel还未源代码的飞实例方法和babel-runtime/helps下的工具函数自动引入了polyfill。
                 *
                 * 思考： 为什么babel-runtime适合javascript库和工具包的实现：
                 * 1、避免babel编译的工具函数出现在每隔函数模块中，减小库和工具包的体积；
                 * 2、babel-runtime会引入polyfill。
                 */
                query: { //为loaders提供额外的选项
                    presets: ["latest", "react","stage-0"], //presets设置转码规则
                    plugins:[
                        ["import", { libraryName: "antd", style: "css" }],
                        ["transform-runtime"], // babel-plugin-transform-runtime包含一个polyfill,
                    ],
                },
            },


            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?name=images/[hash].[ext]' },

            { test: /\.css$/, use: ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader" }) },

            {
                test: /\.scss$/,
                exclude: /\/src\/assets\/stylesheets\//,
                use: scssRules({ global: false }),
            },

            {
                test: /\/src\/assets\/stylesheets\//,
                use: scssRules({ global: true }),
            },


            //todo 自定义loaders配置
            // {
            //     test: /\.tpl\.html/,
            //     use: 'html-template-loader',
            // }
        ],
        noParse: [//如果一个模块没有其他新的依赖，可以配置在这里
            require.resolve("lodash"),
            // require.resolve("moment")
        ]
    },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({  //提取公共部分，避免重复打包
        //     name: 'vendor',
        //     filename:'vendor-[hash].min.js'
        // }),

        new HtmlWebpackPlugin({    //将生成的js、css文件引入到index.html文件中。
            chunksSortMode: function(a, b) {
                return a.id < b.id ? 1 : -1
            },
            // minify: {    //压缩
            //     removeAttributeQuotes: true
            // },
            // hash: true,   //本次webpack打包对应的hash
            // chunks: ['app', 'po'],  //指定引入哦特殊文件，默认引入全部入口文件
            // excludeChunks: [''],   //与chunks相反，规定要移除的文件
            template: __dirname + '/src/assets/index.ejs',
        }),

        // TODO able in production
        new ExtractTextPlugin({  //将所有入口文件中*.css引入到独立的css文件中
            filename: 'style.css',
            allChunks: true,
        }),
        new webpack.DefinePlugin({ //允许在编译时创建一个全局变量
            __ENV__: JSON.stringify(process.env.APP_ENV),
            __: function(k) { return k; },
        }),
        new webpack.HotModuleReplacementPlugin({}), // TODO disable in production
        new HelloWorldPlugin({options: true}),
        //new webpack.optimize.UglifyJsPlugin() //只在生产阶段使用，指定sourceMap为true时会使编译速度变慢
    ],
    resolve: {
        modules: ['src', 'node_modules'], //告诉webpack解析时应该搜索的模块
        extensions: ['.js', '.jsx', '.scss'], //自动解析确定的扩展
    }
};

function unModuleJSRule(lib, reg) {
    return {
        test: reg,
        use: [{
            loader: 'expose-loader',
            options: lib,
        }, {
            loader: 'exports-loader',
            options: lib,
        }, {
            loader: 'imports-loader',
            options: `${lib}=>window.${lib}`,
        }]
    }
}

function scssRules({ global }) {
    return [
        'style-loader',
        {
            loader: 'css-loader',
            options: global
                ? { importLoaders: 1 }
                : {
                    modules: true,
                    importLoaders: 1,
                    localIdentName: '[name]__[local]___[hash:base64:5]',
                }
        },
        {
            loader: 'postcss-loader',
            options: {
                plugins: function() {
                    return [require('autoprefixer')];
                },
            },
        },
        'sass-loader'
    ]
}
