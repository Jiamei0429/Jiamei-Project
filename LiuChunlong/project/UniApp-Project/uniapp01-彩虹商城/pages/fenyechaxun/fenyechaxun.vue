<template>
	<view class="big">
		<view class="input">
			<input type="text" placeholder="哈哈哈哈哈哈哈" />
			<image src="../../static/img/search.png"></image>
		</view>
		<view class="shai">
			<view class="list" @click="zonghe">综合</view>
			<view class="list">
				<view class="left" @click="xiaoliang">销量</view>
				<view class="right">
					<view class="up">
						<image v-if="showup" src="../../static/img/top.png"></image>
						<image v-else src="../../static/img/top1.png"></image>
					</view>
					<view class="down">
						<image v-if="showdown" src="../../static/img/bottom.png"></image>
						<image v-else src="../../static/img/bottom1.png"></image>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="left" @click="jiage">价格</view>
				<view class="right">
					<view class="up">
						<image v-if="showup1" src="../../static/img/top.png"></image>
						<image v-else src="../../static/img/top1.png"></image>
					</view>
					<view class="down">
						<image v-if="showdown1" src="../../static/img/bottom.png"></image>
						<image v-else src="../../static/img/bottom1.png"></image>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="left" @click="shaixuan">筛选</view>
				<view class="right">
					<image class="img" v-if="showup2" src="../../static/img/bottom.png"></image>
					<image class="img" v-else src="../../static/img/bottom1.png"></image>
				</view>
			</view>
		</view>

		<view class="box" v-for="(item, index) in list" :key="index">
			<view class="left">
				<navigator url="/pages/product/product?itemId={{item.itemNo}}"><image :src="item.image"></image></navigator>
			</view>
			<view class="right">
				<view class="r-top">
					<view class="shang">{{ item.name }}</view>
					<view class="xia">{{ item.prescriptionName }}</view>
				</view>
				<view class="r-bottom">
					<view class="zuo">￥{{ item.price }}</view>
					<view class="you" @click="tianjia(item, index)">加购</view>
				</view>
			</view>
		</view>
		<view class="di">
			<view class="left">
				<navigator url="/pages/gouwuche/gouwuche"><image src="../../static/img/gwc.png"></image></navigator>
			</view>
			<view class="center">共{{ num }}件商品,价值￥{{ price }}元</view>
			<view class="right">去结算</view>
		</view>
	</view>
</template>

