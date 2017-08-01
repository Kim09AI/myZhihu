import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		switchSlideBar: false,
		pattern: false
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
