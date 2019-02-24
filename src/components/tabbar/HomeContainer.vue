<template>
    <div>
        <!-- 轮播图 -->
        <mt-swipe :auto="4000">
            <!-- 遍历获取到的图片的数据 -->
            <mt-swipe-item v-for="item in dataArr" :key="item.id">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>

        <!-- 六宫格 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <img src="../../images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div></a></li>
        </ul> 
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return {
           dataArr:[]
        }
    },
    created(){
        this.getList()
    },
    methods:{
        getList(){
            this.$http.get('http://www.liulongbin.top:3005/api/getlunbo').then(result=>{
                // console.log(result.body.message);
                if(result.body.status==0){
                    this.dataArr=result.body.message
                }else{
                   Toast('图片加载失败...')
                }
            })
        }
    }
}
</script>

<style lang="scss" scope>
  .mint-swipe{
      height: 200px;
      .mint-swipe-item{
          &:nth-child(1){
              background-color: pink;
          }
           &:nth-child(2){
              background-color: red;
          }
           &:nth-child(3){
              background-color: blue;
          }
          img{
              width: 100%;
              height: 100%;
          }
      }
  }
  .mui-grid-view.mui-grid-9{
      background-color: #fff;
      img{
          width: 60px;
          height: 60px;
      }
      .mui-table-view-cell{
          border:none;
          .mui-media-body{
              font-size: 13px;
          }
      }
  }
</style>
