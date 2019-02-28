//路由部分
//引入vue-router
import VueRouter from 'vue-router'

import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import  NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/Photos/PhotoList.vue'
import PhotoInfo from "./components/Photos/PhotoInfo.vue"
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'

var router=new VueRouter({
    routes:[
        {path:'/',redirect:"/home"}, //重定向.默认页面刷新,路径为/时页面时/home指向的组件的页面
        {path:'/home',component:HomeContainer},
        {path:'/member',component:MemberContainer},
        {path:'/search',component:SearchContainer},
        {path:'/shopcar',component:ShopcarContainer},
        {path:'/home/newslist',component:NewsList},
        {path:'/home/newsInfo/:id',component:NewsInfo},
        {path:'/home/photolist',component:PhotoList},
        {path:'/home/photoInfo/:id',component:PhotoInfo},
        {path:'/home/goodslist',component:GoodsList},
        {path:'/home/goodsInfo/:id',component:GoodsInfo},
        {path:'/home/goodsDesc/:id',component:GoodsDesc,name:'goodsDesc'},
        {path:'/home/goodsComment/:id',component:GoodsComment,name:'goodsComment'},

    ],
    linkActiveClass:'mui-active'
})
export default router
