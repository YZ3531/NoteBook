##DAY10-团队实战

### 02-回顾

- 项目收尾
- webpack基础配置
- webpack开发配置
- 打包黑马头条项目
- 团队实战任务



### 03-webpack-sourceMap

为了更容易地追踪错误和警告，JavaScript 提供了 [source map](http://blog.teamtreehouse.com/introduction-source-maps) 功能，将编译后的代码映射回原始源代码。如果一个错误来自于 `b.js`，source map 就会明确的告诉你。

```diff
+   devtool: 'inline-source-map',
    plugins:

```



### 04-webpack-watch监听

我们添加一个用于启动 webpack watch mode 的 npm scripts：

```diff
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
+     "watch": "webpack --watch",
      "build": "webpack"
    },

```

唯一的缺点是，为了看到修改后的实际效果，你需要刷新浏览器。如果能够自动刷新浏览器就更好了，因此接下来我们会尝试通过 `webpack-dev-server` 实现此功能。



### 05-webpack-dev-server

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

### 06-webpack-热更新

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



### 07-webpack-打包vue文件

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

### 08-webpack-路径别名

```js
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

```

### 09-webpack-文件后缀

```diff
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
+    extensions: ['.js', '.vue', '.json', '.css']
  },

```



### 10-打包部署

打包

```bash
npm run build
```

部署（dist目录代码）

不同的后台所部署的服务器不一样。



问题：首屏加载慢（spa网站通病）

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



### 11-打包优化

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





### 12-团队实战-任务





