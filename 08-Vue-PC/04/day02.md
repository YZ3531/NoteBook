## 黑马头条PC项目-第二天

### 01-反馈

| 姓名       | 意见或建议                                                   |
| ---------- | ------------------------------------------------------------ |
| ***        | 讲的很细致,希望老师上课把麦稍微开大点,隔壁班老串音.谢谢      |
| ***        | { path: '/', component: { templace:`<div>123</div>` } } 为什么会报错 |
| ***        | 1.总结 2.提前准备笔记，发一下第二天的                        |
| ***        | 挺好哒，老师讲的很细致呀                                     |
| ***        | 笔记超级详细                                                 |
| ***        | 希望老师可以讲的稍微慢一点                                   |
| ***        | 老师讲的细致啊 非常照顾我这种基础薄弱的学员 感谢             |
| ***        | 老师，希望你拖课可以拖到一点，别只拖十分二十分的。           |
| ***        | 建议老师提前把笔记准备好啊，这样重敲一遍好费时间的，可以边讲边在原先笔记的基础上补充，望采纳，谢谢🙏 |
| ***        | 希望拖堂拖得时间长一点,最起码也要到一点啊,我爱学习           |
| ********** | 快捷创建vue模板时，我们的style标签里面没有scoped lang=less，div也没有class=“container”，请问老师怎么设置一下？老师声音可以大一点，今天听课效果很好，感觉老师讲的很细致，赞！！！ |

```json
{
	"vue模版": {
		"prefix": "vue",
		"body": [
			"<template>",
			"  <div class='container'></div>",
			"</template>\n",
			"<script>",
			"export default {}",
			"</script>\n",
			"<style scoped lang='less'></style>",
		],
		"description": "Create vue template"
	}
}
```



### 02-回顾

- 项目功能
- 预备知识
- 使用vue-cli3.0 4.0 创建项目
- 解释配置文件作用
- 调整src结构
- 使用element-ui
- 使用vue-router
- 路由约定
- 登录模块
  - 基础布局
  - 绘制表单





### 03-登录模块-添加校验

- el-form 组件  添加属性  rules 是一系列**校验规则**
- el-form-item 组件 添加属性 prop 是需要校验的**字段名称**

实例代码：

```js
data {
  form:{
     name: ''
  },
  rules: {
     name: [{},{}]
  }
}
```



html结构

```html
<el-form ref="form" :model="loginForm" :rules="loginRules">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" style="width:235px;margin-right:10px" placeholder="请输入验证码"></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%">立即登录</el-button>
        </el-form-item>
      </el-form>
```

数据：

```js
      // 校验规则
      loginRules: {
        mobile: [
          // type: date|email|url  支持  不支持手机号
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码6个字符', trigger: 'blur' }
        ]
      }
```



###04-登录模块-自定义校验

- 在校验规则中，指定属性 validator 值是一个校验函数（校验逻辑进行判断）
- 校验函数
  - 在校验规则定义之前 定义函数  在return之前定义
  - 必须有三个参数：
    - rule  当前字段的校验规则对象
    - value 当前字段的值
    - callback 校验完成的回调函数
      - 成功  callback()
      - 失败 callback( new Error('提示信息') )

```js
// 校验手机号的函数
    const checkMobile = (rule, value, callback) => {
      // 通过校验逻辑判断成功失败
      // 手机号格式：1开头 第二位3-9 9个数字结尾
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不对'))
      }
    }
```

```diff
        mobile: [
          // type: date|email|url  支持  不支持手机号
          { required: true, message: '请输入手机号', trigger: 'blur' },
+         { validator: checkMobile, trigger: 'blur' }
        ],
```



###05-登录模块-整体校验

- 怎么获取组件实例
  - 组件加 ref 属性
  - this.$refs['ref属性的值'] 
- 调用组件函数：validate
- 传参：回调函数 
- 回调函数传参：valid布尔类型值  true 校验成功  false 校验失败

```html
<el-form ref="loginForm"
```

```html
<el-button @click="login"
```

```js
methods: {
    login () {
      // 获取表单组件实例 ---> 调用校验函数
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          // 发请求 校验手机号和验证码  后台
          console.log('ok')
        }
      })
    }
  }
```





###06-登录模块-进行登录

- 全局配置axios

src/api/index.js  封装一个axios模块

```js
// 导出一个配置好的axios对象
import axios from 'axios'

// 对axios进行配置
// 基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// ... 很多配置

export default axios

```

src/main.js 进行挂载

```js
import axios from '@/api'
Vue.prototype.$http = axios
```

- 通过axios提交手机号和验证码
- 如果成功：跳转到首页
- 如果失败：提示  后台错误信息|自己组织信息 。

```js
// 获取表单组件实例 ---> 调用校验函数
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          // 发请求 校验手机号和验证码  后台
          this.$http.post('authorizations', this.loginForm).then(res => {
            // 成功
            this.$router.push('/')
          }).catch(() => {
            // 失败 提示
            this.$message.error('手机号或验证码错误')
          })
        }
      })
```





###07-登录模块-怎么注册

- 测试帐号
  - 手机号：13911111111
  - 万能验证码：246810
- 自己注册
  - 百度搜索  黑马头条APP（安卓） 下载安装
  - 提示登录（注册）
    - 输入 手机号
    - 验证码  246810
    - 登录成功就是注册成功
  - 这个帐号即可在PC系统使用。



###08-首页模块-路由与组件

创建组件：src/views/home/index.vue

```html
<template>
  <div class='container'>Home</div>
</template>

<script>
export default {}
</script>

<style scoped lang='less'></style>

```

