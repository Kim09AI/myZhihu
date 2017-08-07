<template>
	<div v-if="extra && content">
		<inside-header :comments="extra.comments" :popularity="extra.popularity"></inside-header>
		
		<img-describe v-if="!!content.image" :src="content.image" :title="content.title" :imgSource="content.image_source"></img-describe>
		
		<link rel="stylesheet" type="text/css" :href="content.css[0]"/>
		<div v-html="content.body" :class="{coverWrapBg: dayOrNi}"></div>
	</div>
</template>

<script>
	import axios from 'axios'
	import InsideHeader from './InsideHeader'
	import ImgDescribe from './ImgDescribe'
	export default {
		name: 'content', 
		data () {
			return {
				content: null,
				extra: null
			}
		},
		components: {
			InsideHeader,
			ImgDescribe
		},
		created () {
			const that = this;
			const id = this.$route.params.id;
			axios.get('https://zhihu-daily.leanapp.cn/api/v1/contents/' + id).
				then(res => {
					that.content = res.data.CONTENTS;
				}).
				catch(err => console.log(err));
				
			axios.get('https://zhihu-daily.leanapp.cn/api/v1/contents/extra/' + id).
				then(res => {
					that.extra = res.data.DES;
				}).
				catch(err => console.log(err));
		},
		computed: {
			dayOrNi () {
				return this.$store.state.pattern;
			}
		}
	}
</script>

<style scoped>
	
	
</style>