<template>
	<div v-if="carouselList" class="carousel-box" @touchstart="carouselSlide($event)" @touchmove="carouselSlide($event)" @touchend="carouselSlide($event)">
		<ul class="carousel cfix" :style="[currentPos, movePos, {width: carouselList.length * 100 + 'vw'}]">
			<li v-for="item in carouselList" @click="detailedContent(item.id)">
				<img :src="item.image" alt="" />
				<p>{{ item.title }}</p>
			</li>
		</ul>
		<ul class="circular-list">
			<li v-for="(item, index) in carouselList" :class="{active: index == currentIndex}"></li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'carouselList',
		props: ['carouselList'],
		data () {
			return {
				currentIndex: 0,
		      	currentPos: null,
		      	movePos: null,
		      	isTouch: false,
		      	timeId: '',
		      	startX: 0
			}
		},
		methods: {
			carousel (auto = true) {
				if (auto) {
					if (this.currentIndex == 4) {
						this.currentIndex = 0;
					} else {
						this.currentIndex++;
					}
				}
				this.currentPos = {transform: 'translateX(-' + this.currentIndex * 100 + 'vw)'};
			},
			carouselSlide (event) {
				const that = this;
				switch(event.type){
		            case 'touchstart':
		            	clearInterval(this.timeId);
		                this.startX = event.touches[0].clientX;
		                break;
		            case 'touchmove':
		                event.preventDefault();
		                const moveX = event.touches[0].clientX - this.startX;
		                if ((this.currentIndex == 0 && moveX > 0) || (this.currentIndex == (this.carouselList.length - 1) && moveX < 0)) return ;
		                this.movePos = {'margin-left': moveX + 'px'};
		                break;
		            case 'touchend':
		                if (event.changedTouches[0].clientX - this.startX >= 50) {
		                	if (this.currentIndex == 0) return ;
		                	this.currentIndex--;
		                } else if (event.changedTouches[0].clientX - this.startX <= -50) {
		                	if (this.currentIndex == this.carouselList.length - 1) return ;
		                	this.currentIndex++;
		                }
		                this.carousel(false);
		                
		                this.movePos = null;
		                
		                this.timeId = setInterval(function() {
					  		that.carousel();
					  	}, 3000);
		                break;
		        }
			},
			detailedContent (id) {
				this.$router.push('/content/' + id);
			}
		},
		created () {
			const that = this;
			this.timeId = setInterval(function() {
		  		that.carousel();
		  	}, 3000);
		  	
		}
	}
</script>

<style scoped>
	.carousel-box {
		width: 100%;
		height: 180px;
		position: relative;
		overflow: hidden;
	}
	
	.carousel {
		width: 100%;
		height: 100%;
		transition: all 0.6s;
	}
	
	.carousel li {
		background-color: #ccc;
		float: left;
		width: 100vw;
		height: 100%;
		position: relative;
	}
	
	.carousel p{
	    bottom: 20px;
		color: #fff;
		font-size: 18px;
		position: absolute;
	    padding: 0 20px;
	    width: 100vw;
	}
	
	.carousel img {
		width: 100%;
	}
	
	.circular-list {
		width: 100%;
		position: absolute;
		top: 150px;
		text-align: center;
	}
	
	.circular-list li {
		border-radius: 50%;
		background-color: #999;
		display: inline-block;
		width: 5px;
		height: 5px;
		margin: 0 5px;
	}
	
	.active {
		background-color: #fff !important;
	}
	
</style>