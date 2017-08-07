<template>
	<ul>
		<li v-for="comment in commentsList" class="comments-list">
			<div class="comments-img">
				<img :src="comment.avatar" alt="" />
			</div>
			<div class="comments-content">
				<p class="cfix author-info">
					<span class="author">{{ comment.author }}</span>
					<span class="likes"><i class="iconfont likes-icon">&#xe646;</i>{{ comment.likes }}</span>
				</p>
				<p class="content">{{ comment.content }}</p>
				<p class="time">{{ comment.time | format}}</p>
			</div>
		</li>
	</ul>
</template>

<script>
	// 时间格式转换
	const checkTime = time => {
		return String(time).length == 1 ? '0' + time : time;
	};
	
	export default {
		name: 'commentsList',
		props: ['commentsList'],
		data () {
			return {
				
			}
		},
		filters: {
			format (value) {
				const time = new Date(value * 1000);
				const month = checkTime(time.getMonth() + 1);
				const day = checkTime(time.getDate());
				const hours = checkTime(time.getHours());
				const min = checkTime(time.getMinutes());
				return month + '-' + day + ' ' + hours + ':' + min;
			}
		}
	}
</script>

<style scoped>
	.comments-list {
		border-bottom: 1px solid #ddd;
		display: flex;
		padding: 10px;
	}
	
	.comments-img {
		width: 30px;
		height: 30px;
		margin-right: 5px;
	}
	
	.comments-img img{
		border-radius: 50%;
		width: 100%;
	}
	
	.comments-content {
		flex: 1;
	}
	
	.author-info {
		margin-bottom: 5px;
	}
	
	.author {
		font-weight: bold;
		font-size: 14px;
	}
	
	.nigth .author {
		color: #ccc;
	}
	
	.content {
		color: #333;
		font-size: 14px;
		margin-bottom: 10px;
	}
	
	.nigth .content {
		color: #aaa;
	}
	
	.likes {
		color: #999;
		font-size: 14px;
		float: right;
	}
	
	.likes-icon {
		color: #999;
		font-size: 14px;
		margin-right: 5px;
	}
	
	.nigth .likes,.likes-icon  {
		color: #ccc;
	}
	
	.time {
		color: #999;
		font-size: 12px;
	}
	
	.nigth .time {
		color: #ccc;
	}
	
</style>