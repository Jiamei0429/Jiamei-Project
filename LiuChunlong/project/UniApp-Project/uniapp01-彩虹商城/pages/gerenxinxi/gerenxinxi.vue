<template>
	<view>
		<!-- 上 -->
		<view class="top">
			<view class="pic">
				<view class="left">头像</view>
				<view class="right">
					<image class="pho" :src="img"></image>
					<image class="you" src="../../static/img/right.png"></image>
				</view>
			</view>
			<view class="txt">
				<view class="left">姓名</view>
				<view class="right">
					<text class="pho">{{ name }}</text>
					<image class="you" src="../../static/img/right.png"></image>
				</view>
			</view>
			<view class="txt">
				<view class="left">身份证号</view>
				<view class="right">
					<text class="pho">197488*****923472</text>
					<image class="you" src="../../static/img/right.png"></image>
				</view>
			</view>
			<view class="txt">
				<view class="left">手机号码</view>
				<view class="right">
					<text class="pho">1766***0429</text>
					<image class="you" src="../../static/img/right.png"></image>
				</view>
			</view>
			<view class="txt1">
				<view class="left">更多信息</view>
				<view class="right">
					<text class="pho"></text>
					<image class="you" src="../../static/img/right.png"></image>
				</view>
			</view>
		</view>
		<!-- 中 -->
		<view class="zhong">
			<view class="txt">
				<view class="left">联系地址</view>
				<view class="right">
					<text class="pho"></text>
					<image class="you" src="../../static/img/right.png"></image>
				</view>
			</view>
			<view class="txt1">
				<view class="left">发票抬头</view>
				<view class="right">
					<text class="pho"></text>
					<image class="you" src="../../static/img/right.png"></image>
				</view>
			</view>
		</view>
		<!-- 下 -->
		<view class="xia" bindtap="tuichu">退出登录</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			name: '微信用户',
			img: '../../static/img/1.webp'
		};
	},
	methods: {},
	onShow() {
		var token = uni.getStorageSync('ticket');
		if (token != '') {
			var name = uni.getStorageSync('name');
			var img = uni.getStorageSync('img');
			this.name = name;
			this.img = img;
		}
	}
};
</script>

<style scoped lang="less">
.top {
	width: 100%;
	background-color: #fff;
	box-shadow: 0 0 10rpx 10rpx #efefef;

	.pic {
		width: 94%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 40rpx 0;
		border-bottom: 0.1rpx solid rgb(219, 219, 219);

		.left {
			font-size: 30rpx;
		}

		.right {
			display: flex;
			align-items: center;

			.pho {
				display: inline-block;
				border-radius: 20rpx;
				width: 100rpx;
				height: 100rpx;
				margin-right: 10rpx;
			}

			.you {
				display: inline-block;
				width: 30rpx;
				height: 30rpx;
			}
		}
	}

	.txt {
		width: 94%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx 0;
		border-bottom: 0.1rpx solid rgb(219, 219, 219);

		.left {
			font-size: 30rpx;
		}

		.right {
			display: flex;
			align-items: center;

			.pho {
				display: inline-block;
				padding-right: 10rpx;
				font-size: 30rpx;
			}

			.you {
				display: inline-block;
				width: 30rpx;
				height: 30rpx;
			}
		}
	}

	.txt1 {
		width: 94%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx 0;

		.left {
			font-size: 30rpx;
		}

		.right {
			display: flex;
			align-items: center;

			.pho {
				display: inline-block;
				padding-right: 10rpx;
				font-size: 30rpx;
			}

			.you {
				display: inline-block;
				width: 30rpx;
				height: 30rpx;
			}
		}
	}
}

.zhong {
	width: 100%;
	background-color: #fff;
	box-shadow: 0 0 10rpx 10rpx #efefef;
	margin-top: 30rpx;

	.txt {
		width: 94%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx 0;
		border-bottom: 0.1rpx solid rgb(219, 219, 219);

		.left {
			font-size: 30rpx;
		}

		.right {
			display: flex;
			align-items: center;

			.pho {
				display: inline-block;
				padding-right: 10rpx;
				font-size: 30rpx;
			}

			.you {
				display: inline-block;
				width: 30rpx;
				height: 30rpx;
			}
		}
	}

	.txt1 {
		width: 94%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx 0;

		.left {
			font-size: 30rpx;
		}

		.right {
			display: flex;
			align-items: center;

			.pho {
				display: inline-block;
				padding-right: 10rpx;
				font-size: 30rpx;
			}

			.you {
				display: inline-block;
				width: 30rpx;
				height: 30rpx;
			}
		}
	}
}

.xia {
	width: 100%;
	background-color: #fff;
	padding: 32rpx;
	box-sizing: border-box;
	text-align: center;
	color: aquamarine;
	font-size: 30rpx;
	font-weight: 800;
	box-shadow: 0 0 10rpx 10rpx #efefef;
	margin-top: 30rpx;
}
</style>
