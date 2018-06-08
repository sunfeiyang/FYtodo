//webpack用来打包前端资源
//path是nodeJs的一个基本包，用来处理路径的
const path = require('path')
//引入html-webpack-plugin
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
//获得在package.json中设置的参数（区分是开发环境还是正式环境）
//package.json设置对象全部存储在process.env对象中
const isDev = process.env.NODE_ENV === 'development'
//module.exports = {
const config = {
    //确定编译目标
    target: 'web',
    //用来处理路径（使用绝对路径，保证不出现错误）
    //输入文件使用绝对路径，_dirname 当前路径加后面''中的路径
    entry: path.join(__dirname, 'src/index.js'),
    //输出路径，filename 输出文件名 path 输出文件的路径
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
              test: /\.vue$/,
              loader: 'vue-loader'
            },
            {
              test: /\.jsx$/,
              loader: 'babel-loader'
            },
            {
              test: /\.css$/,
              use: [
                'style-loader',//将css写入html中
                'css-loader'
              ]
            },
            {
              //css预处理器
              test: /\.styl$/,
              use: [
                'style-loader',
                'css-loader',
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: true
                  }
                },
                'stylus-loader'
              ]
            },
            {
              test: /\.(gif|jpg|jpeg|png|svg)$/,
              use: [
                {
                  loader: 'url-loader',//小于1024 转换为base64代码
                  options: {
                    limit: 1024,
                    name: '[name]-aaa.[ext]'
                  }
                }
              ]
            }
        ]
    },
    plugins:[
      //判断环境，区分打包
      //此处设置以后可以在js中引用
      new webpack.DefinePlugin({
        'process.env':{
          NODE_ENV: isDev ? '"development"' : '"production"'
        }
      }),
      new HTMLPlugin()
    ]
}

if(isDev){
  //处理代码的页面调试
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8888,
    host: '0.0.0.0',
    overlay: {
      errors: true,
    },
    //请求数据时跨域问题处理
    proxy: {
      // 请求到 '/device' 下 的请求都会被代理到 target： http://debug.xxx.com 中
      '/api/*': { 
          target: 'http://127.0.0.1:8080/',
          secure: false, // 接受 运行在 https 上的服务
          pathRewrite: {'/api/' : ''},
          changeOrigin: true
        }
    },
    //将没有映射的地址自动映射
    // historyFallback: {}
    //启动以后直接打开浏览器
    // open: true
    //热加载
    hot: true
  }
  //热加载配置
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
  new webpack.ProvidePlugin({
    jQuery: "jquery",
    $: "jquery"
  })
}

module.exports = config