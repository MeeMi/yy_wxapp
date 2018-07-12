<template>
    <div>
        <div class="title">
            <span>{{commentTitle}}</span>
            <div v-if="more" class="moreComment">
                <span>共179条评论</span>
                <image src="/static/images/arrow.png" class="moreArrow"/>
            </div>
        </div>
        <div class="comment-list">
            <div class="comment-item" v-for="item in commentItem" :key="item.authorID">
                <!-- <comment-avatar>

                </comment-avatar> -->
            </div>
        </div>
    </div>
</template>

<script>
import Avatar from '@/components/Avatar'

export default {
   props:['commentTitle','commentItem','more'],
   components: {
        "comment-avatar":Avatar
    },
    computed:{
        authorInfo(){
            const authorInfo = null;
            authorInfo.avatarImg = this.commentItem.commentAvatarImg;
            authorInfo.noteAuthorNickname = this.commentItem.commentNickname;
            console.log(authorInfo)
        }
    }

}
</script>

<style scoped>
.title{
    height: 101rpx;
    line-height: 101rpx;
    margin:0 15px;
    border-bottom: 2px solid #e6e6e6;
}
.moreComment{
    float: right;
}
.moreArrow{
    height: 35rpx;
    width: 35rpx;
    margin: auto 0;
}
</style>
