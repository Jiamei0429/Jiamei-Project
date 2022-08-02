function http(method, url, data, success, fail) {
	uni.showLoading({
		title: "加载中……",
	})
	let ticket = uni.getStorageSync("ticket")
	uni.request({
		url: "https://test5.willjava.com" + url,
		method: method,
		header: {
			"tpp": "caihong",
			"t": new Date().getTime(),
			"nonce": "dhjhshdj12jsj",
			"ticket": ticket,
			"sign": "jkdjfljsldkjfkd"
		},
		data: data,
		success: res => {
			success(res.data)
		},
		fail: err => {
			console.log(err)
		},
		complete: res => {
			wx.hideLoading()
		}
	})
}
export default http
