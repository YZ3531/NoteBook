# nodejs笔记



## 安装及基本使用

- cd :切换目录
- dir:显示当前文件夹下的内容（在cmd环境中，用dir,如果在gitbash用ls）

运行一个js文件

-  进入到它的目录中
- `node 文件名.js`

## 第一个web应用程序

nodejs 可以当一个web服务器。只需要三行代码就可以实现服务器的功能；

如果改服务器代码，要重启（先按ctrl+c），再重新运行代码。

## nodejs基本介绍

是一个容器（运行时）可以运行ECMAScrtip脚本；

充当服务器端的功能，有利于向全栈方向发展；



## 模块-简单认识

模块化：在一个js文件中引入另一个js文件。

- nodejs支持模块化的。

- es6也支持模块化（语法上与nodejs中有些不同）



nodejs模块分类

- 核心模块

  - 使用

    - 1.引入 require()

      先打出来看看

    - 2.使用。查手册，复制代码....

- 自定义模块

- 第三方模块



## 模块-核心模块的使用--fs

功能：进行文件及文件夹的操作（FileSystem）.

用法：

 - 1. 引入
   2. 使用这个对象的方法
      1. 它提供了两套方法：同步的版本和异步的版本,默认是异步。

格式：

同步格式：`let rs = fs.readFilesync('路径','编码')` 

异步格式：`fs.readFile('路径','编码',(err,data)=>{     })` 

- 如果不加编码，返回Buffer。要用toString转成字符串

  

## 模块-核心模块fs-写入文件

- writeFile:写入，覆盖模式。
- 格式：`fs.writeFile(文件路径,要写入的内容,编码，回调函数)`

- appendFile:写入，追加模式。

  

## 全局变量-\_\_dirname和__filename

因为在读写文件时，使用相对路径会出问题（你自己去复现一下），要使用绝对路径；

__dirname：获取当前被执行的文件的文件夹所处的绝对路径

__filename：获取当前被执行的文件的绝对路径



## 模块-核心模块path

作用：对路径进行处理。

方法：

	- path.basename()
	- path.extname()
	- path.join()
	- path.parse()



## 模块-核心模块http-搭建web服务器

```
// 1.引用http
const http = require("http");
// 2. 创建一个实例 
const server = http.creatServer(function(req,res)=>{
  // 收到请求就执行。
  // req:表示本次请求的信息
  // req.url : 请求的路径
   // res:用来设置响应
 // res.setHeader(); //设置响应头
  res.end(); // 设置响应的内容。不能不设定，浏览器就一直等待

})

// 3.开始监听
server.listen(8088,function(){
 // 

})
```

## http协议-基本介绍

作用：让浏览器和web服务器进行通讯。

内容：

- 请求报文：规定了如何发出请求

  - 请求行

  - 请求头

    - user_agent:

      获取请求头：req.getHeaders

  - 请求体

- 响应报文：规定了如何响应请求

  - 响应行

    - 状态码

      - 200
      - 302
      - 404
      - 500

      res.statusCode = 404

  - 响应头

    - content-type. (`res.setHeader('content-type',.....)`)

  - 响应体

    - 本次请求得到的内容通过响应体回给浏览器。它在network/response中。
    - res.end('内容')



## 二次请求

第一次请求某一个.html文件，如果这个文件中有对.css,图片的引用，则浏览器会再发请求，去求这些资源。

我们在写服务器代码时，要对每一个请求进行处理。处理的方式是：根据req.url来进行不同的响应。



## 批量处理二次请求

思路：把所有的静态资源（.html,.css,.js.....）全放在一个文件夹（/abc）下。

根据req.url是否以/abc/开头：

​	如果是：直接拼接路径，读出文件，返回

​    如果不是：返回提示错误

注意：

​	设置content-type



## http-模块-写get接口-没有参数

思路 : 根据 req.url来返回需要的数据。

注意：

​	一般返回是json 格式的数据。

1. 先把数据转成json字符串,JSON.stringify()
2. 设置响应头content-type



## url - querystring

核心模块：

url ： 处理url（类似于：https://www.baidu.com/s?wd=ajax&rsv_spt=1&rsv_iqid=0xb00c1b0f001805e3&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_dl=ib&rsv_sug3=3）

 - url.parse() : 把一个url字符串转成一个对象
   	- pathname : 路径名
      	- query:查询字符串

