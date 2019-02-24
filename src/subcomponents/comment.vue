<template>
    <div class="comment-detail">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入内容(最多吐槽120字)" maxlength="120"></textarea>
        <mt-button type="primary" size="large">发表评论</mt-button>

        <!-- 评论的信息 -->
        <div class="cmt-list">
            <div class="cmt-item">
                <div class="cmt-title">第1楼 用户:匿名用户 发表时间:</div>
                <div class="cmt-body">哈哈哈哈哈</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    created(){

    },
    methods:{
        
    }
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
