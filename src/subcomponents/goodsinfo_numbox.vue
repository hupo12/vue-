<template>
    <div class="num-box">
        <div class="mui-numbox" data-numbox-min='1' data-numbox-max='max'>
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" ref="numbox" @change="numChange"/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
    </div>
</template>

<script>
import mui from '../lib/mui/js/mui.min.js'
export default {
   mounted () {
    mui(".mui-numbox").numbox();
    console.log(this.max);
   },
   methods: {
     //通过调用这个方法可以将计算器中用户选择的商品的数量传递到它的父组件那边
     numChange(){
       this.$emit('getCount',parseInt(this.$refs.numbox.value))
     }
   },
   props:['max'],
   watch:{
     max:function(newVal,oldVal){
       // 使用 JS API 设置 numbox 的最大值
       mui(".mui-numbox")
       .numbox()
       .setOption("max", newVal);
     }
   }
}
</script>

<style>
  .num-box{
      display: inline-block;
  }
</style>
