<template>
    <div>
        <!-- 轮播图 -->
        <mt-swipe :auto="4000">
            <!-- 遍历获取到的图片的数据 -->
            <mt-swipe-item v-for="item in dataArr" :key="item.id">
                <img :src="item.img" alt="" :class="{'full':isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    props:['dataArr',"isfull"],
}
</script>

<style lang="scss" scope>
.mint-swipe{
      height: 200px;
      .mint-swipe-item{
        text-align: center;
          img{
              height: 100%;
          }
      }
  }
  .full{
      width:100%;
  }
</style>
