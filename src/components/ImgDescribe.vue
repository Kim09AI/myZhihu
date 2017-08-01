<template>
	<div class="img-box">
		<img :src="src" alt="" class="thumbnail" />
		<p class="title">{{ title }}</p>
		<span class="source">{{ imgSource }}</span>
	</div>
</template>

<script>
	export default {
		name: 'imgDescribe',
		props: ['src', 'title', 'imgSource'],
		data () {
			return {
				
			}
		}
	}
</script>

<style scoped>
	.img-box {
		width: 100%;
		height: 200px;
		overflow: hidden;
		position: absolute;
		top: 50px;
		left: 0;
		background-color: #ddd;
	}
	
	.thumbnail {
		width: 100%;
		transform: translateY(-20%);
	}
	
	.title {
		color: #fff;
		font-size: 18px;
		position: absolute;
		bottom: 25px;
		width: 100%;
		padding: 0 10px;
		margin: 0 !important;
	}
	
	.source {
		color: #999;
		font-size: 12px;
		position: absolute;
		bottom: 10px;
		width: 100%;
		padding: 0 10px;
		text-align: right;
	}
</style>