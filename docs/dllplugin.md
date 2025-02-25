### DllPlugin 动态链接库插件

- 前端框架如 Vue、React等，代码体积比较大，构建缓慢
- 这些框架比较稳定，不经常升级版本，所以一个版本只要构建一次即可，不需要每次都重新构建
- Webpack本身已经内置了DllPlugin支持，使用 `DllPlugin` 插件打包出dll文件，然后借助 `DllReferencePlugin` 插件来使用 dll 文件

### 打包 dll 

```
➜  webpack4-study git:(optimization-build-dllplugin) ✗ yarn dll
yarn run v1.17.3
warning ../../../package.json: No license field
$ webpack --config config/webpack.dll.js
Hash: 1cce93ad0a1aec1fb178
Version: webpack 4.47.0
Time: 465ms
Built at: 2025/02/25 17:13:58
       Asset     Size  Chunks             Chunk Names
react.dll.js  128 KiB       0  [emitted]  react
Entrypoint react = react.dll.js
[2] dll react 12 bytes {0} [built]
    + 7 hidden modules
✨  Done in 1.34s.

```

### 使用 dll 后，运行环境

``` bash
➜  webpack4-study git:(optimization-build-dllplugin) ✗ yarn dev
yarn run v1.17.3
warning ../../../package.json: No license field
$ webpack-dev-server --config config/webpack.dev.js
10% building 1/1 modules 0 activeℹ ｢wds｣: Project is running at http://localhost:8080/
ℹ ｢wds｣: webpack output is served from /
ℹ ｢wds｣: Content not from webpack is served from /Users/a1/Desktop/fe/webpack4-study/dist
10% building 1/2 modules 1 active ...tudy/node_modules/webpack-dev-server/client/index.js?http://localhost:8080ℹ ｢wdm｣: wait until bundle finished: /
ℹ ｢wdm｣: Hash: 9ad1d6fd4e5746604463
Version: webpack 4.47.0
Time: 4602ms
Built at: 2025/02/25 17:14:58
     Asset       Size  Chunks             Chunk Names
index.html  388 bytes          [emitted]  
  index.js    439 KiB   index  [emitted]  index
Entrypoint index = index.js
[0] multi (webpack)-dev-server/client?http://localhost:8080 ./src/index 40 bytes {index} [built]
[./node_modules/ansi-html-community/index.js] 4.16 KiB {index} [built]
[./node_modules/react-dom/index.js] delegated ./node_modules/react-dom/index.js from dll-reference __dll__react 42 bytes {index} [built]
[./node_modules/react/index.js] delegated ./node_modules/react/index.js from dll-reference __dll__react 42 bytes {index} [built]
[./node_modules/webpack-dev-server/client/index.js?http://localhost:8080] (webpack)-dev-server/client?http://localhost:8080 4.29 KiB {index} [built]
[./node_modules/webpack-dev-server/client/overlay.js] (webpack)-dev-server/client/overlay.js 3.52 KiB {index} [built]
[./node_modules/webpack-dev-server/client/socket.js] (webpack)-dev-server/client/socket.js 1.53 KiB {index} [built]
[./node_modules/webpack-dev-server/client/utils/createSocketUrl.js] (webpack)-dev-server/client/utils/createSocketUrl.js 2.91 KiB {index} [built]
[./node_modules/webpack-dev-server/client/utils/log.js] (webpack)-dev-server/client/utils/log.js 964 bytes {index} [built]
[./node_modules/webpack-dev-server/client/utils/reloadApp.js] (webpack)-dev-server/client/utils/reloadApp.js 1.59 KiB {index} [built]
[./node_modules/webpack-dev-server/client/utils/sendMessage.js] (webpack)-dev-server/client/utils/sendMessage.js 402 bytes {index} [built]
[./node_modules/webpack-dev-server/node_modules/strip-ansi/index.js] (webpack)-dev-server/node_modules/strip-ansi/index.js 161 bytes {index} [built]
[./node_modules/webpack/hot sync ^\.\/log$] (webpack)/hot sync nonrecursive ^\.\/log$ 170 bytes {index} [built]
[./src/App.js] 234 bytes {index} [built]
[./src/index.js] 180 bytes {index} [built]
    + 65 hidden modules
Child html-webpack-plugin for "index.html":
     1 asset
    Entrypoint undefined = index.html
    [./node_modules/html-webpack-plugin/lib/loader.js!./src/index.html] 540 bytes {0} [built]
    [./node_modules/lodash/lodash.js] 531 KiB {0} [built]
    [./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 bytes {0} [built]
    [./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 497 bytes {0} [built]
ℹ ｢wdm｣: Compiled successfully.

```