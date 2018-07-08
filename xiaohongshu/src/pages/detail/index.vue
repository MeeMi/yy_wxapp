<template>
    <div>
       <note-detail :detailImgs="detailImgs" ></note-detail>
    </div>
</template>

<script>
import NoteDetail from '@/components/NoteDetail'
export default {
     components: {
          NoteDetail
     },
    data(){
        return {
            detailImgs:[{id:1,src:'https://ci.xiaohongshu.com/8ea674e4-12e9-4240-841a-82705a0a5263@r_750w_750h_ss1.jpg'},{id:2,src:'https://ci.xiaohongshu.com/5e9f53e4-5773-413c-9eb8-0aeadfafb48c@r_750w_750h_ss1.jpg'},
           {id:3,src:'https://ci.xiaohongshu.com/805b86e1-2103-4376-887b-eb2413ffd579@r_750w_750h_ss1.jpg'}]
        }
    },
    methods:{
       
    }
}
</script>

<style>

</style>
