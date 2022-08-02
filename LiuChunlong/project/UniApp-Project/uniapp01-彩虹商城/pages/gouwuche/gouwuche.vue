<template>
	<view>
		<view class="car">
			<view
				:class="item.brandId == 1 ? 'list' : 'touch-Move-active list'"
				v-for="(item, index) in list"
				:key="index"
				@touchstart="touchstart(index, $event)"
				@touchend="touchend(index, $event)"
			>
				<view class="circle" @click="circle(index)">
					<icon type="circle" v-if="item.selected" color="#999"></icon>
					<icon type="success" v-else></icon>
				</view>
				<view class="pic"><image class="yao" :src="item.image" /></view>
				<view class="desc">
					<view class="top">
						<view class="desc1">{{ item.itemName }}</view>
						<view class="desc2">{{ item.brandName }}</view>
					</view>
					<view class="down">
						<view class="left">￥{{ item.price }}</view>
						<view class="right">
							<image @click="rdd(index)" src="../../static/img/rdd.png" />
							<view>{{ item.num }}</view>
							<image @click="add(index)" src="../../static/img/add.png" />
						</view>
					</view>
				</view>
				<view class="remove" @click="remove(index)">删除</view>
			</view>
			<view class="down2">
				<view class="left">
					<icon @click="al" class="icon" type="success" v-if="quanxuan"></icon>
					<icon @click="al" class="icon" type="circle" v-else color="#999"></icon>
					<view @click="al" class="jiesuan" v-if="quanxuan">全不选</view>
					<view @click="al" class="jiesuan" v-else>全选</view>
				</view>
				<view class="right" @click="goBuy">去结算</view>
			</view>
		</view>
		<u-modal v-model="show" :content="content"></u-modal>
	</view>
</template>

<script>
import http from '../../api/request.js';
export default {
	data() {
		return {
			select: true,
			isTouchMove: true,
			quanxuan: false,
			isTouchMove: false,
			select: false,
			list: [],
			startX: '', //存放手初次放下的位置
			show: false,
			content: '确认将此商品移出购物车吗',
			itemNo: ''
		};
	},
	onLoad(options) {
		this.tianjia();
	},
	methods: {
		goBuy() {
			let newArr = [];
			for (let i = 0; i < this.list.length; i++) {
				newArr.push(this.list[i].selected);
			}
			if (newArr.includes(false)) {
				uni.navigateTo({
					url: '/pages/xiadan/xiadan'
				});
			} else {
				uni.showToast({
					title: '请先选购商品'
				});
			}
		},
		remove(index) {
			http('post', '/cart/remove', { itemNo: this.list[index].itemNo }, res => {
				if (res.success == true) {
					this.tianjia();
				}
			});
		},
		add(index) {
			let num = this.list[index].num;
			num++;
			this.list[index].num = num;
			http('post', '/cart/updateNum', { itemNo: this.list[index].itemNo, num: this.list[index].num }, res => {
				if (res.success == true) {
					console.log('add');
					this.tianjia();
				}
			});
		},

		rdd(index) {
			var num = this.list[index].num;
			num--;
			if (num <= 0) {
				num = 1;
				this.show = true;
				http('post', '/cart/remove', { itemNo: this.list[index].itemNo }, res => {
					if (res.success == true) {
						this.tianjia();
					}
				});
			} else {
				this.list[index].num = num;
				http('post', '/cart/updateNum', { itemNo: this.list[index].itemNo, num: this.list[index].num }, res => {
					if (res.success == true) {
						console.log('rdd');
						this.tianjia();
					}
				});
			}
		},
		touchstart(index, event) {
			this.startX = event.changedTouches[0].clientX;
		},
		touchend(index, event) {
			var index = index;
			var startX = this.startX;
			var moveX = event.changedTouches[0].clientX;
			var list = this.list;
			// 判断上滑还是下滑;
			for (var i = 0; i < list.length; i++) {
				list[i].brandId = 1;
			}
			if (moveX + 60 < startX) {
				//左滑
				list[index].brandId = 2;
			} else if (moveX + 60 > startX) {
				list[index].brandId = 1;
			}
			this.list = list;
		},
		tianjia() {
			http('post', '/cart/list', { pageNo: 1, pageSize: 20 }, res => {
				console.log('111', res.data);
				this.list = res.data.records;
			});
		},
		circle(index) {
			if (this.list[index].selected == false) {
				this.list[index].selected = true;
				http('post', '/cart/updateSelected', { cartIdList: Array(this.list[index].id), selected: 0 }, res => {
					this.tianjia();
				});
			} else {
				this.list[index].selected = false;
				http('post', '/cart/updateSelected', { cartIdList: Array(this.list[index].id), selected: 1 }, res => {
					this.tianjia();
				});
			}
			var newArr = [];
			for (let i = 0; i < this.list.length; i++) {
				newArr.push(this.list[i].selected);
				if (newArr.includes(true)) {
					this.quanxuan = false;
				} else {
					this.quanxuan = true;
				}
			}
		},
		al() {
			if (this.quanxuan == false) {
				this.quanxuan = true;
				for (let i = 0; i < this.list.length; i++) {
					this.list[i].selected = false;
				}
			} else {
				this.quanxuan = false;
				for (let i = 0; i < this.list.length; i++) {
					this.list[i].selected = true;
				}
			}
		}
	}
};
</script>

<style scoped lang="less">
.car {
	width: 95%;
	margin: 10rpx auto;
	border-radius: 10rpx;
	box-shadow: 0px 0px 10px 10px rgb(228, 229, 230);
	overflow: hidden;

	.list {
		display: flex;
		justify-content: space-between;
		align-items: center;
		transform: translateX(120rpx);
		transition: all 0.5s;
		margin-left: -120rpx;
		margin-bottom: 4rpx;
		box-shadow: 0px 0px 2px 2px rgb(228, 229, 230);
		border-radius: 10rpx;

		.circle {
			width: 10%;
			display: flex;

			icon {
				display: block;
				margin: 0 auto;
			}
		}

		.pic {
			width: 20%;
			padding: 10rpx 10rpx 0;
			box-sizing: border-box;

			.yao {
				width: 100%;
				height: 160rpx;
			}
		}

		.desc {
			width: 70%;
			height: 180rpx;
			padding: 10rpx 30rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.top {
				.desc1 {
					font-size: 30rpx;
				}

				.desc2 {
					font-size: 24rpx;
					padding: 7rpx 0;
					color: gray;
				}
			}

			.down {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.left {
					font-size: 32rpx;
					color: brown;
					font-weight: 600;
				}

				.right {
					display: flex;
					align-items: center;
					justify-content: space-between;

					view {
						color: gray;
						padding: 0 10rpx;
					}

					image {
						height: 50rpx;
						width: 50rpx;
						display: block;
					}
				}
			}
		}

		.remove {
			background-color: aqua;
			width: 120rpx;
			height: 180rpx;
			line-height: 180rpx;
			text-align: center;
			transform: translateX(120rpx);
			transition: all 0.5s;
		}
	}

	.touch-Move-active {
		transform: translateX(0);

		.remove {
			transform: translateX(0);
		}
	}
}
.down2 {
	padding: 20rpx 40rpx;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;

	.left {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.icon {
		}
		.jiesuan {
			padding: 0 20rpx;
		}
	}
	.right {
		background-color: aqua;
		padding: 12rpx 40rpx;
		border-radius: 40rpx;
		color: aliceblue;
		font-weight: 700;
	}
}
</style>
