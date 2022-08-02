<template>
	<view>
		<view class="header" :style="'height:' + windowHeight + 'px;' + 'padding-top:' + menuTop + 'px;'">
			<navigator url="/pages/shizhi/shizhi"><image :style="'height:' + menuHeight + 'px'" src="../../static/img/set.png" /></navigator>
		</view>
		<!-- 头像 -->
		<view class="touxiang" :style="'margin-top:' + windowHeight + 'px;'">
			<view class="left"><image :src="img"></image></view>
			<view class="middle" v-if="isBtn"><button class="desc1" @click="login">点击登录</button></view>
			<view class="middle" v-else>
				<text class="desc2">{{ name }}</text>
				<text class="desc3">{{ phoneNumber }}</text>
			</view>
			<navigator url="../gerenxinxi/gerenxinxi" open-type="navigate"><view class="right">></view></navigator>
		</view>
		<!-- 我的服务 -->
		<view class="fuwu">
			<view class="list">
				<image src="../../static/img/servr.png"></image>
				<text>我的服务</text>
			</view>
			<view class="list">
				<image src="../../static/img/servr.png"></image>
				<text>新消息</text>
			</view>
			<view class="list">
				<image src="../../static/img/servr.png"></image>
				<text>哈哈</text>
			</view>
			<view class="list">
				<image src="../../static/img/servr.png"></image>
				<text>呵呵</text>
			</view>
		</view>
		<!-- 钱包 -->
		<view class="qianbao">
			<view class="up">
				<text class="text1">钱包</text>
				<text class="text2">我的账单</text>
			</view>
			<view class="down">
				<view class="one">
					<text class="desc1">100.00</text>
					<text class="desc2">余额(元)</text>
				</view>
				<view class="one">
					<text class="desc1">100.00</text>
					<text class="desc2">消费额(元)</text>
				</view>
				<view class="one">
					<text class="desc1">100.00</text>
					<text class="desc2">余额(元)</text>
				</view>
			</view>
		</view>
		<!-- 我的订单 -->
		<view class="dingdan">
			<view class="top">
				<text class="desc1">我的订单</text>
				<navigator url="/pages/dingdan/dingdan"><text class="desc2">全部订单 ></text></navigator>
			</view>
			<view class="down">
				<view class="list">
					<image src="../../static/img/dfh.png"></image>
					<text>待付款</text>
				</view>
				<view class="list">
					<image src="../../static/img/dfh.png"></image>
					<text>待发货</text>
				</view>
				<view class="list">
					<image src="../../static/img/dfh.png"></image>
					<text>待收货</text>
				</view>
				<view class="list">
					<image src="../../static/img/dfh.png"></image>
					<text>退款/售后</text>
				</view>
			</view>
		</view>
		<!-- 我的分销 -->
		<view class="fenxiao">
			<view class="top">我的分销</view>
			<view class="down">
				<view class="xia-up">
					<view class="up-left">
						<text class="desc1">账户余额(元)</text>
						<text class="desc2">15.00</text>
					</view>
					<view class="up-right">去提现</view>
				</view>
				<view class="xia-down">
					<view class="list">销售记录 ></view>
					<view class="list">补货记录 ></view>
					<view class="list">我的商品 ></view>
				</view>
			</view>
		</view>

		<view>
			<u-popup v-model="show" mode="center"><button class="twoo" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">点击授权您的手机号</button></u-popup>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
const app = getApp();
import http from '../../api/request.js';
export default {
	data() {
		return {
			show: false,
			isBtn: true,
			img: '../../static/img/1.webp',
			name: '请登录',
			phoneNumber: '',
			code: '',
			openId: '',
			sessionKey: '',
			unionId: '',
			ticket: '',
			encryptedData: '',
			iv: '',
			windowHeight: app.globalData.windowHeight, //胶囊头部的总高度
			menuTop: app.globalData.menuTop, // 胶囊距离屏幕顶部的距离
			menuHeight: app.globalData.menuHeight, //胶囊高度
			menuRight: app.globalData.menuRight //胶囊距离屏幕右边的距离
		};
	},
	methods: {
		showToast() {
			this.$refs.uToast.show({
				title: '登录成功',
				type: 'success',
				url: '/pages/user/index'
			});
		},
		// 获取手机号的加密信息
		getPhoneNumber(e) {
			console.log(e);
			this.encryptedData = e.detail.encryptedData;
			this.iv = e.detail.iv;
			this.show = false;
			this.getPhoneNum();
		},
		// 获取头像和昵称
		getName() {
			wx.getUserProfile({
				desc: '用于完善会员资料',
				success: res => {
					console.log(res);
					this.getCode();
					this.name = res.userInfo.nickName;
					this.img = res.userInfo.avatarUrl;
					uni.setStorageSync('name', res.userInfo.nickName);
					uni.setStorageSync('img', res.userInfo.avatarUrl);
				}
			});
		},
		//拿到code码
		getCode() {
			uni.login({
				success: res => {
					this.code = res.code;
					this.getOpinId();
				}
			});
		},
		// 用code码换取openid,session_key
		getOpinId() {
			http('post', '/wxauth/code2Session', { code: this.code }, res => {
				this.openId = res.data.openId;
				this.sessionKey = res.data.sessionKey;
				this.unionId = res.data.unionId;
				this.getTicked();
			});
		},
		// 拿到openid,unionId后请求后台登陆业务,获取token
		getTicked() {
			http(
				'post',
				'/auth/getTicket',
				{
					unionId: this.unionId,
					openId: this.openId
				},
				res => {
					console.log('获取ticket', res);
					if (res.errorMsg == '用户不存在') {
						this.show = true;
					} else {
						uni.setStorageSync('ticket', res.data);
						this.isBtn = false;
						this.showToast();
					}
				}
			);
		},
		// 获取手机号
		getPhoneNum() {
			http(
				'post',
				'/wxauth/getMobile',
				{
					encryptedData: this.encryptedData,
					iv: this.iv,
					session_key: this.sessionKey
				},
				res => {
					var data = JSON.parse(res.data);
					this.phoneNumber = data.phoneNumber;
					uni.setStorageSync('PhoneNumber', data.phoneNumber);
					this.bangPhoneNum();
				}
			);
		},
		//绑定手机号
		bangPhoneNum() {
			http(
				'post',
				'/auth/register',
				{
					mobile: this.phoneNumber,
					unionId: this.unionId,
					openId: this.openId
				},
				res => {
					console.log('绑定手机号', res);
					if (res.success == true) {
						this.show = true;
					} else {
						this.Register();
					}
				}
			);
		},
		// 注册手机号获取ticked
		Register() {
			http(
				'post',
				'/auth/register',
				{
					mobile: this.phoneNumber
				},
				res => {
					uni.setStorageSync('ticket', res.data);
				}
			);
		},

		login() {
			this.getName();
		}
	},
	onShow() {
		var ticket = uni.getStorageSync('ticket');
		if (ticket != '') {
			var name = uni.getStorageSync('name');
			var img = uni.getStorageSync('img');
			this.name = name;
			this.img = img;
			this.isBtn = false;
		} else {
			this.isBtn = true;
			this.img = '../../static/img/1.webp';
		}
	}
};
</script>

