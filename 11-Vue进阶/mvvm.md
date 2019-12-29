# MVVM 原理

常见的面试问题：

- Vue 数据绑定的原理？
- MVVM 数据绑定的原理？
- Vue 双向数据绑定的原理？
- Vue 数据响应式原理？
- 数据响应式原理？

![MVVM](./assets/mvvm-3510948.png)

当前比较流行的前端框架都是采用的 MVVM 的方式：

什么是  MVVM？

简单一句话：数据驱动视图。

## 介绍

### 感受 MVVM

- 传统的 DOM 操作方式
- 模板引擎方式
- 数据驱动视图方式（MVVM）

### 什么是 MVVM

> 简单一句话：数据驱动视图

![MVVM](./assets/mvvm-3510948.png)

```html
<!-- 视图 -->
<template>
  <div>{{ message }}</div>
</template>

<!--
  - 把普通的 JavaScript 对象和视图 DOM 之间建立了一种映射关系：
  - 数据的改变影响视图
  - 视图（表单元素）的改变影响数据
-->

<script>
  // Model 普通数据对象
  export default {
    data () {
      return {
        message: 'Hello World'
      }
    }
  }
</script>
```

- Model（M）：普通的 JavaScript 对象，例如 Vue 实例中的 data
  - 普通数据
- View（V）：视图
  - HTML DOM 模板
- ViewModel（VM）：Vue实例
  - 负责数据和视图的更新
  - 它是 Model数据 和 View 视图通信的一个桥梁

## JavaScript 数据劫持

- 数据劫持？
- Observer 数据观察
- 数据拦截器

如何实现修改一个对象成员就修改了DOM？

```js
const data = {
	message: 'Hello World'
}

// 修改数据
data.message = 'hello';

// ? 如何知道数据发生改变了呢

// 当数据改变了操作 DOM
document.querySelector('xxx').style.xxx = 'xxx';

```

答案是：JavaScript 数据劫持，或者说是 JavaScript 对象属性拦截器。

什么是数据劫持（属性拦截器）？

说白了就是：观察数据的变化。

- Object.defineProperty
  - ECMAScript 5 中的一个 API
  - Vue 1 和 Vue 2 中使用的都是 Object.defineProperty
- Proxy
  - ECMAScript 6 中的一个 API
  - 即将升级的 Vue 3 会升级使用 Proxy
  - Proxy 比 Object.defineProperty 性能要更好



### Object.defineProperty

