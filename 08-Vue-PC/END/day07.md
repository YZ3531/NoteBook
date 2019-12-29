## DAY07-黑马头条PC

### 02-回顾

- 频道组件封装
  - 父传子
  - 子传父
  - v-model的语法糖本质
- 素材管理
  - 列表渲染
  - 分页功能
  - 全部与收藏切换
  - 添加收藏与取消收藏切换
  - 删除素材
  - 添加素材



###03-发布文章-基础布局

**基础布局：**

```html
<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>发布文章</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="100px">
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
          <!-- 选择封面的图片按钮 -->
          <div class="img_btn"><img src="../../assets/images/default.png" alt=""></div>
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
        title: '',
        cover: {
          type: 1
        },
        channel_id: null
      }
    }
  }
}
</script>

<style scoped lang='less'>
.img_btn{
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  img{
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>

```



**富文本使用：**

- github的开源项目，找到和vue相关的（教程，技术文档，pc|m的ui组件库，一系列插件...）
  - https://github.com/vuejs/awesome-vue

- 找基于vue的富文本编辑器：https://github.com/surmon-china/vue-quill-editor
- 安装：npm install vue-quill-editor
- 挂载：

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

- 使用：

```html
<quill-editor v-model="content" :options="editorOption"></quill-editor>
```

- options 配置选项  指定了一个对象 editorOption 具体配置。



**配置富文本：**

改配置：

- vue-quill-editor 基于vue的插件
- quill 是js插件，使用的配置是一样的。
- https://quilljs.com/docs/modules/toolbar/

```js
editorOption:{
  placeholder: '',
  modules: {
      toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ 'header': 1 }, { 'header': 2 }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'indent': '-1'}, { 'indent': '+1' }],
          ['image']
      ]
  }
}
```

改样式：index.less

```css
.article-container .ql-editor{
  height: 300px;
}
.article-container .ql-toolbar.ql-snow{
  padding: 0 8px;
}
```



### 04-发布文章-封面组件-分析功能

- 基础结构
  - 图片按钮
  - 对话框
    - 使用tab栏：
      - 素材库
        - 列表展示
        - 分页切换
        - 全部与收藏切换
        - 选中图片效果
      - 上传图片
        - 上传图片且预览
    - 确认按钮
      - 如果选项卡是素材库，把选中的图片，在图片按钮处显示。
      - 如果选项卡是上传图片，把上传的图片，在图片按钮处显示。
- 组件支持v-model

### 05-发布文章-封面组件-基础布局

定义组件：components/my-image.vue

```html
<template>
  <div class="img-container">
    <!-- 图片按钮 -->
    <div class="img_btn" @click="openDialog">
      <img src="../assets/images/default.png" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">素材库内容</el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">上传图片内容</el-tab-pane>
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
  name: 'my-image',
  data () {
    return {
      // 控制对话框显示隐藏
      dialogVisible: false,
      // 当前激活的选项卡的name属性的值
      activeName: 'image'
    }
  },
  methods: {
    openDialog () {
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped lang='less'>
.img_btn {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.dialog-footer {
  text-align: center;
  display: block;
  width: 100%;
}
</style>

```

组成组件：components/index.js

```js
import MyImage from '@/components/my-image'
// ....
Vue.component(MyImage.name, MyImage)
```

使用组件：views/publish/index.vue

```html
 <!-- 组件使用 -->
<my-image></my-image>
```



### 06-发布文章-封面组件-素材列表与分页

- 列表渲染
- 分页
- 切换全部与收藏

```html
<el-tab-pane label="素材库" name="image">
          <!-- radio按钮 -->
          <el-radio-group @change="toggleCollect" v-model="reqParams.collect" size="small">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 图片列表 -->
          <div class="img_list">
            <div class="img_item" v-for="item in images" :key="item.id">
              <img :src="item.url" alt="">
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

```js
// 获取图片素材请求参数
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      // 图片列表数据
      images: [],
      // 图片总数
      total: 0
