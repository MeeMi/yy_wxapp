<template>
    <div>
        <!-- 传给NoteDetail组件  -->
       <note-detail v-if="type == 1" :swiperImg="swiperImg" :authorInfo="authorInfo" :contentInfo="contentInfo" :commentItem="commentItem"></note-detail>

        <note-detail v-if="type == 2"  :swiperImg="swiperImg" :contentInfo="contentInfo" :commentItem="commentItem"></note-detail>

    </div>
</template>

<script>
import NoteDetail from '@/components/NoteDetail'
import { NoteDetailData } from '@/api/note'
import { GoodsDetailData } from '@/api/mall'
export default {
     components: {
          NoteDetail,
     },
    data(){
        return {
            type:1,
            swiperImg:[],
            authorInfo:{},
            contentInfo:{},
            commentItem:[],
        }
    },
    async onLoad (options) {
        console.log('options.type' + options.type)
        if(options.type == 'note'){
            this.type = 1;
            const contentData = await NoteDetailData();
            for(let i of contentData){
                // 笔记id 跟参数对比 然后给noteDtail
                if(i.id == options.id){
                    console.log('i.id ' + i.id);
                    this.swiperImg = i.swiperImg;
                    this.authorInfo = i.authorInfo;
                    this.contentInfo = i.contentInfo;
                    this.commentItem = i.commentItem;
                }
            }
        }else if(options.type == 'goods') {
            this.type = 2;
            const contentData = await GoodsDetailData();
            
            
            for(let i of contentData){
                console.log(i)
                // 笔记id 跟参数对比 然后给noteDtail
                if(i.id == options.id){
                    this.swiperImg = i.swiperImg;
                    // this.authorInfo = i.authorInfo;
                    this.contentInfo = i.contentInfo;
                    this.commentItem = i.commentItem;
                }
            } 
        }
    }
}
</script>

<style lang="stylus" scoped>
    
</style>

