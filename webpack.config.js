var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: process.env.APP_ENV === 'production' ? "eval" : 'cheap-module-eval-source-map',
    devServer: {
        disableHostCheck: true,
        host: "0.0.0.0",
        hot: true,
        port: 3010,
        contentBase: __dirname + '/dist',
        historyApiFallback:true
    },
    entry: {
        po: [
            './src/assets/i18ns/zh_CN.po',
            './src/assets/i18ns/en_US.po',
        ],
        app: __dirname + "/src/app.jsx",
    },
    output: {
        path: __dirname + '/dist/',
        publicPath: `${process.env.PUBLIC || '/'}`,
        filename: "[name].[hash].js"
    },
    module: {
        rules: [
            // { test: require.resolve("lodash"), loader: "script-loader" },
            { test: require.resolve("moment"), loader: "expose-loader?moment" },

            // disable i18n warning
            { test: /node_modules\/react-intl/, loader: 'imports-loader?process=>{env: {NODE_ENV: "production"}}' },

            { test: require.resolve('axios'), loader: 'expose-loader?axios' },

            { test: /zh_CN.po$/, loader: "expose-loader?zh_CN!json-loader!po-loader" },
            { test: /en_US.po$/, loader: "expose-loader?en_US!json-loader!po-loader" },

            {
                test: /\.jsx$|\.js$/,
                include: /src/,
                exclude: [
                    /axios/,
                    /node_modules/,
                    /src\/assets/,
                ],
                loader: "babel-loader",
                query: {
                    presets: ["latest", "react","stage-0"],
                    plugins:[
                        ["import", { libraryName: "antd", style: "css" }],
                        ["transform-runtime"],
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
            }
        ],
        noParse: [
            require.resolve("lodash"),
            // require.resolve("moment")
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunksSortMode: function(a, b) {
                return a.id < b.id ? 1 : -1
            },
            template: __dirname + '/src/assets/index.ejs',
        }),

        // TODO able in production
        new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true,
        }),
        new webpack.DefinePlugin({
            __ENV__: JSON.stringify(process.env.APP_ENV),
            __: function(k) { return k; },
        }),
        new webpack.HotModuleReplacementPlugin({}), // TODO disable in production
    ],
    resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['.js', '.jsx', '.scss'],
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
