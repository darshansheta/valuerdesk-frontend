
import axios from 'axios';
import qs from 'qs';

let mutations = {
    reportsListMutation : (state,reports) => {
        state.reports = reports
        
    },
    reportDetailsMutation : (state,report) => {
        state.report = report
        
    },
    reportUnsetMutation : (state) => {
        state.report = {}
        
    },
    getBranchesMutation : (state,branches) => {
        state.report.branches = branches
        
    },
    updateReportFromListMutation:(state,report) => {
        for (let index in state.reports) {
            if (state.reports[index].id == report.id) {
                state.reports[index].name = report.name
            }
        }
        // state.categories = [
        //      ...state.categories.filter(element => element.id !== id),
        //      category
        //   ]
    },
    removeReportFromListMutation:(state,id) => {
        let shouldBeRemoved = state.reports.find(obj => { return obj.id == id; });
        if (shouldBeRemoved) {
             state.reports.splice(state.reports.indexOf(shouldBeRemoved), 1);
         }
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

    getReportDetailsAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
                    axios({url: '/reports/'+param.id, method: 'GET',
                        params: param,
                        paramsSerializer: function(params) {
                            return qs.stringify(params, {arrayFormat: 'brackets'});
                        }
                    })
                    .then(resp => {
                        commit('reportDetailsMutation', resp.data.data)
                        resolve(resp)

                    }).catch(err => {
                        
                    })
                })
    },
    getReportsListAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: '/reports', method: 'GET'})
            .then(resp => {
                commit('reportsListMutation', resp.data.data)
                resolve(resp)

            }).catch(err => {
                reject(err)
            })
        })
    },
    createReportAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: '/reports', data: param, method: 'POST', headers: {
                'Content-Type': 'multipart/form-data'
            }})
            .then(resp => {
                dispatch('getReportsListAction')
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    deleteReportAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: '/reports/'+param.id, method: 'DELETE'})
            .then(resp => {
                commit('removeReportFromListMutation',param.id)
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    syncReportAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: '/reports/'+param.id+'/sync', method: 'PUT'})
            .then(resp => {
                dispatch('getReportsListAction')
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    updateReportAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: '/reports/'+param.id, data: param, method: 'PUT'})
            .then(resp => {
                commit('updateReportFromListMutation',resp.data.data)
                //dispatch('getReportsListAction')
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    getReportElementsAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: '/reports/'+param.id+'/elements', data: param, method: 'GET'})
            .then(resp => {
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    updateReportElementsAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: '/reports/'+param.id+'/elements', data: param, method: 'PUT'})
            .then(resp => {
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    updateReportFormAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: '/reports/'+param.id+'/form', data: param, method: 'PUT'})
            .then(resp => {
                dispatch('getReportsListAction',{id:param.id,form:1})
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export default {
    namespaced: true,
    state: {
        reports: [],
        report:{},
        elements:[]
    },
    getters: {
        allReportsGetter : state => state.reports,
        filterReportsByName: function filterReportsByName(state) {
        return function (name) {
          return state.reports.filter(function (report) {
            return (name) ? report.name.toLowerCase().indexOf(name.toLowerCase())!= -1 : true;
          });
        };
      },
      reportDetailsGetter: (state) => {
        return JSON.parse(JSON.stringify(state.report));
    }
    },
    actions,
    mutations
}