<script>
import http from '../../api/request.js';
export default {
	data() {
		return {
			showup: true,
			showdown: true,
			showup1: true,
			showdown1: true,
			showup2: true,
			list: [],
			num: 10,
			price: 1000,
			info: []
		};
	},

	onLoad() {
		http('post', '/item/list', { pageNo: 1, pageSize: 5 }, res => {
			// console.log(res);
			this.list = res.data.records;
		});
	},
	onShow() {
		this.getInfo();
	},
	methods: {
		getInfo() {
			http('post', '/cart/list', { pageNo: 1, pageSize: 5 }, res => {
				this.info = res.data.records;
				var info = this.info;
				var sum = 0;
				var price = 0;
				for (let i = 0; i < info.length; i++) {
					sum += info[i].num;
					price += info[i].num * info[i].price;
				}
				this.num = sum;
				this.price = price;
			});
		},
		tianjia(item, index) {
			http('post', '/cart/add', { itemNo: item.itemNo, num: 1 }, res => {
				this.getInfo();
			});
		},
		zonghe() {
			this.showdown = true;
			this.showup = true;
			this.showup1 = true;
			this.showup2 = true;
			this.showdown1 = true;
		},
		xiaoliang() {
			if (this.showdown == true) {
				this.showdown = false;
				this.showup = true;
				this.showup1 = true;
				this.showup2 = true;
				this.showdown1 = true;
				// http('post', '/item/list', { sortKey: sales, sortVal: 1 }, res => {
				// 	console.log(res);
				// 	this.list = res.data.records;
				// });
			} else {
				this.showdown = true;
				this.showup = false;
				this.showup1 = true;
				this.showdown1 = true;
				this.showup2 = true;
				// http('post', '/item/list', { sortKey: price, sortVal: 2 }, res => {
				// 	console.log(res);
				// 	this.list = res.data.records;
				// });
			}
		},
		jiage() {
			if (this.showdown1 == true) {
				this.showdown1 = false;
				this.showup1 = true;
				this.showup2 = true;
				this.showup = true;
				this.showdown = true;

				// http('post', '/item/list', { sortKey: sales, sortVal: 1 }, res => {
				// 	console.log(res);
				// 	this.list = res.data.records;
				// });
			} else {
				this.showdown1 = true;
				this.showup1 = false;
				this.showup2 = true;
				this.showup = true;
				this.showdown = true;
				// http('post', '/item/list', { sortKey: price, sortVal: 2 }, res => {
				// 	console.log(res);
				// 	this.list = res.data.records;
				// });
			}
		},
		shaixuan() {
			if (this.showup2 == true) {
				this.showup2 = false;
				this.showdown1 = true;
				this.showup = true;
				this.showup1 = true;
				this.showdown = true;
				// http('post', '/item/list', { sortKey: sales, sortVal: 1 }, res => {
				// 	console.log(res);
				// 	this.list = res.data.records;
				// });
			} else {
				this.showup2 = true;
				this.showdown1 = true;
				this.showup = true;
				this.showup1 = true;
				this.showdown = true;
				// http('post', '/item/list', { sortKey: price, sortVal: 2 }, res => {
				// 	console.log(res);
				// 	this.list = res.data.records;
				// });
			}
		}
	}
};
</script>

<style scoped lang="less">
.big {
	padding-bottom: 160rpx;
	.input {
		width: 100%;
		padding: 10rpx;
		box-sizing: border-box;
		// box-shadow: 0 0 4rpx 4rpx #efefef;
		position: relative;

		input {
			height: 60rpx;
			border-radius: 60rpx;
			background-color: aliceblue;
			padding-left: 12%;
			font-size: 24rpx;
		}

		image {
			height: 35rpx;
			width: 35rpx;
			position: absolute;
			top: 50%;
			left: 5%;
			transform: translateY(-50%);
		}
	}
	.shai {
		padding: 10rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-around;
		align-items: center;
		.list {
			display: flex;
			justify-content: space-around;
			align-items: center;
			.left {
				padding: 0 10rpx;
			}
			.right {
				.up {
					image {
						display: block;
						width: 20rpx;
						height: 15rpx;
					}
				}
				.down {
					image {
						display: block;
						width: 20rpx;
						height: 15rpx;
					}
				}
				.img {
					display: block;
					width: 20rpx;
					height: 15rpx;
				}
			}
		}
	}
	.box {
		width: 95%;
		margin: 20rpx auto 0;
		display: flex;
		justify-content: space-between;
		box-shadow: 0 0 10rpx 10rpx #f1f1f1;

		.left {
			flex: 2;
			padding: 20rpx;
			image {
				height: 130rpx;
				width: 130rpx;
				display: block;
				margin: auto 0;
			}
		}
		.right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 0 20rpx;
			flex: 8;
			.r-top {
				.shang {
					padding: 20rpx 0 0;
					font-size: 30rpx;
				}
				.xia {
					font-size: 26rpx;
				}
			}
			.r-bottom {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-bottom: 20rpx;
				.zuo {
					font-size: 34rpx;
					color: chocolate;
					font-weight: 800;
				}
				.you {
					background: chocolate;
					padding: 10rpx 30rpx;
					border-radius: 40rpx;
				}
			}
		}
	}
	.di {
		display: flex;
		background-color: #f1f1f1;
		justify-content: space-around;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		.left {
			image {
				display: block;
				width: 140rpx;
				height: 140rpx;
			}
		}
		.center {
			font-weight: 500;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.right {
			padding: 15rpx 25rpx;
			background-color: aqua;
			border-radius: 40rpx;
		}
	}
}
</style>
