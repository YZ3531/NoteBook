## 黑马头条PC项目-第七天

### 01-反馈

| 姓名 | 意见或建议                                                   |
| ---- | ------------------------------------------------------------ |
| ***  | 老师,能说一下父子组件传值,为什么事件都是放在子组件上吗?父子组件传值还不是很明白 |
| ***  | 好棒哦                                                       |
| ***  | 这里没有文章状态管理的功能嘛...                              |
| ***  | 组件传值，子传父，有点不理解                                 |
| ***  | 刚哥，在事件中，怎样判断传不传值呢？                         |

- 为什么事件都是放在子组件上吗?

  - 子传父操作，利用自定义事件。
  - 子传给父，由子组件决定啥时候传递。
  - 子组件要触发事件，自定义事件（谁绑定绑定谁触发）
  - 放在子组件上

- 父子之间传值

  - props
  - $emit()

  ```html
  <template>
  	<my-child @abc="fn"></my-child>
  </template>
  <script>
  export default {
    methods: {
    	fn (data) {
         // 父组件的函数                                      
      }                    
    }
  }
  </script>
  ```

  ```html
  <script>
  export default {
    created () {
    	this.$emit('abc', 100)                    
    }
  }
  </script>
  ```



- 假设是你触发的事件
  - 取决于业务上需不需要，自己传值。
- 假设第三方的组件触发的事件
  - 组件使用文档中提供  使用的方式
  - 默认传参
    - 使用这个传参，绑定事件的时候不能带小括号。
    - @change="fn"
  - 自己传参
    - @change="fn(100)"



### 02-回顾

- 频道组件封装
  - v-model语法糖原理
  - 父传子
  - 子传父
  - v-model在组件上的实现



- 素材管理
  - 布局
  - 素材列表
  - 分页
  - 添加收藏
  - 取消收藏
  - 删除
  - 添加素材
    - 布局
    - 业务功能



- API文档怎么看？？？
  - 提取文档中的四项信息：
    - 请求方式
    - 请求地址
    - 请求参数
      - query  地址栏？后传参   get请求
      - body  请求体   post put patch delete
      - path  路径传参     /user/images/10000
    - 返回参数
      - 每一个字段的含义
      - 关注数据结构



### 03-素材管理-上传素材

- 点击上传组件
  - 去选择本地的图片
  - 选择完毕后，提交给后台
    - **接口地址  http://ttapi.research.itcast.cn/mp/v1_0/user/images  post**
    - **注意：携带token**
  - 如果上传成功
  - 得到上传成功后的图片地址
  - 预览图片
  - 提示成功
  - 过2s时间后
  - 关闭对话框
  - 更新当前素材列表

上传组件的结构

```html
      <!-- action 上传图片接口地址 -->
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="headers"
        name="image"
        :show-file-list="false"
        :on-success="handleSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
```

依赖数据

```js
      // 上传成功后的图片地址
      imageUrl: null,
      // 上传的头
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      }
```

上传成功

```js
    // 上传图片成功
    handleSuccess (res) {
      // res 就是响应主体  获取图片地址 res.data.url
      // 给 imageUrl 赋值
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      window.setTimeout(() => {
        // 关闭对话框  更新列表
        this.dialogVisible = false
        this.getImages()
      }, 2000)
    },
```

打开对话框的时候，重置上传组件预览图为null

```html
<!-- 绿色按钮 -->
        <el-button @click="open"
```

```js
    // 打开对话框
    open () {
      this.dialogVisible = true
      this.imageUrl = null
    },
```







### 04-发布文章-组件和路由

组件：

```html
<template>
  <div class='container-pubish'>pubish</div>
</template>

<script>
export default {}
</script>

<style scoped lang='less'></style>

```

路由：

```js
 { path: '/publish', component: Publish }
```



### 05-发布文章-基础布局

- 使用卡片
  - 头部
  - 表单
    - 文章标题
    - 文章内容
      - 使用富文本编辑器
    - 封面
      - 封装组件
    - 频道
  - 提交按钮
    - 发表
    - 存入草稿

```html
<template>
  <div class='container-pubish'>
    <el-card>
      <div slot="header">
        <my-bread>发布文章</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="120px">
        <el-form-item label="标题：">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">富文本</el-form-item>
        <el-form-item label="封面：">
            <el-radio-group v-model="articleForm.cover.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">发表</el-button>
          <el-button>存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articleForm: {
        title: null,
        cover: {
          type: 1
        },
        channel_id: null
      }
    }
  }
}
</script>

<style scoped lang='less'></style>

```





### 06-发布文章-富文本使用

vue相关资源：https://github.com/vuejs/awesome-vue

富文本组件：https://github.com/surmon-china/vue-quill-editor

使用步骤：

- 安装： npm i vue-quill-editor
- 挂载：局部挂载

```js
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  }
}
```

- 使用

```html
  <quill-editor v-model="content" :options="editorOption" >
  </quill-editor>
```





