### ParalleUglifyPlugin 多进程压缩 JS

- Webpack 虽然内置了 Uglify 工具来压缩 JS，但是 JS 本身是单线程的，开启多进程压缩会更快
- 针对特别简单的项目开启后可能会增加打包时间，因为切换进程也需要时间开销，所以越大的项目优化效果越明显

优化前：

``` bash
➜  webpack4-study git:(test) yarn build
yarn run v1.17.3
warning ../../../package.json: No license field
$ webpack --config config/webpack.prod.js
Hash: c7a990591a858008ed67
Version: webpack 4.47.0
Time: 1340ms
Built at: 2025/02/25 12:26:53
                                    Asset       Size  Chunks                                Chunk Names
/img/3c18c9ac4797c44a6b4132a3a151de6f.png   1.35 MiB          [emitted]              [big]  
                        index.387692cc.js   53.3 KiB       0  [emitted] [immutable]         index
                               index.html  346 bytes          [emitted]                     
Entrypoint index = index.387692cc.js
[0] ./src/css/index.css 525 bytes {0} [built]
[2] ./node_modules/css-loader/dist/cjs.js!./src/css/index.css 271 bytes {0} [built]
[4] ./src/js/index.js + 2 modules 48.9 KiB {0} [built]
    | ./src/js/index.js 333 bytes [built]
    | ./src/img/compute.png 85 bytes [built]
    | ./src/img/person.jpeg 48.5 KiB [built]
    + 2 hidden modules

WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
This can impact web performance.
Assets: 
  /img/3c18c9ac4797c44a6b4132a3a151de6f.png (1.35 MiB)

WARNING in webpack performance recommendations: 
You can limit the size of your bundles by using import() or require.ensure to lazy load some parts of your application.
For more info visit https://webpack.js.org/guides/code-splitting/
Child html-webpack-plugin for "index.html":
     1 asset
    Entrypoint undefined = index.html
    [0] ./node_modules/html-webpack-plugin/lib/loader.js!./src/index.html 487 bytes {0} [built]
    [2] (webpack)/buildin/global.js 472 bytes {0} [built]
    [3] (webpack)/buildin/module.js 497 bytes {0} [built]
        + 1 hidden module
✨  Done in 3.11s.

```

优化后：

``` bash
➜  webpack4-study git:(optimization-build-paralle-uglify) ✗ yarn build
yarn run v1.17.3
warning ../../../package.json: No license field
$ webpack --config config/webpack.prod.js
(node:36609) DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
(Use `node --trace-deprecation ...` to show where the warning was created)
Hash: c7a990591a858008ed67
Version: webpack 4.47.0
Time: 1842ms
Built at: 2025/02/25 12:53:24
                                    Asset       Size  Chunks                                Chunk Names
/img/3c18c9ac4797c44a6b4132a3a151de6f.png   1.35 MiB          [emitted]              [big]  
                        index.387692cc.js     53 KiB       0  [emitted] [immutable]         index
                               index.html  346 bytes          [emitted]                     
Entrypoint index = index.387692cc.js
[0] ./src/css/index.css 525 bytes {0} [built]
[2] ./node_modules/css-loader/dist/cjs.js!./src/css/index.css 271 bytes {0} [built]
[4] ./src/js/index.js + 2 modules 48.9 KiB {0} [built]
    | ./src/js/index.js 333 bytes [built]
    | ./src/img/compute.png 85 bytes [built]
    | ./src/img/person.jpeg 48.5 KiB [built]
    + 2 hidden modules

WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
This can impact web performance.
Assets: 
  /img/3c18c9ac4797c44a6b4132a3a151de6f.png (1.35 MiB)

WARNING in webpack performance recommendations: 
You can limit the size of your bundles by using import() or require.ensure to lazy load some parts of your application.
For more info visit https://webpack.js.org/guides/code-splitting/
Child html-webpack-plugin for "index.html":
     1 asset
    Entrypoint undefined = index.html
    [0] ./node_modules/html-webpack-plugin/lib/loader.js!./src/index.html 487 bytes {0} [built]
    [2] (webpack)/buildin/global.js 472 bytes {0} [built]
    [3] (webpack)/buildin/module.js 497 bytes {0} [built]
        + 1 hidden module
✨  Done in 2.87s.
➜  webpack4-study git:(optimization-build-paralle-uglify) ✗
```

**collapse_vars、reduce_vars** 配置后的变量优化举例子：

```
var m = 10;
var n = 30;
var s = m + n
```

优化后：

```
var s = 40 或者 var s = 10 + 30
```

### 关于开启多进程

- 项目较大，打包较慢，开启多进程可以提高打包速度
- 项目较小，打包很快，开启多进程会降低速度，因为多进程切换是有时间开销的，需要特别注意