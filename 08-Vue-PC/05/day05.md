## 黑马头条PC项目-第五天

### 01-反馈

| 姓名 | 意见或建议                                                   |
| ---- | ------------------------------------------------------------ |
| ***  | 上课听的明明白白 中午睡一觉脑子里就一片空白 我太难了         |
| ***  | 对插槽还是一脸懵，希望susu能给整体梳理一下，蟹蟹             |
| ***  | 刚刚，想多问一下，工作中，保持用户登录状态，就用 请求/响应拦截器 和 路由前置守卫就可以了吗？ |
| ***  | 希望老师讲课时语速稍微慢一点                                 |
| ***  | article页面的日期问题,v-model绑定的事一个数组,数组怎么和文档里面的begin_pubdate,end_pubdate,联系在一起 |
| ***  | ❀1.模糊懵懂 ❀2.get请求，请求回来的token在响应体中，而post要用token需要先get请求回来token，在传回去？？？在请求头中设置token？ ❀3.vue插槽作用域及封装 ❀4.面包屑组件封装 |
| ***  | 为什么article路由配置好之后，还并没有设置:default-active="$route.path"，依然是 default-active="/"，也还是可以实现点击激活导航呀？ |
| ***  | article 页面里边表单元素的value和label的含义和区别是什么? vue插件封装没听懂 |
| ***  | element-ui里面的ele-form标签里面有好多个el-form-item,这些item标签上有 label和prop属性，如果这两个属性都用不到，是不是就不用写ele-form-item这些标签，这些item标签除了上面这两个属性是不是还有别的用处？谢谢酥酥！！！！！！！！！！ |
| ***  | 老师听出去工作的室友说，有个涉及Vue PC端的功能是这样的，左边侧边栏有10个选项，实现一个功能权限是管理员能看到全部选项，二级管理员看到前5个，游客看到后5个，这个权限老师讲下吧 |
| ***  | 我都会了，就是这么狂！！！！                                 |
| ***  | handleClick (command) { this[command]() } 不明白啊,求解释[]是什么意思 |

vue插槽

- 默认插槽  slot标签
- 后备内容  slot标签的内容
- 具名插槽  slot标签加上一个name属性
- 作用域插槽   当组件内部数据，在插入内中使用。

日期数据提交

- 组件支持数组格式
- 但是后端需要两个字段数据
- 当你选择过日期后：
  - 把你支持的数组中的数据分别设置给需要提交的两个字段

激活菜单

- 如果你是点击，组件会去激活你点击的菜单
- 如果你直接路由跳转，组件是不会自动的去激活菜单
  - 根据当前的路由路径，改变 default-active的值 ，激活对应菜单

vue插件

- 扩展原有的vue的功能
- 约定
  - js模块，导出对象，包含选项 install
  - install 必须是一个函数，回调参数  Vue
  - 在函数中，基于Vue去扩展vue功能

菜单权限

- 依赖后端的数据，后端提供当前登录后用户的角色
- 当前角色拥有哪些权限（菜单项）
- 根据当前角色用户的菜单项，选择性的去显示对应的菜单。



js基础

- 首先定义函数，将来怎么使用：this.setting()
- command  就是函数的名称
- 怎么从对象中获取属性：
  - this.setting
  - this['setting']
- `this[command]()`



### 02-回顾

- 使用 async await 改造axios的请求
- 完善首页
  - 用户信息
  - 退出登录
- 内容管理
  - 筛选条件布局
  - vue插槽
  - 封装面包屑组件
  - vue插件





### 03-内容管理-筛选结果布局

- 卡片组件
  - 头部
  - 表格组件
    - el-table 容器
      - data属性  指定数据（数组）
    - el-table-column  列容器
      - label  表头文字
      - prop  当前列包含行（字段名称显示对应内容）

```html

    <!-- 筛选结果布局 -->
    <el-card style="margin-top:20px">
      <div slot="header">
        <span>根据筛选条件共查询到 0 条结果</span>
      </div>
      <!-- 表格 -->
      <el-table :data="articles">
        <el-table-column label="封面"></el-table-column>
        <el-table-column label="标题"></el-table-column>
        <el-table-column label="状态"></el-table-column>
        <el-table-column label="发布时间"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </el-card>
```

数据：

```js
      // 文章列表
      articles: []
```



### 04-内容管理-频道下拉选项渲染

- 在组件初始化：
  - 获取频道下拉选项数据
  - 然后设置给channelOptions

获取数据函数：

```js

  created () {
    this.getChannelOptions()
  },
  methods: {
    // 获取频道选项数据
    async getChannelOptions () {
      const { data: { data } } = await this.$http.get('channels')
      // 赋值频道下拉选项依赖数据
      this.channelOptions = data.channels
    }
  }
```

修改模版：

```html
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
```





###05-内容管理-列表渲染

- 组件初始化
  - 根据默认筛选条件去获取文章列表信息
  - 然后给articles赋值
  - 渲染列
    - 普通列，根据字段名称指定内容（字符串）
    - 自定义列，根据数据显示对应的结构

普通列渲染：

```js
    // 获取文章列表数据
    async getArticles () {
      // 第一种： axios.get(url?key=value&key1=vaule1&...) get传参
      // 第二种： axios.get(url, {params:参数对象})
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      // 赋值文章列表依赖数据
      this.articles = data.results
    }
```

```diff
  created () {
    this.getChannelOptions()
+    this.getArticles()
  },
```

