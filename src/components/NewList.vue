<template>
	<div :class="['new-container', {bg32: dayOrNi}]">
		<p class="title">{{ newList.date | format(index)}}</p>
		<panel-list :list="newList.stories"></panel-list>
	</div>
</template>

<script>
	import PanelList from './PanelList'
	export default {
		name: 'newList',
		props: ['newList', 'index'],
		data () {
			return {
				a: 'sdsd'
			}
		},
		components: {
			PanelList
		},
		filters: {
			format (value, index) {
				if (index == 0) return '今日热闻';
				const dayArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
				const year = value.slice(0, 4);
				const mon = value.slice(4, 6);
				const day = value.slice(6);
				const num = (new Date(year, mon - 1, day)).getDay();
				return mon + '月' + day + '日 ' + dayArr[num];
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
	.new-container {
		padding: 10px 5px 0 5px;
	}
	
	.title {
		color: #999;
		font-size: 12px;
		margin-bottom: 10px;
		padding-left: 5px;
	}
</style>