import "../css/index.css";

import moment from "moment";
import 'moment/locale/zh-cn'; // 手动引入需要的语言包/ 手动引入需要的语言包
moment.locale('zh-cn'); // 设置语言为中文
console.log('本地语言：', moment.locale())
console.log('本地日期：', moment().format('ll'))