渲染

```html
      <!-- 表格 -->
      <el-table :data="articles">
        <el-table-column label="封面" prop="cover.images[0]"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态" prop="status"></el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
```



自定义列渲染：

```html
<!-- 表格 -->
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <!-- 第一张封面图 -->
            <el-image :src="scope.row.cover.images[0]" fit="fill" style="width:150px;height:100px">
              <div slot="error">
                <img src="../../assets/error.gif" width="150" height="100" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template>
            <el-button type="primary" icon="el-icon-edit" plain circle></el-button>
            <el-button type="danger" icon="el-icon-delete" plain circle></el-button>
          </template>
        </el-table-column>
      </el-table>
```





###06-内容管理-分页功能

- 总条数显示
- 分页动态渲染
- 点击分页按钮切换列表内容

总条数渲染：

```html
      <div slot="header">
        <span>根据筛选条件共查询到 {{total}} 条结果</span>
      </div>
```

```js
      // 文章总条数
      total: 0
```

```js
      // 赋值文章总条数依赖数据
      this.total = data.total_count
```

渲染分页：

```html
      <!-- 分页 -->
      <!-- total 是总条数 -->
      <!-- page-size 默认显示10条每一页 -->
      <!-- current-page 动态激活当前的页码对应的按钮 -->
      <!-- current-change 事件：当页码改变（点击页码按钮，上一页，下一页）就执行  参数当前改变后的页码-->
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        :total="total"
      ></el-pagination>
```

动态分页切换：

```html
 @current-change="pager"
```

```js
    // 分页功能
    pager (newPage) {
      // 根据新的页码和当前的筛选条件 重新查询数据即可
      this.reqParams.page = newPage
      this.getArticles()
    }
```



###07-内容管理-筛选功能

- 绑定筛选按钮的点击事件
  - 准备筛选条件数据
    - v-model绑定的绑定数据  不需要准备
    - 日期控件，把你选择的起始与结束日期分别赋值（选择过日期之后）给
      - begin_pubdate
      - end_pubdate
    - 频道：回到默认值功能（清除频道功能）
  - 根据新的筛选条件获取数据即可

绑事件：

```html
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
```

定义函数：

```js
    // 筛选查询
    search () {
      // 准备日期数据
      // 进行数据获取
      // 如果频道的值 '' 时候 修改为 null
      if (this.reqParams.channel_id === '') this.reqParams.channel_id = null
      // 回到第一页
      this.reqParams.page = 1
      this.getArticles()
    }
```

在筛选前-准备日期数据

```diff
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
+            @change="changeDate"
+            value-format="yyyy-MM-dd"
          ></el-date-picker>
```

```js
    // 选择日期触发的事件函数
    changeDate (dateArr) {
      // dateArr 的数据格式：[date,date]
      // 后端需要的是字符串格   dateArr 的数据格式：[string,string]
      // 注意：清除选择的日期后  dateArr的值 null
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
```

频道清空：

```diff
          <el-select v-model="reqParams.channel_id" placeholder="请选择" clearable>

```







###08-内容管理-编辑

- 点击编辑按钮
  - 跳转到发布文章页面
  - 同时携带当前文章ID
    - 路由参数：query
    - 路由参数：params
      - 动态路由

问题：使用params传参 还是query参数

- 目的  点击发布文章 /publish  和  点击编辑 /publish?id=100  去到同一个组件。
- 使用 query 

```html
            <el-button @click="toEdit(scope.row.id)" type="primary" icon="el-icon-edit" plain circle></el-button>

```

```js
    // 编辑
    toEdit (id) {
      // this.$router.push('/publish?id='+id)
      this.$router.push({ path: '/publish', query: { id } })
    }
```



###09-内容管理-删除-JS最大安全数值

```js
    // 删除
    async del (id) {
      // 请求
      await this.$http.delete(`articles/${id}`)
      // 提示
      this.$message.success('删除文章成功')
      // 更新列表
      this.getArticles()
    }
```

- 报错：Invalid article ，无效文章。

- 原因：后台给的ID太大，js处理会有误差。

  - 计算时候有误差

  ```js
  // Number.MAX_SAFE_INTEGER 最大安全数值  9007199254740991
  Number.MAX_SAFE_INTEGER + 2  // 9007199254740992
  ```

  - 转换成json有误差

  ```js
  const jsonStr = '{"id":1189522840840306688}'
  JSON.parse(jsonStr) // {id: 1189522840840306700}
  ```

- 处理：
  - 转换的时候 Number 不支持 这么大数据
  - bigInt  数据类型，由插件提供  json-bigint 插件
  - 使用json-bigint转换json对象（默认是axios使用JSON.parse来转换）
    - 找到怎么自己转换格式
    - 使用插件转换

```js
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理

    return data;
  }],
```

- 补充：使用测试帐号无法删除数据。

```js
import JSONBIG from 'json-bigint'
```

```js
axios.defaults.transformResponse = [(data) => {
    return JSONBIG.parse(data)
}]
```





###10-内容管理-删除-响应无内容处理

```js
axios.defaults.transformResponse = [(data) => {
  // 对data进行格式转换  data就是后台响应的json字符串
  // 如果没数据呢？data === null 使用JSONBIG.parse(null) 报错
  try {
    return JSONBIG.parse(data)
  } catch (e) {
    return data
  }
}]
```







###11-内容管理-频道组件封装-准备