```

```js
// 切换全部与收藏
    toggleCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 分页
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    openDialog () {
      this.dialogVisible = true
      // 获取素材列表数据
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      // 总条数
      this.total = data.total_count
    }
```





###07-发布文章-封面组件-选中素材效果

- 当你点击图片的时候：

  - 如果是jquery期间，给当前点击的元素加一个类来选中，找到隔壁所有的元素清除这个类。
  - 现在是vue阶段，操作数据的思维。
    - 提问：你如何根据数据来判断图片是否选中？
    - 方案：当你点击图片的时候，记录当前点击的图片的唯一标识（url），当图片的唯一标识和你记录的标识一致，认为选中，如果和你记录的标识不一致，认为不选中。

  ```js
  // 记录选中的图片的地址
  selectedImageUrl: null
  ```

  ```html
  <div class="img_item" @click="selectedImage(item.url)" 
  ```

  ```js
  // 选中图片
  selectedImage (url) {
      // 记录当前你点击的图片地址
      this.selectedImageUrl = url
  },
  ```

  ```html
   <div class="img_item" :class="{selected:item.url===selectedImageUrl}"
  ```

  

  - 当你选中的时候，加一个类，类来实现样式上的选中。
    - 元素实现，给图片加一个遮罩层，中间有一个打钩的图片。
    - 伪元素选择器。

  ```less
  .img_item {
  // ....
      &.selected{
        &::after{
          // .img_item.selected::after{} 添加选中效果
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,.2) url(../assets/images/selected.png) no-repeat center/ 50px
        }
      }
  ```

  






###08-发布文章-封面组件-上传图片功能

- 上传成功后预览。

```html
<el-tab-pane label="上传图片" name="upload">
          <!-- 上传图组件 -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleSuccess"
            name="image"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
```

数据

```js
 // 上传图片需要的头
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      // 上传成功后的图片地址
      uploadImageUrl: null
```

函数

```js
// 上传成功
    handleSuccess (res) {
      this.$message.success('上传图片成功')
      // 预览即可
      this.uploadImageUrl = res.data.url
    },
```



###09-发布文章-封面组件-确认图片

- 点击确认按钮要做的事件如下：
  - 判断用什么图片，根据当前激活的选项卡的名字的值 activeName。
  - 值 image 代表 选中素材，使用 selectedImageUrl
  - 值 upload代表 选中上传图片，使用 uploadImageUrl
  - 验证，用户是否选择了或者上传了图片，如果没有提示。
  - 如果有呢，把对应的图片地址，在图片按钮处显示且关闭对话框即可。
  - 补充：再次打开对话框，重置数据：默认选中素材库  清除 选中的图片地址  上传图片的地址

```html
<el-button type="primary" @click="confirmImage">确 定</el-button>
```

```js
 // 确认图片
    confirmImage () {
      let src = null
      if (this.activeName === 'image') {
        // 使用 selectedImageUrl
        if (!this.selectedImageUrl) return this.$message.info('请选择素材图片')
        src = this.selectedImageUrl
      } else {
        // 使用 uploadImageUrl
        if (!this.uploadImageUrl) return this.$message.info('请上传素材图片')
        src = this.uploadImageUrl
      }
      // 给图片按钮的src属性赋值
      this.confirmSrc = src
      this.dialogVisible = false
    },
```

```html
<!-- 图片按钮 -->
    <div class="img_btn" @click="openDialog">
      <img :src="confirmSrc" alt />
    </div>
