<template>
    <div class="newDetail">
        <h1 class="title">{{allList.title}}</h1>
        <p class="time_click">
            <span class="add_time">发表时间:{{allList.add_time|dataFormat}}</span>
            <span class="clickNum">点击:{{allList.click}}</span>
        </p>
        <hr>
        <!-- 内容区域 -->
        <div class="content" v-html="allList.content"></div>
        <!-- 评论子组件区域 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
// 导入 评论子组件
import comment from "../../subcomponents/comment.vue";
export default {
    data(){
        return {
            id:this.$route.params.id,
            allList:{},
        }
    },
    created(){
        this.getDetail();
    },
    methods:{
        getDetail(){
            this.$http.get('api/getnew/'+this.id).then(res=>{
                if(res.body.status==0){
                    this.allList=res.body.message[0];
                }else{
                    Toast("获取新闻信息失败!")
                }
            })
        }
    },
    components:{
        'comment-box':comment //注册子组件
    }
}
</script>

<style lang="scss">
    .newDetail{
         h1.title{
             font-size: 16px;
             color:red;
             text-align: center;
             margin-top: 15px;
         }
         .time_click{
             padding:0 5px;
             font-size: 13px;
             color:#226aff;
             display:flex;
             justify-content: space-between;
         }
         .content{
             padding: 5px;
         }
    }
</style>
