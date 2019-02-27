<template>
    <div class="goodsDesc">
        <h1>{{ info.title }}</h1>
        <hr>
        <p v-html="info.content"></p>
    </div>
</template>

<script>
export default {
   data(){
       return {
           idss:this.$route.params.id,
           info:{}
       }
   },
   created(){
       this.getGoodDesc();
   },
   methods:{
       getGoodDesc(){
           this.$http.get('api/goods/getdesc/'+this.idss).then(res=>{
               if(res.body.status==0){
                   this.info=res.body.message[0];
                   console.log(this.info);
               }
           })
       }
   }
}
</script>

<style lang="less" scope>
  .goodsDesc{
      padding:0 5px;
      h1{
          font-size: 16px;
          color:#226aff;
          text-align: center;
          margin:15px 0;
      }
      p{
          img{
              width: 100%;
          }
      }
  }
</style>
