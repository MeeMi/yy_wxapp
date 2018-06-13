import util from '../../utils/util.js';
//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        imgsUrlList: null,
        bigImg: '',
        searchRecommend: '',
        video_id: '',
        hasMore: false,
        List: []
    },
    onLoad: function() {
        this.requestImg();
        this.getListData();
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

                this.setData({
                    // hiddenLoading: true,
                    imgsUrlList,
                    bigImg: imgsUrlList[0].thumbnail,
                    video_id: imgsUrlList[0].video_id
                })
            })
    },
    getListData: function() {
        util.request({
                url: `https://www.easy-mock.com/mock/5b0c37bed0e51c310ce24ab0/iqiyi/media#!method=get`,
                mock: false,
                data: {
                    tag: 'dramas',
                    langs: 'en'
                }
            })
            .then(res => {
                console.log(res)
                this.setData({
                    List: res
                })

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
        let title = e.currentTarget.dataset.title;

        wx.navigateTo({
            url: `video-detail/video-detail?id=${item}&title=${title}`
        })
    },
    bindKeyInput: function() {
        wx.navigateTo({
            url: '../search/search'
        })
    }
})