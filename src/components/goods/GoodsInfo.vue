<template>
    <div class="goods-info">
        <transition
        @before-enter="f1"
        @enter="f2"
        @after-enter="f3"
        >
            <div class="ball" v-show="isflag" ref='balls'></div>
        </transition>
        <!-- 商品轮播图区域 -->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :dataArr="lunbotu" :isfull="false"></swiper>
					</div>
				</div>
			</div>
        <!-- 商品购买区域 -->
        <div class="mui-card">
				<div class="mui-card-header">{{ goodsInfos.title }}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                            市场价:<span class="old">￥{{ goodsInfos.market_price }}</span>
                            销售价:<span class="sell">￥{{ goodsInfos.sell_price }}</span>
                        </p>
                        <p class="num">购买数量:
                           <numbox @getCount="getSelectedCount" :max="goodsInfos.stock_quantity"></numbox>
                        </p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addGoods">加入购物车</mt-button>
					</div>
				</div>
			</div>
        <!-- 商品参数区域 -->
        <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号:{{ goodsInfos.goods_no }}</p>
						<p>库存情况:{{ goodsInfos.stock_quantity }}</p>
						<p>上架时间:{{ goodsInfos.add_time }}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                  <mt-button type="primary" size="large" @click="goDesc(id)">图文介绍</mt-button>
                  <mt-button type="danger" size="large" @click="goComment(id)">商品评论</mt-button>
                </div>
			</div>
    </div>
</template>

<script>
import numbox from '../../subcomponents/goodsinfo_numbox'
import swiper from '../../subcomponents/swiper'
export default {
  data(){
      return {
          id:this.$route.params.id, //商品的id
          lunbotu:[],  //轮播图的信息
          goodsInfos:[],   //商品的所有的详细信息
          isflag:false, //小球是否显示的状态
          selectedCount:1,
      }
  },
  created(){
      this.getLunbotu();
      this.getGoodsInfo();
  },
  methods:{
     getLunbotu(){
         this.$http.get('api/getthumimages/'+this.id).then(res=>{
             if(res.body.status==0){
                 res.body.message.forEach(item=>{
                     item.img=item.src
                 })
                 this.lunbotu=res.body.message;
                //  console.log(this.lunbotu);
             }
         })
     },
     getGoodsInfo(){
         this.$http.get('api/goods/getinfo/'+this.id).then(res=>{
             if(res.body.status==0){
                this.goodsInfos=res.body.message[0];
                console.log(this.goodsInfos);
             }
         })
     },
     goDesc(id){
//点击 用编程导航 跳转到 图文介绍页面
       this.$router.push({name:'goodsDesc',params:'id'})
     },
     goComment(id){
//点击跳转到评论页面
       this.$router.push({name:'goodsComment',params:'id'})
     },
     //添加购物车按钮 的点击事件
     addGoods(){
         this.isflag=!this.isflag;
     },
     f1(el){
        el.style.transform="translate(0,0)";
     },
     f2(el,done){
         el.offsetWidth;
         //获取小球在页面距离浏览器的位置
         const ballPlace=this.$refs.balls.getBoundingClientRect();
         console.log(ballPlace);
         //购物车上数量的位置
         const huiPlace=document.querySelector('.mui-badge').getBoundingClientRect();
        // 计算 移动的距离
         const leftCount= parseInt(huiPlace.left-ballPlace.left);
         const topCount= parseInt(huiPlace.top-ballPlace.top);
        //  这两种方式拼接字符串都可以
        // el.style.transform="translate("+leftCount+"px,"+topCount+"px)";
        // es6的新方法
        el.style.transform=`translate(${leftCount}px,${topCount}px)`;
        el.style.transition="all 1s cubic-bezier(.4,-0.3,1,.68)";
        done();
     },
     f3(el){
         this.isflag=!this.isflag;
     },
     //这个方法是可以获得子组件传递过来的 计算器的值
     getSelectedCount(count){
         this.selectedCount=count;
         console.log('父组件拿到的数量是'+this.selectedCount);
     }
  },
  components:{
      swiper,  //轮播图的组件
      numbox  //计数器的组件
  }
}
</script>

<style lang="scss" scope>
  .goods-info{
      overflow: hidden;
      background-color: #eee;
     .mui-card-content{
         .price{
             .old{
                 text-decoration: line-through
             }
             .sell{
                 font-size: 16px;
                 color:red;
                 font-weight: 700
             }
         }
     }
     .mui-card-footer{
         display: block;
         button{
             margin: 15px 0;
         }
     }
     .ball{
         width: 15px;
         height: 15px;
         background-color: red;
         border-radius: 50%;
         position: absolute;
         left:140px;
         top:390px;
         z-index:99;
     }
  }
</style>
