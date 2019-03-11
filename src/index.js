//入口函数
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 使用vue提供的懒加载的方法引入
// import VueLazyload from 'vue-lazyload'
// Vue.use(VueLazyload)
// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   error: 'dist/error.png',
//   loading: 'dist/loading.gif',
//   attempt: 1
// })

// 使用axios方法请求数据的引入
// import axios from "axios"
// axios.defaults.baseURL="http://www.liulongbin.top:3005"
// axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded'
// Vue.prototype.$http=axios

// 注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)
//每次刷新页面先将本地存储中的数据获取,存储到car中
var car=JSON.parse(localStorage.getItem('car')||'[]');

var store=new Vuex.Store({
  state:{  //this.$store.state.***
    car:car   //将购物车中商品的数据存储在这里,存储形式:{商品的id:id,商品数量:count,商品单价:price,selected:false/true}
  },
  mutations:{ //this.$store.commit('***')
  //将添加到购物车的商品信息存储起来
      addToCar(state,obj){
        var flag=false;
        state.car.some(item=>{
          if(item.id==obj.id){
            item.count+=parseInt(obj.count);
              flag=true;
              return true;
          }
        })
        if(!flag){
          state.car.push(obj);
        }
        //每次添加到购物车之后再存储到本地,防止数据流失
        localStorage.setItem('car',JSON.stringify( state.car));
      },
      //点击加减时数据变化
      uploadGoodsInfo(state,goodsinfos){
        state.car.forEach(item=>{
          if(item.id==goodsinfos.id){
            item.count=goodsinfos.count;
            return true
          }
        })
        localStorage.setItem('car',JSON.stringify(state.car));
      },
      //根据id删除商品在本地的存储
      delgoods(state,id){
          state.car.forEach((item,index)=>{
            if(item.id==id){
              state.car.splice(index,1);
              return true
            }
          })
        localStorage.setItem('car',JSON.stringify(state.car)); 
      },
      //实时更新商品是否被选中的状态
      updateStatus(state,info){
        state.car.forEach(item=>{
          if(item.id==info.id){
            item.selected=info.selected;
          }
        })
        localStorage.setItem('car',JSON.stringify(state.car)); 
      }
  },
  getters:{  //this.$store.getters.***  getters中不能修改state中的数据,只能获取使用
      getAllCount(state){
        var c=0;
        state.car.forEach(item=>{
          c+=parseInt(item.count);
          // console.log(item.count);
        })
        // console.log(c);
        return c;
      },
      setCarCount(state){
        var n={};
        state.car.forEach(item=>{
          n[item.id]=item.count;
        })
        return n;  //这个n里面的每一项都是以商品的id为属性名,数量count为属性值
      },
      //以商品id为属性名,商品的选中状态为属性值
      getStatus(state){
        var m={};
        state.car.forEach(item=>{
          m[item.id]=item.selected;
        })
        return m;
      },
      //获取所有被选中的商品的数量总
      getSelectedCount(state){
        var nn={
          num:0,
          allPrices:0
        };
        state.car.forEach(item=>{
          if(item.selected){
            // console.log(item.count+'----'+item.price);
             nn.num+=parseInt(item.count);
             nn.allPrices+=parseInt(item.price) * parseInt(item.count)
          }
        })
        return nn;
      }
  },
})

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
// 设置请求的根路径
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
import {Header, Swipe, SwipeItem,Button,Lazyload,Switch} from 'mint-ui'
Vue.component(Header.name,Header)
//引入轮播图相关的需求
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload);
Vue.component(Switch.name, Switch)
// Vue.prototype.aaa='$router';
import app from './App.vue'
import router from './router.js'
var vm=new Vue({
    el:'#app',
    render:c=>c(app),
    router,
    store,
    created() {
     
    },
})