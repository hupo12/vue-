<template>
  <div class="goods-list">
    <!-- <router-link class="goods-item" v-for="item in goodsList" :key="item.id" :to="'/home/goodsInfo/'+item.id" tag="div">
      <img :src="item.img_url">
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>  
    </router-link> -->
    
    <!-- 用编程式导航 即 用js控制路由的跳转 -->
    <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="goDetail(item.id)">
      <img :src="item.img_url">
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>  
    </div>
    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      pagesize:1,
      goodsList:[],
    }
  },
  created(){
    this.getGoodsList();
  },
  methods:{
    getGoodsList(){
      this.$http.get('api/getgoods?pageindex='+this.pagesize).then(res=>{
        if(res.body.status==0){
            // console.log(res.body.message)
            this.goodsList=this.goodsList.concat(res.body.message)
        }
      })
    },
    getMore(){
    this.pagesize++;
    this.getGoodsList();
   },
   goDetail(id){
    //  最简单的
     this.$router.push('/home/goodsInfo/'+id)
   }
  },

};
</script>

<style lang="scss" scope>
    .goods-list{
        padding:0;
        margin:0;
        display: flex;
        padding:7px;
        flex-wrap: wrap;
        justify-content: space-between;
        .goods-item{
            width:49%;
            border:1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin:4px 0;
            padding:2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height:293px;
            img{
                width:100%;
            }
            .title{
                font-size:14px;
            }
            .info{
                background-color: #eee;
                p{
                    margin:0;
                    padding:5px;
                }
                .price{
                    .now{
                        color:red;
                        font-weight:700;
                        font-size:16px;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size:12px;
                        margin-left:10px;
                    }
                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                    font-size:13px;
                }
            }
        }
    }
</style>
