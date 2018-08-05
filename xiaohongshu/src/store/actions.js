import * as types from './mutation-type'

export default {
  handler(){
    
  },
  AddShoppingcart({commit},product){
    // console.log(product);
    // const cartItem = state.items.find(item =>item.id === product.id)
    // if(cartItem) {
      commit(types.PUSHPRODUCTTOCART,product)
    // } else {
    //   commit(types.INCREMENTITEMQUANTITY,cartItem)
    // }
  }
}
