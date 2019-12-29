## 黑马头条PC项目-第四天

### 01-反馈

| 姓名 | 意见或建议                                                   |
| ---- | ------------------------------------------------------------ |
| ***  | 对于导航守卫和拦截器的用法有点模糊,里面代码的作用有点闹不清楚 |
| ***  | 1.知道操作流程，但是对main.js月APP.vue,router中的index.js这些文件对应的功能不清楚。 2.js文件是核心吗？为什么组件都引入js文件呢？ |
| ***  | 想问一下老师,不同域名下的session不是通过解决跨域传递session设置的cookie吗?为什么说不能传递的? |
| ***  | 1.不同组件，style不加scoped（style加scoped，样式私有，即使其他组件有相同类名也不会显示相同样式）；有相同类名，组件均会显示相同效果（而组件是独立的，为什么还能共用样式呢，vue单页面，有相同类名就有相同样式，但是组件的独立性呢?不设置 scoped，还有什么相同操作会受影响？） 2.错误信息，点击登陆，分别隔几秒点击，发现弹出几条错误警告，而不是一条，原因：？ |
| ***  | 这次的有点难噢，不过还是挺好哒。有一点小小的建议就是：比如今天有一些比较难理解的知识点，老师讲完之后问了好多次大家有没有听明白，大家都没有回应，差不多冷场了半分钟，其实这时候可能大家都有点懵，老师这时候其实可以不用再问啦，可以再快速的再讲一遍，可能更便于大家理解一些。小小的建议，老师若是讲课时间不够的话，可以忽略哒，课下也能消化，不过有点费劲，嘻嘻~ |
| ***  | 1.关于git分支管理：问题描述+++> 当已经完成首页(home分支)页面的基本配置之后且已经将代码合并到master分支中，这时，再回过头去完善登录页(login分支)中的内容。这样问题就来了，因为在login分支中，主页尚且一片空白。(1)这时想要想要测试token有效性是直接新建一个零时组件来写代码测试，测完就删掉？或者是基于最新进度的master分支再新建一个补充分支来进行开发？(2)还有一个问题就是，login和home分支代码都完成了也都合并到master分支中了，但是想起login分支下还有一个分支中写了一个功能被遗忘了，这时，比较好的做法是？直接回滚代码，然后加分支的内容再进行合并？但是这样可能会有存在冲突代码...或者是将遗忘的功能代码手动复制过来就行。(3)【可忽略】发现之前写的功能有一些功能实现不太人性化，想要修改但是又怕改完有其它问题，所以又新建了一个分支来修改这一功能的代码，长此以往，分支很多很多。问题来了。分支很多会有什么影响吗？废弃分支放着不管还是删除掉？这个分支应该建在当时创建的分支之下合适还是直接在主分支下创建就行？ 2.在正在的企业开发中，像这样的一个项目一般的开发周期是多久？如果再加上APP端呢？ 谢谢！ |
| ***  | await 处理错误可以同 catch 吗？                              |
| ***  | 为什么一个请求在network里会显示发了两次?                     |
| ***  | 文档还是看不懂，                                             |
| ***  | const user = local.getUser() \|\|{}这个不加后面的空括号执行也可以为什么？？？？？ |
| ***  | 开始懵逼了                                                   |
| ***  | 刚哥，能再讲一下登录补充，本地存储用户信息这部分吗？         |
| ***  | 1、本地存储还是不太懂。2、还有什么时候用模板字符串，什么时候用中间键，什么时候用hash，还有会话，路由......能帮我们串一遍吗？3、susu，今天的视频比昨天的声音还小，暴风哭泣，音量得调到80%才能听清，听完了耳朵疼 |
| ***  | 对在什么地方采取哪种跳转页面方式不清楚                       |



### 02-回顾

- 导航守卫  router.beforeEach()  在路由跳转前执行
- 请求拦截器 
  - axios.interceptors.request.use(()=>{},()=.{})
  - 每次请求前
