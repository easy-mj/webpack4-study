### babel 环境搭建及基本配置

1. 安装依赖包

```
yarn add -D @babel/cli@7.7.5 @babel/core@7.7.5 @babel/preset-env@7.7.5  
```

2. 配置 .babelrc

```
{
  "presets": ["@babel/preset-env"]
}
```

3、编写代码(ES6+规范)

```
const sum = (m, n) => {
  return m + n
}
```

4、配置执行命令

```
"scripts": {
  "babel": "babel src/index.js"
},
```

5、运行（ES6+规范 -> ES5-规范）

```
webpack4-study git:(feature/base-babel) ✗ yarn babel
yarn run v1.17.3
warning ../../../package.json: No license field
$ babel src/index.js
"use strict";

var sum = function sum(m, n) {
  return m + n;
};

✨  Done in 0.79s.
```

注意：

- 如果使用 `webpack` 则需要借助 `babel-loader` 来实现代码编译。
- `@babel/preset-env` babel实际是一个空壳，要工作还是需要借助各个插件来实现，preset-env实际是把常用的插件合集，重新起了个名字，方便配置使用，要不然我们就需要一个个单独去配置插件，用的插件很多的时候比较繁琐，它包含ES6、ES7、ES8等等，当然如果还不能满足需求，就需要我们自己去扩展配置 `plugins` 来满足我们的需求了。[(详细)](https://www.babeljs.cn/docs/presets)



### babel-polyfill

什么是 `polyfill` ? 其实很早就有这个概念了，它的意思是补丁（或垫片）

比如很早年间，Array 的 [includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) 方法并不是所有的浏览器都支持，如果需要使用这个方法，并且要兼容所有的浏览器，就需要使用补丁。最新官网已经不推荐使用 polyfill 而是使用 core-js 来代替了。

早期的 polyfill 都是从各个网站上去找，这就存在代码是否靠谱的问题，如果存在 Bug 的话会导致很多的问题，那有没有一个比较官方的比较稳定的 polyfill 的集合呢？这时候 [core-js](https://github.com/zloirock/core-js#ecmascript-array) 来了，它是一个标准的库。

因为 `core-js` 本身不支持 generate 语法，因此要想使用 generate 语法还需要借助[regenerator](https://github.com/facebook/regenerator)

`babel-polyfill` 就是 core-js 和 regenerator 的集合。需要注意 Babel 7.4 之后弃用了 babel-polyfill，推荐直接使用 core-js 和 regenerator。

#### 使用演示

原始代码：

```js
const sum = (m, n) => {
  return m + n
};

Promise.resolve('hello').then(res => {
  console.log(res)
});

['zhangsan', 'lisi', 'wangwu'].includes('lisi');
```

未使用之前，编译代码如下：

```bash
➜  webpack4-study git:(feature/base-babel) ✗ yarn babel
yarn run v1.17.3
warning ../../../package.json: No license field
$ babel src/index.js
"use strict";

var sum = function sum(m, n) {
  return m + n;
};
Promise.resolve('hello').then(function (res) {
  console.log(res);
});
['zhangsan', 'lisi', 'wangwu'].includes('lisi');

✨  Done in 1.29s.
```

安装 babel-polyfill

```
yarn add @babel/polyfill@7.7.0
```

引入 babel-polyfill

```js
/**
 * 说明：babel本身只解析语法，不处理模块化(webpack处理)，只要语法符合规范就可以，它不管API在浏览器中是否支持，如果某些浏览器对某些API本身不支持，需要使用补丁，则借助@babel/polyfill
 */
import '@babel/polyfill'
const sum = (m, n) => {
  return m + n
};

// 新的API，符合语法规范
Promise.resolve('hello').then(res => {
  console.log(res)
});

// 新的API，符合语法规范
['zhangsan', 'lisi', 'wangwu'].includes('lisi');

```

使用之后，编译代码如下：

```bash
➜  webpack4-study git:(feature/base-babel) ✗ yarn babel                       
yarn run v1.17.3
warning ../../../package.json: No license field
$ babel src/index.js
"use strict";

require("@babel/polyfill");
/**
 * 说明：babel只解析语法，只要语法符合规范就可以，它不管API在浏览器中是否支持
 */

var sum = function sum(m, n) {
  return m + n;
};

// 新的API，符合语法规范
Promise.resolve('hello').then(function (res) {
  console.log(res);
});

// 新的API，符合语法规范
['zhangsan', 'lisi', 'wangwu'].includes('lisi');

✨  Done in 1.00s.
➜  webpack4-study git:(feature/base-babel) ✗ 
```

因为引入了补丁 `require("@babel/polyfill");` 这时候所有浏览器就都支持了。

#### 按需引入

babel-polyfill 的文件比较大，我们可能只使用到了一部分功能，无需全部引入，需要按需引入。

1. 修改 .babelrc

```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3 // 使用 corejs 的 3 版本
      }
    ]
  ]
}
```

2. 删除代码中引入的 babel-polyfill

```
// import '@babel/polyfill'
```

3. 此时在运行编译

```bash
➜  webpack4-study git:(feature/base-babel) ✗ yarn babel
yarn run v1.17.3
warning ../../../package.json: No license field
$ babel src/index.js
"use strict";

require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
/**
 * 说明：babel只解析语法，只要语法符合规范就可以，它不管API在浏览器中是否支持
 */
// import '@babel/polyfill'
var sum = function sum(m, n) {
  return m + n;
};

// 新的API，符合语法规范
Promise.resolve('hello').then(function (res) {
  console.log(res);
});

// 新的API，符合语法规范
['zhangsan', 'lisi', 'wangwu'].includes('lisi');

✨  Done in 1.03s.
```

### babel-runtime

babel-polyfill 会污染全局环境，实现原理如下

```js
window.Promise = function() {}
Array.prototype.includes = function() {}

```

这种方式，如果做一个独立的web系统没有什么问题，但是如果是做一个第三方库就有问题了。比如使用方基于特定环境的原因可能会重写 window.Promise = function() {} 或 Array.prototype.includes 的实现，这就会造成冲突了。

这时候就需要使用 babel-runtime 来解决这个问题。

#### 安装

```bash
yarn add @babel/plugin-transform-runtime@7.7.5 -D
```

```bash
yarn add @babel/runtime@7.7.5
```

#### 配置

.babelrc

```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage", // 按需引入
        "corejs": 3 // 使用 corejs 的 3 版本
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": 3,
        "helper": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ]
}
```

运行编译：

```bash
➜  webpack4-study git:(feature/base-babel) ✗ yarn babel                                       
yarn run v1.17.3
warning ../../../package.json: No license field
$ babel src/index.js
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes.js"));
var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise.js"));
var _context;
/**
 * 说明：babel只解析语法，只要语法符合规范就可以，它不管API在浏览器中是否支持
 */
// import '@babel/polyfill'
var sum = function sum(m, n) {
  return m + n;
};

// 新的API，符合语法规范
_promise["default"].resolve('hello').then(function (res) {
  console.log(res);
});

// 新的API，符合语法规范
(0, _includes["default"])(_context = ['zhangsan', 'lisi', 'wangwu']).call(_context, 'lisi');

✨  Done in 1.04s.
➜  webpack4-study git:(feature/base-babel) ✗ 
```

原理就是通过自定义函数实现与全局变量区分开，这样就不会污染全局环境了。