<template>
	<div v-if="themedes">
		<div>
			<div :class="['zhihu-header', 'cfix', {bg222: dayOrNi}]">
				<div style="float: left;">
					<i class="iconfont" @click="showSideBar">&#xe60e;</i>
					<span style="margin-left: 20px;color: #fff;">{{ themedes.name }}</span>
				</div>
				<div style="float: right;">
					<i class="iconfont" style="font-size: 18px;">&#xe8a1;</i>
				</div>
			</div>
			<div style="height: 50px;"></div>
		</div>
		
		<div class="themes-box">
			<img :src="themedes.image" class="thumbnail"/>
			<p class="desc">{{  themedes.description }}</p>
		</div>
		
		<div :class="['new-container', {bg32: dayOrNi}]">
			<panel-list :list="themedes.stories"></panel-list>
		</div>
	</div>
	
</template>

<script>
	import axios from 'axios'
	import PanelList from './PanelList'
	export default {
		name: 'themes',
		data () {
			return {
				themedes: null
			}
		},
		components: {
			PanelList
		},
		methods: {
			showSideBar () {
				this.$store.commit('switchSideBar');
			},
			getThemes (context) {
				axios.get('https://zhihu-daily.leanapp.cn/api/v1/themes/' + this.$route.params.id).
					then(res => {
						context.themedes = JSON.parse(res.request.response).THEMEDES;
					}).
					catch(err => console.log(err));
			}
		},
		computed: {
			dayOrNi () {
				return this.$store.state.pattern;
			}
		},
		created () {
			this.getThemes(this);
		},
		beforeRouteUpdate (to, from, next) {
			next();
			this.getThemes(this);
			document.body.scrollTop = 0;
		}
	}
</script>

<style scoped>
	.new-container {
		padding: 10px 5px 0 5px;
	}
	
	.themes-box {
		position: relative;
		background-color: #CCCCCC;
		height: 200px;
		overflow: hidden;
	}
	
	.thumbnail {
		height: 200px;
	}
	
	.desc {
		color: #fff;
		font-size: 16px;
		position: absolute;
		bottom: 25px;
		width: 100%;
		padding: 0 10px;
		margin: 0 !important;
	}
</style>