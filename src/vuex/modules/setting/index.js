
import axios from 'axios';
import qs from 'qs';


let mutations = {
    reportAttributesMuation:(state,attributes) => {
        state.attributes = attributes;
    },
    orgDetailsMuation:(state,org) => {
        state.organization = org;
    },
    generalSettingsMuation:(state,settings) => {
        state.settings = settings;
    },
    integrationSettingsMuation:(state,settings) => {
        state.integration = settings;
    },
    propertyMetaMuation:(state,propertyMeta) => {
        state.propertyMeta = propertyMeta;
    }
}



let actions = {

    createReportAttributeAction ({commit, dispatch,state}, param) {
        
        this._source = axios.CancelToken.source();
        
        return new Promise((resolve, reject) => { 
            axios({
                url: '/settings/report-attributes',
                method: 'POST',
                data: param
            })
            .then(resp => {
                if (resp) {
                    dispatch('getReportAttributesAction')
                }
                resolve(resp)

            }).catch(err => {
                
                    reject(err)
                
            })
        })
    },
    getReportAttributesAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: '/settings/report-attributes', method: 'GET'})
            .then(resp => {
                commit('reportAttributesMuation', resp.data.data)
                resolve(resp)

            }).catch(err => {
                reject(err)
            })
        })
    },
    updateReportAttributeAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: '/settings/report-attributes/'+param.id, data: param, method: 'PUT'})
            .then(resp => {
                dispatch('getReportAttributesAction');
                resolve(resp)

            }).catch(err => {
                reject(err)
            })
        })
    },
    deleteReportAttributeAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: '/settings/report-attributes/'+param.id, method: 'DELETE'})
            .then(resp => {
                dispatch('getReportAttributesAction');
                resolve(resp)

            }).catch(err => {
                reject(err)
            })
        })
    },
    getOrgDetailsAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: '/settings/organization', method: 'GET'})
            .then(resp => {
                commit('orgDetailsMuation', resp.data)
                resolve(resp)

            }).catch(err => {
                reject(err)
            })
        })
    },
    saveOrgDetailsAction: ({commit,dispatch,state},param) => {
        return new Promise((resolve, reject) => { 
            axios({url: '/settings/organization', data: param, method: 'POST'})
            .then(resp => {
                dispatch('getOrgDetailsAction');
                resolve(resp)

            }).catch(err => {
                reject(err)
            })
        })
    },
    getGeneralSettingsAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: '/settings/general', method: 'GET'})
            .then(resp => {
                commit('generalSettingsMuation', resp.data)
                resolve(resp)

            }).catch(err => {
                reject(err)
            })
        })
    },
    getIntegrationSettingsAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: '/settings/integration', method: 'GET'})
            .then(resp => {
                commit('integrationSettingsMuation', resp.data)
                resolve(resp)

            }).catch(err => {
                reject(err)
            })
        })
    },
    updateSettingAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: '/settings/general', method: 'POST', data:param})
            .then(resp => {
                dispatch('getGeneralSettingsAction')
                resolve(resp)

            }).catch(err => {
                reject(err)
            })
        })
    },
    getPropertyMetaAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: 'settings/property-details/meta', method: 'GET'})
            .then(resp => {
                commit('propertyMetaMuation', resp.data)
                resolve(resp)

            }).catch(err => {
                reject(err)
            })
        })
    },
    createPropertyMetaAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: 'settings/property-details/meta', method: 'POST', data:param})
            .then(resp => {
                dispatch('getPropertyMetaAction')
                resolve(resp)

            }).catch(err => {
                reject(err)
            })
        })
    },
    togglePropertyMetaAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: 'settings/property-details/toggle-meta/'+param.id, method: 'POST', data:param})
            .then(resp => {
                dispatch('getPropertyMetaAction')
                resolve(resp)

            }).catch(err => {
                reject(err)
            })
        })
    },
    
}
export default {
    namespaced: true,
    state: {
        attributes:{},
        organization:{},
        settings:{},
        integration:{},
        propertyMeta:{},
    },
    getters: {
        generalSettingsGetter : state => state.settings,
        integrationSettingsGetter : state => state.integration,
        attributesGetter : state => state.attributes,
        organizationGetter : state => state.organization,
        propertyMetaGetter : state => {
            return {...state.propertyMeta}
        }
    },
    actions,
    mutations
}