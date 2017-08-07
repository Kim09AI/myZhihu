<template>
	<div>
		<transition name="slide">
			<div class="side-bar-body" v-show="sideBarStatus">
				<div :class="['header', 'cfix', {bg222: dayOrNi}]">
					<div style="font-size: 14px;margin-bottom: 20px;padding-top: 10px;">
						<span class="avatar"></span>
						<span style="margin-left: 10px;vertical-align: middle;">请登录</span>
					</div>
					<div style="width: 50%;float: left;">
						<i class="iconfont" style="margin-left: 20px;font-size: 14px;">&#xe601;</i>
						<span style="margin-left: 15px;font-size: 14px;">我的收藏</span>
					</div>
					<div style="width: 50%;float: left;">
						<i class="iconfont" style="margin-left: 20px;font-size: 14px;">&#xe622;</i>
						<span style="margin-left: 15px;font-size: 14px;">离线下载</span>
					</div>
				</div>
				<ul :class="['side-bar-list', {bg32: dayOrNi}]">
					<li @click="turnThemes()" :class="{active: !activeId}">
						<i class="iconfont" style="color: #00A2EA;margin-left: 5px;">&#xe617;</i>
						<span style="color: #00A2EA;">首页</span>
					</li>
					<li v-for="list in sideBarList" @click="turnThemes(list.id)" :class="{active: list.id == activeId}">
						<span>{{ list.name }}</span>
						<i class="iconfont" style="float: right;color: #ccc;margin-right: 20px;">&#xe61e;</i>
					</li>
				</ul>
			</div>
		</transition>
		<transition name="fade">
			<div class="side-bar-cover" @click="closeSideBar" v-show="sideBarStatus"></div>
		</transition>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		name: 'sideBar',
		data () {
			return {
				sideBarList: null,
				activeId: this.$route.params.id || ''
			}
		},
		methods: {
			turnThemes (id) {
				this.closeSideBar();
				if (!id) {
					this.$router.push('/');
					this.activeId = '';
				} else {
					this.$router.push('/themes/' + id);
					this.activeId = id;
				}
			},
			closeSideBar () {
				this.$store.commit('switchSideBar');
			}
		},
		computed: {
			sideBarStatus () {
				return this.$store.state.switchSlideBar
			},
			dayOrNi () {
				return this.$store.state.pattern;
			}
		},
		created () {
			const that = this;
		  	axios.get('https://zhihu-daily.leanapp.cn/api/v1/themes').
		  		then(res => {
		  			const result = JSON.parse(res.request.responseText);
		  			that.sideBarList = result.THEMES.others;
		  		}).
		  		catch(err => console.log(err));
		}
	}
	
</script>

<style scoped>
	.side-bar-body {
		position: fixed;
		top: 0;
		left: 0;
		background-color: #fff;
		width: 270px;
		height: 100%;
		overflow: scroll;
		z-index: 4;
	}
	
	.side-bar-cover {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(100, 100, 100, 0.5);
		z-index: 3;
	}
	
	.slide-enter-active, .slide-leave-active {
	    transition: all .5s
	}
	
	.slide-enter, .slide-leave-to {
		transform: translateX(-270px);
	}
	
	.fade-enter-active, .fade-leave-active {
	    transition: all .6s
	}
	
	.fade-enter, .fade-leave-to {
		opacity: 0.5;
	}
	
	.header {
		background-color: #00A2EA;
		color: #fff;
		width: 100%;
		height: 90px;
		font-size: 16px;
	}
	
	.avatar {
		border-radius: 50%;
		background-color: #ccc;
		display: inline-block;
		width: 30px;
		height: 30px;
		margin-left: 15px;
		vertical-align: middle;
	}
	
	.side-bar-list {
		color: #666;
		font-size: 16px;
	}
	
	.side-bar-list .seleted {
		background-color: #999999;
	}
	
	.side-bar-list li{
		padding: 10px 15px;
	}
	
	.bg32 .active{
		background-color: #232323;
	}
	
	.active {
		background-color: #efefef;
	}
	
</style>