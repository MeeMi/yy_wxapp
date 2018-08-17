import fly from '@/utils/fly'
import { URL } from '@/api/config'

export const GoodsTabbarData = () => new Promise((resolve, reject) => {
  const url = URL.GoodsTabbar;
  fly.get(url).then((res)=>{
    console.log(res)
    resolve(res)
  })
  .catch((e)=>{
    reject(e)
  })
})

export const GoodsDetailData = () => new Promise((resolve, reject) => {
  const url = URL.goodDetail;
  fly.get(url).then((res)=>{
    // console.log(res)
    resolve(res.data)
  })
  .catch((e)=>{
    reject(e)
  })
})