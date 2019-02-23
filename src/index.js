//入口函数
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//引入vue-resource以在vue中发送请求数据
import VueResource from "vue-resource"
Vue.use(VueResource)

//引入Mui的样式,以使用底部导航栏
import './lib/mui/css/mui.min.css'
//引入这个文件为使用购物车的图标
import './lib/mui/css/icons-extra.css'

//引入mint-ui的Header部分需求,做头部Header
import {Header, Swipe, SwipeItem} from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

import app from './App.vue'
import router from './router.js'

var vm=new Vue({
    el:'#app',
    render:c=>c(app),
    router
})