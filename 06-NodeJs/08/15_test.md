###	es6(在面试过程中被提及的概率很大)

- 箭头函数中this指向

  - 箭头函数自身没有this,它函数体内的this来源于父级中最近的一个带有this的元素,this指向外部定义的对象的this

- let/const/var的区别

  - var:没有块级作用域,有变量提升,可以先使用,后定义
  - let:有块级作用域,块级作用域取决于它所在的"{}",一个变量名只可定义一次,没有变量提升,只能先定义后使用
  - const:有块级作用域.定义不可更改

- 解构赋值(数组,对象)--重要的

  - let [变量名=默认值,...变量名] = 数组名
    - 变量没有取到值,就会使用默认值
    - 多余元素可以用...变量名来进行接收,返回的是一个新数组
  - let {'属性名1':变量名=默认值,'属性名2':变量名=默认值,...变量名} = 对象
    - 如果属性名与变量名相同,可简写一个变量名
    - ...变量名可以搜集剩余属性,返回一个新对象

- array对象的拓展

  - 扩展运算符(...数组):将数组中元素一项项展开,把一个整体的数组拆开成单个元素
  - Array.form():将非数组对象转换为数组对象,返回一个新数组
  - find():数组方法,参数是一个回调函数,回调函数有三个参数,数组值,索引,整个数组,回调函数中有退出条件,满足条件returen,返回满足条件的这个元素
  - findeIndex():数组方法,同find(),返回的是满足条件的索引值
  - includes():数组方法,判断数组是否包含某个值,第一个参数,查找内容,第二个参数可选,表示查找开始的位置,默认是从下标为0的位置开始查找

- class类/实现继承

  - class类的继承可以通过extends关键字来进行继承

    ```js
    class Father {
        constructor(name){
            this.name = name;
        }
        say(){
            console.log('HHH')
        }
    };
    
    class Son extends Father{
        //子类不设置constructor,可以随意调用父类属性,子类设置的话,constructor会返回实例,this指向不同,不可以调用父类属性
        constructor(name,age){
            //继承父类的name属性
            super(name);
            //自身添加的属性
            this.age = age;
        }
        eat(){
            //继承父类say方法
            super.say();
        }
    };
    
    //继承的时候,如果有相同属性或方法,使用自身的属性或方法(就近原则)
    ```

- set对象拓展

  - set也叫集合,类似于数组,但是数组允许相同的元素重复,set成员的只都是唯一的,可用于去重
  - 方法
    - size:长度,类似于数组中的length
    - add(value):添加某个值,返回set结构本身
    - delete(value):删除某个值
    - has(value):返回一个值,表示是否是set的成员
    - clear:清空
    - forEach:遍历

- 新增的数据类型以及含义

  - symbol类型

    - 它是基本数据类型,但是没有字面量的表示方式,创建需要调用全局函数Symbol()来完成

    - 表示唯一的值

    - 作为对象的属性时,添加的时候需要加[]

    - 获取对象中symbol属性时也需要用[],但是这个属性不需要加引号

      ```js
      var age = Symbol();
      var obj = {
          [age]:18,
          name:'bgg',
          skill:function(){
              alert(111);
          }
      };
      console.log(obj[age]);//18
      console.log(obj['name']);//bgg
      ```

- async/await的基本含义

  - async:异步的

    - 用async定义的函数会默认的返回一个Promise对象

    - 因此此函数可以直接进行then操作,返回值即为then方法的传入函数

      ```js
      async function fun(){
          console.log(1);
          return 1;
      }
      fun().then(x=>{console.log(x)})
      //输出结果为 1 , 1
      ```

  - await:等待

    - 关键字,只能放到async函数内部,用来获取Promise中返回的内容,获取的是Promise函数中resolve或者reject的值

    - 如果await后面并不是一个Promise的返回值,则会按照同步程序返回值处理,为undefined

      ```js
      //  await 关键字 只能放在 async 函数内部， await关键字的作用 就是获取 Promise中返回的内容， 获取的是Promise函数中resolve或者reject的值
      // 如果await 后面并不是一个Promise的返回值，则会按照同步程序返回值处理,为undefined
      const bbb = function(){ return 'string'}
      
      async function funAsy() {
         const a = await 1
         const b = await new Promise((resolve, reject)=>{
              setTimeout(function(){
                 resolve('time')
              }, 3000)
         })
         const c = await bbb()
         console.log(a, b, c)
      }
      
      funAsy()  //  运行结果是 3秒钟之后 ，输出 1， time , string,
      
      // 2.如果不使用promise的方法的话
      
      function log2(time) {
         setTimeout(function(){
             console.log(time)
             return 1
          }, time)
      }
      
      async function fun1() {
          const a = await log2(5000)
          const b = await log2(10000)
          const c = log2(2000)
          console.log(a)
          console.log(1)
      }
      
      fun1()
      
      // 以上运行结果为： 立刻输出undefined   立刻输出1  2秒后输出2000  5秒后输出5000  10秒后输出10000
      复制代码
      ```

