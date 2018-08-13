<template>
    <div>
        <image src="/static/images/search.png" class="search-icon"/>
        <input type="text" class="search-input" :placeholder="placeholderText">
    </div>
</template>

<script>
export default {
    props:['placeholderText']
}
</script>

<style>
    image.search-icon{
        width: 35rpx;
        height: 35rpx;
        display: inline-block;
        position: absolute;
        left: 39rpx;
        top: 8rpx;
        z-index: 2;
    }
    input.search-input{
        border: none;
        background: none;
        margin: 0 auto;
        width: 650rpx;
        border-radius: 50rpx;
        background-color: #f5f5f5;
        height: 67rppx;
        font-size: 25rpx;
        color: #c1c1c1;
        padding-left: 59rpx;
}
</style>
