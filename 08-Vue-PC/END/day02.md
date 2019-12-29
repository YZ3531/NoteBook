## DAY02-黑马头条PC

### 02-回顾

- 介绍项目
- 回忆技术
- element-ui
  - 组件库，封装成插件形式。
  - 适合 开发PC管理系统
- vue-router
- 约定路由的规则
- 登录模块
  - 登录页面



使用UI组件库：

- 根据需求找组件

  - 找到示例：

    - 示例代码，分析代码

    

    

    

    



### 03-登录模块-添加校验

- Form 组件提供了表单验证的功能，只需要通过 `rules` 属性传入约定的验证规则，并将 Form-Item 的 `prop` 属性设置为需校验的字段名即可
- el-form  属性 rules 指定校验规则
- el-form-item 属性 prop 指定需要被校验的字段名称

```html
<el-form :model="loginForm" :rules="loginRules">
```

```js
// 表单校验规则对象
      loginRules: {
        // 给字段加校验规则（多个）
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { len: 6, message: '验证码长度6位', trigger: 'blur' }
        ]
      }
```

```html
 <el-form-item prop="mobile">
```

```html
<el-form-item prop="code">
```



**自定义校验规则：**

- 需要规则对象中，配置选项 validator 执行的自己定义的校验函数
- 安装约定定义函数：
  - 需要在 data(){} return之前定义函数
  - 必须三个传参，rule value callback
    - rule 规则对象
    - value 是字段对应的值
    - callback 是校验后的回调函数
      - 成功  callback()
      - 失败 callback(new Error('提示信息'))

```js
// 定义一个校验函数
    const checkMobile = (rule, value, callback) => {
      // 实现校验逻辑
      // 是否是合法手机号：第一位数字 只能1 第二位数字 3-9 其余9位数字结尾 即可
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机号不合法'))
      }
      callback()
    }
//return {
```

```diff
mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          // change 值改变触发 校验规则
+          { validator: checkMobile, trigger: 'change' }
        ],
```



### 04-登录模块-整体校验

