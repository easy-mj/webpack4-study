### 避免引入无用模块

```
import monment from 'monment'
```

经典案例使用场景：使用包含多语言的时间处理库 monment，该库默认会引入所有语言的 JS 代码，代码过大。

处理方式：

1、使用 *webpack.IgnorePlugin* 忽略掉 moment 下的语言包，这时候就不会引入语言包

```
plugins: [
  new webpack.IgnorePlugin(/\.\/locale/, /moment/)
]
```

2、手动引入需要的语言包

```
import moment from "moment";
import 'moment/locale/zh-cn'; // 手动引入需要的语言包
moment.locale('zh-cn'); // 设置语言为中文
```

执行打包后发现，代码包体积从：266 KiB 减小到 58.7 KiB，优化效果还是非常明显的。

还可以使用按需加载方式优化：

```
const moment = require('moment');

// 动态导入中文语言包
import('moment/locale/zh-cn').then(() => {
  moment.locale('zh-cn');
  const now = moment();
  console.log(now.format('dddd, MMMM Do YYYY'));
});
```