```

```js
// 图片按钮的src数据
confirmSrc: '../assets/images/default.png'
```



问题：图片按钮默认图丢了。

- 原来是静态地址（img->src属性->地址），改成了动态地址（数据记录地址）。
- 原因：
  - 基于vue-cli3.0的项目
  - 基于webpack的项目
  - webpack打包工具
    - 打包：项目依赖的所有资源，js css img ...
    - 打包之后，才能运行这个代码。
    - 判断逻辑：import  src  href  url  找到依赖的资源，进行打包。
- 方案：
  - 自己主动的引入需要的图片。
  - import '变量' from '图片地址'

```js
import defaultImage from '../assets/images/default.png'
```

使用：

```js
confirmSrc: defaultImage
```





### 10-发布文章-封面组件-双向绑定

- 让组件支持 v-model 指令。

```js
test: '',
```

```html
<!-- 组件使用 -->
<my-image v-model="test"></my-image>
```

父传子

```js
 // 父组件传入的图片地址
  props: ['value'],
```

```html
 <!-- 图片按钮 -->
    <div class="img_btn" @click="openDialog">
      <img :src="value||defaultImage" alt />
    </div>
```

```js
      // 默认图数据
      defaultImage
```



子传父

```js
// 确认的地址交给父组件
      this.$emit('input', src)
```





### 11-发布文章-封面组件-使用组件

```html
<!-- 组件使用 -->
<div v-if="articleForm.cover.type===1">
    <my-image v-model="articleForm.cover.images[0]"></my-image>
</div>
<div v-if="articleForm.cover.type===3">
    <my-image v-model="articleForm.cover.images[0]"></my-image>
    <my-image v-model="articleForm.cover.images[1]"></my-image>
    <my-image v-model="articleForm.cover.images[2]"></my-image>
</div>
```

```diff
// 表单数据
      articleForm: {
        title: '',
        content: '',
        cover: {
          type: 1,
+          images: []
        },
        channel_id: null
      }
```

```js
 changeType () {
      // 切换类型的时候 重置数据
      this.articleForm.cover.images = []
    }
```

```html
<el-radio-group @change="changeType"
```







###12-发布文章-发表&存入草稿

- 点击 发表按钮 或者 存入草稿按钮 
  - 发表和存入草稿使用的是同一个接口地址。
  - 通过提交不同的参数（draft  false 发表  true 存入草稿 在url?后传参），区分不的业务。
  - 发请求
    - 成功：提示+跳转内容管理

```html
 <el-form-item>
          <el-button type="primary" @click="submit(false)">发表</el-button>
          <el-button @click="submit(true)">存入草稿</el-button>
        </el-form-item>
```

```js
// 提交数据  发表 存入草稿
    async submit (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      // 成功
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      this.$router.push('/article')
    }
```







###13-发布文章-合并修改文章业务

- 组件初始化的时候，判断当前业务。
  - 如果地址栏有ID数据，修改文章。
    - 获取数据，填充表单
    - 修改面包屑文章
    - 修改 按钮（文字和颜色）  业务变成修改逻辑。
  - 反之，发布文章

```js
 // 申明编辑的时候才会有的文章ID
articleId: null
```

```js
created () {
    // 判断业务articleId 存在修改  不存在 发表
    this.articleId = this.$route.query.id
    if (this.articleId) {
      // 获取数据 填充表单
      this.getArticle()
    }
  },
```

```js
 async getArticle () {
      const { data: { data } } = await this.$http.get('articles/' + this.articleId)
      this.articleForm = data
    },
```

```html
<my-bread>{{articleId?'修改':'发布'}}文章</my-bread>
```

```html
 <el-form-item v-if="!articleId">
          <el-button type="primary" @click="submit(false)">发表</el-button>
          <el-button @click="submit(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="success" @click="update(false)">修改</el-button>
          <el-button @click="update(true)">存入草稿</el-button>
        </el-form-item>
```

```js
 // 提交数据  修改 存入草稿
    async update (draft) {
      // 地址多了ID  请求方式put  其他不变
      await this.$http.put(`articles/${this.articleId}?draft=${draft}`, this.articleForm)
      // 成功
      this.$message.success(draft ? '存入草稿成功' : '修改成功')
      this.$router.push('/article')
    }
```



问题：当你在编辑文章的时候，点击发布文章的菜单，发现组件未更新。

