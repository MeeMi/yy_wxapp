<template>
    <div  class="detailBox" >
        <!-- 轮播图 -->
        <div class="swiperBox" >
            <swiper  @change="imgChange" :style="{height:imageheight?imageheight+'rpx':'1006'+'rpx'}" >
                <swiper-item v-for="item in swiperImg" :key="item.id">
                    <image :src="item.src"  class="slide-image"  mode="widthFix" @load="FitHeight" @click="clickImg" :id="item.id" />
                </swiper-item>
            </swiper>
        </div>
         <note-avatar  :authorInfo="authorInfo" isFollow="true"></note-avatar>
        <div class="noteContent">
            <h3 class="title">{{contentInfo.title}}</h3>
            <div class="content">
                 <wxParse :content="contentInfo.content"  />
            </div>
            <div class="noteInfo">
                <span class="date">{{contentInfo.date}}</span>
                <span class="support">{{contentInfo.support}}次赞</span>
                <span class="collect">{{contentInfo.collect}}次收藏</span> 
            </div>
        </div>
        <!-- :userData -->
        <note-comment comment-title="笔记评论" :commentItem="commentItem" :more="true" >
        </note-comment>
    </div>
</template>

<script>
import Comment from '@/components/Comment'
import Avatar from '@/components/Avatar'
import wxParse from 'mpvue-wxparse'

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
        }
    },
    components: {
        "note-comment":Comment,
        "note-avatar":Avatar,
        wxParse
    },
    props:['swiperImg','authorInfo','contentInfo','commentItem'],
    methods:{
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
    onUnload: function() {
        
    }
}
</script>

<style>
    .detailBox{
        font-size: 16px;
    }
    .detailBox{
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

    .noteContent{
        width: 100%;
    }
    .noteContent .title{
        width: 100%;
        height: auto;
    }
    .noteContent .noteInfo{
        height: 28rpx;
        line-height: 28rpx;
        font-size: 12px;
        color: #dfdfdf;
        margin:106rpx 0 25rpx;
    }
    .note-comment,.noteContent{
        box-sizing:border-box;
        padding:0 30rpx;
    }
    .noteContent .content img.icon{
        width: 64rpx;
        height: 64rpx;
    }
    .noteInfo .collect,.noteInfo .support{
        color: #b9b9b9;
        float: right;
        margin-right: 10rpx;
    }
</style>
