<template>
    <div class="user-info">
            <div class="user-pic">
                <image :src="authorInfo.avatarImg"/>
            </div>
            <div class="user-name">
                <span class="name">{{authorInfo.noteAuthorNickname}}</span>
                <span class="date" v-if="commentDate">{{commentDate}}</span>
                <span class="support" v-if="support">
                    <img src="/static/images/support.png" alt="">
                    {{support}}
                </span>
                <!-- <slot name="support"></slot> -->
            </div>
        <div class="follow" v-if="isFollow">关注</div>
    </div>
</template>

<script>
export default {
   props:['authorInfo','isFollow','commentDate','support'],
}
</script>

<style>
 .user-info{
        height: 124rpx;
        width: 100%;
        /* line-height: 124rpx; */
        display: flex;
        align-items: center;
        /* border-bottom: 2px solid #e6e6e6; */
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
    .user-name{
        flex: 1;
        position: relative;
        height: 100%;
    }
    .user-name .name{
        position: absolute;
        top: 25%;
    }
    .user-name .date {
        height: 17rpx;
        font-size: 20rpx;
        color: #a0a0a0;
        position: absolute;
        bottom: 30%;
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
        border-radius: 10rpx;
    }
    .support{
        position:absolute;
        top:25%;
        right: 15px;
    }
    .support img{
        height: 35rpx;
        width: 35rpx;
    }
</style>
