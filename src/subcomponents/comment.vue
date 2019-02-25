<template>
    <div class="comment-detail">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入内容(最多吐槽120字)" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

        <!-- 评论的信息 -->
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="i">
                <div class="cmt-title">第{{ i+1 }}楼 用户:{{ item.user_name }} 发表时间:{{ item.add_time }}</div>
                <div class="cmt-body">{{ item.content?item.content:'此用户太懒' }}</div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
import {Toast} from 'mint-ui';
export default {
    data(){
        return {
            pageindex:1,
            comments:[],
            msg:''
        }
    },
    created(){
      this.getComments()
    },
    methods:{
        //获取评论列表
        getComments(){
            this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageindex).then(res=>{
            //    console.log(res.body.message);
            if(res.body.status==0){
                this.comments=this.comments.concat(res.body.message);
            }else{
                Toast("请求数据失败!")
            }
            })
        },
        //点击加载更多
        getMore(){
            this.pageindex++;
            this.getComments();
        },
        postComment(){
            if(!this.msg.trim()){
                Toast("评论内容不能为空!");
                return;
            }
            this.$http.post('api/postcomment/'+this.$route.params.id,{content:this.msg.trim()}).then(res=>{
                // console.log(res.body);
                if(res.body.status==0){
                    var str={
                        user_name:"匿名用户",
                        add_time: Date.now(), //获取时间戳
                        content:this.msg.trim()
                    }
                    this.comments.unshift(str);
                    this.msg='';
                }
            })
        }
    },
    //接收父组件传过来的id
    props:['id'],
}
</script>

<style lang="scss" scope>
   .comment-detail{
       padding:5px;
       h3{
           font-size: 18px;
       }
       textarea{
           font-size: 14px;
           height:85px;
           margin:0;
       }
       .cmt-list{
           margin-top: 5px;
           .cmt-item{
              font-size: 13px;
           .cmt-title{
              line-height: 30px;
              background-color: #ccc;
           }
           .cmt-body{
               line-height: 35px;
           }
         }
       }
       
   }
</style>
