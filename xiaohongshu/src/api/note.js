import fly from '@/utils/fly'
import { URL } from '@/api/config'

export const NoteTabbarData = () => new Promise((resolve, reject) => {
  const url = URL.NoteTabbar;
  fly.get(url).then((res)=>{
    console.log(res)
    resolve(res)
  })
  .catch((e)=>{
    reject(e)
  })
})

export const NoteDetailData = () => new Promise((resolve, reject) => {
  const url = URL.NoteDetail;
  fly.get(url).then((res)=>{
    console.log(res)
    resolve(res.data)
  })
  .catch((e)=>{
    reject(e)
  })
})





