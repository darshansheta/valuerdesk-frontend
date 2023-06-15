
import axios from 'axios';
import qs from 'qs';
import _ from 'lodash';

let mutations = {
    ordersListMutation : (state,orders) => {
        state.orders = orders
        
    },
    orderDetailsMutation : (state,order) => {
        state.order = order
        
    },
    setClientUserAndReportsMutation : (state,data) => {
        state.users = data.users;
        state.reports = data.reports;
    },
    setOrderFormMetaMutation : (state,data) => {
        state.settings = data.settings;
    },
    orderUnsetMutation : (state) => {
        state.order = {}
        
    },
    updateOrderFromListMutation:(state,order) => {
        for (let index in state.orders) {
            if (state.orders[index].id == order.id) {
                state.orders[index].name = order.name
            }
        }
    },
    removeOrderFromListMutation:(state,id) => {
        let shouldBeRemoved = state.orders.find(obj => { return obj.id == id; });
        if (shouldBeRemoved) {
             state.orders.splice(state.orders.indexOf(shouldBeRemoved), 1);
         }
    },
    staffForAssignmentMutation : (state,assignees) => {
        state.assignees = assignees
        
    },
    setReportElementsMutation : (state,elements) => {
        state.elements = elements
        
    },
    setReportDataMutation : (state,reportData) => {
        state.reportData = {...reportData}
        
    },
    setReportBodyMutation : (state,report) => {
        if (Array.isArray(report.form)) {
            report.form = {};
            console.log(report.form)
        }
        state.report = report
        
    },
    setOrderNotificationsMutation : (state,notifications) => {
        state.notifications = notifications
        
    },
    setOrderImagesMutation : (state,images) => {
        state.images = images
        
    },
    setUploadAllowedMutation : (state,uploadAllowed) => {
        state.uploadAllowed = uploadAllowed
        
    },
    setPropertyDetailsMutation : (state,propertyDetails) => {
        state.propertyDetails = propertyDetails
        
    },
    setValuationMutation : (state,valuation) => {
        state.valuation = valuation
        
    },
    setPlanDetailsMutation : (state,planDetails) => {
        state.planDetails = planDetails
        
    },
    setLegalAddressMutation : (state,legalAddress) => {
        state.legalAddress = legalAddress
        
    },
    showCreateFormMutation : (state,show) => {
        state.showCreateForm = show;
        
    },
}


