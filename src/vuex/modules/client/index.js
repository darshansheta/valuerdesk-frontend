
import axios from 'axios';
import qs from 'qs';

let mutations = {
    clientsListMutation : (state,clients) => {
        state.clients = clients
        
    },
    clientDetailsMutation : (state,client) => {
        state.client = client
        
    },
    clientUnsetMutation : (state) => {
        state.client = {}
        
    },
    getBranchesMutation : (state,branches) => {
        state.client.branches = branches
        
    },
    updateClientReportMutation : (state,reports) => {
        state.client.reports = reports;
    }
}


function jsonToQueryString(json) {
    return '?' + 
        Object.keys(json).map(function(key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
}

let actions = {

    getClientDetailsAction: ({commit, dispatch,state}, param) => {
        commit('clientDetailsMutation', {})
        return new Promise((resolve, reject) => { 
                    axios({url: '/clients/'+param.id, method: 'GET'})
                    .then(resp => {
                        commit('clientDetailsMutation', resp.data.data)
                        resolve(resp)

                    }).catch(err => {
                        
                    })
                })
    },
    getClientsListAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: '/clients/list', method: 'GET'})
            .then(resp => {
                commit('clientsListMutation', resp.data.data)
                resolve(resp)

            }).catch(err => {
                reject(err)
            })
        })
    },
    createClientAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: '/clients', data: param, method: 'POST'})
            .then(resp => {
                resolve(resp)

            }).catch(err => {
                reject(err)
            })
        })
    },
    deleteClientAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: '/clients/'+param.id, method: 'DELETE'})
            .then(resp => {
                resolve(resp)
                commit('clientUnsetMutation')
            }).catch(err => {
                reject(err)
            })
        })
    },
    updateClientAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: '/clients/'+param.id, data: param, method: 'PUT'})
            .then(resp => {
                resolve(resp)

            }).catch(err => {
                reject(err)
            })
        })
    },
    updateClientReportAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: '/clients/'+param.clientId+'/reports', data: param, method: 'POST'})
            .then(resp => {
                commit('updateClientReportMutation',resp.data.data)
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    createBranchAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: `/clients/${param.clientId}/branches`, data: param, method: 'POST'})
            .then(resp => {
                resolve(resp)
                dispatch('getBranchesAction',{clientId:param.clientId})
            }).catch(err => {
                reject(err)
            })
        })
    },
    deleteBranchAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: `/clients/${param.clientId}/branches/`+param.id, method: 'DELETE'})
            .then(resp => {
                resolve(resp)
                dispatch('getBranchesAction',{clientId:param.clientId})
            }).catch(err => {
                reject(err)
            })
        })
    },
    updateBranchAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: `/clients/${param.clientId}/branches/`+param.id, data: param, method: 'PUT'})
            .then(resp => {
                resolve(resp)
                dispatch('getBranchesAction',{clientId:param.clientId})
            }).catch(err => {
                reject(err)
            })
        })
    },
    getBranchesAction: ({commit, dispatch,state}, param) => {
        console.log(param)
        return new Promise((resolve, reject) => { 
            axios({url: `/clients/${param.clientId}/branches`, method: 'GET'})
            .then(resp => {
                resolve(resp)
                commit('getBranchesMutation',resp.data.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    getBranchDetailsAction:({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: `/clients/${param.clientId}/branches/${param.id}`, method: 'GET'})
            .then(resp => {
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    createUserAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: `/clients/${param.clientId}/users`, data: param, method: 'POST'})
            .then(resp => {
                resolve(resp)
                dispatch('getBranchesAction',{clientId:param.clientId})
            }).catch(err => {
                reject(err)
            })
        })
    },
    deleteUserAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: `/clients/${param.clientId}/users/`+param.id, method: 'DELETE'})
            .then(resp => {
                resolve(resp)
                dispatch('getBranchesAction',{clientId:param.clientId})
            }).catch(err => {
                reject(err)
            })
        })
    },
    updateUserAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: `/clients/${param.clientId}/users/`+param.id, data: param, method: 'PUT'})
            .then(resp => {
                resolve(resp)
                dispatch('getBranchesAction',{clientId:param.clientId})
            }).catch(err => {
                reject(err)
            })
        })
    },
    getUserDetailsAction:({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: `/clients/${param.clientId}/users/${param.id}`, method: 'GET'})
            .then(resp => {
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
        clients: [],
        client:{}
    },
    getters: {
        allClientsGetter : state => state.clients,
        //allClientsGetter : state => search => state.clients.filter(client => {(search) ? client.name.indexOf(search) != -1 : true;} ),
        filterClientsByName: function filterClientsByName(state) {
        return function (name) {
          return state.clients.filter(function (client) {
            return (name) ? client.name.toLowerCase().indexOf(name.toLowerCase())!= -1 : true;
          });
        };
      },
      clientDetailsGetter: (state) => {
        return JSON.parse(JSON.stringify(state.client));
        /*return (Object.keys(state.client).length) ?
        {
            id: state.client.id,
            name:state.client.name,
            phone:state.client.phone,
            address: {
                address: state.client.address.address,
                landmark:state.client.address.landmark,
                locality:state.client.address.locality,
                pincode: state.client.address.pincode,
                subdistrict: state.client.address.subdistrict,
                district: state.client.address.district,
                state: state.client.address.state,
            },
            branches: _.clone(state.client.branches)
        } : {} ;//state.client*/
    }
    },
    actions,
    mutations
}