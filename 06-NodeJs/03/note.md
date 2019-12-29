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