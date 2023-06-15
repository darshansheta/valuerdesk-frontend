
import axios from 'axios';
import qs from 'qs';
import states from '@/utils/states';

let mutations = {
    getPlaceholdersMutation: (state,placeholders) => {
        state.placeholders = placeholders
    },
    requestStatusMutation: (state,status) => {
        state.requestStatus = status;
    }
}

let actions = {
    getAllPlaceholdersAction:({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: `placeholders`, method: 'GET'})
            .then(resp => {
                 commit('getPlaceholdersMutation',resp.data)
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    createNoteAction:({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: `notes`, data:param, method: 'POST'})
            .then(resp => {
                 //dispatch('getNotesAction',{notableType:param.notableType,notableId:param.notableId})
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    updateNoteAction:({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: `notes/${param.id}`, data:param, method: 'PUT'})
            .then(resp => {
                 //dispatch('getNotesAction',{notableType:param.notableType,notableId:param.notableId})
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    deleteNoteAction:({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: `notes/${param.id}`, data:param, method: 'DELETE'})
            .then(resp => {
                 //dispatch('getNotesAction',{notableType:param.notableType,notableId:param.notableId})
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    getNotesAction:({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: `notes`, params:param, method: 'GET'})
            .then(resp => {
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    setRequestStatusAction:({commit,dispatch,state},param) => {
        commit('requestStatusMutation',param.status)
    }
};

export default {
    namespaced: true,
    state: {
        states: [],
        report:{},
        placeholders:[],
        requestStatus: ''
    },
    getters: {
        states : state => state.states,
        placeholdersGetters : state => state.placeholders,
        requestStatusGetters : state => state.requestStatus
    },
    actions,
    mutations
}