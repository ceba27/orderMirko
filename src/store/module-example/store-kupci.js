import Vue from 'vue'
import PartnerService from '../../../services/Partner'
//import { uid, Notify } from 'quasar'
import { Loading, QSpinnerGears} from 'quasar'

const state = {
    showAllPartners: false,
    partners: [],
    showDialogInsert: false,
}

const mutations = {
    async getdbPartners(state, partTest){
        let partIndex = 0;
        state.partners = partTest;
    },

    setShowAllPartners(state, value){
        state.showAllPartners = value;
    },

    setShowDialogInsert(state, value){
        state.showDialogInsert = value;
    },
    
    DialogEdit(state, payload){
        Object.assign(state.partners[payload.id], payload.updates);
    },
}

const actions = {
    async getdbPartners({commit}){
        try {
            Loading.show()
            let partTest = await PartnerService.getPartners();
            commit('getdbPartners', partTest);

            Loading.hide()

         } catch (err) {
           this.error = err.message;
           Loading.hide()
         }

    },

    setShowDialogInsert({commit}, value){
        commit('setShowDialogInsert', value)
    },

    async insertPartner({ commit ,dispatch }, newPartner){
        await PartnerService.insertPartner(newPartner);

        dispatch('getdbPartners');
    },

    async updatePartner({ commit, dispatch }, payload){
        try {
            Loading.show()
            await PartnerService.updatePartner(payload);
            Loading.hide()

            commit('getdbPartners', partTest);
         } catch (err) {
           this.error = err.message;
         }

        dispatch('getdbPartners');
    },

    setShowAllPartners({commit}, value){
        commit('setShowAllPartners', value);
    },
}

const getters = {
    partnerActive: (state) => {
        let partIndex = 0;
        let activePartners = [];

        state.partners.forEach(element => {
            if (element.active) {
                activePartners[partIndex] = element;
                partIndex++;
            };
        });
        
        return activePartners;
    },

    partnersFiltered: (state, getters) => {
        let partnersFiltered = getters.partnerActive
        
        if (!state.showAllPartners) {
            return partnersFiltered
        }

        return state.partners
    },

    getPartners: (state, getters) => {
        let partnersFiltered = getters.partnersFiltered
        return partnersFiltered;
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}