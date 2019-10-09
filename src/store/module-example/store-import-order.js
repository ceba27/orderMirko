import Vue from 'vue'
import PartnerService from '../../../services/Partner'
import OrderService from '../../../services/Order'
//import { uid, Notify } from 'quasar'
import { Loading } from 'quasar'

const state = {
    importDate: new Date().toJSON().slice(0, 10),
    excelData: { header: null, results: null },
    partnerId: null,
    optionsPartner: [],
}

const mutations = {
    async getdbPartners(state, partTest){
        let partIndex = 0;
        let activePartners = [];

        partTest.forEach(element => {
            if (element.active) {
                activePartners[partIndex] = {value: element._id, label: element.name};
                partIndex++;
            };
        });
        
        state.optionsPartner = activePartners;
    },

    setInitValues(state){
        state.importDate = new Date().toJSON().slice(0, 10);
        state.excelData = { header: null, results: null };
        state.partnerId = null;
    },

    setImportDate(state, value){
        state.importDate = value;
    },

    setExcelData(state, payload){
        state.excelData = payload;
    },

    setPartnerId(state, id){
        state.partnerId = id;
    },

    setOptionsPartner(state, payload){
        state.optionsPartner = payload;
    },
}

const actions = {
    async getdbPartners({commit}){
        try {
            let partTest = await PartnerService.getPartners();
            commit('getdbPartners', partTest);
            Loading.hide();

         } catch (err) {
           this.error = err.message;
           Loading.hide()
         }

    },

    setOptionsPartner({commit}, payload){
        commit('setOptionsPartner', payload)
    },

    setInitValues({commit}){
        commit('setInitValues')
    },

    setImportDate({commit}, value){
        commit('setImportDate', value)
    },

    setExcelData({commit}, payload){
        commit('setExcelData', payload)
    },

    setPartnerId({commit}, id){
        commit('setPartnerId', id)
    },

    async saveImportData({commit}, payload){
        try {
            await OrderService.insertOrder(payload);

        } catch (err) {
            console.log('error');
            
            this.error = err.message;
        }
    },
}

const getters = {
    importDate(state){
        return state.importDate;
    },

    excelData(state){
        return state.excelData;
    },

    partnerId(state){
        return state.partnerId;
    },

    optionsPartner(state){
        return state.optionsPartner;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}