- validate 函数属于el-form组件
  - validate(fn(valid){  //判断是否校验成功   })
- 怎么调用其他组件的函数
  - 获取这个组件实例 
    - 给组件 属性 ref="vm"
    - this.$refs.vm  前提做好上一步
  - 获取dom元素
    - 给标签 属性 ref="dom"
    - this.$refs.dom 前提做好上一步

- 怎么获取dom，怎么获取组件实例

```html
<div class='container' ref="box">
<el-form ref="loginForm" 
```

获取：组件渲染完毕，获取dom

```js
  mounted () {
    // 渲染完毕
    // $refs  是当前组件上所有使用过ref属性的元素集合（对象）
    // ref="value" value就是你集合中的属性名称
    // const box = this.$refs.box  标签  dom
    // const loginForm = this.$refs.loginForm
    // console.log(box)   组件  vue实例
    // console.log(loginForm)
  },
```



自己业务的代码：



### 05-登录模块-进行登录

- 需要api.md文档，得到信息：
  - 地址 http://ttapi.research.itcast.cn/mp/v1_0/authorizations
  - 方式 POST
  - 传参
    - 请求头传参
    - url?进行传参  键值对字符串传参
    - user/100  路径传参
    - 请求体
  - 返回数据

在main.js配置axios

```js
// 简单配置axios
import axios from 'axios'
Vue.prototype.$http = axios
```



```html
 <el-form-item>
           <el-button @click="login()" type="primary" style="width:100%">登 录</el-button>
        </el-form-item>
```

```js
methods: {
    login () {
      // 调用 validate 对整体表进行校验
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 校验成功  调用登录接口
          this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
            .then(res => {
              // 成功 跳转
              // 注意 登录 不够完善
              this.$router.push('/')
            })
            .catch(() => {
              // 失败 提示
              this.$message.error('手机号或验证码错误')
            })
        }
      })
    }
  }
```







###06-登录模块-怎么注册

测试帐号：13911111111

万能验证码：246810



但是：大家不要使用这个帐号，同时使用的时候数据会有冲突，得不到准确的测试结果。



怎么注册：

- 大家下载  黑马头条 APP  （浏览器搜索  .apk 仅支持安卓）
- 登录（注册）
  - 自己手机（自己能记住）
  - 万能验证码
  - 登录（注册成功）
  - PC端使用这个手机号。

 



### 07-首页模块-路由与组件

views/home/index.vue

```html
<template>
  <div class='container'>Home</div>
</template>

<script>
export default {}
</script>

<style scoped lang='less'></style>

```

```js
// router/index.js
{ path: '/', name: 'home', component: Home }
  ]
```





### 08-首页模块-基础布局

```html
<template>
  <el-container class="my-container">
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
</script>

<style scoped lang='less'>
// 标签选择器  渲染后显示组件的html标签  不是当前的自定义标签
// 渲染后的标签上 有一个类 类的名称和自定义标签（组件）的名称一致
// FE  front end  前端简写
.my-container{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside{
    background: #002033;
  }
  .el-header{
    border-bottom: 1px solid #ddd;
  }
}
</style>

```





###09-首页模块-头部内容

```html
<el-header>
        <span class="icon el-icon-s-fold"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <!-- 下拉菜单组件 -->
        <el-dropdown class="my-dropdown">
          <span class="el-dropdown-link">
            <img class="avatar" src="../../assets/images/avatar.jpg" alt="">
            <span class="name"> 用户名称</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <!-- vue基础知识  插槽 -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
```

对应样式：

```less
.el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .icon {
      font-size: 24px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
    }
    .my-dropdown{
      float:right;
      .avatar{
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
      .name{
        color: #333;
        font-weight: bold;
        vertical-align: middle;
      }
    }
  }
```



### 10-首页模块-分析导航菜单组件

```html
<!-- el-menu 菜单容器  -->
<!-- default-active="2" 当前激活菜单的 index的值  指定激活的菜单项  -->
<!-- background-color="#545c64" 背景颜色 -->
<!-- text-color="#fff" 文字颜色  -->
<!-- active-text-color="#ffd04b" 激活菜单文字颜色  -->
<el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <!-- el-submenu 菜单项 包含子菜单容器 el-menu-item 菜单项 没有子菜单 -->
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
    </el-menu>
```

###11-首页模块-绘制导航菜单

```html
<el-aside width="200px">
      <!-- logo -->
      <div class="logo"></div>
      <!-- 导航菜单 -->
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="7">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
```

样式：

```less
.el-aside {
    background: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url(../../assets/images/logo_admin.png) no-repeat
        center / 140px auto;
    }
    .el-menu{
      border-right: none;
    }
  }
```



###12-首页模块-欢迎页面

- 配置路由，二级路由，属于home。

组件：views/welcome/index.vue

```html
<template>
  <div class='container' style="text-align:center">
    <img src="../../assets/images/welcome.jpg" alt="">
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang='less'></style>
```

配置路由：

```diff
const router = new VueRouter({
  // 定义路由规则（路径==>组件）
  routes: [
    // name选项作用  找到对应的路由规则
    // 跳转方便一些：$router.push('/login') 或者 $router.push({name:'login'})
    { path: '/login', name: 'login', component: Login },
    {
      path: '/',
      component: Home,
+      children: [
+        // 路由规则  子路由有名称  父路由不需要设置name属性
+        { path: '/', name: 'welcome', component: Welcome }
+      ]
    }
  ]
})
```



###13-首页模块-导航菜单折叠效果

- 切换效果：
  - logo
    - 展开  使用大图
    - 收起  使用小图
  - 侧边栏宽度
    - 展开  200px
    - 收起  64px
  - 导航菜单  是通过属性 collapse 来控制展开与收起
    - collapse  对应的数据值  false  展开
    - collapse  对应的数据值  true  收起

通过数据来控制状态：isCollapse  布尔类型

申明数据

```html
  data () {
    return {
      isCollapse: false
    }
  },
```

绑定事件

```html
<span @click="toggleAside()" class="icon el-icon-s-fold"></span>
```

申明函数

```js
 methods: {
    toggleAside () {
      // 切换两个状态  展开  收起
      // vue 操作样式  :style  :class
      this.isCollapse = !this.isCollapse
    }
  }
```



三个地方，切换效果，依赖数据来实现：

```html
<!-- logo -->
      <div class="logo" :class="{miniLogo:isCollapse}"></div>
```

样式：

```css
// logo 后面 覆盖之前的样式
    .miniLogo {
      background-image: url(../../assets/images/logo_admin_01.png);
      background-size: 36px auto;
    }
```

```html
<el-aside :width="isCollapse?'64px':'200px'">
```

```diff
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
+        :collapse="isCollapse"
+        :collapse-transition="false"
      >
```



###14-首页模块-导航菜单路由功能

- 点击菜单后，地址栏改变，即可。
- 加 router 属性，把index的值当作路径进行跳转。

```diff
<el-menu
        default-active="/"
        class="el-menu-vertical-demo"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        :collapse-transition="false"
+        router
      >
        <!-- 属性的时候  如果是布尔类型的属性  有属性代码true  没有属性代表false -->
+        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
+        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
+        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
+       <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
+        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
+        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
+        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
```



### 15-首页模块-404页面

- 当用户访问的地址，程序没有对这个地址做过逻辑处理，反馈404页面。
  - 问题：判断地址是否有对应的逻辑处理过？？？
  - 答案：当vue的路由，没有任何的路由规则，匹配到用户输入地址，写一个通配的规则，写在所有路由规则的最下面，指定一个404组件即可。

404组件：views/404/index.vue

```html
<template>
  <div class='container'></div>
</template>

<script>
export default {}
</script>

<style scoped lang='less'>
.container{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url(../../assets/images/404.png) no-repeat center / cover
}
</style>
```

404路由规则：router/index.js

```diff
const router = new VueRouter({
  // 定义路由规则（路径==>组件）
  routes: [
    // name选项作用  找到对应的路由规则
    // 跳转方便一些：$router.push('/login') 或者 $router.push({name:'login'})
    { path: '/login', name: 'login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        // 路由规则  子路由有名称  父路由不需要设置name属性
        { path: '/', name: 'welcome', component: Welcome }
      ]
    },
+    { path: '*', name: '404', component: NotFound }
  ]
})
```



 

 