- 响应拦截器
  - axios.interceptors.response.use(()=>{},()=.{})
  - 每次响应后
- style 标签上 scoped
  - 让组件的样式仅在当前组件下生效。
  - 不管任何一个组件的样式，最终都会打包在一个css文件
  - 加了scope之后
    - A组件 .abc{}  B组件  .abc{}
    - 打包后  
      - A组件内标签自动属性[data-123456]  .abc[data-123456]{}   
      - B组件内标签自动属性[data-232311]  .abc[data-232311]{}
- 本地存储用户信息
  - 封装了local.js的模块
  - 提供了三个函数
    - 设置用户信息
    - 获取用户信息
    - 删除用户信息

回顾：

- 了解session的机制
- 使用token进行认证
- 保存token,追加token在每次请求头中
- 本地存储（token）
- 页面访问权限控制
- axios默认配置
  - axios.defaults.headers
- 每次请求头中
  - 请求拦截器
- 每次响应后
  - 如果是401跳转登录
  - 响应拦截器
- 语法：async await 





### 03-改造登录的请求

- async&await
  - 基于promise去使用
  - await 修饰的返回promise的函数  的返回值是 promise成功的结果
  - await 必须在 async 修饰的函数内使用
  - await 修饰的函数是 同步执行 阻塞程序运行
  - async 修饰的函数是异步执行
  - 出现异常怎么处理？？？

```js
    login () {
      // 获取表单组件实例 ---> 调用校验函数
      this.$refs['loginForm'].validate(async valid => {
        if (valid) {
          // 当一段代码不能保证一定没有报错  try {} catch (e) {} 捕获异常处理异常
          try {
            const { data: { data } } = await this.$http.post('authorizations', this.loginForm)
            local.setUser(data)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或验证码错误')
          }
        }
      })
    }
```



### 04-首页补充-信息展示

- 用户的信息存储本地
  - 获取 local.getUser()
- 申明数据
- 在模版中使用

```js
import local from '@/utils/local'
```

```js
      userInfo: {}
```

```js
  created () {
    // 设置用户信息
    const user = local.getUser() || {}
    this.userInfo.name = user.name
    this.userInfo.photo = user.photo
  },
```

渲染

```html
            <img class="headIcon" :src="userInfo.photo" alt />
            <span class="userName">{{userInfo.name}}</span>
```



### 05-首页补充-退出登录

- 跳转个人设置
- 退出登录
  - 清除 本地用户信息
  - 跳转登录页面

绑定点击事件:

```html
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" @click.native="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
```

```js
    // 事件根本没有触发  click事件
    // 给组件绑定事件，如果组件不支持，事件不会触发。
    // 把事件绑定在 组件解析后的原生dom上
    // 事件修饰符：prevent once stop  native意思是把事件绑定在原生dom上
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      local.delUser()
      this.$router.push('/login')
    }
```



组件提供方式：

```html
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
```

```html
<el-dropdown class="dropdown" @command="handleClick">
```

```js
    handleClick (command) {
      // command 值  setting | logout
      // this[command]() === this.setting()
      // this[logout]() === this.logout()
      this[command]()
    }
```



### 06-内容管理-组件与路由

组件：

```html
<template>
  <div class='container-article'>Article</div>
</template>

<script>
export default {}
</script>

<style scoped lang='less'></style>
```

路由：

```js
import Article from '@/views/article'
```

```js
        // 内容管理
        { path: '/article', component: Article }
```





### 07-内容管理-激活导航菜单

- 问题：当前激活的导航菜单，并不是对应的导航。
- default-active="/" 默认是首页
  - 获取当前路由的path
  - 设置个default-active属性
- 补充：
  - $router  调用函数
  - $route 获取路由信息
    - 路径
    - query传参
    - params传参

```html
      <el-menu
        :default-active="$route.path"
```





### 08-内容管理-筛选条件布局

