<template>
    <div class="contentItem-box">
        <div class="contentItem"  v-for="(item,i) in notes" :key="i" @click="checkDetail(item)">
            <!-- <a :href="'../detail/main?id='+item.id"> -->
            <a :href="item.noteAuthorNickname ? '../detail/main?id='+item.id+'&type=note'  : '../detail/main?id='+item.id+'&type=goods'">
                <div class="note-info">
                    <div class="note-pic">
                        <image :src="item.notePic"/>
                    </div>
                    <div class="title">{{item.title}}</div>
                </div>
            </a>

            <div class="user-info" v-if="item.noteAuthorNickname">
                <div class="user-pic" >
                    <image :src="item.avatarImg"/>
                </div>
                <div class="username">{{item.noteAuthorNickname}}</div>
                <div class="like">
                    <image src="/static/images/like.png"/>
                    <span class="like-num">{{item.like}}</span>
                </div>
            </div>

            <div class="goods-info" v-if="item.price" >
                <div class="goodsdesc">
                    <!-- <span v-show="item.new === 1" class="icon" ></span> -->
                    <span>{{item.desc}}</span>
                </div>
                <div class="price">
                    <div v-if="item.type == 1">
                        <p >限时购</p>
                        <span class="newPrice">{{item.newPrice}}</span>
                        <span class="price">{{item.price}}</span>
                    </div>
                    <div v-else="item.type == 2">
                        <p>限时特价</p>
                        <span class="price">{{item.price}}</span>
                        <span class="newPrice"></span>
                    </div>  
                </div>
                <!-- <div class="brand" :class="brands[item.brand]"></div> -->
            </div>
        </div>   
    </div>
    
</template>

<script>
 export default {
        props: {
            notes: {
                type: Array
            }
        },
        data() {
            return {
                classMap: ['flashSale','specialOffer']
            }
        },
        methods:{
            checkDetail(e){
                this.$emit('checkDetail', e);
            }
        },
        // created() {
        //     this.classMap = ['flashSale','specialOffer']
        // }
    }
</script>

<style scoped lang="stylus">
// @import "../common/stylus/mixin.styl" 

.contentItem
    width: 48%;  
    display:inline-block;
    margin: 10rpx 5rpx 10rpx 10rpx;
    background: #fff;
    .note-info
        font-size: 26rpx;
        color: #000;
        font-weight: 800;
        margin-bottom: 28rpx;
        .note-pic
            min-height: 278rpx;
            max-height: 344rpx;
            width: 100%;
            overflow: hidden;
            image
                width: 100%;        
    .title
        margin: 35rpx 21rpx 0;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;

    .user-info
        height: 85rpx;
        font-size: 19rpx;
        color: #3e3e3e;
        line-height: 85rpx;
        vertical-align: center;
        div
            display: inline-block;
        .user-pic
            width: 52rpx;
            height: 52rpx;
            border-radius: 50%;
            overflow: hidden;
            margin:0 21rpx -17rpx 21rpx;
            image
                width: 100%;
                height: 100%;
        .like
            float: right;
            color: #989898;
            margin-right: 21rpx;
            image
                height: 26rpx;
                width: 29rpx;
                overflow: hidden;
        
        .goodsdesc
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                overflow: hidden;



</style>