- Promise的基本使用以及几个状态常见的含义---重要的

  - 它是实现异步操作的另一种方式
  - 定义方式
    - var p = new Promise((ok,err)=>{})
    - 构造器里面的函数会立即执行
    - 形参前两个也是函数,调用会改变promise的状态
  - promiseStatus(三种状态):可转化,转化不可逆
    - pedding:默认值,行将发生的,初始状态
    - resolved:调用第一个形参,转化为本状态
    - rejected:调用第二个形参,转化为本状态
  - promisevalue:当转态发生改变时,自动传入值
  - 方法:
    - then():可写两个参数,第二个可选,第一个参数是resolved状态的回调函数,第二个是rejected状态的回调函数
      - 状态发生改变,自动调用参数函数
      - 实参的值是promise对象的promisevalue
      - 返回值是也一个新的promise对象
    - catch():是当promise对象状态是rejected时,会自动调用的函数
    - finally():一定回执行的函数

### node.js

- npm是什么?如何去发布一个自己的包

  - 它是一个包管理工具,由三个独立部分组成:

    - 网站
      - 是开发者查找包,设置参数以及管理npm使用体验的主要途径
    - 注册表
      - 保存每个包的信息
    - 命令行工具
      - 通过命令行或终端运行,开发者通过CLI与npm打交道

  - 发布:

    - 初始化npm包,填入包名,版本,描述,GitHub地址,关键字,license等

      ```js
      npm init
      ```

    - npm注册

      - 官网注册

      - npm命令行注册

        ```
        npm adduser
        ```

    - 账号登录

      ```
      npm login
      ```

    - 发布包

      ```
      npm publish
      ```

- 除了npm还是用过其它的包管理工具吗?

  - Yarn

- node中的模块是什么,什么是模块加载机制?

  - 模块:
    - 独立的文件,完成特定的功能
    - 需要时引入并调用即可
  - 加载机制:
    - 优先加载缓存中的模块,同一个包第一次require后,就会缓存一份,下一次直接从缓存中去取
    - 相对路径,更加路径加载自定义模块,并缓存
    - 不是相对路径,则加载核心模块,并缓存
    - 如果不是自定义模块,也不是核心模块,则加载第三方模块
      - 去本级node_modules目录找
      - 找到就加载
      - 找不到去上级目录找node_modules找,规则同上
      - 找到根目录都找不到就会报错

- 简述一下什么是事件循环 **eventloop**  

  - 它一直在查找新的事件并执行,一次循环的执行被称为tick,这个循环里执行的代码称作task
  - tasks(任务)中同步执行的代码可能会在循环中生成新的任务,一个简单的生成新任务的编程方式就是 `setTimtout(taskFn, deley)`,当然任务也可以从其他的资源产生，比如用户的事件、网络事件或者DOM的绘制。
  - 任务对列:让事情变得复杂的情况是，事件循环可能有几种任务任务队列。唯一的两个限制是同一个任务源中的事件必须属于同一个队列，并且必须在每个队列中按插入顺序处理任务。除了这些之外，执行环境可以自由地做它所做的事情
  - Microtask queue:事件循环也有一个单独的队列叫做 microtask，microtask 将会在百分百在当前task队列执行完毕以后执行
  - 渲染:不同于其他的任务处理，渲染任务并不是被独立的后台任务处理。它可能会是一个独立运行在每一个tick结束后的算法。执行环境拥有较大的选择空间，它可能会在每一个任务队列后执行渲染，也可能执行多个任务队列而不渲染

