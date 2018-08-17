import Vue from 'vue'
import App from './App'
import store from './store/index'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

console.log(store);

Vue.prototype.$store = store

console.log(Vue.prototype.$store);

export default {
    // 这个字段走 app.json
    config: {
        // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
        pages: ['pages/index/main', '^pages/mall/main', 'pages/my/main', 'pages/detail/main','pages/shoppingCart/main'],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: '小红书',
            navigationBarTextStyle: 'black'
        },
        tabBar: {
            color: "#272636",
            selectedColor: "#FFD161",
            backgroundColor: "#fff",
            borderStyle: "#a8a8a8",
            list: [{
                    pagePath: "pages/index/main",
                    iconPath: "static/images/index.png",
                    selectedIconPath: "static/images/index-selected.png",
                    color: "white",
                    text: "首页"
                },
                {
                    pagePath: "pages/mall/main",
                    iconPath: "static/images/mall.png",
                    selectedIconPath: "static/images/mall-selected.png",
                    text: "商城"
                },
                {
                    pagePath: "pages/my/main",
                    iconPath: "static/images/my.png",
                    selectedIconPath: "static/images/my-selected.png",
                    text: "我的"
                }
            ]
        }
    }
}