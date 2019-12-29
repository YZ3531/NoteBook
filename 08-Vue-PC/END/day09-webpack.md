## DAY09-webpack基础

### 02-回顾

- 粉丝管理-基础布局

```html
<template>
  <div class='container'>
    <el-card>
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <!-- tabs -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <div class="fans_list">
            <div class="fans_item" v-for="item in 24" :key="item">
              <el-avatar :size="80" src="http://toutiao.meiduo.site/Fkj6tQi3xJwVXi1u2swCElotfdCi"></el-avatar>
              <p>粉丝名称</p>
              <el-button type="primary" plain size="small">+关注</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="photo">粉丝画像content</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'list'
    }
  }
}
</script>

<style scoped lang='less'>
.fans_item{
  width: 120px;
  height: 170px;
  border: 1px dashed #ddd;
  text-align: center;
  padding-top: 10px;
  display: inline-block;
  margin-right: 50px;
  margin-bottom: 20px;
  p{
    font-size: 12px;
  }
}
</style>

```



- 粉丝管理-粉丝列表

结构：

```html
<el-tab-pane label="粉丝列表" name="list">
          <div class="fans_list">
            <!-- item.id 使用json-bigint的插件  转换后的数据格式是对象  转换string -->
            <div class="fans_item" v-for="item in fansList" :key="item.id.toString()">
              <el-avatar :size="80" :src="item.photo"></el-avatar>
              <p>{{item.name}}</p>
              <el-button type="primary" plain size="small">+关注</el-button>
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="changePager"
            hide-on-single-page
          ></el-pagination>
        </el-tab-pane>
```

数据：

```js
   reqParams: {
        page: 1,
        per_page: 24
      },
      fansList: [],
      total: 0
```

函数：

```js
changePager (newPage) {
      this.reqParams.page = newPage
      this.getFansList()
    },
    async getFansList () {
      const { data: { data } } = await this.$http.get('followers', { params: this.reqParams })
      this.fansList = data.results
      this.total = data.total_count
    }
```



- 粉丝管理-粉丝画像（echarts使用）

  - 数据可视化，用图表来表示数据。（柱状图，饼状图，折线图，K线图，雷达图）

  - web开发中绘制图表：canvas 技术   提供的api特别多，实现很麻烦。

  - 数据可视化插件，echarts.js (基于原生JavaScript)是百度开发，全面。  highcharts 国外。

  - 官网：[https://www.echartsjs.com](https://www.echartsjs.com/)

  - 使用的步骤：

    - 安装：npm install echarts --save
    - 导入：import echarts from 'echarts'
    - 准备具备高宽DOM容器

    ```html
     <div ref="dom" style="width: 600px;height:400px;"></div>
    ```

    - 初始化(组件渲染完毕  mounted )

    ```js
    const dom = this.$refs.dom
    const myEcharts = echarts.init(dom)
    ```

    - 准备配置项

    ```js
    // 将来你需要什么图表  你就使用图表对应的配置项即可。
    const option = {}
    ```

    - 使用配置项

    ```js
    myEcharts.setOption(option)
    ```

    - 如需要自定义：<https://www.echartsjs.com/zh/option.html>



### 03-模块化历程

起初，js没有模块化概念，导致出现一些问题：

- 容易造成变量污染
- 文件之间的依赖关系模糊

浏览器端模块化：异步模块化规范

- require.js 是AMD（异步模块化规范）规范    依赖前置
- sea.js 说CMD （通用模块化规范） 规范  依赖就近

Nodejs模块化：同步模块化规范

- CommonJS规范
- 导出：module.exports
- 导入：require

ES6模块化：同步模块化规范

- 默认导出  export default
- 导入 import xxx from 'xxx'

在浏览器端无法使用，Es6的模块化，需要使用**打包工具**，将基于Es6的的模块打包在一起，用前端模块化进行加载。



### 04-webpack-介绍

- 中文官网：http://www.webpackjs.com
- 官方网站：https://webpack.js.org

*本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。*

- webpack是基于Nodejs的命令行工具
- 默认的作用是打包JS模块资源
- 当然配置加载器后，可以打包所有类型的资源文件。
- 也通过安装插件，可以对输出结果进行修改。
- 最后可以支持项目开发环境，提供服务器功能。

学习目的：

- 了解webpack这个工具基础使用
- 基于vue-cli可以自行修改一些默认配置



### 05-webpack-安装

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
   - nodemon app.js  node app.js
   - npm run start  简写 npm start
   - npm run serve  在package.json  scripts配置过

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



### 06-webpack-打包模式（mode）

- 需要在配置文件下进行配置
- 默认的配置文件名称是：webpack.config.js

```js
module.exports = {
    //development 开发模式打包 打包速度快 没做优化处理
    //production 生成模式打包 打不速度慢 做了一些优化处理，压缩
    mode: 'development 开发模式打包'
} 
```



### 07-webpack-入口与出口

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



### 08-webpack-打包css

```bash
npm install --save-dev style-loader css-loader
```

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



### 09-webpack-打包less

```diff
npm install --save-dev style-loader css-loader less less-loader
```

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



### 10-webpack-打包图片

```bash
npm install --save-dev file-loader
```

```diff
onst path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
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
+       {
+         test: /\.(png|svg|jpg|gif)$/,
+         use: [
+           'file-loader'
+         ]
+       }
      ]
    }
  };

```



### 11-webpack-打包字体文件

```css
@font-face{
  font-family: 'myfont';
  src:url(../fonts/font.ttf) format('truetype')
}
body{
  font-family: 'myfont';
  background: hotpink;
}

```



```diff
+       {
+         test: /\.(woff|woff2|eot|ttf|otf)$/,
+         use: [
+           'file-loader'
+         ]
+       }

```



### 12-webpack-生成html

```bash
npm install --save-dev html-webpack-plugin
```

```diff
+   plugins: [
+     new HtmlWebpackPlugin({
+       title: 'Output Management'
+     })
+   ],

```

如果你想要了解更多 `HtmlWebpackPlugin` 插件提供的全部功能和选项，那么你就应该多多熟悉 [`HtmlWebpackPlugin`](https://github.com/jantimon/html-webpack-plugin) 仓库。

使用自己的文件做为模版：

```diff
+   plugins: [
+     new HtmlWebpackPlugin({
+       template: 'index.html'
+     })
+   ],

```



### 13-webpack-清理dist

- 参照官网

https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder

```bash
npm install clean-webpack-plugin --save-dev
```

```diff
+ const {CleanWebpackPlugin} = require('clean-webpack-plugin');
```

```diff
    plugins: [
+     new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Output Management'
      })
    ],

```



### 14-webpack-babel介绍

- 目前部分浏览器和 Node.js 已经支持 ES6，但由于它们对 ES6 所有的标准支持不全，这导致在开发中不敢全面地使用 ES6。
- Babel 是一个 JavaScript 编译器，能将 ES6 语法转为 ES5 语法，让你使用最新的语言特性而不用担心兼容性问题，把采用 ES6 编写的代码转换成目前已经支持良好的 ES5 代码。

- 官网：https://babeljs.io/



### 15-webpack-babel使用

```bash
npm install -D babel-loader @babel/core @babel/preset-env 
```

```javascript
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}

```

以上操作是语法解析，但是ES6还更新了一些高阶函数。

```bahs
npm install --save @babel/polyfill
```

使用：优先加载

```js
import "@babel/polyfill";
```

或者：

```js
module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
};
```



