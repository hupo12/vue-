<template>
    <div>
        <!-- 使用mui的导航栏样式 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id==0 ?'mui-active':'']" @tap="getAllImages(item.id)" href="#item1mobile" data-wid="tab-top-subpage-1.html" v-for="item in category" :key="item.id">
                        {{ item.title }}
                    </a>
                </div>
            </div>
		</div>
        <!-- 图片列表 -->
        <ul class="photo-list">
            <router-link :to="'/home/photoInfo/'+item.id" tag="li" v-for="item in images" :key="item.id">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{ item.title }}</h1>
                    <div class="info-body">{{ item.zhaiyao }}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js';
export default {
    data(){
        return {
            category:[],
            images:[],
        }
    },
    created(){
        this.getAllCategory();
        this.getAllImages(0);
    },
    methods:{
        getAllCategory(){
            this.$http.get('api/getimgcategory').then(res=>{
                if(res.body.status==0){
                    res.body.message.unshift({title:"全部",id:0});
                    this.category=res.body.message;
                }
            })
        },
        getAllImages(id){
            this.$http.get('api/getimages/'+id).then(res=>{
                if(res.body.status==0){
                   this.images=res.body.message
                }else{
                    Toast("加载图片失败!")
                }
            })
        }
    },
    mounted(){
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    }
}
</script>

<style lang="scss" scope>
* {
  touch-action: pan-y;
}
.photo-list{
    list-style: none;
    margin: 0;
    padding: 10px;
    padding-bottom: 0;
       li{
        background-color: #ccc;
        text-align: center;
        margin-bottom: 10px;
        box-shadow: 0 0 9px #999;
        position: relative;
        img{
            width:100%;
            vertical-align: middle;
        }
        img[lazy="loading"] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
        .info{
            position: absolute;
            background-color: rgba(0, 0, 0, 0.4);
            max-height: 84px;
            bottom:0;
            color:#fff;
            text-align: left;
            .info-title{
               font-size: 14px;
            }
            .info-body{
                font-size: 12px;
            }
        }
    }
}
</style>
