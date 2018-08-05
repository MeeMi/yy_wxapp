<template>
    <div  class="detailBox" >
        <!-- 轮播图 -->
        <div class="swiperBox" >
            <swiper  @change="imgChange" :style="{height:imageheight?imageheight+'rpx':'1006'+'rpx'}">
                <swiper-item v-for="item in swiperImg" :key="item.id">
                    <image :src="item.src"  class="slide-image"  mode="widthFix" @load="FitHeight" @click="clickImg" :id="item.id" />
                </swiper-item>
            </swiper>
        </div>
        <div v-if="authorInfo">
            <note-avatar  :authorInfo="authorInfo" isFollow="true" ></note-avatar>
            <div class="noteContent">
                <h3 class="title">{{contentInfo.title}}</h3>
                <div class="content">
                    <!-- <wxParse :content="contentInfo.content"  /> -->
                    {{contentInfo.content}}
                </div>
                <div class="noteInfo">
                    <span class="date">{{contentInfo.date}}</span>
                    <span class="support">{{contentInfo.support}}次赞</span>
                    <span class="collect">{{contentInfo.collect}}次收藏</span> 
                </div>
            </div>
        </div>

        <div v-else>
            <div class="shopsInfo">
                <div class="price-box">
                    <span class="newPrice">￥{{contentInfo.newPrice}}</span>
                    <span class="price">{{contentInfo.price}}</span>
                    <span class="discount">{{contentInfo.discount}}折</span>
                    <span v-if="contentInfo.tax == '包税'" class="freeTax">{{contentInfo.tax}}</span>
                    <span class="tax" v-else>跨境税 ￥{{contentInfo.tax}}</span>
                </div>
                <div class="title">
                    <h3>{{contentInfo.title}}</h3>
                    <a href="#" class="shoppingbag">
                        <image src="/static/images/shoppingbag.png"/>
                        <span>心愿单</span>
                    </a>
                </div>
                <p class="from">{{contentInfo.from}}</p>
            </div>
            <div class="weui-cells green">
                <a class="weui-cell weui-cell_access" href="javascript:;">
                    <div class="weui-cell__bd">
                        <p>新人: 领新人薯券大礼包，享专属优惠</p>
                    </div>
                    <div class="weui-cell__ft"></div>
                </a>
            </div>
            <div class="promise"></div>
            <div class="weui-cells seleted">
                <a class="weui-cell weui-cell_access" href="javascript:;">
                    <div class="weui-cell__bd">
                        <p>已选： {{contentInfo.shopName}}</p>
                    </div>
                    <div class="weui-cell__ft"></div>
                </a>
            </div>
            <div class="desc">{{contentInfo.desc}}</div>
            
            <fix-nav :goodItem="contentInfo" @addShoppingcart="addShoppingcart" :productsQuantity="products"></fix-nav>
        </div>
        
        
        <!-- :userData -->
        <note-comment comment-title="笔记评论" :commentItem="commentItem" :more="true" >
        </note-comment>
    </div>
</template>

<script>
import Comment from '@/components/Comment'
import Avatar from '@/common/Avatar'
import fixNav from '@/components/FixNav'
import wxParse from 'mpvue-wxparse'
// import { mapActions } from 'vuex';

export default {
    data(){
        return{
            imgheights: [],
            scrollWidth: 0,
            current:0,
        }
    },
    computed:{
        imageheight(){
            return this.imgheights[this.current]
        },
       products() {
        if(this.$store.state.items.length!=0){
            const Item = this.$store.state.items.reduce((total,item) =>{
                return total + item.quantity
            },0)
            return Item
        }
            
       }
    },
    components: {
        "note-comment":Comment,
        "note-avatar":Avatar,
        "fix-nav":fixNav,
        wxParse
    },
    props:['swiperImg','authorInfo','contentInfo','commentItem'],
    methods:
    {
        FitHeight(e){
            let imgwidth = e.mp.detail.width,
            imgheight = e.mp.detail.height,
            ratio = imgwidth / imgheight;//宽高比  
            let viewHeight = 750 / ratio; //使用rpx做单位
            imgheight = viewHeight.toFixed(0);

            this.imgheights[e.mp.currentTarget.id-1]=imgheight;       
        },
        imgChange(e){
            // console.log(e)
            let currentIndex = e.mp.detail.current ;
            this.current = currentIndex;
        },
        addShoppingcart(product) {            
            this.$store.commit('PUSHPRODUCTTOCART',product);
        }
    },
    created:function(){
        wx.getSystemInfo({
            success: (res)=>{
                //获取屏幕的宽度并保存
                // console.log(res)
                this.scrollWidth = res.windowWidth;
                console.log(this.scrollWidth)
            }
        });
    },
    mounted() {
       console.log(this.contentInfo);
       
    }
}
</script>

<style scoped lang="stylus">

    .detailBox
        font-size 16px;
        width: 100vw;
        height: 100vh;
        .swiperBox
            max-height: 700px;
    
        swiper-item .slide-image
            width: 100%;
            height:auto;
    
        .noteContent
            width: 100%;
            .title
                width: 100%;
                height: auto;
            .noteInfo
                height: 28rpx;
                line-height: 28rpx;
                font-size: 12px;
                color: #dfdfdf;
                margin:106rpx 0 25rpx;
                .collect,.support
                    box-sizing:border-box;
                    padding:0 30rpx;
                .collect
                    color: #b9b9b9;
                    float: right;
                    margin-right: 10rpx;
            .content img.icon
                width: 64rpx;
                height: 64rpx;

        .shopsInfo 
            // height 403rpx
            background-color #fff;
            overflow hidden
            margin 5rpx 0
            .price-box
                overflow hidden
                height 90rpx
                font-size 21rpx
                .newPrice
                    color #dd2a45
                    font-size 35rpx
                    font-weight 900
                .price,.discount
                    color #646464
                .price
                    text-decoration line-through
                .tax
                    float right
                .freeTax
                    height 28rpx
                    color #ffffff
                    background-color #fc2740
            .title
                width 100%
                display flex
                h3
                    flex 1
                    font-size 30rpx
                    font-weight 900
                    display inline-block
                    word-break break-all
                a.shoppingbag
                    display inline-flex
                    flex-direction column
                    justify-content center
                    width 90rpx
                    font-size 20rpx
                    image 
                        margin auto
                        width 35rpx
                        height 35rpx

</style>
