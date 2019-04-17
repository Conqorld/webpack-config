const pxtorem = require('postcss-pxtorem');
module.exports = {
    plugins: [
        require('autoprefixer'),
        pxtorem({
            rootValue: 32,
            unitPrecision: 5, //保留小数位
            // selectorBlackList: ['van'], // 忽略转换正则匹配项
            propList: ['*']
        })
    ]
}