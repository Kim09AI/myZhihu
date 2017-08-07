<template>
	<div>
		<div :class="['zhihu-header', 'cfix', {bg222: dayOrNi}]">
			<div style="float: left;">
				<i class="iconfont" @click="goBack">&#xe6c9;</i>
				<span style="margin-left: 20px;color: #fff;">{{ comnentsNum }}条评论</span>
			</div>
			<div class="icon-list" style="float: right;">
				<i class="iconfont">&#xe648;</i>
			</div>
		</div>
		<div style="height: 50px;"></div>
		
		<div :class="{bg555: dayOrNi, 'nigth': dayOrNi}">
			<div v-if="longComments">
				<p class="num">{{ longCommentsNum }}条长评</p>
				<comments-list :commentsList="longComments"></comments-list>
			</div>
			
			<div>
				<p class="num" @click="getShortComments">{{ comnentsNum - longCommentsNum }}条短评</p>
				<comments-list v-show="show" :commentsList="shortComments"></comments-list>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import CommentsList from './CommentsList'
	export default {
		name: 'comments',
		data () {
			return {
				longComments: null,
				shortComments: null,
				comnentsNum: this.$route.query.commentsNum || 0,
				show: false
			}
		},
		methods: {
			goBack () {
				this.$router.go(-1);
			},
			getShortComments () {
				const that = this;
				this.show = !this.show;
				if (this.shortComments) { // 已经加载过
					return ;
				}
				axios.get('https://zhihu-daily.leanapp.cn/api/v1/contents/' + this.$route.params.id + '/short-comments').
					then(res => {
						that.shortComments = res.data.COMMENTS.comments;
					}).
					catch(err => console.log(err));
			}
		},
		computed: {
			dayOrNi () {
				return this.$store.state.pattern;
			},
			longCommentsNum () {
				return this.longComments && this.longComments.length || 0;
			}
		},
		components: {
			CommentsList
		},
		created () {
			const that = this;
			axios.get('https://zhihu-daily.leanapp.cn/api/v1/contents/' + this.$route.params.id + '/long-comments').
				then(res => {
					that.longComments = res.data.COMMENTS.comments;
				}).
				catch(err => console.log(err));
		}
	}
</script>

<style scoped>
	.num {
		color: #333;
		font-size: 14px;
		padding: 10px;
		border-bottom: 1px solid #ddd;
	}
	
	.nigth .num {
		color: #ccc;
	}
</style>