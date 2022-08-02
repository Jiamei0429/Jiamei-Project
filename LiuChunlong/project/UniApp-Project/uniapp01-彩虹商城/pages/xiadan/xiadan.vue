<template>
	<view>
		<view class="bac"></view>
		<view class="box">
			<u-subsection :list="list" :current="0"></u-subsection>
			<view v-if="true" class="song">
				<view class="up"></view>
				<view class="down"></view>
			</view>
			<view v-else class="dao">
				<view class="up">
					<view class="left">山东省青岛市市北区途客公寓市场三路店6楼</view>
					<view class="right">
						<view class="zu">
							<view class="shang"><image src="../../static/img/weizhi.png" /></view>
							<view class="xia">
								<image src="../../static/img/small.png"></image>
								<view class="mi">100米</view>
							</view>
						</view>
						<view class="yo"><image src="../../static/img/big.png"></image></view>
					</view>
				</view>
				<view class="middle">
					<view class="left">自取时间</view>
					<view class="right">明天(周六) 10:00</view>
					<image src="../../static/img/big.png"></image>
				</view>
				<view class="down">
					<view class="left">预留信息</view>
					<view class="right">刘春龙 17667300429</view>
					<image src="../../static/img/big.png"></image>
				</view>
			</view>
			<view class="meth">
				<view class="left">支付方式</view>
				<view class="right">账户余额</view>
				<image src="../../static/img/big.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					name: '待收货'
				},
				{
					name: '待付款'
				}
			]
		};
	},
	methods: {}
};
</script>

<style scoped lang="less">
.bac {
	background-color: aqua;
	width: 100%;
	height: 250rpx;
}
.box {
	background-color: #fff;
	width: 90%;
	height: 1000rpx;
	margin: 0 auto;
	border-radius: 30rpx;
	box-shadow: 0 0 4rpx 4rpx #f1f1f1;
	position: absolute;
	top: 40rpx;
	left: 5%;
	.song {
	}
	.dao {
		padding: 10rpx;
		box-sizing: border-box;
		.up {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left {
			}
			.right {
				.zu {
					.shang {
					}
					.xia {
						image {
							display: block;
							width: 60rpx;
							height: 60rpx;
						}
						.mi {
						}
					}
				}
				.yo {
					image {
						display: block;
						width: 40rpx;
						height: 40rpx;
					}
				}
			}
		}
		.middle {
			.left {
			}
			.right {
			}
			image {
				display: block;
				width: 40rpx;
				height: 40rpx;
			}
		}
		.down {
			.left {
			}
			.right {
			}
			image {
				display: block;
				width: 40rpx;
				height: 40rpx;
			}
		}
	}
	.meth {
		.left {
		}
		.right {
		}
		image {
			display: block;
			width: 40rpx;
			height: 40rpx;
		}
	}
}
</style>
