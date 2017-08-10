import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		switchSlideBar: false, //侧边栏的状态
		pattern: false // 日夜间模式
	},
	mutations: {
		switchSideBar (state) {
			state.switchSlideBar = !state.switchSlideBar;
		},
		switchPattern (state) {
			state.pattern = !state.pattern;
		}
	}
})
