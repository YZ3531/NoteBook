## 服务端渲染

### 介绍

- Server Side Render (服务端渲染 **SSR**)：服务器直接生成 HTML 文档返回给浏览器，但页面交互能力有限。适合于任何后端语言：PHP、Java、Python、Go 等。
  - 优点：响应速度快(首屏渲染速度快)，有利于 SEO
  - 缺点：前后端代码混合在一起，难以开发和维护，不适合进行前后端分离开发
- Client Side Render (客户端渲染 **CSR)**：页面初始加载的 HTML 文档中无核心内容，需要下载执行 js 文件，由浏览器动态生成页面，并通过 JS 进行页面交互事件与状态管理，SPA 属于客户渲染技术方案
  - 优点：适合前后端分离开发，方便维护，单页应用中几乎都是客户端渲染
  - 缺点：首次加载慢，不利于 SEO
- isomorphic web apps（同构应用）：isomorphic/universal，基于react、vue框架，客户端渲染和服务器端渲染的结合，在服务器端执行一次，用于实现服务器端渲染（首屏直出），在客户端再执行一次，用于接管页面交互，核心解决SEO和首屏渲染慢的问题。
  * 单页面 + 服务端渲染

### Vue 的 SSR

<https://ssr.vuejs.org/zh/>

1. 安装

```bash
npm init -y
npm install vue vue-server-renderer express --save
```

2. 服务端渲染

```javascript
const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()

server.get('/', (req, res) => {
  // 实例化 Vue
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`
  })
	
  // 渲染页面
  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
    `)
  })
})

// 监听端口
server.listen(8080)
```

​        以上是 Vue 官方支持的 SSR 实现，也有在此基础上封装第三方框架，使用这些框架可以提升开发的效率。

## Nuxt

​        Nuxtjs 是一个基于 Vue.js 的服务端渲染框架。

### 快速开始

```bash
npx create-nuxt-app my-nuxt-app

cd my-nuxt-app

npm run dev
```

### 路由

​        在 Nuxtjs 中路由会根据目录结构自动生成路由，也可以手动创建路由。

1. 基础路由

 假设 pages 的目录结构如下： 

```
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```

 那么，Nuxt.js 自动生成的路由配置如下： 

```javascript
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
}
```

2. 动态路由

 在 Nuxt.js 里面定义带参数的动态路由，需要创建对应的**以下划线作为前缀**的 Vue 文件 或 目录。 

 以下目录结构： 

```
pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| users/
-----| _id.vue
--| index.vue
```

 Nuxt.js 生成对应的路由配置表为： 

```javascript
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'users-id',
      path: '/users/:id?',
      component: 'pages/users/_id.vue'
    },
    {
      name: 'slug',
      path: '/:slug',
      component: 'pages/_slug/index.vue'
    },
    {
      name: 'slug-comments',
      path: '/:slug/comments',
      component: 'pages/_slug/comments.vue'
    }
  ]
}
```

3. 嵌套路由

 创建内嵌子路由，你需要添加一个 Vue 文件，同时添加一个**与该文件同名**的目录用来存放子视图组件。 

 假设文件结构如： 

```
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue
```

 Nuxt.js 自动生成的路由配置如下： 

```javascript
router: {
  routes: [
    {
      path: '/users',
      component: 'pages/users.vue',
      children: [
        {
          path: '',
          component: 'pages/users/index.vue',
          name: 'users'
        },
        {
          path: ':id',
          component: 'pages/users/_id.vue',
          name: 'users-id'
        }
      ]
    }
  ]
}
```

### 视图

1. 模板，即vue中的单页(index.html)，Nuxtjs 允许自定义模板， 只需在应用根目录下创建一个 app.html 文件。

```html
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

2. 布局，抽离公共布局结构。

 假设我们要创建一个 *博客布局* 并将其保存到 layouts/blog.vue: 

```html
<template>
  <div>
    <div>我的博客导航栏在这里</div>
    <nuxt/>
  </div>
</template>
```

 然后我们必须告诉页面 (即 pages/posts.vue ) 使用您的自定义布局： 

```html
<template>
  <div></div>
</template>
<script>
  export default {
    // 当前页面应用 blog 布局
    layout: 'blog'
  }
