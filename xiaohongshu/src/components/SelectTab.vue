<template>
    <div>
        <scroll-view class="select-box" scroll-x="true" style="white-space: nowrap; display:flex ">
            <div  v-for="(item,i) in tabBar" :key="i" @click="switchTab(i)" :class="item.isSelected?'active':''">
                {{item.tabName}}
            </div>
        </scroll-view>
    </div>
</template>

<script>
export default {
    data(){
        return {
        }
    },
    props: {
            tabBar: {
                type: Array
        },
    },
    methods:{
        switchTab(i){
            this.$emit('switchTab', i);
        }
    }
}
</script>
    
<style>
    scroll-view.select-box{
        width: 750rpx;
        background: #fff;
        font-size: 25rpx;
        color: #959595;
    }
    scroll-view.select-box div{
        display: inline-block;
        min-width: 101rpx;
        text-align: center;
    }
    .active{
        color: #000;
        font-weight: 800;
    }
</style>
