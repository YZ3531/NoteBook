## 黑马头条后台管理项目-DAY04

### 02-回顾

- 保存用户信息

  - sessionStorage

- 控制页面访问全局

  - 前置导航守卫

- 请求头部携带token

  - axios的请求拦截器

- 处理token失效的情况

  - axios的响应拦截器  401

- 介绍async await 使用规则

  



### 03-登录-async&await使用

```js
// 1. 获取登录成功后的 用户信息数据  res = {data:{data:'用户信息',message:'提示'}}
          // 2. 当获取数据失败 提示错误信息
          // 3. js基础语法怎么去捕获异常（报错）
          // try{ //可能报错的代码 }catch(exception){ //获取到异常报错（处理异常） }
          // await 获取promise的成功结果，失败使用try{}catch(e){}进行处理。
          try {
            const { data: { data } } = await this.$http.post('authorizations', this.loginForm)
            store.setUser(data)
            this.$router.push('/')
          } catch (e) {
            // 进行错误提示即可
            this.$message.error('手机号或验证码错误')
          }
```

- js怎么捕获异常。
  - 任何可能报错代码，使用 try{}catch(e){} 进行处理。



### 04-首页-用户信息

```js
  data () {
    return {
      isCollapse: false,
      name: '',
      photo: ''
    }
  },
```

```js
import store from '@/store'
```

```js
  created () {
    const user = store.getUser()
    this.name = user.name
    this.photo = user.photo
  },
```

渲染：

```html
<img class="avatar" :src="photo" alt />
<span class="name"> {{name}}</span>
```



### 05-首页-退出登录

- 绑定点击事件，下拉选项。

```html
<el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" @click.native="setting()">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" @click.native="logout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
```

```js
// 绑定的是 click 事件，原生DOM支持的事件。
    // el-dropdown-item 组件，是否支持click事件，看文档。
    // 怎么给组件绑定原生的事件？？？
    // 按键修饰符：@keyup.enter  按下enter键后触发的事件
    // 事件修饰符：@click.stop  阻止事件冒泡
    // 事件修饰符：@click.native 给组件绑定原生的事件

    // 个人设置
    setting () {
      this.$router.push('/setting')
    },
    // 退出登录
    logout () {
      // 1. 删除本地的用户信息
      store.delUser()
      // 2. 跳转到登录
      this.$router.push('/login')
    },
```

- 组件是提供了监听点击过选项操作。
  - dropdown组件 command 事件  回调参数   选项的指令
  - dropdown-item组件，command属性的值 指令。

```html
<el-dropdown-item icon="el-icon-setting" command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" command="logout">退出登录</el-dropdown-item>
```

```html
<el-dropdown class="my-dropdown" @command="clickItem">
```

```js
 methods: {
    clickItem (command) {
      // 判断值  setting 还是 logout
      // 如果 command === setting 调用  this.setting()
      // 如果 command === logout 调用  this.logout()
      // 意思：const o = {a:10,b:20}  等价  o.a === o['a']
      this[command]()
    },
```



### 06-内容管理-组件与路由

组件：views/article/index.vue

```html
<template>
  <div class='container'>Article</div>
</template>

<script>
export default {}
</script>

<style scoped lang='less'></style>

```

路由：router/index.js

```diff
import Article from '@/views/article'

{
      path: '/',
      component: Home,
      children: [
        // 路由规则  子路由有名称  父路由不需要设置name属性
        { path: '/', name: 'welcome', component: Welcome },
+        { path: '/article', name: 'article', component: Article }
      ]
    },
```



### 07-内容管理-筛选条件布局

结构

```html
<!-- 筛选项 -->
    <el-card>
      <!-- 头部 -->
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 表单 -->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <!-- 依赖两项  下拉选择器的值  下拉选择器的选项 -->
          <el-select v-model="reqParams.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期：">
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
data () {
    return {
      // 提交给后台的参数对象
      // 通过axios提交给后台，字段的值为null，这项数据不会提交。
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 频道的下拉选项数据
      channelOptions: [{ id: 100, name: 'php' }],
      // 日期数据  格式数组 [起始日期，结束日期]
      dateArr: []
    }
  }
```



### 08-内容管理-vue插槽

> 当你使用组件的时候，需要往组件内部插入不同内容，需要使用插槽。

- 默认插槽 ( 当你只传入一处内容的时候 )

```html
<!-- 封装组件  默认接收使用组件传入内容 -->
<slot></slot>
```

- 备用内容（当你可能不传入内容）

```html
<!-- 封装组件 使用组件的时候没有传人内容，使用slot中的默认内容 -->
<slot>默认内容</slot>
```

- 具名插槽( 当你需要往插槽传入多处内容 )

```html
<!-- 封装组件 有名字的插槽 -->
<slot name="content">默认内容</slot>
```

```html
<!-- 使用组件 -->
<div slot="content">内容1</div>
```

- 作用域插槽 （当你在使用组件的时候，在使用插槽的时候，需要使用组件内部数据）

```html
<!-- 插槽作用域下 绑定两项数据  msg  list -->
<slot name="content" :msg="message" list="数组">默认内容</slot>
```

```html
<!-- slot-scope="scope" 接收作用域插槽上所有绑定的数据，数据的集合名字叫scope对象{msg:'',list:''} -->
<div slot="content" slot-scope="scope">内容1 {{scope.msg}}</div>
```

新语法：v-slot

```html
<!-- slot="content" 指定插槽名称  -->
      <!-- slot-scope="scope" 接收作用域插槽上所有绑定的数据，数据的集合名字叫scope对象{msg:'',list:''} -->
      <!-- <div slot="content" slot-scope="scope">内容1 {{scope.msg}}</div> -->
      <!-- 在vue版本 2.6.0 之后提供了新的写法  v-slot:插槽名称="作用域数据对象" -->
      <template v-slot:content="scope">内容1 {{scope.msg}}</template>
```



**封装组件，理解element-ui（任何UI组件）提供的组件代码。**



### 09-内容管理-面包屑组件封装

封装组件：components/my-bread.vue

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

<style scoped lang='less'></style>`

```

使用组件：

```js
import MyBread from '@/components/my-bread'
export default {
  components: { MyBread },
```

```html
<!-- 使用封装的组件 -->
<my-bread>内容管理</my-bread>
```



### 10-内容管理-vue插件封装

- 怎么定义一个基于vue的插件：
  - 规则：需要js模块，导出一个对象，必须包含一个选项install，是一个函数，接收一个对象Vue
  - 功能：在install去实现，Vue对象基础之上，去扩展功能。

封装插件：components/index.js

```js
// 封装一个插件，目的全局注册components下所有的组件。
import MyBread from '@/components/my-bread'
export default {
  install (Vue) {
    // Vue 对象  main.js 使用 Vue.use(插件) 调用install函数，传入当前的Vue对象
    Vue.component(MyBread.name, MyBread)
  }
}

```

使用插件：main.js

```js
import myPlugin from '@/components'
Vue.use(myPlugin)
```



### 11-内容管理-查询结果布局

```html
<!-- 筛选结果 -->
    <el-card>
      <div slot="header">根据筛选条件共查询到 0 条结果：</div>
      <!-- 表格 -->
      <el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination class="pager" background layout="prev, pager, next" :total="1000"></el-pagination>
    </el-card>
```

数据：

```js
// 表格数据
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
```





