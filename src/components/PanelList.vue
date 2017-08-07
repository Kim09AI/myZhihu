<template>
	<ul>
		<li :class="['panel', {bg40: dayOrNi}]" v-for="item in list" @click="detailedContent(item.id)">
			<p class="panel-text">{{ item.title }}</p>
			<img v-if="!!item.images" :src="item.images && item.images[0]" alt="" class="panel-icon" />
		</li>
	</ul>
</template>

<script>
	export default {
		name: 'panelList',
		props: ['list'],
		data () {
			return {
				
			}
		},
		methods: {
			detailedContent (id) {
				this.$router.push('/content/' + id);
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
	.panel {
		border-radius: 3px;
		border: 1px solid #eee;
		padding: 10px 15px;
		margin-bottom: 10px;
		display: flex;
	}
	
	.panel:last-child {
		margin-bottom: 0;
	}

	.panel-text {
		font-size: 16px;
		flex: 1;
	}
	
	.panel-icon {
		width: 65px;
		height: 55px;
		background-color: #ccc;
		margin-left: 10px;
	}
</style>