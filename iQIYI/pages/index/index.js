import util from '../../utils/util.js';
//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        imgsUrlList: null
    },
    onLoad: function() {
        this.requestImg();
    },
    requestImg() {
        util.request({
                url: 'thumbnail',
                mock: true,
                data: {
                    tag: '轮播图图片',
                    langs: 'en'
                }
            })
            .then(res => {
                console.log(res);
                this.setData({
                    // hiddenLoading: true,
                    imgsUrlList: res.images
                })
                console.log('轮播图图片')
                console.log(this.images.imgsUrlList)
            })
    }
})