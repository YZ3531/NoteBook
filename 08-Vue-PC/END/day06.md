## DAY06-黑马头条PC


### 02-回顾

- 内容管理

  - 频道选项渲染

  - 列表渲染

  - 分页功能

  - 筛选功能

    - 日期组件，格式转换
    - 在选择日期后给筛选数据复制

  - 删除功能

    - js安全最大值（json-bigint）

      没有响应内容，前端严谨处理

  - 编辑功能

    - 使用query的方式传参，跳转。



### 03-频道组件封装-准备知识

- 组件传值-父传子

```html
<!-- 父组件 -->
<template>
	<!-- 使用子组件 -->
    <com-child :value="父组件数据"></com-child>
</template>
```

```html
<!-- 子组件 -->
<template>
	<div>{{value}}</div>	
</template>
<script>
    export default {
        // 父传子数据特点：仅读
        props:['value']
    }
</script>
```

- 组件传值-子传父
  - 绑定自定义事件  @自定义事件名称=“fn”  参数
  - 触发自定义事件  需要使用代码触发  this.$emit('自定义事件名称',数据)
  - 事件遵循：谁绑定，谁触发。

绑定自定义事件，使用子组件的时候：

```
<child @input="fn"></child>
```

触发自定义事件，在子组件内部触发：

```js
// 提交msg数据给父组件
this.$emit('input', this.msg)
```

在父组件，实现fn函数，或者使用js表达式可以使用$event就是传递参数。

```js
fn (data) {
  // 当子组件触发 input 事件的时候
  // data 就是触发事件传递数据
}
```



- 组件支持v-model指令
  - v-model 双向数据绑定，语法糖（简写代码）
  - 如果不是用v-model使用可以实现数据双向绑定。
    - 数据：`abc:123`
    - 赋值：`:value="abc"`
    - 改值：`@input="abc=改变后的数据"`
  - 组件使用v-model，但是需要内部实现。
    - ：value   父传子
    - @input  子传父

### 04-频道组件封装-实现

- 实现组件默认功能

封装组件：components/my-channel.vue

```html
<template>
  <!-- 依赖两项  下拉选择器的值  下拉选择器的选项 -->
  <el-select clearable v-model="value" placeholder="请选择">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
// 默认功能：选择器结构  申明数据  获取数据
export default {
  name: 'my-channel',
  data () {
    return {
      value: null,
      channelOptions: []
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    async getChannelOptions () {
      // data.channels 数组 [{id,name}]
      const {
        data: { data }
      } = await this.$http.get('channels')
      // 赋值
      this.channelOptions = data.channels
    }
  }
}
</script>

<style scoped lang='less'></style>

```

注册组件：components/index.js

```diff
import MyBread from '@/components/my-bread'
+import MyChannel from '@/components/my-channel'
export default {
  install (Vue) {
    // Vue 对象  main.js 使用 Vue.use(插件) 调用install函数，传入当前的Vue对象
    Vue.component(MyBread.name, MyBread)
+    Vue.component(MyChannel.name, MyChannel)
  }
}
```

使用组件：views/article/index.vue

```html
 <el-form-item label="频道：">
     <!-- 使用组件 -->
     <my-channel></my-channel>
</el-form-item>
```



- 实现组件v-model指令

使用组件：

```html
<!-- 使用组件 v-model === :value @input -->
<my-channel v-model="reqParams.channel_id"></my-channel>
```

父传子：

```js
// 只读
props: ['value'],
```

```html
<el-select :value="value"
```

子传父：

```html
<el-select @change="changeChannel" 
```

```js
// 值改变事件
changeChannel (channelId) {
    // 如果清空 值是“”  处理成null
    if (channelId === '') channelId = null
    // 将你选中的频道ID提交给父组件
    this.$emit('input', channelId)
},
```



###05-素材管理-基础布局

```html
<template>
  <div class="container">
    <el-card>
      <!-- 头部 -->
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 按钮 -->
      <div class="btn_box">
        <el-radio-group v-model="reqParams.collect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" size="small" style="float:right">添加素材</el-button>
      </div>
      <!-- 列表 -->
      <div class="img_list">
        <div class="img_item" v-for="item in 10" :key="item">
          <img src="../../assets/images/avatar.jpg" alt />
          <div class="footer">
            <span class="el-icon-star-off"></span>
            <span class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        // 默认查询全部 为true的是查询收藏
        collect: false,
        page: 1,
        per_page: 10
      }
    }
  }
}
</script>

<style scoped lang='less'>
.img_list {
  margin-top: 20px;
  .img_item {
    width: 160px;
    height: 160px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin-right: 50px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .footer {
      position: absolute;
      left: 0;
      bottom: 0;
      line-height: 30px;
      height: 30px;
      color: #fff;
      width: 100%;
      background: rgba(0, 0, 0, 0.3);
      text-align: center;
      span {
        margin: 0 20px;
      }
    }
  }
}
</style>

```



###06-素材管理-图片列表渲染

- 当组件初始化完毕
  - 获取图片列表数据
  - 申明数据，获取成功后赋值
  - 进行图片容器渲染