</script>
```

3. 页面，即 vue 组件。

```html
<!-- 组件模板 -->
<template>
  <div></div>
</template>

<!-- 组件逻辑 -->
<script>
  export default {
    
  }
</script>

<!-- 组件样式 -->
<style>

</style>
```

### 异步数据

​        Nuxt.js 扩展了 Vue.js，增加了一个叫 asyncData 的方法，使得我们可以在设置组件的数据之前能异步获取或处理数据。

​        asyncData 方法主要是用于刷新页面时，在服务端获取数据并渲染，它是实现服务端渲染的核心方法。

1. 用法

```html
<template>

</template>

<script>
  import axios from 'axios';
  
  export default {
    // 服务端执行
    async asyncData () {
      const res = await axios.get({
        url: ''
      });
      
      console.log(res);
    }
  }
</script>
```

2. asyncData 返回的数据会与 data 中的数据合并

```html
<template>
	姓名: {{name}}
  年龄: {{age}}
</template>

<script>
  import axios from 'axios';
  
  export default {
    data () {
      return {
        name: '',
        age: 16
      }
    },
    // 服务端执行
    async asyncData () {
      const res = await axios.get({
        url: ''
      });
      // 返回值合并到 data 中
      return {name: '小明', age: 18, gender: '男'}
    }
  }
</script>
```

### Vuex状态树

​        Nuxtjs 中内置了 Vuex， 因为对于每个大项目来说，使用状态树 (store) 管理状态 (state) 十分有必要。

 Nuxt.js 会尝试找到应用根目录下的 store 目录，如果该目录存在，它将做以下的事情： 

1. 引用 vuex 模块
2. 将 vuex 模块 加到 vendors 构建配置中去
3. 设置 Vue 根实例的 store 配置项

[见官方示例](https://zh.nuxtjs.org/guide/vuex-store)

### 插件

​        Nuxtjs支持 Vue 的插件，Vue 中常在入口 main.js 中使用插件，Nuxtjs 则是在 plugins 文件夹中。

 首先增加文件 plugins/vue-notifications.js： 

```javascript
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```

 然后, 在 nuxt.config.js 内配置 plugins 如下： 

```javascript
module.exports = {
  plugins: ['~/plugins/vue-notifications']
}
```

 如果插件位于 node_modules 并导出模块，需要将其添加到 transpile 构建选项： 

```javascript
module.exports = {
  build: {
    transpile: ['vue-notifications']
  }
}
```

### 模块

​         模块是Nuxt.js扩展，可以扩展其核心功能并添加无限的集成，Nuxtjs 官方扩展了 @nuxtjs/axios  模块。

安装

```bash
npm install @nuxtjs/axios
```

配置  nuxt.config.js

```javascript
module.exports = {
  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    // proxyHeaders: false
  }
}
```

拦截器，增加文件 plugins/axios.js： 

```javascript
export default function ({ $axios }) {
  // 请求拦截
  $axios.onRequest(config => {

  })
	
  // 错误拦截
  $axios.onError(error => {
    return error.response.data;
  })
	
  // 响应拦截
  $axios.onResponse(response => {
    return response.data;
  })
}
```

### 命令和部署

*Nuxt.js 提供了一系列常用的命令, 用于开发或发布部署。*

| 命令          | 描述                                                         |
| :------------ | :----------------------------------------------------------- |
| nuxt          | 启动一个热加载的Web服务器（开发模式） [localhost:3000](http://localhost:3000/)。 |
| nuxt build    | 利用webpack编译应用，压缩JS和CSS资源（发布用）。             |
| nuxt start    | 以生产模式启动一个Web服务器 (`nuxt build` 会先被执行)。      |
| nuxt generate | 编译应用，并依据路由配置生成对应的HTML文件 (用于静态站点的部署)。 |

## RealWorld 案例

* 在线示例：
  * https://demo.realworld.io/
* 接口文档：
  * https://github.com/gothinkster/realworld/tree/master/api
* Postman 接口：
  * https://raw.githubusercontent.com/gothinkster/realworld/master/api/Conduit.postman_collection.json
* 页面模板：
  * https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md

- 所需资源
  - https://github.com/gothinkster/realworld-starter-kit





















