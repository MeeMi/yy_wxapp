import util from '../../utils/util.js';
//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        imgsUrlList: null,
        bigImg: '',
        searchRecommend: '',
        video_id: ''
    },
    onLoad: function() {
        this.requestImg();
    },
    requestImg() {
        util.request({
                url: `thumbnail`,
                mock: true,
                data: {
                    tag: '轮播图图片',
                    langs: 'en'
                }
            })
            .then(res => {
                // console.log(res);
                const imgsUrlList = res.images
                console.log(imgsUrlList);

                // 搜索placeholder
                // let searchRecommend = this.data.searchRecommend;

                // for (let i = 0; i < imgsUrlList.length; i++) {
                //     console.log(imgsUrlList[i].title)
                //     searchRecommend = imgsUrlList[i].title
                //     setTimeout(function() {
                //         this.setData({
                //             searchRecommend

                //         })
                //     }, 1000)
                // }


                this.setData({
                        // hiddenLoading: true,
                        imgsUrlList,
                        bigImg: imgsUrlList[0].thumbnail,
                        video_id: imgsUrlList[0].video_id
                    })
                    // console.log('轮播图图片')
                    // console.log(this.images.imgsUrlList)
            })
    },
    moviepicChange(e) {
        const imgsUrlList = this.data.imgsUrlList;
        let bigImg = this.data.bigImg;
        let video_id = this.data.video_id;

        for (let i = 0; i < imgsUrlList.length; i++) {
            if (i == e.detail.current) {
                bigImg = imgsUrlList[i].thumbnail;
                video_id = imgsUrlList[i].video_id;
            }
        }
        this.setData({
            bigImg: bigImg,
            video_id
        })
    },
    openDetail: function(e) {
        let item = e.currentTarget.dataset.vid;
        wx.navigateTo({
            url: `video-detail/video-detail?id=${item}`
        })
    },
    bindKeyInput: function() {
        wx.navigateTo({
            url: '../search/search'
        })
    }
})