import PartnerService from '../../../services/Partner'
import OrderService from '../../../services/Order'
//import { uid, Notify } from 'quasar'
import { Loading } from 'quasar'

const state = {
    partnerData:[],
    orderData:[],
    listData:[],
    tblColumns:[
        {
            name: 'product',
            required: true,
            label: 'Product',
            align: 'left',
            field: row => row.product,
            format: val => `${val}`,
            sortable: true
        },
        { name: 'code', align: 'center', label: 'Code', field: 'code', sortable: true },
        { name: 'total', align: 'center', label: 'Total qty', field: 'total', sortable: true }
    ],
}

const mutations = {
    getPartners(state, partners){
        state.partnerData = partners;
    },
    
    getOrders(state, orders){
        state.orderData = orders;
    }
    
}

const actions = {
    async getInitData({ commit }){
        let partners = await PartnerService.getPartners();
        let orders = await OrderService.getOrders();

        commit('getPartners', partners)
        commit('getOrders', orders)

        Loading.hide();
    }
    
}

const getters = {
    getOrderData(state){
        let orderIndex = 0;
        let tableOrderData = [];

        state.orderData.forEach(order => {
            tableOrderData[orderIndex] = { date: order.date , data: order.data}
            orderIndex++;
        });

        return tableOrderData
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}