配置路由：src/router/index.js

```js
import Home from '@/views/home'
```

```js
{ path: '/', component: Home }
```



###09-首页模块-基础布局

```html
<template>
  <el-container class="container">
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
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside{
    background: #002033;
  }
  .el-header{
    border-bottom:1px solid #ddd;
  }
}
</style>

```



###10-首页模块-头部内容

```html
<el-header>
        <!-- 图标 -->
        <span class="el-icon-s-fold icon"></span>
        <!-- 文字 -->
        <span class="text">江苏传智播客科技教育有限公司</span>
        <!-- 下拉菜单组件 -->
        <el-dropdown class="dropdown">
          <span class="el-dropdown-link">
            <img class="headIcon" src="../../assets/avatar.jpg" alt="">
            <span class="userName">用户名称</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
```

样式：

```less
 .el-header {
    line-height: 60px;
    border-bottom: 1px solid #ddd;
    .icon {
      font-size: 30px;
      vertical-align: middle;
    }
    .text {
      margin-left: 10px;
      vertical-align: middle;
    }
    .dropdown{
      float: right;
      .headIcon{
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
      .userName{
        font-weight: bold;
        vertical-align: middle;
        margin-left: 5px;
      }
    }
  }
```



###11-首页模块-分析导航菜单组件

画好logo

```html
<el-aside width="200px">
      <!-- logo -->
      <div class="logo"></div>
      <!-- 导航菜单 -->
    </el-aside>
```

样式

```less
.el-aside {
    background: #002033;
    .logo{
      width: 100%;
      height: 60px;
      background: #002244 url(../../assets/logo_admin.png) no-repeat center / 140px auto;
    }
  }
```

分析导航菜单的结构：

```html
<!-- 导航菜单容器 -->
<!-- default-active="2" 默认激活哪个菜单项  default-active值 是菜单项的index属性的值 -->
<!-- background-color="#545c64"  背景颜色-->
<!-- text-color="#545c64"  文字默认颜色-->
<!-- active-text-color="#545c64"  激活文字颜色-->
<el-menu
      default-active="2"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
  		<!-- el-submenu 拥有值二级菜单的菜单项目 el-menu-item 没有二级菜单的菜单项-->
  		<!-- index作用  当前菜单唯一标识 -->
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
    </el-menu>
```



###12-首页模块-绘制导航菜单

```html
<!-- 导航菜单 -->
      <el-menu
        default-active="1"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right:none"
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
```



###13-首页模块-欢迎页面

- 给home路由设置一个子路由
- 子路由指定欢迎页面组件，默认渲染。

创建欢迎组件：src/views/welcome/index.vue

```html
<template>
  <div class='container-welcome'>
    <img src="../../assets/welcome.jpg" alt="">
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang='less'>
img{
  display: block;
  margin: 0 auto;
}
</style>

```

路由配置：

```js
import Welcome from '@/views/welcome'
```

```js
    // 首页
    {
      path: '/',
      component: Home,
      children: [
        // 欢迎
        { path: '/', component: Welcome }
      ]
    }
  ]
```

指定二级路由容器：home组件

```html'
      <el-main>
        <!-- 二级路由容器 -->
        <router-view></router-view>
      </el-main>
```



###14-首页模块-导航菜单折叠效果

- 折叠效果
  - 侧边栏的宽度
    - 展开：200px
    - 收起：64px
  - logo的图片
    - 展开：大图
    - 收起：小图
  - 导航菜单组件
    - 展开：组件展开状态  
    - 收起：组件收起状态
    - 组件有一个属性：collapse  值  false展开  true收起

绑定事件

```html
<span class="el-icon-s-fold icon" @click="toggleMenu"></span>
```

处理函数

```js
  methods: {
    toggleMenu () {
      // 切换左菜单 展开与收起
      this.isOpen = !this.isOpen
    }
  }
```

申明数据

```js
  data () {
    return {
      isOpen: true
    }
  },
```

侧边栏宽度

```html
<el-aside :width="isOpen?'200px':'64px'">
```

log切换

```html
<div class="logo" :class="{smallLogo:!isOpen}"></div>
```

```css
    .smallLogo {
      background-image: url(../../assets/logo_admin_01.png);
      background-size: 36px auto;
    }
```

导航组件切换

```diff
      <el-menu
        default-active="1"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
+        :collapse="!isOpen"
+        :collapse-transition="false"
        style="border-right:none"
      >
```



###15-首页模块-导航菜单路由功能

- router:true

- 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转

  ```html
   <el-menu
          default-active="/"
          background-color="#002033"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="!isOpen"
          :collapse-transition="false"
          style="border-right:none"
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/article">
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="/image">
            <i class="el-icon-picture"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="/publish">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="/comment">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="/fans">
            <i class="el-icon-present"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>
          <el-menu-item index="/setting">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
        </el-menu>
  ```

  

###16-首页模块-404页面

- 当你访问的地址，在路由规则中没有匹配，显示404的组件。

准备404组件：src/views/404/index.vue

```html
<template>
  <div class='container-404'></div>
</template>

<script>
export default {}
</script>

<style scoped lang='less'>
.container-404{
  width: 100%;
  height: 100%;
  background: url(../../assets/404.png) no-repeat center / cover;
  position: absolute;
  left: 0;
  top: 0;
}
</style>

```

配置404路由规则：src/router/index.js

```js
import NotFound from '@/views/404'
```

```js
    // 匹配  不符合路由规则的路径
    { path: '*', component: NotFound }
```

