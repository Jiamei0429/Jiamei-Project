<template>
	<view>
		<!-- 胶囊头部 -->
		<view class="header" :style="'height:' + windowHeight + 'px;' + 'padding-top:' + menuTop + 'px;'">
			<text :style="'height:' + menuHeight + 'px;' + 'line-height:' + menuHeight + 'px;' + 'padding-left:' + menuRight + 'px;'">药关爱</text>
		</view>
		<!-- 四个导航 -->
		<view class="nav" :style="'margin-top:' + windowHeight + 'px;'">
			<view class="list" v-for="(item, index) in navList" :key="index" @click="">
				<image :src="item.img"></image>
				<text>{{ item.title }}</text>
			</view>
		</view>
		<!-- 又四个导航 -->
		<view class="nav-two">
			<view class="list" v-for="(item, index) in navListTwo" :key="index">
				<image :src="item.image"></image>
				<text>{{ item.title }}</text>
			</view>
		</view>
		<!-- 轮播图区域 -->
		<swiper class="banner" autoplay circular indicator-dots duration="1000" interval="3000">
			<swiper-item class="lun" v-for="(item, index) in swiperList" :key="index"><image :src="item.pic"></image></swiper-item>
		</swiper>
		<!-- 小人 -->
		<view class="person">
			<view class="bac"><image class="bg" src="../../static/img/pic.png"></image></view>
			<view class="text">北京新增1例本土确诊…</view>
			<image class="btn" src="../../static/img/button.png"></image>
			<image class="peo" src="../../static/img/pic_h.png"></image>
		</view>
		<!-- 健康课堂 -->
		<view class="ketang">
			<view class="top">
				<text class="desc1">健康课堂</text>
				<text class="desc2">更多 ></text>
			</view>
			<view class="bottom">
				<view class="left"><image src="../../static/img/wechat.png"></image></view>
				<view class="right">
					<view class="list" v-for="(item, index) in auttom" :key="index">
						<image :src="item.img"></image>
						<text class="desc1">{{ item.title }}</text>
						<text class="desc2">{{ item.desc }}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 健康档案 -->
		<view class="health">
			<view class="top">健康档案</view>
			<view class="bottom">
				<view class="list" v-for="(item, index) in healthList" :key="index">
					<view class="one">
						<image :src="item.image"></image>
						<view>{{ item.title }}</view>
					</view>
					<view class="two">{{ item.time }}</view>
					<view class="three">
						<view class="desc1">{{ item.blood }}</view>
						<view class="desc2">mmHg</view>
					</view>
					<view class="four">
						<view class="desc1">{{ item.heart }}</view>
						<view class="desc2">bpm</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 权益精选 -->
		<view class="weinin">
			<view class="top">
				<text class="desc1">为您推荐</text>
				<text class="desc2">更多 ></text>
			</view>
			<view class="down">
				<view class="list" v-for="(item, index) in productList" :key="index">
					<navigator open-type="navigate" url="/pages/product/product?itemId={{item.itemNo}}">
						<view class="one"></view>
						<view class="two"><image :src="item.image" /></view>
						<view class="three">
							<view class="desc1">{{ item.name }}</view>
							<view class="desc2">￥ {{ item.price }}</view>
						</view>
						<view class="four">{{ item.sales }}人已购</view>
					</navigator>
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
			navList: [], //四个接口
			navListTwo: [], //十个接口
			healthList: [], //存放健康档案数据
			swiperList: [], //存放轮播图数据
			auttom: [], //存放秋天数据
			productList: [], //存放商品数据
			windowHeight: app.globalData.windowHeight, //胶囊头部的总高度
			menuTop: app.globalData.menuTop, // 胶囊距离屏幕顶部的距离
			menuHeight: app.globalData.menuHeight, //胶囊高度
			menuRight: app.globalData.menuRight, //胶囊距离屏幕右边的距离
			navList: [] //四个接口
		};
	},
	onLoad() {
		this.getJiamei();
		this.getYuanMa();
	},
	methods: {
		getJiamei() {
			uni.request({
				url: 'https://www.jiameikj.com/serve/index.php',
				method: 'GET',
				success: res => {
					this.navList = res.data.shouye.navList;
					this.navListTwo = res.data.shouye.navListTwo;
					this.healthList = res.data.shouye.healthList;
					this.swiperList = res.data.shouye.swiperList;
					this.auttom = res.data.shouye.auttom;
				}
			});
		},
		getYuanMa() {
			http('post', '/hot/itemList', { rmdItemType: 1 }, res => {
				this.productList = res.data;
			});
		}
	}
};
</script>

<style scoped lang="less">
.header {
	width: 100%;
	box-sizing: border-box;
	background: #2bc6b4;
	position: fixed;
	top: 0;
	z-index: 100;

	text {
		box-sizing: border-box;
		display: block;
		font-size: 36rpx;
		font-weight: 800;
		color: #ffffff;
	}
}

