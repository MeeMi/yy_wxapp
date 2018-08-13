<template>
    <div class="comment-box">
        <div class="title commentTitle=='笔记评论':bt-color?''">
            <span>{{commentTitle}}</span>
            <div v-if="more" class="moreComment">
                <span>共179条评论</span>
                <image src="/static/images/arrow.png" class="moreArrow"/>
            </div>
        </div>
        <div class="comment-list">
            <div class="comment-item" v-for="item in commentItem" :key="item.authorID">
                <comment-avatar :authorInfo="item.authorInfo" :commentDate="item.commentDate" :support="item.support">
                    <div slot="support">
                        <!-- <image src="/static/images/support.png"/> -->
                        <!-- <span>赞赞</span> -->
                    </div>
                </comment-avatar>
                <div class="comment-area">
                    <wxParse :content="item.commentContent" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Avatar from '@/common/Avatar'
import wxParse from 'mpvue-wxparse'


export default {
   props:['commentTitle','commentItem','more'],
   components: {
        "comment-avatar":Avatar,
        wxParse
    }
}
</script>

<style scoped>
.title{
    height: 101rpx;
    line-height: 101rpx;
    margin:0 15px;
}

.moreComment{
    float: right;
}
.moreArrow{
    height: 35rpx;
    width: 35rpx;
    margin: auto 0;
}
.comment-area{
    box-sizing: border-box;
    margin: 0 21rpx 26rpx 115rpx;
    word-wrap: break-word;
    word-break:normal;
}
.comment-box {
    margin-bottom: 100rpx;
}
</style>