```js
 // 图片列表数据
 images: []
```

```js
 created () {
    this.getImages()
  },
  methods: {
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
    }
  }
```

渲染：

```html
 <!-- 列表 -->
<div class="img_list">
    <div class="img_item" v-for="item in images" :key="item.id">
        <img :src="item.url" alt />
        <div class="footer">
            <span class="el-icon-star-off" :class="{red:item.is_collected}"></span>
            <span class="el-icon-delete"></span>
        </div>
    </div>
</div>
```

```less
span {
        margin: 0 20px;
        &.red{
          color: red;
        }
      }
```



### 07-素材管理-分页功能实现

el-pagination组件

- total  总条数
- page-size 一页多少条
- current-page  指定当前选中第几页
- @current-change  当你改变页码后触发

```js
 // 总条数
 total: 0
```

```html
<!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePager"
      ></el-pagination>
```

```js
 // 分页事件
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
```





###08-素材管理-全部与收藏切换

- 监听用户切换全部与收藏时候
  - 怎么监听：change事件监听

```html
<el-radio-group @change="toggleCollect"
```

```js
// 切换收藏
    toggleCollect () {
      // 更换筛选条件 回到第一页进行预览
      this.reqParams.page = 1
      // 触发这个函数的时候  条件已经发生修改
      this.getImages()
    },
```

当页码小于2的时候 隐藏分页组件

```diff
<el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePager"
+        hide-on-single-page
      ></el-pagination>
```





###09-素材管理-收藏素材

- 点击 收藏 图标时候
  - 当图片状态未收藏的时候，操作：添加收藏
  - 当图片状态已收藏的时候，操作：取消收藏
  - 你要改变的状态和当前状态取反即可。
  - 请求后台，如果成功：
    - 提示
    - 更新列表（图标需要还颜色）

```html
<span @click="toggleStatus(item)" class="el-icon-star-off" :class="{red:item.is_collected}"></span>
```

```js
thods: {
    // 切换图片状态
    async toggleStatus (item) {
      const { data: { data } } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      // 成功
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
      // 更新列表  重新获取数据---->按照后台的排序更新图片的顺序----->图片的位置改变---->体验不好
      // 只更新当图片的状态 即可。
      item.is_collected = data.collect
    },
```





###10-素材管理-删除素材

- 点击 删除 图标 (确认框)
  - 获取当前图片的ID
  - 发请求给后台进删除
  - 成功：
    - 提示
    - 更新列表

```html
<span @click="delImage(item.id)" class="el-icon-delete"></span>
```

```js
 // 删除图片
    delImage (id) {
      // 确认框
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发请求
        await this.$http.delete(`user/images/${id}`)
        // 提示+更新列表
        this.$message.success('删除素材成功')
        this.getImages()
      }).catch(() => {
      })
    },
```

补充一个功能，只能在全部列表才能操作：

```html
<div class="footer" v-if="!reqParams.collect">
```





###11-素材管理-添加素材

- 点击添加素材
  - 显示对话框组件 (上传组件)
  - 点击上传组件，选择图片，确认即可。
  - 上传图片给后台：
    - 上传成功，提示+预览
    - 2s后 关闭对话框 +  更新列表





准备对话框组件：

```js
// 对话框显示隐藏数据
dialogVisible: false
```

```html
<el-button @click="openDialog()"
```

```js
//  打开对话框
openDialog () {
    this.dialogVisible = true
    // 其他业务
},
```

```html
<!-- 对话框 -->
<el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
    <!-- 上传组件 -->
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
    </div>
</el-dialog>
```



准备上传组件：

- action  上传图片接口地址
  - el-upload 和 axios 没有关系，接口的地址使用**完整地址**。
- headers 自定义请求头（携带token）
  - 对象：Authorization = `Bearer ${store.getUser().token}`
- on-success  指定的函数作用：上传图片成功的钩子函数（回调函数）
  - 获取图片的地址------>函数有默认的传参 response 形参

- imageUrl  接收上传成功之后的地址
  - 有数据：预览
  - 没数据：上传按钮
- name  指定提交文件数据的字段名称，和接口保持一致

```html
<el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="headers"
        :show-file-list="false"
        :on-success="handleSuccess"
        name='image'
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
```

```js
// 请求头
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      // 预览图地址
      imageUrl: null
```

```js
// 上传图片成功
    handleSuccess (res) {

    },
```



实现成功后业务逻辑：

- 提示 + 预览
- 2s后，关闭对话框+更新列表

```js
// 上传图片成功
    handleSuccess (res) {
      this.$message.success('上传素材成功')
      // 获取后台给的地址  给imageUrl赋值
      // res.data.url 才是地址  res叫响应主体
      this.imageUrl = res.data.url
      window.setTimeout(() => {
        this.dialogVisible = false
        this.reqParams.page = 1
        this.getImages()
      }, 2000)
    },
   //  打开对话框
    openDialog () {
      this.dialogVisible = true
      // 其他业务  清空预览图
      this.imageUrl = null
    },     
        
```