querystring：处理查询字符串

​	querystring.parse() :把一个查询符串转成对象



## http-模块-写get接口-带参数

步骤：

1. 引入url模块，对req.url进行解析，得到：
   1. 路径名pathname
   2. 具体的参数字符串
      1. 引入querystring 转成参数对象

2. 根据pathname来做具体的判断

## http-模块-写post接口-带参数

判断请求的方式类型 : req.method  (值是大写的POST,GET)

获取传入的参数：在req上定义事件 data,end .

- data:收到一段数据就触发一次，如果数据比较多，它会触发多次。每次接收一部分数据。所以，我们可以把每次收到的数据拼接起来。
- end:数据全收完了，就触发一次。
  - 获得前面拼接的数据， ---->  转成对象
  - 接着处理接口中的逻辑。
  - 最后，通过res.end()返回。



## 自定义模块

1. 定义模块。写一个js文件

2. 导出模块。

   在定义模块时，在文件尾部，通过`moudule.exports = 你要导出的内容` 来设置导出的内容

3. 在另一个文件中：

   1. 引入自定义模块，**要写路径名**
   2. 输出来看下。
   3. 使用其中的内容

   

## 使用第三方模块

第一步：初始化：`npm  init --yes`

	-  会创建一个文件package.json

第二步：安装包：`npm install 包名`

- 联网， 如果成功
  - package.json中多出一项:依赖dependencies
  - node_modules文件夹

第三步：使用包

```
1. 引入
const XXX = require(包名); // 与引入核心模块是一样的
// 打出来，看下

2. 使用包
// 根据具体的文档来使用
```



## npm init & npm install

npm init （不加参数），交互式的命令行工具，让你自己定义对本项目的说明。如果使用默认设置`npm init --yes`

node_modules: 所有下载的包，全在这里，如果删除了，代码就跑不了。

npm install （不加参数） ： 把package.json中所有的依赖全下载下来。



## 全局安装

格式： `npm install -g 包名`  或者   `npm install  包名  -g`

它不会出现在项目中的package.json。



`nrm` : 切换安装npm包的来源，建议使用taobao的镜像。

`nodemon` :监视代码的变化，自动重新运行代码



## require

工作过程

1. 执行文件中的代码
2. 返回文件的module.exports对象



解析流程：

	1. 在**缓存**中找。（一旦require成功，就会在内存中保存一份，这样，下次再加载同一个模块，就直接使用内存的拷贝）
 	2. 如果找不到：
      	1. 是否是相对路径。
           	1. 是，自定义模块。按你指定的路径去找。
           	2. 否：
                	1. 核心模块。
                	2. 第三方模块。
                     	1. 先在本级node_modules文件夹中找，如果找不到，则上一级目录中的node_modules中找....

## 导出自定义模块两种方式

- module.exports

- exports

1. 在模块内部，exports是module.exports的别名。

//  exports === module.exports

2. 它们初始都指向一个空对象{}。

3. 导出模块时，以文件的module.exports对象为准。

结论：

	1. 尽量使用module.exports来导出模块。
 	2. **不要不要不要**给exports直接赋值（exports={}）    ,可以给它添加属性(exports.XXX = XXXX)



## express写get接口

```
app.get('接口名字',(req,res)=>{
   // 获取get的参数。req.query，它本身就是一个对象
   // 返回一个json. res.json(要返回的对象)
  

})
```



## express 写post类型接口--传递普通键值对

1. 获post传参，需要引入body-parse这个包,并使用

```
// 1. 引入express包
const express = require('express');
// 2.引入body-parser包，用来获取post的传参
const bodyParser = require('body-parser');
// 3.创建一个express实例
const app = express();
// 4. 使用包 body-parser
app.use(bodyParser.urlencoded({ extended: false }));
```

2. 此时，post的参数已经在req.body中保存了，并且就是对象格式

   ```
   app.post('/login', (req, res) => {
     // 获取post的传参
     // 我们使用了body-parser之后，post参数会保存在req.body中
     console.log(req.body);
   });
   ```

   

## express 写post类型接口--传文件

第三方包 `multer`

