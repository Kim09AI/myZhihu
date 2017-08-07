<template>
	<div>
		<div :class="['zhihu-header', 'cfix', {bg222: dayOrNi}]">
			<div style="float: left;">
				<i class="iconfont" @click="goBack">&#xe6c9;</i>
			</div>
			<div class="icon-list" style="float: right;">
				<i class="iconfont">&#xe64f;</i>
				<i class="iconfont">&#xe601;</i>
				<span @click="goComments(comments)">
					<i class="iconfont">&#xe62e;</i>
					<span>{{ comments }}</span>
				</span>
				<span @click="fabulous">
					<i :class="['iconfont', {active: hasFabulous}]">&#xe7d3;</i>
					<span>{{ popularityNum }}</span>
				</span>
			</div>
		</div>
		<div class="tip" v-show="showTip">
			<i class="iconfont">&#xe7d3;</i>
			<span>{{ popularity }} + 1</span>
		</div>
		<div style="height: 50px;"></div>
	</div>
</template>

<script>
	export default {
		name: 'insideHeader',
		props: ['comments', 'popularity'],
		data () {
			return {
				popularityNum: this.popularity,
				hasFabulous: false,
				showTip: false
			}
		},
		methods: {
			goBack () {
				this.$router.go(-1);
			},
			fabulous () {
				if (this.hasFabulous) {
					this.popularityNum--;
				} else {
					const that = this;
					this.popularityNum++;
					this.showTip = true;
					setTimeout(() => {
						that.showTip = false;
					}, 1500);
				}
				this.hasFabulous = !this.hasFabulous;
			},
			goComments (comments) {
				this.$router.push({path: '/content/' + this.$route.params.id + '/comments', query: {commentsNum: comments}});
			}
		},
		computed: {
			dayOrNi () {
				return this.$store.state.pattern;
			}
		}
	}
	
</script>

<style scoped>
	.icon-list {
		color: #fff;
		font-size: 14px;
	}
	
	.icon-list i{
		margin-left: 20px;
	}
	
	.active {
		color: orange;
	}
	
	.tip {
		background-color: #999;
		border-radius: 15px;
		color: #eee;
		font-size: 14px;
		text-align: center;
		padding: 10px 0;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 70px;
		width: 100px;
		margin: auto;
		
	}
</style>