<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newList" :key="item.id">
					<router-link :to="'/home/newsInfo/'+item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h1>{{item.title}}</h1>
							<p class='mui-ellipsis'>
                                <span>发表时间:{{item.add_time | dataFormat}}</span>
                                <span>点击量:{{ item.click }}</span>
                            </p>
						</div>
					</router-link>
				</li> 
			</ul>
    </div>
</template>

<script>
export default {
    data(){
        return {
            newList:[],
        }
    },
    created(){
        this.getList();
    },
    methods: {
        getList(){
            this.$http.get('api/getnewslist').then(res=>{
                if(res.body.status==0){
                   this.newList=res.body.message;
                }
            })
        }
    }
}
</script>

<style lang="scss" scope >
   li{
       h1{
         font-size:14px;
       }
       .mui-ellipsis{
       font-size: 12px;
       display: flex;
       justify-content: space-between;
       }
   }
   
</style>
