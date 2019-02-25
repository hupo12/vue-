<template>
    <div class="photoInfo_detail">
       <h1>{{datasList.title}}</h1>
       <p class="del_time_click">
           <span>发表时间:{{ datasList.add_time }}</span>
           <span>点击:{{ datasList.click }}</span>
       </p>
       <hr>
       <!-- 缩略图区域 -->
       <vue-preview :slides="list">
       </vue-preview>
       <!-- 图片的详情部分 -->
       <div class="photoContent">{{ datasList.content }}</div>
       <comment-vu :id="ids"></comment-vu>
    </div>
</template>

<script>
import comment from '../../subcomponents/comment.vue'
export default {
   data(){
       return {
           ids:this.$route.params.id, //从路由中获取到的图片的id
           datasList:[], //图片详情
           list: [] // 缩略图的数组
       }
   },
   created(){
       this.getAllInfomsg();
       this.getThumbs();
   },
   methods:{
      getAllInfomsg(){
          this.$http.get('api/getimageInfo/'+this.ids).then(res=>{
              if(res.body.status==0){
                  console.log(res.body.message[0]);
                  this.datasList=res.body.message[0];
              }
          })
      },
      getThumbs(){
          this.$http.get('api/getthumimages/'+this.ids).then(res=>{
              if(res.body.status==0){
                  //循环每个图片数据,不全图片的宽和高
                  res.body.message.forEach(item=>{
                      item.w=600;
                      item.h=400;
                      item.msrc=item.src
                  })
                  //将完整的数据保存到list中
                  this.list=res.body.message
                  console.log(this.list);
              }
          })
      }
   },
   components:{
       'comment-vu':comment
   }
}
</script>

<style lang="scss">
   .photoInfo_detail{
        padding:0 5px;
       h1{
         color:#26a2ff;
         font-size: 15px;
         text-align: center;
         margin-top: 15px;
       }
       .del_time_click{
           display: flex;
           justify-content: space-between;
       }
       .photoContent{
           font-size: 13px;
       }
   }
    .my-gallery{
     display: flex;
     flex-wrap: wrap;
       figure {
        margin: 10px;
        box-shadow: 0 0 10px #999;
        img{
            width: 100px;
            vertical-align: middle;
        }
    }
    }
</style>
