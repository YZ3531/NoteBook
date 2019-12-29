## webpack基础学习

### 前言

> 了解前端模块化进程，知道前端模块化历史。

1. 早期js是没有模块化概念。弊端：可维护性差

2. 前端模块化
   1. require.js  提供一套模块化规范   AMD规范   异步模块化规范
      1. 前置加载
   2. sea.js   提供一套模块化规范   CMD规范  通用模块化规范（异步）
      1. 按需加载
3. nodejs，js在服务端运行环境
   1. commonjs规范(同步)
      1. 导出  module.exports  === exports
      2. 导入 require
4. ES6模块化 (同步)
   1. 导出 export default {}
   2. 导入 import xxx from xxx
5. 前端构建工具 webpack  gulp



### 01-webpack-介绍

- 中文官网：http://www.webpackjs.com
- 官方网站：https://webpack.js.org

*本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。*

- webpack是基于Nodejs的命令行工具
- 默认的作用是打包JS模块资源
- 当然配置**加载器**后，可以打包所有类型的资源文件。
- 也通过安装**插件**，可以对输出结果进行修改。
- 最后可以支持项目开发环境，提供**服务器**功能。

学习目的：

- 了解webpack这个工具基础使用
- 基于vue-cli可以自行修改一些默认配置



### 02-webpack-安装

全局安装：

```sh
npm i webpack -g
npm i webpack-cli -g
```

- 安装后，可以在全局使用命令 `webpack` ，但是不建议全局安装，因为各个项目依赖的版本不一样，全局更新后将影响，其他版本的项目。

**推荐本地项目单独使用：**

1. 初始化项目

```bash
npm init -y
```

2. 安装  --save-dev 简写 -D

```sh
npm i webpack -D
npm i webpack-cli -D
```

3. 配置package.json

```json
{
    "scripts":{
        "build":"webpack"
    }   
}
```

4. 调用webpack工具

```bash
npm run build
```



### 03-webpack-打包模式（mode）

- 需要在配置文件下进行配置
- 默认的配置文件名称是：webpack.config.js

```js
module.exports = {
    //development 开发模式打包 打包速度快 没做优化处理
    //production 生成模式打包 打不速度慢 做了一些优化处理，压缩
    mode: 'development 开发模式打包'
} 
```



### 04-webpack-入口与出口

- 默认入口是 src下的index.js文件
- 默认出口是 dist 目录下的 main.js 文件

```js
const path = require('path');

module.exports = {
  // 打包的入口文件
  entry: './src/index.js',
  // 输出的出口文件
  output: {
    // 必须指定的是绝对路径
    path: path.join(__dirname, './dist'),
    filename: 'main.js'
  }
};
```



### 05-webpack-打包css

安装依赖

```bash
npm install --save-dev style-loader css-loader
```
添加配置

```diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist')
    },
+   module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: [
+           'style-loader',
+           'css-loader'
+         ]
+       }
+     ]
+   }
  };

```



### 06-webpack-打包less

安装依赖

```diff
npm install --save-dev style-loader css-loader less less-loader
```
添加配置

```diff
const path = require('path')
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve('./dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }, 
+      {
+        test: /\.less$/,
+        use: [
+          'style-loader',
+          'css-loader',
+          'less-loader'
+        ]
+      }
    ]
  }
}

```



###07-webpack-插件-HtmlWebpackPlugin

安装file-loader

```
npm install --save-dev file-loader
```

配置加载规则

```diff
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
```

遇到一些图片资源，安装路径加载资源的时候，根目录下的index.html无法预览。

**自动把 预览的index.html  打包到dist目录，那该多好啊？？？**

```bash
npm install --save-dev html-webpack-plugin
```

使用配置

```diff
  const path = require('path');
+ const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
+   plugins: [
+     new HtmlWebpackPlugin({
+       template: './index.html'
+     })
+   ],
```



### 08-webpack-插件-CleanWebpackPlugin

