<template>
    <div class="content">
        <content-item :notes="notes" @checkDetail="checkDetail"></content-item>
    </div>
</template>

<script>
import contentItem from '@/components/ContentItem'
export default {
    data(){
        return {

        }
    },
    components:{
        contentItem
    },
   props:['notes'],
   methods:{
       checkDetail(e){
            this.$emit('checkDetail', e);
       }
   }
}
</script>

<style>
    .content{
        width: 100%;
    }
</style>
