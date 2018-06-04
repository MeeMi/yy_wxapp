import * as Mock from '../mock.js'

// 怕opt没有传  先定制一个模板
const DEFAULT_REQUEST_OPTIONS = {
    url: '',
    data: {},
    header: {
        'Content-Type': 'application/json'
    },
    method: 'GET',
    dataType: 'json'
}

let util = {
    request(opt) {
        let options = Object.assign({}, DEFAULT_REQUEST_OPTIONS, opt);
        // console.log(options.data.page);
        let { url, data, header, method, dataType, mock = false } = options;
        // console.log(url, data, header, method, dataType, mock)

        return new Promise((resolve, reject) => {

            if (mock) {

                if (data.hasOwnProperty('page') && data.hasOwnProperty('datasize')) {
                    let res = null;
                    let page = data.page;
                    console.log(page)
                    let datasize = data.datasize;
                    const types = ['hot', 'amuse', 'variety', 'information'];
                    let type = types[data.type - 1];
                    let returnData = [];

                    const allRes = Mock[url][data.tag][type];
                    console.log(allRes)
                        // console.log(allRes.length)

                    if (page < allRes.length) {
                        console.log(datasize)

                        for (let i = page; i < page + datasize; i++) {
                            // console.log(i)
                            if (allRes[i]) {
                                returnData.push(allRes[i])
                            }
                        }
                        res = { res: 1, data: returnData };
                    } else {
                        res = { res: 0, data: returnData }
                    }

                    // let res = {
                    //     statusCode: 200,
                    //     data: Mock[url]
                    // }
                    console.log(res)
                    resolve(res);
                    return;
                }

                let res = {
                    statusCode: 200,
                    data: Mock[url]
                }
                resolve(res.data);
                return;

            }


            wx.request({
                url,
                data,
                header,
                method,
                dataType,
                success(res) {
                    resolve(res.data)
                },
                fail(err) {
                    reject(err)
                }
            })
        })

    }
    // requestDetail(opt) {
    //     let options = Object.assign({}, DEFAULT_REQUEST_OPTIONS, opt);
    //     console.log(options);

    //     return new Promise((resolve, reject) => {
    //         if (mock) {
    //             let res = {
    //                 statusCode: 200,
    //                 data: Mock[url]
    //             }

    //             resolve(res.data);
    //             return;
    //         }
    //         // 下面是网络请求
    //         wx.request({
    //             url,
    //             data,
    //             header,
    //             method,
    //             dataType,
    //             success(res) {
    //                 resolve(res.data)
    //             },
    //             fail(err) {
    //                 reject(err)
    //             }
    //         })
    //     })

    // }
}


export default util