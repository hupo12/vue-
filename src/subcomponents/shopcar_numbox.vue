<template>
    <div class="num-box">
  <div class="mui-numbox" data-numbox-min='1' style="height:25px;">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" :value="everyCount" ref="numbox" @change="changeId"/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
    </div>
</template>

<script>
import mui from '../lib/mui/js/mui.min.js'
export default {
   mounted () {
    mui(".mui-numbox").numbox();
   },
   methods: {
     changeId(){
        //  console.log(this.goodsId+"---"+this.$refs.numbox.value);
         this.$store.commit('uploadGoodsInfo',{
             id:this.goodsId,
             count:this.$refs.numbox.value,
         })
        // 传递id和数量
     }
   },
   props:['everyCount','goodsId'], //goodsId是从商品详情页面传递过来的
}
</script>

<style>
  .num-box{
      display: inline-block;
  }
</style>