> 参考资料：
>
> - [MDN - Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

**Object.defineProperty()** 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。

#### 语法

```js
Object.defineProperty(obj, prop, descriptor)
```

参数：

- `obj` 要在其上定义属性的对象。

- `prop` 要定义或修改的属性的名称。

- `descriptor` 将被定义或修改的属性描述符。

返回值：

被传递给函数的对象。

#### 描述符

- `configurable`

  当且仅当该属性的 configurable 为 true 时，该属性`描述符`才能够被改变，同时该属性也能从对应的对象上被删除。**默认为 false**。

- `enumerable`

  当且仅当该属性的`enumerable`为`true`时，该属性才能够出现在对象的枚举属性中。**默认为 false**。

- `value`

  该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。**默认为 undefined**。

- `writable`

  当且仅当该属性的`writable`为`true`时，`value`才能被[赋值运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Assignment_Operators)改变。**默认为 false**。

- `get`

  一个给属性提供 getter 的方法，如果没有 getter 则为 `undefined`。当访问该属性时，该方法会被执行，方法执行时没有参数传入，但是会传入`this`对象（由于继承关系，这里的`this`并不一定是定义该属性的对象）。

  **默认为 undefined**。

- `set`

  一个给属性提供 setter 的方法，如果没有 setter 则为 `undefined`。当属性值修改时，触发执行该方法。该方法将接受唯一参数，即该属性新的参数值。

  **默认为 undefined**。

|            | configurable | enumerable | value | writable | get  | set  |
| ---------- | ------------ | ---------- | ----- | -------- | ---- | ---- |
| 数据描述符 | Yes          | Yes        | Yes   | Yes      | No   | No   |
| 存取描述符 | Yes          | Yes        | No    | No       | Yes  | Yes  |

 **如果一个描述符不具有value,writable,get 和 set 任意一个关键字，那么它将被认为是一个数据描述符。如果一个描述符同时有(value或writable)和(get或set)关键字，将会产生一个异常。** 

#### 示例

需求：

```js
const data = {
  name: '张三',
  age: 18
}

// data.name 被访问了
data.name

// data.name 被改变了
data.name = xxx

// data.age 被改变了
data.age = xxx

```

实现：

```js
const data = {};

let _name = '';
let _age = 0;

// 在 data 对象中添加一个属性 name
Object.defineProperty(data, 'name', {
  configurable: false,
  enumerable: true,
  // 监听属性的修改
  set (value) {
   	_name = value;
  },
  // 监听属性的读取
  get () {
    return _name;
  }
})

// 在 data 对象中添加一个属性 age
Object.defineProperty(data, 'age', {
  configurable: false,
  enumerable: true,
  // 监听属性的修改
  set (value) {
   	_age = value;
  },
  // 监听属性的读取
  get () {
    return _age;
  }
})
```

## 事件发布/订阅

- 观察者模式
- 发布/订阅模式

```js
// 监听一个自定义事件
bus.$on('事件类型', 处理函数)

// 发布事件
bus.$emit('事件类型', 处理函数)
```

```js
function EventEmitter () {
  // 存储所有订阅的消息处理函数
  this.subs = {
    // 事件类型: [处理函数, 处理函数...]
    // a: [],
  }
}

EventEmitter.prototype.$on = function (eventType, callback) {
  this.subs[eventType] = this.subs[eventType] || []
  this.subs[eventType].push(callback)
}

// 参数中的 ... 表示函数的剩余（rest）参数
// 它会把所有参数放到一个数组中
EventEmitter.prototype.$emit = function (eventType, ...args) {
  const subs = this.subs[eventType]
  if (subs) {
    subs.forEach(callback => {
      callback(...args)
    })
  }
}
```

## DOM 操作

- [Node.nodeType](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType)
- [Node.childNodes](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/childNodes)
- [Element.attributes](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/attributes)



## 原理实现

### 示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>MVVM原理分析</title>
</head>
<body>
  <div id="app">
    <h3 v-text="msg"><span>哈哈...</span></h3>
    <input type="text" v-model="msg">
    <button v-on:click="sayHi">按钮</button>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    var vm = new Vue({
      el: '#app',
      data: {
        msg: '学习MVVM原现分析!'
      },
      methods: {
        sayHi () {
          this.msg = '修改了数据';
        }
      }
    });
  </script>
</body>
</html>
```

### VM模型

```js
function Vue(options) {
  // 保存初始化时传入的参数
  this.$options = options;

  // 检测是一个 dom 还是 选择器
  this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el;
	
  // 保存初始化时定义的数据
  this.$data = options.data || {};
	// 保存初始化时的定义的方法
  this.$methods = options.methods || {};

  // 像 vue 一样，直接通过实例访问 data 中的数据
  Object.keys(this.$data).forEach(key => {

    // 代理数据
    Object.defineProperty(this, key, {
      configurable: false,
      enumerable: true,
      get () {
        console.log('get from vue...');
        return this.$data[key];
      },
      set (val) {
        console.log('set from vue...');
        this.$data[key] = val;
      }
    })
  });
	
  // 数据拦截，监听数据的访问
  new Observe(this.$data);
	
  // 编译模板，找到所有需要监听的数据
  new Compile(this.$el, this);
}
```

### 数据劫持

劫持 VM 模型中初始的数据，监听数据的访问

```javascript
function Observe(data) {
	// 只对对象数据设置劫持
  if(!data || typeof data !== 'object') return;
  
	// 保存待劫持的数据
  this.data = data;

  // 监视数据的变化
  Object.keys(data).forEach(key => {
    this.walk(key, data[key]);
  })
}

Observe.prototype.walk = function (key, val) {
  Object.defineProperty(this.data, key, {
    configurable: false,
    enumerable: true,
    set (newVal) {
      if(newVal === val) return;
      val = newVal;
			// 发布，通过数据已经改变了
      watcher.$emit(key, newVal);
    },
    get() {
      return val;
    }
  })
}
```

### 编译模板

对 el 所对应的DOM节点的所有节点进行遍历操作，查找出所以包含指令或插值的节点，然后进行订阅监听，实现DOM的更新。

```js
// 订阅/发布
const watcher = new Watcher();

// 编译模板
function Compile(el, vm) {
  this.vm = vm;

  // 必须为元素节点
  if(el.nodeType !== 1) return;

  // 编译模板
  this.compileElement(el);
}

Compile.prototype.compileElement = function (el) {

  // 获取子节点
  let childNodes = el.childNodes;

  // 没有子节点
  if(!childNodes) return;

  Array.from(childNodes).forEach((node) => {
    let text = node.textContent,
        // 查找模板中所有的插值
        reg = /(\{\{(.*)\}\})/;

    // 是文本节点，并且包含 {{}}
    if(node.nodeType === 3 && reg.test(text)) {

      // 匹配单元
      node.textContent = text.replace(RegExp.$1, this.vm[RegExp.$2]);
			
      // 监听{{}}中的数据
      watcher.$on(RegExp.$2, (newVal) => {
        node.textContent = text.replace(RegExp.$1, newVal);
      });
    // 元素节点
    } else if(node.nodeType === 1) {
      // 查找所以 v- 开头的指令
      this.compile(node);
    }

    // 递归查子节点
    this.compileElement(node);
  })
}

Compile.prototype.compile = function (node) {
  // 获取元素节点上的所有属性
  let attrs = node.attributes;

  Array.from(attrs).forEach((attr) => {
    let attrName = attr.name;

    // 检测元素节点上是不包含一些指令如 v-text v-html 等
    if(attrName.indexOf('v-') === 0) {
      let exp = attr.value;
      let dir = attrName.slice(2);

      // 删除 v- 开头的属性
      node.removeAttribute(attrName);

      // 检测指令是否以 v-on 开头
      if(dir.indexOf('on') === 0) {
        let type = dir.split(':')[1],
            handler = this.vm.$methods[exp].bind(this.vm);

        // 添加事件监听
        return node.addEventListener(type, handler);
      }

      // 除了 v-on 外的其它指令
      directives[dir] && directives[dir](node, exp, this.vm);

      // 监听
      watcher.$on(exp, (newVal) => {
        directives[dir] && directives[dir](node, exp, this.vm);
      });
    }
  })
}
```

### 订阅/发布

```js
function Watcher(sub) {
  this.subs = {};
}

Watcher.prototype.$on = function (sub, cb) {
  this.subs[sub] = this.subs[sub] || [];
  this.subs[sub].push(cb);
}

Watcher.prototype.$emit = function (sub, newVal) {
  this.subs[sub].forEach(cb => {
    cb(newVal);
  })
}
```





## 推荐阅读

- https://github.com/DMQ/mvvm
- https://cn.vuejs.org/v2/guide/reactivity.html