function jsonToQueryString(json) {
    return '?' + 
        Object.keys(json).map(function(key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
}

let actions = {

    getOrderDetailsAction: ({commit, dispatch,state}, param) => {
        dispatch('common/setRequestStatusAction',{status:'loading'},{root:true})
        if(typeof param.withoutReset !== 'undefined', param.withoutReset == true) {
            commit('orderDetailsMutation', {})
            commit('showCreateFormMutation', false)
        }
        return new Promise((resolve, reject) => { 
                    axios({url: '/orders/'+param.id, method: 'GET'})
                    .then(resp => {
                        commit('orderDetailsMutation', resp.data.data)
                        resolve(resp)

                    }).catch(err => {
                        
                    })
                })
    },
    getOrdersListAction ({commit, dispatch,state}, param) {
        if (typeof this._source != typeof undefined) {
            this._source.cancel('Operation cancelled due to new request.')
        }

        this._source = axios.CancelToken.source();
        
        return new Promise((resolve, reject) => { 
            axios({
                url: '/orders',
                method: 'GET',
                params: param,
                cancelToken: this._source.token,
                paramsSerializer: function(params) {
                    return qs.stringify(params, {arrayFormat: 'brackets'});
                }
            })
            .then(resp => {
                if (resp) {
                    commit('ordersListMutation', resp.data.data)
                }
                resolve(resp)

            }).catch(err => {
                if(axios.isCancel(err)) {

                } else {
                    reject(err)
                }
            })
        })
    },
    createOrderAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: '/orders', data: param, method: 'POST'})
            .then(resp => {
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    deleteOrderAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: '/orders/'+param.id, method: 'DELETE'})
            .then(resp => {
                commit('removeOrderFromListMutation',param.id)
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    updateOrderAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: '/orders/'+param.id, data: param.order, method: 'PUT'})
            .then(resp => {
                dispatch('getOrderDetailsAction',{id:param.id})
                //dispatch('getOrdersListAction')
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    getClientUserAndReportsAction: ({commit, dispatch,state}, param) => {
        if (!param.clientId) {
            return commit('setClientUserAndReportsMutation',{users:[], reports:[]})
        }
        return new Promise((resolve, reject) => { 
            axios({url: '/orders/client/'+param.clientId, method: 'GET'})
            .then(resp => {
                commit('setClientUserAndReportsMutation',resp.data.data)
                //dispatch('getOrdersListAction')
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    getOrderFormMetaAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: '/orders/meta', method: 'GET'})
            .then(resp => {
                commit('setOrderFormMetaMutation',resp.data.data)
                //dispatch('getOrdersListAction')
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    getStaffForAssignmentAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: '/staff/assignees', method: 'GET'})
            .then(resp => {
                commit('staffForAssignmentMutation',resp.data.data)
                //dispatch('getOrdersListAction')
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    assignOrderAction:({commit, dispatch, state},param) => {
        return new Promise((resolve,reject) => {
            axios({url: `/orders/${param.id}/assign`, data: param, method: 'POST'})
            .then(resp => {
                dispatch('getOrderDetailsAction',{id:param.id})
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    scheduleOrderAction:({commit, dispatch, state},param) => {
        return new Promise((resolve,reject) => {
            axios({url: `/orders/${param.id}/schedule`, data: param, method: 'POST'})
            .then(resp => {
                dispatch('getOrderDetailsAction',{id:param.id})
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    syncReportElementsAction:({commit, dispatch, state},param) => {
        return new Promise((resolve,reject) => {
            axios({url: `/orders/${param.id}/report/${param.reportId}`, data: param, method: 'POST'})
            .then(resp => {
                // dispatch('getOrderDetailsAction',{id:param.id})
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    getReportElementsAction:({commit, dispatch, state},param) => {
        return new Promise((resolve,reject) => {
            axios({url: `/orders/${param.id}/report/${param.reportId}`, method: 'GET'})
            .then(resp => {
                commit('setReportElementsMutation',resp.data.elements)
                commit('setReportDataMutation',resp.data.reportData)
                commit('setReportBodyMutation',resp.data.report)
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    updateAppraisedValueAction:({commit, dispatch, state},param) => {
        return new Promise((resolve,reject) => {
            axios({url: `/orders/${param.id}/appraised-value`, data: param, method: 'POST'})
            .then(resp => {
                dispatch('getOrderDetailsAction',{id:param.id})
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    generateReportAction:({commit, dispatch, state},param) => {
        return new Promise((resolve,reject) => {
            axios({url: `/orders/${param.id}/report/${param.reportId}/generate`, data: param, method: 'POST'})
            .then(resp => {
                // dispatch('getOrderDetailsAction',{id:param.id, withoutReset:true})
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    getReportDocumentAction:({commit, dispatch, state},param) => {
        return new Promise((resolve,reject) => {
            axios({url: `/orders/${param.id}/report/${param.reportId}/document`, data: param, method: 'GET'})
            .then(resp => {
                //dispatch('getOrderDetailsAction',{id:param.id})
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    getOrderNotificationsAction:({commit, dispatch, state},param) => {
        return new Promise((resolve,reject) => {
            axios({url: `/orders/${param.id}/notifications`, data: param, method: 'GET'})
            .then(resp => {
                commit('setOrderNotificationsMutation',resp.data.data)
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    getOrderImagesAction:({commit, dispatch, state},param) => {
        return new Promise((resolve,reject) => {
            axios({url: `/orders/${param.id}/documents/images`, data: param, method: 'GET'})
            .then(resp => {
                commit('setOrderImagesMutation',resp.data.images)
                commit('setUploadAllowedMutation',resp.data.uploadAllowed)
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    updatePropertyTypeAction:({commit, dispatch, state},param) => {
        return new Promise((resolve,reject) => {
            axios({url: `/orders/${param.id}/documents/images/${param.propertyImageId}/update-type`, data: param, method: 'PUT'})
            .then(resp => {
                dispatch('getOrderImagesAction',{id:param.id})
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    deleteOrderImageAction:({commit, dispatch, state},param) => {
        return new Promise((resolve,reject) => {
            axios({url: `/orders/${param.id}/documents/images/${param.propertyImageId}`, data: param, method: 'DELETE'})
            .then(resp => {
                dispatch('getOrderImagesAction',{id:param.id})
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    completeOrderAction:({commit, dispatch, state},param) => {
        return new Promise((resolve,reject) => {
            axios({url: `/orders/${param.id}/complete`, data: param, method: 'POST'})
            .then(resp => {
                dispatch('getOrderDetailsAction',{id:param.id})
                dispatch('getOrderNotificationsAction',{id:param.id})
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    onHoldOrderAction:({commit, dispatch, state},param) => {
        return new Promise((resolve,reject) => {
            axios({url: `/orders/${param.id}/onhold`, data: param, method: 'POST'})
            .then(resp => {
                dispatch('getOrderDetailsAction',{id:param.id})
                dispatch('getOrderNotificationsAction',{id:param.id})
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    resumeOrderAction:({commit, dispatch, state},param) => {
        return new Promise((resolve,reject) => {
            axios({url: `/orders/${param.id}/resume`, data: param, method: 'POST'})
            .then(resp => {
                dispatch('getOrderDetailsAction',{id:param.id})
                dispatch('getOrderNotificationsAction',{id:param.id})
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    resetOrderAction:({commit, dispatch, state},param) => {
        return new Promise((resolve,reject) => {
            axios({url: `/orders/${param.id}/reset`, data: param, method: 'POST'})
            .then(resp => {
                dispatch('getOrderDetailsAction',{id:param.id})
                dispatch('getOrderNotificationsAction',{id:param.id})
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    cancelOrderAction:({commit, dispatch, state},param) => {
        return new Promise((resolve,reject) => {
            axios({url: `/orders/${param.id}/cancel`, data: param, method: 'POST'})
            .then(resp => {
                dispatch('getOrderDetailsAction',{id:param.id})
                dispatch('getOrderNotificationsAction',{id:param.id})
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    getPropertyDetailsAction:({commit, dispatch, state},param) => {
        return new Promise((resolve,reject) => {

            // if (!_.isEmpty(state.propertyDetails) && !!param.force == false ) {
            //     return resolve({});
            // }

            axios({url: `/orders/${param.id}/property-details`, data: param, method: 'GET'})
            .then(resp => {
                commit('setPropertyDetailsMutation',resp.data.data)
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    savePropertyDetailsAction:({commit, dispatch, state},param) => {
        return new Promise((resolve,reject) => {
            axios({url: `/orders/${param.id}/property-details`, data: param, method: 'POST'})
            .then(resp => {
                dispatch('getPropertyDetailsAction',{id:param.id,force:true})
                dispatch('getValuationAction',{id:param.id,force:true})
                dispatch('getPlanDetailsAction',{id:param.id})
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    getValuationAction:({commit, dispatch, state},param) => {
        return new Promise((resolve,reject) => {

            // if (!_.isEmpty(state.propertyDetails) && !!param.force == false ) {
            //     return resolve({});
            // }

            axios({url: `/orders/${param.id}/valuations`, data: param, method: 'GET'})
            .then(resp => {
                commit('setValuationMutation',resp.data.data)
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    saveValuationAction:({commit, dispatch, state},param) => {
        return new Promise((resolve,reject) => {
            axios({url: `/orders/${param.id}/valuations`, data: param, method: 'POST'})
            .then(resp => {
                dispatch('getValuationAction',{id:param.id,force:true})
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    saveDepreciationAction:({commit, dispatch, state},param) => {
        return new Promise((resolve,reject) => {
            axios({url: `/orders/${param.id}/depreciation`, data: param, method: 'POST'})
            .then(resp => {
                dispatch('getValuationAction',{id:param.id,force:true})
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    saveSelectionAction:({commit, dispatch, state},param) => {
        return new Promise((resolve,reject) => {
            axios({url: `/orders/${param.id}/valuation-selection`, data: param, method: 'POST'})
            .then(resp => {
                dispatch('getPropertyDetailsAction',{id:param.id})
                dispatch('getValuationAction',{id:param.id,force:true})
                dispatch('getPlanDetailsAction',{id:param.id})
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    getPlanDetailsAction:({commit, dispatch, state},param) => {
        return new Promise((resolve,reject) => {
            axios({url: `/orders/${param.id}/plan-details`, data: param, method: 'GET'})
            .then(resp => {
                commit('setPlanDetailsMutation',resp.data)
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    getLegalAddressAction:({commit, dispatch, state},param) => {
        return new Promise((resolve,reject) => {
            axios({url: `/orders/${param.id}/legal-address`, data: param, method: 'GET'})
            .then(resp => {
                commit('setLegalAddressMutation',resp.data.data)
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    saveLegalAddressAction:({commit, dispatch, state},param) => {
        return new Promise((resolve,reject) => {
            axios({url: `/orders/${param.id}/legal-address`, data: param, method: 'POST'})
            .then(resp => {
                dispatch('getLegalAddressAction',{id:param.id})
                dispatch('getPlanDetailsAction',{id:param.id})
                dispatch('getPropertyDetailsAction',{id:param.id})
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    },
    showCreateFormAction:({commit, dispatch, state},param) => {
        return new Promise((resolve,reject) => {
            commit('showCreateFormMutation',param.status)
            resolve(true)
        })
    },
}
export default {
    namespaced: true,
    state: {
        orders: [],
        order:{},
        users:[],
        reports:[],
        assignees:[],
        elements:[],
        reportData:{},
        report: {},
        notifications: [],
        images: [],
        propertyDetails: {},
        valuation: {},
        uploadAllowed: 0,
        legalAddress: {},
        planDetails: {},
        showCreateForm:false
    },
    getters: {
        allOrdersGetter : state => state.orders,
        filterOrdersByName: function filterOrdersByName(state) {
        return function (name) {
          return state.orders.filter(function (order) {
            return (name) ? order.name.toLowerCase().indexOf(name.toLowerCase())!= -1 : true;
          });
        };
      },
        orderDetailsGetter: (state) => {
        return JSON.parse(JSON.stringify(state.order));
        },
        clientUsersGetter: state => state.users,
        clientReportsGetter: state => state.reports,
        assigneesGetter: state => state.assignees,
        reportElementsGetter: state => state.elements,
        reportDataGetter: state => state.reportData,
        reportBodyGetter: state => state.report,
        notificationsGetter: state => state.notifications,
        imagesGetter: state => state.images,
        uploadAllowedGetter: state => state.uploadAllowed,
        valuationGetter: state => state.valuation,
        propertyDetailsGetter: state => state.propertyDetails,
        legalAddressGetter: state => state.legalAddress,
        planDetailsGetter: state => state.planDetails,
        showCreateFormGetter: state => state.showCreateForm,
    },
    actions,
    mutations
}