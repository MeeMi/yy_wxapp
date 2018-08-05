import Vue from 'vue'
var Fly=require("flyio/dist/npm/wx")
var fly=new Fly

//添加请求拦截器
fly.interceptors.request.use((request)=>{
  //给所有请求添加自定义header
  request.headers["X-Tag"]="flyio";
    //打印出请求体
    console.log(request.body)
    //终止请求
    //var err=new Error("xxx")
    //err.request=request
    //return Promise.reject(new Error(""))

  //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  return request;
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response) => {
      return response.data
  },
  (err) => {
      console.log('网络错误')
  }
)
//配置请求基地址
Vue.prototype.$http=fly
fly.config.baseURL="https://www.easy-mock.com/mock/5b38f1f28b3b752220ff649a/xiaohongshu"

export default fly

