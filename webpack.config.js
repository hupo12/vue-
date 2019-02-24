const path = require('path')
// 启用热更新的 第2步
const webpack = require('webpack')

const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin=require("vue-loader/lib/plugin.js")
// 导入在内存中生成 HTML 页面的 插件
// 只要是插件，都一定要 放到 plugins 节点中去
// 这个插件的两个作用：
//  1. 自动在内存中根据指定页面生成一个内存的页面
//  2. 自动，把打包好的 bundle.js 追加到页面中去
// 这个配置文件，起始就是一个 JS 文件，通过 Node 中的模块操作，向外暴露了一个 配置对象
module.exports = {
  // 大家已经学会了举一反4， 大家觉得，在配置文件中，需要手动指定 入口 和 出口
  entry: path.join(__dirname, './src/index.js'),// 入口，表示，要使用 webpack 打包哪个文件
  output: { // 输出文件相关的配置
    path: path.join(__dirname, './dist'), // 指定 打包好的文件，输出到哪个目录中去
    filename: 'main.js' // 这是指定 输出的文件的名称
  },
  //配置插件的节点
  plugins:[
    new VueLoaderPlugin(),
    new htmlWebpackPlugin({
      template:path.join(__dirname,'./src/index.html'), //指定 模板页面
      filename:'index.html' //指定生成的页面的名称
    })
  ],
  module:{ //这个节点,用于配置 所有 第三方模块 加载器
    rules:[
      {test:/\.css$/,use:['style-loader','css-loader']}, //配置处理 .css文件的第三方loader 规则
      {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
      {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
      {test:/\.(jpg|webp|gif|jpeg|bmp|png)$/,use:'url-loader?limit=9090&[hash:10]-[name:name]'},
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      {test:/\.vue/,use:"vue-loader"},
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理 字体文件的 loader 
    ] //所有第三方模块的 匹配规则
  },
  resolve:{ //修改vue被导入时的包的路径
    //如果想在引入文件的时候省略后缀名,那么可以这样设置,前提是省略的后缀名都包含在这个数组中.
    extensions:['.js','.vue','.json','.css'], 
    alias:{
      "vue$":"vue/dist/vue.js"
    }
  }
}

// 当我们在 控制台，直接输入 webpack 命令执行的时候，webpack 做了以下几步：
//  1. 首先，webpack 发现，我们并没有通过命令的形式，给它指定入口和出口
//  2. webpack 就会去 项目的 根目录中，查找一个叫做 `webpack.config.js` 的配置文件
//  3. 当找到配置文件后，webpack 会去解析执行这个 配置文件，当解析执行完配置文件后，就得到了 配置文件中，导出的配置对象
//  4. 当 webpack 拿到 配置对象后，就拿到了 配置对象中，指定的 入口  和 出口，然后进行打包构建；