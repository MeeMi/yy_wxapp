<template>
  <div class="fixnav">
    <a href="#">
      <div class="shop">
        <image src="/static/images/shop.png"/>
        店铺
      </div>
    </a>
    <a href="../shoppingCart/main">
      <div class="shopping-cart">
          <span class="productNum" v-if="productsQuantity">{{productsQuantity}}</span>
          <image src="/static/images/shoppingcart.png"/>
          购物车
      </div>
    </a>  
    <div class="add" @click="addShoppingcart(goodItem)">加入购物车</div>
    <div class="buy">立即购买</div>
  </div>
</template>

<script>
export default {
  props:['goodItem','productsQuantity'],
   methods:{
       addShoppingcart(item){
          this.$emit('addShoppingcart',item);
       }
   },
}
</script>

<style lang="stylus" scoped>
  .fixnav
    display flex
    height 101rpx
    width 100%
    height 100rpx
    position fixed
    bottom 0
    background-color #fff
    z-index 999
    div
      display inline-block
      text-align center
      a
        height 100%
        line-height 100rpx
      &.shop,&.shopping-cart
          width 90rpx
          font-size 21rpx
          display flex
          flex-direction column
          justify-content:center;
          position relative
          height 100%
        span.productNum
          position absolute
          top 0
          right 5rpx
          width 35rpx
          width 35rpx
          background-color #ff2842
          color #ffffff
          border-radius 50%
          text-align center
          line-height 35rpx
        image
          width 35rpx
          height 35rpx
          margin auto
      &.add,&.buy
        width 285rpx
        color #ffffff
        font-size 35rpx
        line-height 100rpx
      &.add  
        background-color #fe7f8d
      &.buy
        background-color #ff2842

</style>

