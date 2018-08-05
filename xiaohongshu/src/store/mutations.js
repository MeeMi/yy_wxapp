import * as types from './mutation-type'

export default {
  [types.PUSHPRODUCTTOCART](state,product) {     
    const cartItem = state.items.find(item => parseInt(item.id) === parseInt(product.id)) // 在购物车里找到了该商品
    if (!cartItem) { //没有该商品，添加
      state.items.push({
        id:product.id,
        quantity:1 //数量为1
      })
    } else { //有该商品了
      cartItem.quantity++;
    }
  },
  [types.REMOVEPRODUCTTOCART](state,product) {
    const cartItem = state.items.find(item => parseInt(item.id) === parseInt(product.id)) // 在购物车里找到了该商品
    if(cartItem) {
      if(cartItem.quantity<=1) return;
      cartItem.quantity--;
    }
  },
  [types.DELETEPRODUCT](state,product) {
    const cartItem = state.items.filter(item => parseInt(item.id) !=parseInt(product.id)) // 在购物车里找到了该商品   
    state.items = cartItem;
  }
}