- 什么是事件驱动/和非阻塞I/O模型?

  - I/O:		io input、output 输入输出，电脑的输入输出，例如音频录音表示声音输入、听音乐是声音的输出
    网络上的传输全部是在传字符串，i/o在服务器上可以理解为读写操作。
  - 非阻塞:在i/o未返回数据时，线程仍然继续，返回没有数据返回的结果。在此期间可以进行其他操作，直到I/O数据返回
  - 事件驱动:在持续事务管理过程中，进行决策的一种策略，即跟随当前时间点上出现的事件，调动可用资源，执行相关任务，使不断出现的问题得以解决;

- 简单描述一下为什么会产生跨域问题,该如何解决?

  - 原因:
    - 浏览出于安全性的考虑,封杀了跨域请求
    - ajax请求
    - 发请求不符合同源策略
      - 协议
      - 端口
      - 域名
  - 解决:
    - JSONP:
      - 不使用ajax发请求
      - 使用script的src指向接口地址,传一个函数名字过去
      - 后端返回js调用语句,并附上实参
    - CORS:
      - 后端设置响应头Access-Control-Allow-Origin

- jsonp的原理是什么?

  - 不使用ajax发请求,就不会出现跨域问题
  - 利用传字符串函数名,返回字符串函数名+实参,回到浏览器,直接调用写好的函数,实现交互

- express是什么?还使用过类似的东西吗?

  - 基于node.js平台的web应用开发框架
  - koa

- 使用node.js还能干些什么?

  - 做操作系统
  - 爬虫
  - 人工智能
  - 搭建服务器

## 预习[Vue](https://cn.vuejs.org)

- Vue是什么?

  - 是一套用于构建用户界面的渐进式JavaScript框架
  - 它的核心库只关注视图层,方便与第三方库或既有项目整合

- 什么是SPA

  - 是一种特殊的Web应用。它将所有的活动局限于一个Web页面中，仅在该Web页面初始化时加载相应的HTML、JavaScript、CSS。一旦页面加载完成，SPA不会因为用户的操作而进行页面的重新加载或跳转，而是利用JavaScript动态的变换HTML（采用的是div切换显示和隐藏），从而实现UI与用户的交互
  - 简单来说SPA的网页只有一个页面，而这个网页的实际方式要能够回应使用者所使用的各种装置并且赋值使用者在电脑上使用软件的体验，让使用者可以更容易和有效的使用网站。按照正常情况下，我们会在一个页面中链接到其他的很多个页面，进行页面的跳转，但是如果使用单页面应用的话，我们始终在一个页面中，通常使用a标签的描点来实现

- 什么是mvvm?和mvc之间的区别是什么

  - mvvm
    - Model-View-ViewModel
    - View 代表UI视图，负责数据的展示
      ViewModel 负责监听 Model 中数据的改变并且控制视图的更新，处理用户交互操作
    - Model 和 View 并无直接关联，而是通过 ViewModel 来进行联系的
    - Model 和 ViewModel 之间有着双向数据绑定的联系。
    - mvvm的设计原理是基于mvc的，所以说mvvm不算是一种创新，是一种改造，这其中的ViewModel便是一个小小的创新
  - mvc
    - model-view-controller(模型-视图-控制器)
    - 模型:应用程序中用于处理应用程序数据逻辑的部分,通常模型对象负责在数据库中存储数据
    - 视图:是应用程序中处理数据显示的部分,通常视图是依据模型数据创建的(就是看到界面一切东西)
    - 控制器:是应用程序中处理用户交互的部分,通常控制器负责从视图读取数据，控制用户输入，并向模型发送数据。（Controller是MVC中的数据和视图的协调者，也就是在Controller里面把Model的数据赋值给View来显示）
      总之就是view操作会触发controller去改变model，然后model再去改变视图，这么以来，三个部分代码都分开来写，逻辑就会清晰很多。
  - 区别:
    - mvvm它实现了View和Model的自动同步，也就是当Model的属性改变时，我们不用再自己手动操作Dom元素，来改变View的显示，而是改变属性后该属性对应View层显示会自动改变,因此开发者只需要专注对数据的维护操作即可

- 如何去创建一个vue实例

  ```
  npm i vue;
  var vm = new Vue({
      
  })
  ```

- 使用哪个指令实现数据双向绑定?

  - 使用v-model指令，可以实现表单元素和Model中数据的双向绑定，并且v-model指令只能运用在表单元素中。
  - 

- 学会查阅官方API

