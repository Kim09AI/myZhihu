<template>
	<div>
		<zhihu-header :title="title"></zhihu-header>
		
		<carousel-list :carouselList="carouselList"></carousel-list>
		
		<new-list v-for="(list, index) in allNewList" :newList="list" :index="index" :key="list.date"></new-list>
	</div>
</template>

<script>
	import ZhihuHeader from './ZhihuHeader'
	import axios from 'axios'
	import NewList from './NewList'
	import CarouselList from './CarouselList'
	export default {
	  name: 'index',
	  data () {
	    return {
	      title: '首页',
	      allNewList: [],
	      nextTime: '',
	      carouselList: null
	    }
	  },
	  components: {
	  	ZhihuHeader,
	  	NewList,
	  	CarouselList
	  },
	  methods: {
	  	getStories () {
	  		const that = this;
	  		const url = that.nextTime ? ('https://zhihu-daily.leanapp.cn/api/v1/before-stories/' + that.nextTime) :
	  			'https://zhihu-daily.leanapp.cn/api/v1/last-stories';
	  		axios.get(url).
	  		then(res => {
	  			const result = res.data.STORIES
	  			that.nextTime = result.date;
	  			that.allNewList.push(result);
	  			if (!that.carouselList) {
	  				that.carouselList = result.top_stories;
	  			}
	  		}).
	  		catch(err => console.log(err));
	  	}
	  },
	  created () {
	  	const that = this;
	  	
	  	this.getStories();
	  	
	  	window.onscroll = function() {
	  		const winH = window.innerHeight;
	  		const docH = document.body.offsetHeight;
	  		const scrollH = document.body.scrollTop;
	  		
	  		if (winH + scrollH == docH) {
	  			that.getStories();
	  		}
	  	};
	  }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	
</style>
