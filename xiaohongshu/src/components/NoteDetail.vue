<template>
    <div  class="detailBox" >
        <div class="swiperBox" >
            <swiper  @change="imgChange" :style="{height:imageheight?imageheight+'rpx':'1006'+'rpx'}">
                <swiper-item v-for="item in detailImgs" :key="item.id">
                    <image :src="item.src"  class="slide-image"  mode="widthFix" @load="FitHeight" @click="clickImg" :id="item.id" />
                </swiper-item>
            </swiper>
        </div>
        <div class="user-info">
            <div class="user-pic">
                <image src="https://ci.xiaohongshu.com/8ea674e4-12e9-4240-841a-82705a0a5263@r_640w_640h.jpg"/>
            </div>
            <div class="user-name">
                小娇
            </div>
            <div class="follow">关注</div>
        </div>
        <div class="noteContent">
            <h3 class="title">笔记标题</h3>
            <div class="content">内容</div>
            <div class="noteInfo">
                <span class="date">2018-07-01 23:47</span>
                <span class="collect">收藏</span> <!-- v-if -->
                <span class="like">赞</span>
            </div>
        </div>
        <note-comment comment-title="小红薯们怎么说">
            <!-- <note-avatar slot="avatar"></note-avatar>       -->
        </note-comment>
        
    </div>

</template>

<script>
import Comment from '@/components/Comment'
// import Avatar from '@/components/Avatar'
export default {
    data(){
        return{
            imgheights: [],
            scrollWidth: 0,
            current:0,
            show:true,
        }
    },
    computed:{
        imageheight(){
            return this.imgheights[this.current]
        }
    },
    components: {
        "note-comment":Comment,
        // "note-avatar":Avatar
    },
    props:{
        detailImgs:Array
    },
    methods:{
        
        FitHeight(e){
            // console.log(e)
           console.log(e.mp.currentTarget.id)
            if(this.show){
             let imgwidth = e.mp.detail.width,
                imgheight = e.mp.detail.height,
                ratio = imgwidth / imgheight;//宽高比  
            let viewHeight = 750 / ratio; //使用rpx做单位
            imgheight = viewHeight.toFixed(0);

            this.imgheights[e.mp.currentTarget.id-1]=imgheight;
            // this
            console.log(this.imgheights)
             
            }
            else{
                return;
            } 
        },
        clickImg(e){
            // console.log(e)
        },
        imgChange(e){
            // console.log(e)
            let currentIndex = e.mp.detail.current ;
            this.current = currentIndex;
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
    onShow(){
        this.FitHeight()
    }
}
</script>

<style>
    .detailBox{
        font-size: 16px;
    }
    .detailBox-6{
        width: 100vw;
        height: 100vh;
    }
    .swiperBox{
        max-height: 700px;
    }
    swiper-item .slide-image{
        width: 100%;
        height:auto;
    }
    .user-info{
        height: 124rpx;
        width: 100%;
        /* line-height: 124rpx; */
        display: flex;
        align-items: center;
    }
    .user-info div{
        display: inline-block;
    }
    .user-pic{
        width: 86rpx;
        height: 86rpx;
        border-radius: 50%;
        overflow: hidden;
        margin: auto 21rpx;
    }
    .user-pic image{
        width: 100%;
        height: 100%;
    }
    .follow{
        width: 108rpx;
        height: 49rpx;
        border: 1px solid #b94861;
        color: #b94861;
        position:absolute;
        right:20rpx;
        text-align:center;

    }
    .noteContent{
        height: 500rpx;
        width: 100%;
    }
    .noteContent .noteInfo{
        height: 28rpx;
        line-height: 28rpx;
        font-size: 12px;
        color: #dfdfdf;
    }
</style>
