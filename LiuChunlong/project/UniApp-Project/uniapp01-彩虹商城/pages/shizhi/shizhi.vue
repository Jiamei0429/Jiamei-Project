<template>
	<view>
		<!-- 中 -->
		<view class="zhong">
			<view class="txt">
				<view class="left">安全设置</view>
				<view class="right">
					<text class="pho"></text>
					<image class="you" src="../../static/img/right.png"></image>
				</view>
			</view>
			<view class="txt">
				<view class="left">隐私设置</view>
				<view class="right">
					<text class="pho"></text>
					<image class="you" src="../../static/img/right.png"></image>
				</view>
			</view>
			<view class="txt">
				<view class="left">消息设置</view>
				<view class="right">
					<text class="pho"></text>
					<image class="you" src="../../static/img/right.png"></image>
				</view>
			</view>
			<view class="txt1">
				<view class="left">常规设置</view>
				<view class="right">
					<text class="pho"></text>
					<image class="you" src="../../static/img/right.png"></image>
				</view>
			</view>
		</view>
		<!-- 中 -->
		<view class="zhong">
			<view class="txt">
				<view class="left">关于我们</view>
				<view class="right">
					<text class="pho"></text>
					<image class="you" src="../../static/img/right.png"></image>
				</view>
			</view>
			<view class="txt1">
				<view class="left">用户协议</view>
				<view class="right">
					<text class="pho"></text>
					<image class="you" src="../../static/img/right.png"></image>
				</view>
			</view>
		</view>
		<!-- 下 -->
		<view class="xia" @click="tuichu">退出登录</view>
	</view>
</template>

<script>
import http from '../../api/request.js';
export default {
	data() {
		return {};
	},
	methods: {
		tuichu() {
			http('post', '/auth/logout', { t: new Date().getTime() }, res => {
				console.log(res);
				if (res.success == true) {
					uni.clearStorageSync('ticked');
					uni.clearStorageSync('name');
					uni.clearStorageSync('img');
					uni.switchTab({
						url: '/pages/index/index'
					});
				}
			});
		}
	}
};
</script>

<style scoped lang="less">
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
