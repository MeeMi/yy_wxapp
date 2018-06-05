import util from '../../../utils/util.js';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        video_id: '',
        isListHidden: true,
        isDescHidden: false
    },

    onLoad: function(option) {
        console.log('页面 传过来的是' + option.id);

        this.setData({
                video_id: option.id
            })
            // setTimeout(this.requestVideo(), 1000)
    },
    // requestVideo: function() {
    //     util.requestDetail({
    //             url: `thumbnail`,
    //             mock: true,
    //             data: {
    //                 id: this.data.video_id,
    //                 langs: 'en'
    //             }
    //         })
    //         .then(res => {

    //         })
    // }
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
    }
})