<template>
    <div>
        <div class="title">
            <span>{{commentTitle}}</span>
        </div>
        <div class="comment-list">
            <div class="comment-item">
                <note-avatar></note-avatar>
            </div>
        </div>
    </div>
</template>

<script>
import Avatar from '@/components/Avatar'

export default {
   props:{
       commentTitle:String
   },
   components: {
        "note-avatar":Avatar
    },
}
</script>

<style>

</style>
