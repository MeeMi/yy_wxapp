import util from '../../../utils/util.js';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        video_id: '',
        isListHidden: true,
        isDescHidden: true,
        isLoading: false,
        isSelected: 1,
        mediaList: null,
        playerUrl: ''
    },

    onLoad: function(option) {
        console.log('页面 传过来的是' + option.id);

        this.setData({
            video_id: option.id,
            isLoading: true,
            mediaList: null
        })

        this.requestVideo();
    },
    requestVideo: function() {
        util.request({
                url: `https://www.easy-mock.com/mock/5b0c37bed0e51c310ce24ab0/iqiyi/media#!method=get`,
                mock: false,
                data: {
                    id: this.data.video_id,
                    tag: 'dramas',
                    langs: 'en'
                }
            })
            .then(res => {
                console.log(res)
                this.setData({
                    mediaList: res,
                    playerUrl: res.drama_num[0].video_url
                })
                console.log(this.data.mediaList);
            })
    },
    openList: function() {
        console.log('dianji')
        this.setData({
            isListHidden: false
        })
    },
    closeList: function() {
        this.setData({
            isListHidden: true
        })
    },
    openDesc: function() {
        let isDescHidden = !this.data.isDescHidden;
        this.setData({
            isDescHidden
        })
    },
    changenum: function(e) {
        let mediaList = this.data.mediaList;
        let playerUrl = this.data.playerUrl
            // for (let i = 1; i < dramas.length; i++) {
            //     dramas[i - 1].selected == parseInt(i) === e.currentTarget.dataset.num;
            // console.log(dramas)            
            // }

        for (let i of mediaList.drama_num) {
            i.selected = parseInt(i.drama_id) === e.currentTarget.dataset.num + 1
            if (i.selected) {
                playerUrl = i.video_url
            }
        }
        console.log(mediaList)
        this.setData({
            mediaList,
            playerUrl
        })
    }
})