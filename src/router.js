//路由部分
//引入vue-router
import VueRouter from 'vue-router'

import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import  NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'

var router=new VueRouter({
    routes:[
        {path:'/',redirect:"/home"}, //重定向.默认页面刷新,路径为/时页面时/home指向的组件的页面
        {path:'/home',component:HomeContainer},
        {path:'/member',component:MemberContainer},
        {path:'/shopcar',component:SearchContainer},
        {path:'/search',component:ShopcarContainer},
        {path:'/home/newslist',component:NewsList},
        {path:'/home/newsInfo/:id',component:NewsInfo},
    ],
    linkActiveClass:'mui-active'
})
export default router