.nav {
	display: flex;
	justify-content: space-around;
	align-items: center;

	.list {
		padding: 30rpx;
		box-sizing: border-box;

		image {
			display: block;
			width: 110rpx;
			height: 110rpx;
		}

		text {
			display: block;
			margin: 10rpx auto;
			text-align: center;
			font-size: 30rpx;
			font-weight: 600;
			color: #999;
		}
	}
}

.nav-two {
	width: 90%;
	margin: 0 auto;
	box-shadow: 0 0 10rpx 10rpx #efefef;
	border-radius: 20rpx;
	display: flex;
	justify-content: space-around;
	align-items: center;

	.list {
		padding: 30rpx;
		box-sizing: border-box;

		image {
			display: block;
			margin: 0 auto;
			width: 80rpx;
			height: 80rpx;
		}

		text {
			display: block;
			margin: 10rpx auto;
			text-align: center;
			font-size: 26rpx;
		}
	}
}

.banner {
	width: 90%;
	height: 200rpx;
	margin: 0 auto;
	padding: 40rpx 0 20rpx;

	.lun {
		width: 100%;

		image {
			width: 100%;
			height: 200rpx;
			border-radius: 20rpx;
		}
	}
}

.person {
	width: 90%;
	margin: 0 auto;
	padding: 40rpx 0;
	box-sizing: border-box;
	position: relative;

	.bac {
		width: 100%;

		.bg {
			display: block;
			width: 100%;
			height: 120rpx;
		}
	}

	.text {
		position: absolute;
		top: 50%;
		left: 30%;
		transform: translateX(-50%);
		transform: translateY(-50%);
		font-size: 26rpx;
	}

	.btn {
		display: block;
		position: absolute;
		width: 170rpx;
		height: 60rpx;
		top: 50%;
		right: 20rpx;
		transform: translateY(-50%);
	}

	.peo {
		display: block;
		position: absolute;
		width: 200rpx;
		height: 160rpx;
		top: 50%;
		left: 10rpx;
		transform: translateY(-50%);
	}
}

.ketang {
	width: 90%;
	margin: 10rpx auto;

	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.desc1 {
			display: block;
			font-size: 36rpx;
			font-weight: 800;
		}

		.desc2 {
			display: block;
			font-weight: 500;
			font-size: 30rpx;
			color: #999;
		}
	}

	.bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 30rpx;

		.left {
			width: 49%;
			height: 450rpx;
			box-shadow: 0 0 10rpx 10rpx #efefef;
			border-radius: 30rpx;

			image {
				width: 100%;
				height: 450rpx;
			}
		}

		.right {
			width: 49%;
			display: flex;
			height: 450rpx;
			flex-direction: column;
			justify-content: space-between;

			.list {
				width: 100%;
				height: 220rpx;
				box-shadow: 0 0 10rpx 10rpx #efefef;
				border-radius: 30rpx;
				position: relative;

				image {
					position: absolute;
					width: 100%;
					height: 220rpx;
				}

				.desc1 {
					display: block;
					position: absolute;
					top: 0;
					width: 100%;
					padding: 30rpx 10rpx 10rpx;
					box-sizing: border-box;
					font-size: 30rpx;
				}

				.desc2 {
					display: block;
					position: absolute;
					top: 70rpx;
					font-size: 26rpx;
					width: 70%;
					padding: 20rpx 10rpx 0;
					box-sizing: border-box;
				}
			}
		}
	}
}

.health {
	width: 90%;
	margin: 30rpx auto 0;

	.top {
		font-size: 36rpx;
		font-weight: 800;
		padding: 30rpx 0;
	}

	.bottom {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.list {
			width: 48%;
			box-shadow: 0 0 10rpx 10rpx #efefef;
			border-radius: 30rpx;
			padding: 35rpx;
			box-sizing: border-box;

			.one {
				display: flex;
				align-items: center;

				image {
					height: 60rpx;
					width: 60rpx;
				}

				view {
					height: 60rpx;
					line-height: 60rpx;
					box-sizing: border-box;
					padding-left: 10rpx;
				}
			}

			.two {
				font-size: 26rpx;
				padding: 20rpx 0;
			}

			.three {
				display: flex;
				align-items: center;
				padding-top: 10rpx;

				.desc1 {
					font-size: 44rpx;
				}

				.desc2 {
					color: #999;
					font-size: 34rpx;
				}
			}

			.four {
				display: flex;
				align-items: center;
				padding-top: 10rpx;

				.desc1 {
					font-size: 44rpx;
				}

				.desc2 {
					color: #999;
					font-size: 34rpx;
				}
			}
		}
	}
}

.weinin {
	margin: 30rpx 5% 600rpx 5%;
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
			color: #333333;
			font-size: 36rpx;
			font-weight: 800;
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
