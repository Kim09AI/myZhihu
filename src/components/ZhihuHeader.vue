<template>
	<div>
		<div class="zhihu-header cfix" :class="{bg222: dayOrNi}">
			<div style="float: left;">
				<i class="iconfont" @click="showSideBar">&#xe60e;</i>
				<span style="margin-left: 20px;color: #fff;">{{ title }}</span>
			</div>
			<div style="float: right;">
				<i class="iconfont alarm-icon">&#xe7a3;</i>
				<i class="iconfont more-icon" @click.stop="showSetting">&#xe615;</i>
			</div>
			<div class="set" v-show="setting">
				<span class="set-item" @click="setPattern">{{ dayOrNiText }}</span>
				<span class="set-item" @click.stop="">设置选项</span>
			</div>
		</div>
		<div style="height: 50px;"></div>
	</div>
</template>

<script>
	export default {
		name: 'zhihuHeader',
		props: ['title'],
		data () {
			return {
				sideBarState: false,
				setting: false,
				dayOrNiText: '夜间模式'
			}
		},
		methods: {
			showSideBar () {
				this.$store.commit('switchSideBar');
			},
			showSetting () {
				this.setting = true;
			},
			setPattern () {
				this.$store.commit('switchPattern');
				if (this.dayOrNi) {
					this.dayOrNiText = '日间模式';
				} else {
					this.dayOrNiText = '夜间模式';
				}
				this.setting = false;
			}
		},
		computed: {
			dayOrNi () {
				return this.$store.state.pattern;
			}
		},
		created () {
			const that = this;
			document.addEventListener('click', function() {
				if (that.setting) {
					that.setting = false;
				}
			});
		}
	}
	
</script>

<style scoped>
	.set {
		line-height: normal;
		width: 150px;
		background-color: #fff;
		position: absolute;
		top: 2px;
		right: 2px;
	}
	
	.set-item {
		box-sizing: border-box;
		display: inline-block;
		width: 100%;
		padding: 10px;
	}
	
	.alarm-icon {
		margin-right: 20px;
		font-size: 18px;
	}
	
	.more-icon {
		font-size: 18px;
	}
</style>