- 面包屑导航
  - 路径导航
- 表单
  - 单选框
  - 选择器
  - 日期选择

```html
<!-- 筛选条件布局 -->
    <el-card>
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 表单 -->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="reqParams.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <!-- v-model 绑定的数组  [起始时间,结束时间] -->
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
```

数据：

```js
export default {
  data () {
    return {
      // 筛选参数
      // 使用axios提交数据时候  如果数据的值为null是不会提交该字段
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 频道选项数据
      channelOptions: [{ value: 1, label: 'java' }, { value: 2, label: '前端' }],
      // 日期数组
      dateArr: []
    }
  }
}
```





### 09-内容管理-vue插槽基础

- 默认插槽
- 备用内容
- 具名插槽
- 作用域插槽

> 目的：封装组件，看懂UI框架提供的插槽代码



默认插槽：当你只有一处内容需要插入

```html
<slot></slot>
```



备用内容：当你不插入内容的时候，默认显示一些结构。

```html
<slot>备用内容</slot>
```



具名插槽：当你需要插入多处内容的时候

- 封装组件

```html
  <div class='container-page'>
    <!-- 头 -->
    <p>header</p>
    <!-- 内容 -->
    <div>
      <!-- 留一个坑 -->
      <slot name="content">备用内容</slot>
    </div>
    <!-- 底 -->
    <p>
      <!-- 留一个坑 -->
      <slot name="footer">footer</slot>
    </p>
  </div>
```

- 使用组件

```html
    <page-one>
      <div slot="content">内容</div>
      <div slot="footer">底部</div>
    </page-one>
```



作用域插槽：当组件内部的数据，想在插槽内容中使用。

- 封装组件

```html
<template>
  <div class='container-page'>
    <!-- 头 -->
    <p>header</p>
    <!-- 内容 -->
    <div>
      <!-- 留一个坑 -->
      <slot name="content" :pn="pageName" test="测试">备用内容</slot>
    </div>
    <!-- 底 -->
    <p>
      <!-- 留一个坑 -->
      <slot name="footer">footer</slot>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageName: '组件内部数据'
    }
  }
}
</script>
```

- 使用组件

```html
    <page-one>
      <!-- scope 作用域意思  作用：收集该插槽传入的所有数据 -->
      <div slot="content" slot-scope="scope">内容 {{scope.pn}}</div>
      <div slot="footer">底部</div>
    </page-one>
```

**补充新的指令 v-slot**

- v-slot:插槽名称="所有数据变量名称"

```html
      <!-- <div slot="content" slot-scope="scope">内容 {{scope.pn}}</div> -->
      <template v-slot:content="scope">内容 {{scope.pn}}</template>
```



### 10-内容管理-面包屑组件封装

- 创建一个组件，components下，内容就是面包屑内容。
- 预留默认插槽
- 把组件注册到全局
- 使用即可

创建组件：components/my-bread.vue

```html
<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>
      <slot></slot>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {}
</script>

<style scoped lang='less'></style>

```

全局注册：main.js

```js
import MyBread from '@/components/my-bread'
Vue.component('my-bread', MyBread)
```

使用组件：

```html
<my-bread>内容管理</my-bread>
```



### 11-内容管理-vue插件封装

- main.js中不负责组件的注册，所有的全局组件的注册提取出去。
- 封装一个插件，注册所有的全局组件。
- 基于vue的插件：
  - 是一个js模块
  - 导出一个对象
  - 对象中必须有一个选项：install
  - 指定的是一个函数
    - 默认的传参  Vue 对象
    - 基于 Vue 对象做任何事情

封装：

```js
import MyBread from '@/components/my-bread'
export default {
  install (Vue) {
    // Vue 是一个构造函数
    Vue.component('my-bread', MyBread)
  }
}
```

使用：

```js
import plugin from '@/components'
Vue.use(plugin)
```







### 12-内容管理-查询结果布局

