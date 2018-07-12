<template>
    <div class="contentItem-box">
        <div class="contentItem"  v-for="(item,i) in notes" :key="i" @click="checkDetail(item)">
            <a :href="'../detail/main?id='+item.id">
                <div class="note-info">
                    <div class="note-pic">
                        <image :src="item.notePic"/>
                    </div>
                    <div class="title">{{item.title}}</div>
                </div>
            </a>
                <div class="user-info">
                    <div class="user-pic">
                        <image :src="item.avatarImg"/>
                    </div>
                    <div class="username">{{item.noteAuthorNickname}}</div>
                    <div class="like">
                        <image src="/static/images/like.png"/>
                        <span class="like-num">66</span>
                    </div>
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
        methods:{
            checkDetail(e){
                this.$emit('checkDetail', e);
            }
        }
    }
</script>

<style scoped>
    .contentItem{
        width: 48%;  
        display:inline-block;
        margin: 10rpx 5rpx 10rpx 10rpx;
        background: #fff;

    }
    .note-info{
        font-size: 26rpx;
        color: #000;
        font-weight: 800;
        margin-bottom: 28rpx;
        
    }
    .note-pic{
        min-height: 278rpx;
        max-height: 344rpx;
        width: 100%;
        overflow: hidden;
    }
    .note-pic image{
        width: 100%;
        /* height: 100%; */
    }
    .title{
        margin: 35rpx 21rpx 0;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
    .user-info{
        height: 85rpx;
        font-size: 19rpx;
        color: #3e3e3e;
        line-height: 85rpx;
        vertical-align: center;
    }
    .user-info div{
        display: inline-block;
    }
    .user-pic{
        width: 52rpx;
        height: 52rpx;
        border-radius: 50%;
        overflow: hidden;
        margin:0 21rpx -17rpx 21rpx;
    }
    .user-pic image{
        width: 100%;
        height: 100%;
    }
    .like{
        float: right;
        color: #989898;
        margin-right: 21rpx;
    }
    .like image{
        height: 26rpx;
        width: 29rpx;
        overflow: hidden;
    }
</style>
