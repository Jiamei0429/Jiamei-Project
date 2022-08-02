<script>
export default {
	onLaunch: function() {
		const systenInfo = wx.getSystemInfoSync(); //设备信息
		// console.log("获取系统信息", systenInfo)
		this.globalData.statusBarHeight = systenInfo.statusBarHeight; //给状态栏高度赋值
		this.globalData.ScreenHeight = systenInfo.safeArea.width; //给屏幕宽度赋值
		const menuInfo = wx.getMenuButtonBoundingClientRect(); //胶囊按钮信息
		// console.log("胶囊按钮信息", menuInfo)
		this.globalData.menuHeight = menuInfo.height; //给胶囊高度赋值
		this.globalData.menuRight = systenInfo.safeArea.width - menuInfo.right; //给胶囊右边距离赋值
		this.globalData.menuTop = menuInfo.top; //给胶囊上边离顶部赋值
		this.globalData.windowHeight = menuInfo.height + systenInfo.statusBarHeight + (menuInfo.top - systenInfo.statusBarHeight) * 2; //给胶囊高度赋值
		this.globalData.fengHeight = menuInfo.top - systenInfo.statusBarHeight; //给胶囊高度赋值
		// console.log("window高度", this.globalData.windowHeight)
		// console.log("上边距离", this.globalData.menuTop)
		// console.log("右边距离", this.globalData.menuRight)
		// console.log("胶囊高度", this.globalData.menuHeight)
		// console.log("屏幕宽度", this.globalData.ScreenHeight)
		// console.log("状态栏高度", this.globalData.statusBarHeight)
		// console.log("缝的高度", this.globalData.fengHeight)
	},
	onShow: function() {},
	onHide: function() {},
	globalData: {
		statusBarHeight: 0, //状态栏高度
		ScreenHeight: 0, //屏幕宽度
		menuHeight: 0, //胶囊高度
		menuRight: 0, //箭囊距离右部的信息
		menuTop: 0, //箭囊距离顶部的信息
		windowHeight: 0, //头部的高度
		fengHeight: 0 //缝的高度
	}
};
</script>

<style lang="scss">
/*每个页面公共css */
@import 'uview-ui/index.scss';
</style>