### 07-发布文章-富文本配置

- 样式方面  styles/index.less

```css
// 富文本
.container-pubish .ql-editor{
  height: 300px;
}
.container-pubish .ql-toolbar.ql-snow{
  padding: 0;
}
```

- 功能方面
  - vue-quill-editor 是基于vue的组件
  - quill-editor 是基于js的组件
  - 配置一致。https://quilljs.com/docs/modules/toolbar/

```js
// 富文本配置对象
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['image']
          ]
        }
      }
```



### 08-发布文章-封面组件-功能分析

- 准备基础布局
  - 选择封面的图片按钮
  - 封面图选择的对话框
    - tab组件
      - 素材库
        - 切换全部收藏按钮
        - 图片列表
        - 分页
        - 选中效果
      - 上传图片
        - 上传组件
    - 确认与取消按钮

### 09-发布文章-封面组件-基础布局

组件内容：components/my-image.vue

```html
<template>
  <div class="my-image">
    <!-- 按钮 -->
    <div class="btn_box" @click="open">
      <img src="../assets/default.png" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">素材库</el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">上传图片</el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 对话框显示隐藏
      dialogVisible: false,
      // 当前激活的选项卡name的值
      activeName: 'image'
    }
  },
  methods: {
    // 打开对话框
    open () {
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped lang='less'>
.my-image {
  display: inline-block;
  margin-right: 20px;
}
.btn_box {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.dialog-footer {
  text-align: center;
  width: 100%;
  display: block;
}
</style>

```

全局注册：components/index.js

```diff
import MyBread from '@/components/my-bread'
import MyChannel from '@/components/my-channel'
+import MyImage from '@/components/my-image'
export default {
  install (Vue) {
    // Vue 是一个构造函数
    Vue.component('my-bread', MyBread)
    Vue.component('my-channel', MyChannel)
+    Vue.component('my-image', MyImage)
  }
}
```

发布文章使用：views/publish/index.vue

```html
            <!-- 封面图组件 -->
            <div>
              <my-image></my-image>
              <my-image></my-image>
              <my-image></my-image>
            </div>
```





### 10-发布文章-封面组件-素材展示

- 切换按钮
- 素材列表
- 分页逻辑

```html
<el-tab-pane label="素材库" name="image">
          <!-- 按钮 -->
          <el-radio-group @change="toggleList" v-model="reqParams.collect" size="small">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 列表 -->
          <div class="img_list">
            <div class="img_item" v-for="item in images" :key="item.id">
              <img :src="item.url" />
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="pager"
          ></el-pagination>
        </el-tab-pane>
```

数据

```js
// 请求素材参数
      reqParams: {
        // false 全部  true 收藏
        collect: false,
        page: 1,
        per_page: 8
      },
      // 素材列表
      images: [],
      // 总条数
      total: 0
```

函数

```js
    // 打开对话框
    open () {
      this.dialogVisible = true
      // 加载素材列表                                    
      this.getImages()
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    toggleList () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 获取素材列表数据
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      // 赋值总条数
      this.total = data.total_count
    }
```

全局样式：

```css
.el-dialog__body{
  padding-bottom: 0;
}
```



### 11-发布文章-封面组件-选中素材

- 当点击图片的时候：
  - 给当前的图片加上选中效果，其他图片取消选中。
  - 效果：
    - 遮罩层
    - 打钩图片
- 怎么代表选中了
  - 使用数据记录下来，使用唯一标识记录。
    - id
    - url   将来需要使用它 预览封面图。

记录选中图片

```js
      // 选中的图片地址
      selectedImageUrl: null
```

点击图片的时候

```html
<div class="img_item" @click="selectedImage(item.url)" 
```

```js
    // 选中图片
    selectedImage (url) {
      this.selectedImageUrl = url
    },
```

效果：伪元素

```diff
  .img_item {
    width: 150px;
    height: 120px;
    position: relative;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
+    &.selected::after{
+      content: '';
+      position: absolute;
+      top: 0;
+      left: 0;
+      width: 100%;
+      height: 100%;
+      background: rgba(0,0,0,0.3) url(../assets/selected.png) no-repeat center / 50px 50px
    }
  }
```

控制效果的代码

```html
<div class="img_item" :class="{selected: selectedImageUrl === item.url}" 
```







### 12-发布文章-封面组件-上传图片

组件结构：

```html
<el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            name="image"
            :show-file-list="false"
            :on-success="handleSuccess"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
```

数据：

```js
      // 上传的图片地址
      uploadImageUrl: null
```

成功处理

```js
    // 上传成功
    handleSuccess (res) {
      this.uploadImageUrl = res.data.url
      this.$message.success('上传成功')
    },
```





###13-发布文章-封面组件-确认图片



###14-发布文章-封面组件-双向绑定



###15-发布文章-封面组件-使用组件



###16-发布文章-发表与存入草稿



###17-发布文章-合并修改文章业务





