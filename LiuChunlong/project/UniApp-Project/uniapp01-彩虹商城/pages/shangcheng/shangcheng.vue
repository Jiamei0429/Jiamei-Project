<template>
	<view>
		<!-- 胶囊头部 -->
		<view class="header" :style="'height:' + windowHeight + 'px;' + 'padding-top:' + menuTop + 'px;'">
			<view class="wrap" :style="'height:' + menuHeight + 'px;' + 'line-height:' + menuHeight + 'px;' + 'padding-left:' + menuRight + 'px;'">
				<image class="position" src="../../static/img/position.png" />
				<text class="weizhi">北京市</text>
				<image class="xiala" src="../../static/img/down.png" />
			</view>
		</view>
		<!-- 搜索轮播图区域 -->
		<view class="banner" :style="'margin-top:' + windowHeight + 'px;'">
			<view class="banner-top">
				<view class="icon"><image src="../../static/img/search.png"></image></view>
				<navigator class="tiao" url="/pages/search/search"><view class="input">搜索疾病、症状、商品</view></navigator>
			</view>
			<!-- 热搜 -->
			<view class="banner-middle">
				<view class="title">热搜</view>
				<view class="tuijian">
					<text class="list" v-for="(item, index) in reSou" :key="index">{{ item.title }}</text>
				</view>
			</view>
			<!-- 轮播图 -->
			<swiper class="banner-bottom">
				<swiper-item class="lun" v-for="(item, index) in SwiperList" :key="index"><image :src="item.pic"></image></swiper-item>
			</swiper>
		</view>
		<!-- 分类专区 -->
		<view class="nav">
			<view class="list" v-for="(item, index) in tenList" :key="index" @click="shi(index)">
				<image :src="item.img"></image>
				<text>{{ item.title }}</text>
			</view>
		</view>
		<!-- 热卖榜单 -->
		<view class="bangdan">
			<view class="top">
				<view>热卖榜单</view>
				<text>更多 ></text>
			</view>
			<scroll-view class="bottom" scroll-x="true">
				<view class="list" v-for="(item, index) in productList" :key="index">
					<view class="pic"><image class="up" :src="item.pic"></image></view>
					<view class="down">
						<view class="left">
							<text class="desc1">{{ item.title }}</text>
							<text class="desc2">¥ {{ item.price }}</text>
						</view>
						<image class="right" src="../../static/img/jia.png"></image>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 为您推荐 -->
		<view class="weinin">
			<view class="top">
				<text class="desc1">为您推荐</text>
				<text class="desc2">更多 ></text>
			</view>
			<view class="down">
				<view class="list" v-for="(item, index) in productList1" :key="index">
					<view class="one"></view>
					<view class="two">
						<navigator open-type="navigate" url="/pages/product/product?itemId={{item.itemNo}}"><image :src="item.image"></image></navigator>
					</view>
					<view class="three">
						<view class="desc1">{{ item.name }}</view>
						<view class="desc2">￥ {{ item.price }}</view>
					</view>
					<view class="four">{{ item.sales }}人已购</view>
					<image src="../../static/img/jia.png" class="five"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
const app = getApp();
import http from '../../api/request.js';
export default {
	data() {
		return {
			reSou: [],
			SwiperList: [],
			tenList: [],
			productList: [],
			productList1: [],
			windowHeight: app.globalData.windowHeight, //胶囊头部的总高度
			menuTop: app.globalData.menuTop, // 胶囊距离屏幕顶部的距离
			menuHeight: app.globalData.menuHeight, //胶囊高度
			menuRight: app.globalData.menuRight //胶囊距离屏幕右边的距离
		};
	},
	onLoad() {
		uni.request({
			url: 'https://www.jiameikj.com/serve/index.php',
			method: 'GET',
			success: res => {
				this.reSou = res.data.shouye.reSou;
				this.SwiperList = res.data.shouye.swiperList;
				this.tenList = res.data.shouye.tenList;
				this.productList = res.data.shouye.productList;
			}
		}),
			http(
				'post',
				'/hot/itemList',
				{
					rmdItemType: 1
				},
				res => {
					this.productList1 = res.data;
				}
			);
	},
	methods: {
		shi(index) {
			uni.navigateTo({
				url: '../fenyechaxun/fenyechaxun'
			});
		}
	}
};
</script>

<style scoped lang="less">
.header {
	width: 100%;
	background-color: #2bc6b4;
	box-sizing: border-box;
	position: fixed;
	top: 0;
	z-index: 100;

	.wrap {
		width: 27%;
		height: 80rpx; //胶囊的高度
		display: flex;
		justify-content: space-around;
		align-items: center;
		overflow: hidden;

		.position {
			display: inline-block;
			width: 40rpx;
			height: 40rpx;
		}

		.weizhi {
			display: inline-block;
			color: #fff;
			font-weight: 400;
			font-size: 34rpx;
		}

		.xiala {
			display: inline-block;
			width: 40rpx;
			height: 40rpx;
		}
	}
}

