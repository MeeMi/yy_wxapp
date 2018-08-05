<template>
  <div class="shoppingcart">
    <div class="products" v-if="productInfo.length!=0">
      <div class="product" v-for="(item,i) in productInfo" :key="i">
        <icon class="icon-small" size="23" type="item.selected?success:circle" color="red" @click="changeSelect"></icon>
        <img :src="item.productImg" alt="商品图片" class="product-img">
        <div class="title">{{item.title}}</div>
        <div class="price">{{item.price}}</div>
        <div class="option">
          <span @click="reduceShoppingcart(item)">-</span>
          <span class="num">{{item.quantity}}</span>
          <span @click="addShoppingcart(item)">+</span>
          <span class="delete" @click="deleteProduct(item)">删除</span>
        </div>
      </div>
    </div>
    <div v-else>
      <img src="/static/images/noProduct.jpg" alt="没有商品">
    </div>

    <!-- 结算 -->
    <div class="balance">
      <div class="allSelect">
        <icon class="icon-small" size="23" type="success" color="red"></icon>
        <span>全选</span>
      </div>
      <div class="total">
        <div>总计：<span>￥{{cartTotalPrice}}</span></div>
      </div>
      <div class="calculate">结算</div>
    </div>
  </div>
</template>

<script>
import { GoodsDetailData } from '@/api/mall'
export default {
  data() {
    return {
      allProducts:[]
    }
  },
  async onLoad() {
    const allProducts = await GoodsDetailData();
    this.allProducts = allProducts;
  },
  // 首先在这里获取所有购物车商品，构造出一个带完整信息新的数组，在页面上循环
  computed:{
    productInfo() {
      const cartItem = this.$store.state.items;
      const allProducts = this.allProducts
      const pr = cartItem.map(({id,quantity}) => {
        const pp = allProducts.find(p =>parseInt(p.contentInfo.id) === id)
        if(pp) {
            return {
            id,
            quantity,
            title:pp.contentInfo.shopName,
            price:pp.contentInfo.newPrice,
            productImg:pp.swiperImg[0].src,
            selected:true
          }
        }
      })
      return pr
    },
    cartTotalPrice() {
      return this.productInfo.reduce((total,product) => {
        return total + product.quantity*product.price
      },0)
    }
  },
  methods: {
    addShoppingcart(product) {            
        this.$store.commit('PUSHPRODUCTTOCART',product);
    },
    reduceShoppingcart(product) {
      this.$store.commit('REMOVEPRODUCTTOCART',product);
    },
    deleteProduct(product) {
      this.$store.commit('DELETEPRODUCT',product);
    },
    changeSelect() {
      this.productInfo.selected = !this.productInfo.selected
    }
  }
}
</script>

<style>

</style>