<style scoped lang="less">
.twoo {
	border-radius: 20rpx;
}
.header {
	width: 100%;
	box-sizing: border-box;
	position: fixed;
	top: 0;
	z-index: 100;
	background-color: aliceblue;

	image {
		display: block;
		height: 60rpx;
		width: 69rpx;
	}
}

.touxiang {
	width: 95%;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;

	.left {
		flex: 1.8;

		image {
			border-radius: 50%;
			width: 110rpx;
			height: 110rpx;
		}
	}

	.middle {
		flex: 7.2;
		overflow: hidden;
		clear: both;

		.desc1 {
			display: block;
			font-size: 30rpx;
			width: 200rpx;
			height: 55rpx;
			line-height: 55rpx;
			float: left;
		}

		.desc2 {
			display: block;
			font-size: 30rpx;
		}

		.desc3 {
			display: block;
			font-size: 26rpx;
			padding-top: 10rpx;
			box-sizing: border-box;
		}
	}

	.right {
		flex: 1;
		font-weight: 700;
		font-size: 34rpx;
		text-align: right;
	}
}

.fuwu {
	width: 90%;
	margin: 30rpx auto 0;
	display: flex;
	justify-content: space-between;
	align-items: center;

	.list {
		width: 25%;

		image {
			height: 60rpx;
			width: 60rpx;
			margin: 10rpx auto;
			display: block;
		}

		text {
			text-align: center;
			display: block;
			color: #999;
			font-size: 30rpx;
		}
	}
}

.qianbao {
	width: 90%;
	margin: 40rpx auto 0;

	.up {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.text1 {
			font-weight: 700;
			font-size: 36rpx;
		}

		.text2 {
			font-size: 30rpx;
			font-weight: 500;
			color: #999;
		}
	}

	.down {
		margin: 30rpx auto 0;
		background-color: #60d3b6;
		border-radius: 20rpx;
		padding: 20rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.one {
			width: 100%;

			.desc1 {
				display: block;
				text-align: center;
				color: aliceblue;
				font-size: 40rpx;
			}

			.desc2 {
				display: block;
				text-align: center;
				color: aliceblue;
				font-size: 36rpx;
				padding: 10rpx 0;
				box-sizing: border-box;
			}
		}
	}
}

.dingdan {
	width: 90%;
	margin: 30rpx auto;
	border-radius: 20rpx;
	box-shadow: 0 0 10rpx 10rpx #efefef;
	padding: 30rpx;
	box-sizing: border-box;

	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.desc1 {
			display: block;
			font-size: 32rpx;
			font-weight: 600;
		}

		.desc2 {
			display: block;
			font-size: 26rpx;
			color: #999;
		}
	}

	.down {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.list {
			width: 25%;
			padding-top: 30rpx;

			image {
				height: 60rpx;
				width: 60rpx;
				margin: 10rpx auto;
				display: block;
			}

			text {
				text-align: center;
				display: block;
				color: #999;
				font-size: 30rpx;
			}
		}
	}
}

.fenxiao {
	width: 90%;
	box-shadow: 0 0 10rpx 10rpx #efefef;
	border-radius: 20rpx;
	padding: 30rpx;
	box-sizing: border-box;
	margin: 30rpx auto 40rpx;

	.top {
		padding: 30rpx 0 40rpx;
	}

	.down {
		border-radius: 20rpx;
		background-color: rgb(227, 227, 227);
		padding: 10rpx;
		box-sizing: border-box;

		.xia-up {
			display: flex;
			justify-content: space-between;
			align-items: flex-end;

			.up-left {
				.desc1 {
					display: block;
					font-size: 24rpx;
					color: #999;
				}

				.desc2 {
					display: block;
					font-weight: 800;
					font-size: 44rpx;
				}
			}

			.up-right {
				background-color: #13bea9;
				padding: 4rpx 16rpx;
				border-radius: 50rpx;
				font-size: 24rpx;
			}
		}

		.xia-down {
			display: flex;
			justify-content: space-between;
			align-items: flex-end;

			.list {
				font-size: 28rpx;
				color: #999;
				padding: 30rpx 0 10rpx;
			}
		}
	}
}
</style>
