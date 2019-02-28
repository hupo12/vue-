<template>
    <div class="shopcar-content">
        <!-- 购物车页面 -->
       <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner" v-for="(item ,i) in carList" :key="item.id">
                    <mt-switch v-model="$store.getters.getStatus[item.id]" @change="changeStatus(item.id,$store.getters.getStatus[item.id])"></mt-switch>
                    <img :src="item.thumb_path" alt="">
                    <div class="info">
                        <h2 class="title">{{ item.title }}</h2>
                        <p class="price">
                            <span class="sell">￥{{ item.sell_price }}</span>
                            <numbox :everyCount="$store.getters.setCarCount[item.id]" :goodsId="item.id"></numbox>
                            <a href="#" @click.prevent="remove(i,item.id)">删除</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="allPrice">
                        <p>总计(不含运费)</p>
                        <p class="all">
                            已勾选商品<span>{{ $store.getters.getSelectedCount.num }}</span>件,总价<span>￥{{ $store.getters.getSelectedCount.allPrices }}</span>
                        </p>
                    </div>
                    <mt-button size="normal" type="danger">去结算</mt-button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import numbox from '../../subcomponents/shopcar_numbox'
export default {
   components:{
       numbox
   },
   data(){
       return {
          carList:[],
       }
   },
   created(){
       this.getCarList()
   },
   methods:{
       getCarList(){
            var idArr=[];
            this.$store.state.car.forEach(item=>{
                idArr.push(item.id);
            })
            if(idArr.length<=0){
                return;
            }
           this.$http.get('api/goods/getshopcarlist/'+idArr.join(',')).then(res=>{
                if(res.body.status==0){
                    this.carList=res.body.message;
                    // console.log(this.carList);
                }
           })
       },
       remove(index,id){
           //根据索引index先删除carList中被点击的商品
           this.carList.splice(index,1);
           this.$store.commit('delgoods',id);
       },
       changeStatus(ids,status){
        //    console.log(ids+'---'+status);
           this.$store.commit('updateStatus',{id:ids,selected:status})
       }
   }
}
</script>

<style lang="scss" scope>
.shopcar-content{
.mui-card-content-inner{
     display: flex;
     align-items:center;
     justify-content: space-between;
     img{
         width: 60px;
         height: 60px;
     }
     .title{
         font-size: 16px;
         font-weight: 700;
     }
     .price{
        margin-top: 20px;
        align-items: center;
         .sell{
             font-size: 16px;
             font-weight: 700;
             color:red;
         }
     }
     .allPrice{
         span{
             font-size: 16px;
             color:red;
             font-weight: 700;
         }
     }
 }
}
</style>
