
import axios from 'axios';
import qs from 'qs';
import _ from 'lodash';


const queues = {
    all:{
        name:'All',
        fa:'fa-plus-square-o',
        count:0,
        data: {},
        countUpdated:true,
        total:0,
        totalFee:0,
        totalPaid:0,
        totalUnPaid:0,
        active:false,
        page:1,
        filters:{},
        orderBy:{
            column:'updated_at',
            order:'DESC'
        }
    },
    paid:{
        name:'Paid',
        fa:'fa-plus-square-o',
        count:0,
        data: {},
        countUpdated:true,
        total:0,
        totalFee:0,
        totalPaid:0,
        totalUnPaid:0,
        active:false,
        page:1,
        filters:{},
        orderBy:{
            column:'updated_at',
            order:'DESC'
        }
    },
    unPaid:{
        name:'Unpaid',
        fa:'fa-plus-square-o',
        count:0,
        data: {},
        countUpdated:true,
        total:0,
        totalFee:0,
        totalPaid:0,
        totalUnPaid:0,
        active:false,
        page:1,
        filters:{},
        orderBy:{
            column:'updated_at',
            order:'DESC'
        }
    },
};

let mutations = {
    queuesCountMutation : (state,counts) => {
        for(let qIndex in counts) {
            state.queues[qIndex].count = counts[qIndex];
            state.queues[qIndex].countUpdated = true;
        }
    },
    queueDataMutation : (state,{queue,resp}) => {
        state.queues[queue].data = resp.data;
        state.queues[queue].totalFee = resp.totalFee;
        state.queues[queue].totalPaid = resp.totalPaid;
        state.queues[queue].totalUnPaid = resp.totalUnPaid;
        state.queues[queue].countUpdated = false;
    },
    setActiveQueueMutation:(state,queue) => {
        for (var arrayIndex in state.queues) {
            state.queues[arrayIndex].active = false;
        }
        state.queues[queue].active = true;
    },
    refreshableQueuesMutation:(state,queues) => {
        
        state.refreshableQueues = _.uniq([...state.refreshableQueues,...queues]);
    },
    resetRefreshableQueuesMutation:(state,queues) => {
        
        state.refreshableQueues = [];
    },
    filtersMutation:(state,{queue,filters,page,sort}) => {
        let changed = [];
        if (page) {
            changed.push('page')
            state.queues[queue].page = page;    
        }
        if (sort) {
            changed.push('sort')
            state.queues[queue].sort = sort;    
        }
        if (filters) {
            changed.push('filters')
            state.queues[queue].filters = filters// NOTE: SUPERB TECHNICH TO PREVNET VUEX MUTATION ERROR{...filters};    
        }
    },
    paymentStatusMutation:(state,paymentStatus) => {
        state.paymentStatus = paymentStatus
    },
    homeOrdersMutation:(state,{due,recent}) => {
        state.homeDueOrders = due;
        state.homeRecentOrders = recent;
    }
}



let actions = {

    filterQueueAction({commit, dispatch,state}, param) {
        if (typeof this._source != typeof undefined) {
            this._source.cancel('Operation cancelled due to new request.')
        }

        this._source = axios.CancelToken.source();
        
        return new Promise((resolve, reject) => {
            param['filters'] = state.queues[param.queue].filters 
            param['sort'] = state.queues[param.queue].sort 
            param['page'] = state.queues[param.queue].page 
            axios({
                url: '/sales/'+param.queue,
                method: 'GET',
                params: param,
                cancelToken: this._source.token,
                paramsSerializer: function(params) {
                    return qs.stringify(params, {arrayFormat: 'brackets'});
                }
            })
            .then(resp => {
                if (resp){
                    if(!param.export) {
                        commit('queueDataMutation', {queue:param.queue,resp:resp})
                    } else {
                        let redirectUrl = `/download?uri=${resp.data.uri}&fileName=${resp.data.fileName}&token=${localStorage.getItem('token')}`;
                        console.log(redirectUrl)
                        window.open(redirectUrl,'_blank') //window.location = redirectUrl
                    }
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
    getQueuesCountAction({commit, dispatch,state}, queues) {
        if (typeof this._sourceCount != typeof undefined) {
            this._sourceCount.cancel('Operation cancelled due to new request.')
        }

        this._sourceCount = axios.CancelToken.source();
        
        return new Promise((resolve, reject) => { 
            axios({
                url: '/sales/counter',
                method: 'GET',
                params: {queues},
                cancelToken: this._sourceCount.token,
                paramsSerializer: function(params) {
                    return qs.stringify(params, {arrayFormat: 'brackets'});
                }
            })
            .then(resp => {
                if (resp) {
                    commit('queuesCountMutation', resp.data)
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
    setActiveQueueAction: ({commit, dispatch,state}, queue) => {
        commit('setActiveQueueMutation',queue)
        if (state.queues[queue].countUpdated) {
            dispatch('filterQueueAction',{queue});
        }
    },
    updateRefreshableQueuesAction: ({commit, dispatch,state}, queues) => {
        commit('refreshableQueuesMutation',queues)
    },
    resetRefreshableQueuesAction: ({commit, dispatch,state}) => {
        commit('resetRefreshableQueuesMutation',[])
    },
    echoPusherEventsAction: ({commit, dispatch,state},e) => {
        let queues = {
            1: 'new',
            2: 'assigned',
            3: 'scheduled',
            4: 'submitted',
            5: 'completed',
            6: 'onHold',
        };
        let refreshQueues = [];
        if (Object.keys(queues).indexOf(""+e.PaymentStatusId) != -1) {
            refreshQueues.push(queues[""+e.PaymentStatusId])
        }
        if (Object.keys(queues).indexOf(""+e.oldPaymentStatusId) != -1) {
            refreshQueues.push(queues[""+e.oldPaymentStatusId])
        }
        if (refreshQueues.length > 0) {
            //refreshQueues.push(queues["0"])
            if (state.PaymentStatus.indexOf(e.PaymentStatusId) != -1 || state.PaymentStatus.indexOf(e.oldPaymentStatusId) != -1) {
                refreshQueues.push('all')
            }
            commit('refreshableQueuesMutation',refreshQueues)
            dispatch('getQueuesCountAction',refreshQueues)
            
        }
    },
    //======================================
    getHomeOrdersAction: ({commit, dispatch,state}) => {
        return new Promise((resolve, reject) => { 
            axios({
                url: '/home',
                method: 'GET',
            })
            .then(resp => {
                if (resp) {
                    commit('homeOrdersMutation', resp.data.data)
                }
                resolve(resp)

            });
        })
    },
}
export default {
    namespaced: true,
    state: {
        queues:queues,
        activeQueue:'all',
        refreshableQueues:[],
        paymentStatus:'0,1',
        homeDueOrders:[],
        homeRecentOrders:[],
    },
    getters: {
        allQueuesGetter : state => state.queues,
        activeQueueGetter : state => state.activeQueue,
        homeDueOrdersGetter : state => state.homeDueOrders,
        homeRecentOrdersGetter : state => state.homeRecentOrders,
        paymentStatusGetter : state => state.paymentStatus,
        refreshableQueuesGetter : state => state.refreshableQueues,
        queueKeysGetter : state => {
            return Object.keys(state.queues)
        },
    },
    actions,
    mutations
}