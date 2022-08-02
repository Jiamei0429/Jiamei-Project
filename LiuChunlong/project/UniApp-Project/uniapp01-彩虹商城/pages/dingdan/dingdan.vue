<template>
	<view>
		<view class="header">
			<view class="list" @click="all">全部</view>
			<view class="list" @click="fukuan">待付款</view>
			<view class="list" @click="quhuo">待取货</view>
			<view class="list" @click="wancheng">已完成</view>
			<view class="list" @click="shouhou">退款售后</view>
		</view>
		<view class="desc" v-for="(item, index) in dingdanList" :key="index">
			<view class="up">
				<view class="left">怡康总部超市</view>
				<view class="right">{{ item.status }}</view>
			</view>
			<view class="middle">
				<view class="left">
					<view class="image"><image :src="item.pic"></image></view>
					<view class="text">
						<view class="text1">{{ item.title }}</view>
						<view class="text2">规格：{{ item.desc }}</view>
						<view class="text3">数量：x{{ item.num }}</view>
					</view>
				</view>
				<view class="right">￥{{ item.price }}</view>
			</view>
			<view class="down">
				<view class="left"></view>
				<view class="right">
					<view class="text1">删除订单</view>
					<view class="text2">退款/售后</view>
					<view class="text3">取货码</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			dingdanList: []
		};
	},
	onLoad() {
		uni.request({
			url: 'https://www.jiameikj.com/serve/index.php',
			data: {},
			success: res => {
				console.log(res);
				this.dingdanList = res.data.shouye.dingdanList1;
			}
		});
	},
	methods: {
		all: function() {
			uni.request({
				url: 'https://www.jiameikj.com/serve/index.php',
				data: {},
				success: res => {
					var dingdanList = this.dingdanList;
					dingdanList = res.data.shouye.dingdanList1;
					this.dingdanList = dingdanList;
				}
			});
		},
		fukuan: function() {
			uni.request({
				url: 'https://www.jiameikj.com/serve/index.php',
				data: {},
				success: res => {
					var dingdanList = this.dingdanList;
					dingdanList = res.data.shouye.dingdanList3;
					this.dingdanList = dingdanList;
				}
			});
		},
		quhuo: function() {
			uni.request({
				url: 'https://www.jiameikj.com/serve/index.php',
				data: {},
				success: res => {
					var dingdanList = this.dingdanList;
					dingdanList = res.data.shouye.dingdanList2;
					this.dingdanList = dingdanList;
				}
			});
		},
		wancheng: function() {
			uni.request({
				url: 'https://www.jiameikj.com/serve/index.php',
				data: {},
				success: res => {
					var dingdanList = this.dingdanList;
					dingdanList = res.data.shouye.dingdanList4;
					this.dingdanList = dingdanList;
				}
			});
		},
		shouhou: function() {
			uni.request({
				url: 'https://www.jiameikj.com/serve/index.php',
				data: {},
				success: res => {
					var dingdanList = this.dingdanList;
					dingdanList = res.data.shouye.dingdanList5;
					this.dingdanList = dingdanList;
				}
			});
		}
	}
};
</script>

<style scoped lang="less">
.header {
	display: flex;
	justify-content: space-around;
	border-bottom: 1rpx solid #efefef;

	.list {
		color: gray;
		font-size: 30rpx;
		text-align: center;
		transition: all 1s;
		height: 70rpx;
		font-weight: 800;
	}

	.list:hover {
		color: rgb(7, 89, 62);
	}
}

.desc {
	width: 95%;
	margin: 20rpx auto 0;
	border-radius: 20rpx;
	box-shadow: 0 0 10rpx 10rpx #efefef;
	padding: 30rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: space-around;

	.up {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid rgb(205, 205, 205);
		padding: 10rpx 0 20rpx;

		.left {
			color: #999;
		}

		.right {
			color: rgb(208, 134, 23);
			font-size: 26rpx;
		}
	}

	.middle {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 20rpx;

		.left {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.image {
				width: 30%;
				padding: 0 30rpx 0 10rpx;

				image {
					display: block;
					height: 120rpx;
					width: 100rpx;
				}
			}

			.text {
				width: 70%;

				.text1 {
					font-size: 30rpx;
				}

				.text2 {
					font-size: 24rpx;
				}

				.text3 {
					font-size: 24rpx;
				}
			}
		}

		.right {
		}
	}

	.down {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 20rpx;

		.left {
		}

		.right {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.text1 {
				padding: 5rpx 15rpx;
				border-radius: 40rpx;
				border: 1rpx solid #666;
				font-size: 24rpx;
				margin-right: 10rpx;
			}

			.text2 {
				padding: 5rpx 15rpx;
				border-radius: 40rpx;
				border: 1rpx solid #666;
				font-size: 24rpx;
				margin-right: 10rpx;
			}

			.text3 {
				padding: 5rpx 25rpx;
				border-radius: 40rpx;
				background-color: rgb(7, 89, 62);
				border: 1rpx solid rgb(7, 89, 62);
				font-size: 24rpx;
				color: #efefef;
			}
		}
	}
}
</style>
