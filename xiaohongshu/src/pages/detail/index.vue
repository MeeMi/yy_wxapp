<template>
    <div>
        <!-- 传给NoteDetail组件  -->
       <note-detail :swiperImg="swiperImg" :authorInfo="authorInfo" :contentInfo="contentInfo" :commentItem="commentItem"></note-detail>
    </div>
</template>

<script>
import NoteDetail from '@/components/NoteDetail'
import fly from '@/utils/fly'
export default {
     components: {
          NoteDetail,
     },
    data(){
        return {
            swiperImg:[],
            authorInfo:{},
            contentInfo:{},
            commentItem:[]
        }
    },
    onLoad (options) {
        console.log('options.id' + options.id)
        fly.get('noteDetail#!method=get').then((res)=>{
            for(let i of res.data){
                // 笔记id 跟参数对比 然后给noteDtail
                if(i.id == options.id){
                    console.log('i.id ' + i.id);
                    this.swiperImg = i.swiperImg;
                    this.authorInfo = i.authorInfo;
                    this.contentInfo = i.contentInfo;
                    this.commentItem = i.commentItem;
                }
            }
            console.log(this.commentItem)
          })
          .catch((e)=>{
            console.log(e)
          })
    }
}
</script>

<style>

</style>
