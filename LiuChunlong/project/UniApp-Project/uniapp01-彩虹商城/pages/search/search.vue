<template>
	<view>
		<view class="input">
			<input type="text" placeholder="哈哈哈哈哈哈哈" />
			<image src="../../static/img/search.png"></image>
		</view>
		<view class="main">
			<scroll-view class="main-left">
				<view class="list" v-for="(item, index) in title" :key="index" @click="qiehuan(index)">{{ item.title }}</view>
			</scroll-view>
			<view class="main-right">
				<view class="list" v-for="(item, index) in aside" :key="index">
					<image :src="item.pic" />
					<view class="title">{{ item.title }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			aside: [],
			title: []
		};
	},
	onLoad() {
		uni.request({
			url: 'https://www.jiameikj.com/serve/index.php',
			method: 'GET',
			success: res => {
				this.title = res.data.shouye.productList;
				this.aside = res.data.shouye.productList;
			}
		});
	},
	methods: {
		requireList() {
			uni.request({
				url: 'https://www.jiameikj.com/serve/index.php',
				method: 'GET',
				success: res => {
					this.aside = res.data.shouye.productList;
				}
			});
		},
		requireList1() {
			uni.request({
				url: 'https://www.jiameikj.com/serve/index.php',
				method: 'GET',
				success: res => {
					this.aside = res.data.shouye.productList1;
				}
			});
		},
		requireList2() {
			uni.request({
				url: 'https://www.jiameikj.com/serve/index.php',
				method: 'GET',
				success: res => {
					this.aside = res.data.shouye.productList2;
				}
			});
		},
		qiehuan(index) {
			switch (index) {
				case 0:
					this.requireList();
					break;
				case 1:
					this.requireList1();
					break;
				case 2:
					this.requireList2();
					break;
				case 3:
					this.requireList1();
					break;
				case 4:
					this.requireList2();
					break;
				case 5:
					this.requireList1();
					break;
				case 6:
					this.requireList2();
					break;
				case 7:
					this.requireList1();
					break;
				case 8:
					this.requireList2();
					break;
				case 9:
					this.requireList1();
					break;
				default:
					console.log(1111);
			}
		}
	}
};
</script>

<style scoped lang="less">
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

.main {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	width: 100%;

	.main-left {
		width: 25%;
		background-color: azure;
		height: 1100rpx;

		.list {
			width: 100%;
			height: 120rpx;
			line-height: 120rpx;
			text-align: center;
			font-size: 30rpx;
			transition: all 1.5s;
		}

		.list:hover {
			background-color: aqua;
		}
	}

	.main-right {
		width: 75%;
		display: flex;
		justify-content: flex-start;
		justify-content: space-around;
		flex-wrap: wrap;
		// align-items: flex-start;

		.list {
			width: 30%;
			height: 200rpx;
			margin-bottom: 30rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;

			image {
				display: block;
				width: 140rpx;
				height: 140rpx;
			}

			.title {
				font-size: 26rpx;
			}
		}
	}
}
</style>
