import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import SideBar from '@/components/SideBar'
import Content from '@/components/Content'
import Themes from '@/components/Themes'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      components: {
      	default: Index,
      	sideBar: SideBar
      }
    },
    {
    	path: '/content/:id',
    	name: 'content',
    	component: Content
    },
    {
    	path: '/themes/:id',
    	name: 'themes',
    	components: {
    		default: Themes,
    		sideBar: SideBar
    	}
    }
  ]
})
