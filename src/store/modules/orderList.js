
import Vue from 'vue'

const state = {
	orderList : [] ,
	params : {}
}

const getters = {
	getOrderList : state => state.orderList
}

const actions = {
	fecthOrderList : ({commit,state}) => {
		Vue.http.post('/api/getOrderList',state.params)
		.then((res)=>{
			commit('updateOrderList',res.data.list)
		},(err)=>{
			console.log('err...',err)
		})
	}
}

const mutations = {
	updateOrderList : (state,playod) => {
		console.log('playod...',playod);
		state.orderList = playod
	},
	updateParams : (state,{key,val}) => {
		state.params[key] = val 
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}