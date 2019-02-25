//入口函数
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//想要使用moment插件来格式化时间,要先下载moment包,然后在这里引入
import moment from "moment"
//定义全局过滤器 格式化时间
Vue.filter('dataFormat',(datastr,pattern="YYYY-MM-DD HH:mm:ss")=>{
    return moment(datastr).format("YYYY-MM-DD HH:mm:ss");
})

//引入vue-resource以在vue中发送请求数据
import VueResource from "vue-resource"
// 要使用vue-resource必须在引入之后再手动设置一下
Vue.use(VueResource)
//设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
Vue.http.options.emulateJSON = true;

//引入缩略图样式
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
Vue.use(VuePreview, {
    mainClass: 'pswp--minimal--dark',
    barsSize: {top: 0, bottom: 0},
    captionEl: true,
    fullscreenEl: false,
    shareEl: true,
    bgOpacity: 0.85,
    tapToClose: true,
    tapToToggleControls: true
  })

//引入Mui的样式,以使用底部导航栏
import './lib/mui/css/mui.min.css'

//引入这个文件为使用购物车的图标
import './lib/mui/css/icons-extra.css'

//引入mint-ui的Header部分需求,做头部Header
import {Header, Swipe, SwipeItem,Button,Lazyload} from 'mint-ui'
Vue.component(Header.name,Header)
//引入轮播图相关的需求
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload);

import app from './App.vue'
import router from './router.js'

var vm=new Vue({
    el:'#app',
    render:c=>c(app),
    router
})