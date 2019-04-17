let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')
let webpack = require('webpack')
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin') //打包成单独css/less文件
let purifycssWebpack = require('purifycss-webpack') //没用样式不打包 必须用在HtmlWebpackPlugin后面
let glob = require('glob') //没用样式不打包
let CopyWebpackPlugin = require('copy-webpack-plugin') //将原文件复制到打包文件夹
module.exports = {
    entry: './src/index.js', //入口
    output: {
        filename: "js/[name][hash:8].js", //给输出的js打hash号  [name]多出口
        path: path.resolve('./static') //必须是绝对路径
    }, //出口
    devServer: { //webpack-dev-server配置
        contentBase: './dev',
        port: 6767,
        compress: true, //服务器压缩
        open: true, //自动打开浏览器
        hot: true //热更新
    }, //开发服务器
    module: {
        rules: [ //从右往左解析
            {
                test: /\.css$/, use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {loader: "css-loader"},
                        {loader: "postcss-loader"} //加前缀
                    ]
                })
            },
            {
                test: /\.less$/,
                use:ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {loader: "css-loader"},
                        {loader: "postcss-loader"}, //加前缀
                        {loader: "less-loader"}
                    ]
                })
            }
        ]
    }, //模块配置
    plugins: [
        new CopyWebpackPlugin([
            {
                from: './src/doc',
                to: './'
            }
        ]),
        new ExtractTextWebpackPlugin({
            filename: 'css/index.css',
            disable: true
        }),
        new webpack.HotModuleReplacementPlugin(), //热更新插件
        new CleanWebpackPlugin(), //清除旧的打包js
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html", //html所在位置
            title: "index", //更改html对应title
            hash: true, //给js打版本号！
            minify: { //压缩
                removeAttributeQuotes: true, //删掉属性双引号
                // collapseWhitespace: true //折叠空行
            },
        }),//html-webpack-plugin html自动引入打包的js
        // new purifycssWebpack({
        //     path: glob.sync(path.resolve('src/*.html'))
        // }) //删除html里没用的css
    ], //插件配置
    mode: "development", //可以更改模式
    resolve: {}, //配置解析
}