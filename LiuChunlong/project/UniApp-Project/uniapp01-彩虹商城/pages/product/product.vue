<template>
	<view>
		<!-- 轮播图区域 -->
		<swiper class="banner">
			<swiper-item class="lun"><image :src="productList.image"></image></swiper-item>
			<swiper-item class="lun"><image :src="productList.image"></image></swiper-item>
			<swiper-item class="lun"><image :src="productList.image"></image></swiper-item>
			<swiper-item class="lun"><image :src="productList.image"></image></swiper-item>
		</swiper>
		<!-- 维生素含片 -->
		<view class="hanpian">
			<view class="top">
				<view class="left">
					<view class="desc1">{{ productList.name }}</view>
					<view class="desc2">{{ productList.dosageUsage }}</view>
				</view>
				<image src="../../static/img/star.png" class="right"></image>
			</view>
			<view class="bottom">
				<view class="left">
					<view class="desc1">￥ {{ productList.price }}</view>
					<view class="desc2">月销：{{ productList.pack }}</view>
				</view>
				<view class="right">
					<view class="desc1" @click="tianjia">加入购物车</view>
					<view class="desc2">库存：{{ productList.stock }}</view>
				</view>
			</view>
		</view>
		<!-- 商品参数 -->
		<view class="canshu">
			<view class="top">商品参数</view>
			<view class="bottom">
				<view>规格：维生素含片(100片)</view>
				<view>剂型：片剂</view>
				<view>包装：瓶装</view>
				<view>货号：339984</view>
			</view>
		</view>
		<!-- 门店 -->
		<view class="mendian">
			<view class="left">
				<text class="desc1">门店 怡康总部超市</text>
				<text class="desc2">陕西省大庆路24号</text>
			</view>
			<view class="right">></view>
		</view>
		<!-- 图文详情 -->
		<view class="tuwen">
			<view class="top">图文详情</view>
			<view class="bottom"></view>
		</view>
		<!-- 底部 -->
		<view class="bott">
			<view class="left">
				<view class="list">
					<image src="../../static/img/kf.png"></image>
					<view>客服</view>
				</view>
				<view class="list">
					<navigator url="/pages/gouwuche/gouwuche">
						<image src="../../static/img/car.png"></image>
						<view>购物车</view>
					</navigator>
				</view>
			</view>
			<view class="right">
				<view class="desc1" @click="tianjia">加入购物车</view>
				<view class="desc2">立即购买</view>
			</view>
		</view>
	</view>
</template>

<script>
import http from '../../api/request.js';
export default {
	data() {
		return {
			productList: [],
			num: 1,
			itemNo: ''
		};
	},
	onLoad(options) {
		this.getProduct(options);
		this.itemNo = options.itemId;
	},
	methods: {
		getProduct(options) {
			http('post', '/item/detail', { itemNo: options.itemId }, res => {
				// console.log('产品详情', res);
				this.productList = res.data;
			});
		},
		tianjia(options) {
			http('post', '/cart/add', { itemNo: this.itemNo, num: 1 }, res => {
				// console.log(res);
			});
		}
	}
};
</script>

<style scoped lang="less">
.banner {
	width: 100%;
	height: 350rpx;

	.lun {
		width: 100%;

		image {
			width: 100%;
			height: 350rpx;
		}
	}
}

.hanpian {
	width: 90%;
	margin: 30rpx auto;
	box-shadow: 0 0 10rpx 10rpx #efefef;
	border-radius: 20rpx;
	padding: 20rpx;
	box-sizing: border-box;

	.top {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;

		.left {
			.desc1 {
				font-size: 30rpx;
				font-weight: 600;
			}

			.desc2 {
				padding: 15rpx 0;
				font-size: 26rpx;
			}
		}

		.right {
			display: block;
			height: 50rpx;
			width: 50rpx;
		}
	}

	.bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 15rpx;

		.left {
			.desc1 {
				font-size: 30rpx;
				font-weight: 600;
				color: red;
			}

			.desc2 {
				padding: 15rpx 0;
				font-size: 26rpx;
				text-align: center;
			}
		}

		.right {
			.desc1 {
				font-size: 30rpx;
				font-weight: 600;
				color: #ffffff;
				background-color: aqua;
				padding: 4rpx 16rpx;
				border-radius: 20rpx;
				box-sizing: border-box;
			}

			.desc2 {
				padding: 15rpx 0;
				font-size: 26rpx;
				text-align: center;
			}
		}
	}
}

.canshu {
	width: 90%;
	margin: 30rpx auto;
	box-shadow: 0 0 10rpx 10rpx #efefef;
	border-radius: 20rpx;
	padding: 20rpx;
	box-sizing: border-box;

	.top {
		padding: 10rpx 0;
		font-size: 30rpx;
		font-weight: 600;
	}

	.bottom {
		background-color: #f1f1f1;
		padding: 20rpx;

		view {
			font-size: 26rpx;
			padding: 10rpx;
		}
	}
}

.mendian {
	width: 90%;
	margin: 30rpx auto;
	box-shadow: 0 0 10rpx 10rpx #efefef;
	border-radius: 20rpx;
	padding: 20rpx;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: center;

	.left {
		.desc1 {
			display: block;
			font-size: 26rpx;
			padding: 10rpx;
		}

		.desc2 {
			display: block;
			font-size: 26rpx;
			padding-left: 70rpx;
			padding-top: 10rpx;
		}
	}

	.right {
		font-weight: 800;
	}
}

.tuwen {
	width: 90%;
	margin: 30rpx auto;
	box-shadow: 0 0 10rpx 10rpx #efefef;
	border-radius: 20rpx;
	padding: 20rpx;
	box-sizing: border-box;

	.top {
		padding: 10rpx 0;
		font-size: 30rpx;
		font-weight: 600;
	}

	.bottom {
		background-color: #f1f1f1;
		padding: 120rpx 0;
	}
}

.bott {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx 30rpx;
	box-sizing: border-box;
	border-top: 1px solid gray;

	.left {
		width: 40%;
		display: flex;
		justify-content: space-around;
		align-items: center;

		.list {
			image {
				width: 40rpx;
				height: 40rpx;
				display: block;
				margin: 0 auto;
			}

			view {
				font-size: 26rpx;
			}
		}
	}

	.right {
		width: 60%;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.desc1 {
			width: 50%;
			border-radius: 30rpx 0 0 30rpx;
			text-align: center;
			box-sizing: border-box;
			padding: 10rpx 20rpx;
			background-color: #44cdb9;
			color: #ffffff;
		}

		.desc2 {
			width: 50%;
			border-radius: 0 30rpx 30rpx 0;
			text-align: center;
			box-sizing: border-box;
			padding: 10rpx 20rpx;
			background-color: #ff903c;
			color: #ffffff;
		}
	}
}
</style>