- 中文官网  https://webpackjs.com
- 国外官网 [https://webpack.js.org](https://webpack.js.org/)

安装：

```bash
npm install --save-dev clean-webpack-plugin
```

配置：

```diff
+ const { CleanWebpackPlugin } = require('clean-webpack-plugin');

    plugins: [
+     new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Output Management',
      }),
    ],
```

清理dist目录



### 09-webpack-sourceMap

为了更容易地追踪错误和警告，JavaScript 提供了 [source map](http://blog.teamtreehouse.com/introduction-source-maps) 功能，将编译后的代码映射回原始源代码。如果一个错误来自于 `b.js`，source map 就会明确的告诉你。

```diff
+   devtool: 'inline-source-map',
    plugins:

```



### 10-webpack-watch监听

我们添加一个用于启动 webpack watch mode 的 npm scripts：

```diff
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
+     "watch": "webpack --watch",
      "build": "webpack"
    },

```

唯一的缺点是，为了看到修改后的实际效果，你需要刷新浏览器。如果能够自动刷新浏览器就更好了，因此接下来我们会尝试通过 `webpack-dev-server` 实现此功能。



### 11-webpack-dev-server

`webpack-dev-server` 为你提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading),自动刷新浏览器进行实时的预览。

```bash
npm install --save-dev webpack-dev-server
```

```diff
    devtool: 'inline-source-map',
+   devServer: {
+     contentBase: './dist'
+   },

```

**package.json**

```diff
    "scripts": {
+     "serve": "webpack-dev-server --open",

```

执行：

```bash
npm run serve
```

- 不会把资源打包到磁盘中，存储在内存中。读取更快。



### 12-webpack-热更新

- 实现浏览器不刷新，更新打包后的结果，默认对js不生效，对样式，vue组件生效。

```diff
+ const webpack = require('webpack');

  module.exports = {
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
+     hot: true
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: '模块热替换'
      }),
+     new webpack.HotModuleReplacementPlugin()
    ],

```



### 13-webpack-打包vue文件

https://vue-loader.vuejs.org/zh/guide/#vue-cli

```bash
npm install -D vue-loader vue-template-compiler
```

```js
// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  module: {
    rules: [
      // ... 其它规则
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
}

```



### 14-webpack-路径别名

```js
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

```



### 15-webpack-文件后缀

```diff
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
+    extensions: ['.js', '.vue', '.json', '.css']
  },

```



### 16-打包部署

vue项目打包

```bash
npm run build
```

部署（dist目录代码），不同的后台所部署的服务器不一样。



**问题：首屏加载慢（spa网站通病）**

- chunk-vendors-xxxxxx.js   所有第三方模块打包文件    **1867kb**
- app.xxxxx.js  所有自己模块打包文件
- chunk-vendors-xxxxxx.css  所有第三方css打包文件
- app.xxxxx.css 所有自己css打包文件

方案：按需加载（路由懒加载）

```js
// const Foo = () => import('./Foo.vue') 路由懒加载  将代码分块

const Login = () => import('@/views/login')
const Home = () => import('@/views/home')
const Welcome = () => import('@/views/welcome')
const NotFound = () => import('@/views/404')
const Test = () => import('@/views/test')
const Article = () => import('@/views/article')
const Image = () => import('@/views/image')
const Publish = () => import('@/views/publish')
const Comment = () => import('@/views/comment')
const Setting = () => import('@/views/setting')
const Fans = () => import('@/views/fans')
```



### 17-打包优化

- 打包后个别块代码，还是体积较大，因为依赖一些较大的第三方包。
- 将第三方包，分割出去，降低打包代码体积。
  - 使用cdn引入方式（script标签引入其他服务器资源）
    - cdn是提供前端资源的网站  例如 echarts
  - 排除对应的包的导入
    - 注释 import echarts from 'echarts'   不建议使用
    - 配置webpack排除这些包不去打包。
  - 才能在打包降低体积



具体配置：

public/index.html

```html
<script src="https://cdn.bootcss.com/echarts/4.3.0-rc.1/echarts.min.js"></script>
```

vue.config.js

```js
// 进行vue-cli配置
// vue-cli配置实现了部分webpack的配置
module.exports = {
  // 覆盖webpack的配置选项
  configureWebpack: {
    externals: {
      // key 包名 value 暴露全局的变量名
      echarts: 'echarts'
    }
  }
}

```