使用步骤：

1.安装

```
// 1. 引入包
const multer = require('multer');
// 2. 配置
// 上传的文件会保存在这个目录下
const upload = multer({ dest: 'uploads/' });
```

2、使用

```
// 这个路由使用第二个参数 .upload.single表示单文件上传，
// 'cover' 表示要上传的文件在本次上次数据中的键名。
// 类似于<input type="file" name='cover'/>
app.post('/upload', upload.single('cover'), function(req, res) {
  // 自动上传文件，到uploads目录下
  // 其它参数会在req.body中
  console.log(req.body);
  res.end('ok');
});
```





## 中间件技术

格式：

```
app.use((req,res,next)=>{

	// next() 顺序进入下一个中间件
	// res.end(); //结束本次响应，后面的中间件也不会进入了
})
```

带限制的中间件

```
app.use('\XXXX', (req,res,next)=>{

	// next() 顺序进入下一个中间件
	// res.end(); //结束本次响应，后面的中间件也不会进入了
})
```



应用： 使用中间件来模拟body-parser





## 会话

现状： http是无状态的。每一次请求都是独立，不会记忆上一次请求的信息。

目标：用户登陆之后才能访问页面（就要区别出于，当前用户是否登陆）; 在多个页面之间共享数据；

解决方案：通过会话技术 ，让http变得"有记忆"

- cookie
- session

## cookie

设置cookie

- 原生的方式`res.setHeader('set-cookie','cookie名=cookie值')`
- express提供的:`res.cookie(cookie名,cookie值,{其它的属性})`
  - expires:过期时间。它是UTC格式（不是中国时间）。如果到了过期，它自己就消失了

删除cookie

- res.clearcookie(cookie名)

获取cookie

`req.header.cookie` : 保存是cookie字符串，不好解析。

可以通过cookie-parser包，来解析

1. 安装
2. 引入，使用
3. 直接在req.cookies这个属性中拿到已经解析成对象的cookie的值



## session

工作原理：

- 真实的数据保存在服务器上，只通过cookie保存一个编号。

- 每次请求，带上cookie(带上这个编号) ，在服务器 收到请求之后，通过编号，在服务器内存中查出来真实的数据。

安装：express-session这个包

步骤:

- 引入并设置

```
//1. 引入session包
const session = require('express-session');
//2. 配置项
let conf = {
  secret: '123456', //加密字符串。 使用该字符串来加密session数据，自定义
  resave: false, //强制保存session,即使它并没有变化
  saveUninitialized: false //强制将未初始化的session存储。当新建了一个session且未
  //设定属性或值时，它就处于未初始化状态。
};
//3. 注册为express-session中间件
app.use(session(conf));
```

- 设置session

  ```
  req.session.属性名 = 属性值
  ```

  

- 获取session

  ```
  console.log( req.session.属性名)
  ```

  

- 删除session

  `req.session.destory()`





## 跨域原因

不同源（协议，域名，端口：有一个不同，就是不同源）的ajax请求，浏览器阻止本次请求；后端还是可以正常收到请求，只是响应在回到浏览器端被blocked。





## jsonp原理

1. 使用script标签的src属性指向一个接口的地址。由于scrtip标签没有跨域问题，所以浏览器不会阻止。
2. 接口的返回值是一个合法的js函数调用。



## 发jsonp请求

1.前端

​	在jquery.ajax设置一个参数dataType:'jsonp'

```javascript
<script>
      $.ajax({
        url: 'http://localhost:8089/getMsg',
        type: 'get',
        success: function(res) {
          console.log(res);
        },
        dataType: 'jsonp'
      });
    </script>
```

2.后端

express给res增强一个功能，就可以直接使用res.jsonp

````javascript
app.get('/getmsg', (req, res) => {
  let msg = [{ content: '测试测试测试测试', name: '测试', dt: Date.now() }];
  res.jsonp(msg);
  //res.json(msg);
});
````



## cors

前端不用改代码，仍使用ajax方式来访问 ，

后端，给响应添加一个特殊的响应头

```

app.get('/getMsg1', (req, res) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
//res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  let msg = [{ content: '测试测试测试测试', name: '测试', dt: Date.now() }];
  res.json(msg);
});
```