.banner {
	background-image: linear-gradient(0deg, rgba(105, 214, 185, 0) 0%, rgba(105, 214, 185, 0.6) 51%, #2bc6b4 81%);
	width: 100%;
	box-sizing: border-box;
	padding: 0 40rpx;

	.banner-top {
		width: 100%;
		height: 80rpx;
		background: #ffffff;
		border-radius: 60rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.icon {
			width: 20%;

			image {
				height: 50rpx;
				width: 50rpx;
				display: block;
				margin: 0 auto;
			}
		}

		.tiao {
			width: 80%;

			.input {
				padding-right: 20rpx;
				box-sizing: border-box;
			}
		}
	}

	.banner-middle {
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.title {
			width: 11%;
			font-family: PingFangSC-Regular;
			font-size: 30rpx;
			color: #ffffff;
			font-weight: 400;
		}

		.tuijian {
			width: 89%;

			.list {
				height: 50rpx;
				line-height: 50rpx;
				opacity: 0.3;
				background: #ffffff;
				border-radius: 20rpx;
				padding: 3rpx 16rpx;
				font-size: 28rpx;
				margin-left: 9rpx;
			}
		}
	}

	.banner-bottom {
		width: 100%;
		height: 200rpx;
		padding-top: 20rpx;

		.lun {
			height: 200rpx;

			image {
				width: 100%;
				height: 200rpx;
			}
		}
	}
}

.nav {
	margin: 0 auto;
	width: 90%;
	margin-top: 40rpx;
	padding: 30rpx 10rpx;
	height: 320rpx;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	align-items: center;
	background-color: #ffffff;
	box-shadow: 0px 0px 10px 10px rgb(228, 229, 230);
	border-radius: 20rpx;

	.list {
		width: 19%;
		height: 100rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;

		image {
			width: 70rpx;
			height: 70rpx;
		}

		text {
			font-size: 20rpx;
		}
	}
}

.bangdan {
	width: 90%;
	margin: 40rpx auto 40rpx;
	background-color: #ffffff;
	box-shadow: 0px 0px 10px 10px rgb(228, 229, 230);
	border-radius: 20rpx;
	padding: 20rpx 30rpx;
	box-sizing: border-box;

	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;

		view {
			font-family: PingFang-SC-Bold;
			font-size: 30 rpx;
			color: #333333;
			font-weight: 700;
		}

		text {
			font-family: PingFangSC-Regular;
			font-size: 24rpx;
			color: #999999;
			text-align: right;
			font-weight: 400;
		}
	}

	.bottom {
		width: 100%;
		white-space: nowrap;
	}

	.list {
		display: inline-block;
		width: 40%;
		margin: 5rpx;
		padding: 10rpx;
		border-radius: 10rpx;

		.pic {
			background-color: #f5f5f5;
			padding: 80rpx 20rpx;

			.up {
				display: block;
				width: 100%;
				margin: 0 auto;
				height: 120rpx;
			}
		}

		.down {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 10rpx;

			.left {
				display: flex;
				height: 80rpx;
				flex-direction: column;
				justify-content: space-between;

				.desc1 {
					font-family: PingFangSC-Regular;
					font-size: 26rpx;
					color: #333333;
					font-weight: 400;
				}

				.desc2 {
					font-family: PingFang-SC-Bold;
					font-size: 36rpx;
					color: #ed553f;
					font-weight: 700;
				}
			}

			.right {
				display: block;
				height: 70rpx;
				width: 70rpx;
			}
		}
	}
}

.weinin {
	margin: 0 5% 600rpx 5%;
	width: 90%;
	box-sizing: border-box;

	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 0;
		box-sizing: border-box;

		.desc1 {
			font-family: PingFangSC-Regular;
			font-size: 34rpx;
			color: #333333;
			font-weight: 400;
		}

		.desc2 {
			font-family: PingFangSC-Regular;
			font-size: 28rpx;
			color: #999999;
			text-align: right;
			font-weight: 500;
		}
	}

	.down {
		display: flex;
		justify-content: flex-start;
		justify-content: space-between;
		flex-wrap: wrap;
		padding-bottom: 10rpx;

		.list {
			width: 48%;
			height: 450rpx;
			background-color: #ffffff;
			border-radius: 20rpx;
			margin-top: 20rpx;
			padding: 20rpx;
			box-sizing: border-box;
			position: relative;
			box-shadow: 0px 0px 10px 10px rgb(228, 229, 230);

			.one {
				width: 100%;
				height: 60rpx;
			}

			.two {
				width: 100%;
				padding: 15rpx 20rpx;
				box-sizing: border-box;

				image {
					width: 70%;
					height: 230rpx;
					display: block;
					margin: 0 auto;
				}
			}

			.three {
				width: 100%;
				padding: 18rpx 0;
				box-sizing: border-box;

				.desc1 {
					font-family: PingFangSC-Regular;
					font-size: 28rpx;
					color: #333333;
					font-weight: 400;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.desc2 {
					font-family: PingFangSC-Semibold;
					font-size: 34rpx;
					color: #ed553f;
					font-weight: 600;
				}
			}

			.four {
				position: absolute;
				top: 20rpx;
				left: 20rpx;
				font-size: 26rpx;
			}

			.five {
				height: 50rpx;
				width: 50rpx;
				display: block;
				position: absolute;
				top: 10rpx;
				right: 10rpx;
			}
		}
	}
}
</style>
