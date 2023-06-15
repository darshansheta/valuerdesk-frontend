
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
        active:false,
        page:1,
        filters:{},
        orderBy:{
            column:'updated_at',
            order:'DESC'
        }
    },
    open:{
        name:'Open',
        fa:'fa-plus-square-o',
        count:0,
        data: {},
        countUpdated:true,
        total:0,
        active:false,
        page:1,
        filters:{},
        orderBy:{
            column:'updated_at',
            order:'DESC'
        }
    },
    new:{
        name:'New',
        id:1,
        fa:'fa-plus-square',
        count:0,
        data: {},
        countUpdated:true,
        total:0,
        active:false,
        page:1,
        filters:{},
        orderBy:{
            column:'updated_at',
            order:'DESC'
        }
    },
    assigned:{
        name:'Assigned',
        id:2,
        fa:'fa-user',
        count:0,
        data: {},
        countUpdated:true,
        total:0,
        active:false,
        page:1,
        filters:{},
        orderBy:{
            column:'updated_at',
            order:'DESC'
        }
    },
    scheduled:{
        name:'Scheduled',
        id:3,
        fa:'fa-clock-o',
        count:0,
        data: {},
        countUpdated:true,
        total:0,
        active:false,
        page:1,
        filters:{},
        orderBy:{
            column:'updated_at',
            order:'DESC'
        }
    },
    onHold:{
        name:'On Hold',
        id:6,
        fa:'fa-ban',
        count:0,
        data: {},
        countUpdated:true,
        total:0,
        active:false,
        page:1,
        filters:{},
        orderBy:{
            column:'updated_at',
            order:'DESC'
        }
    },
    // due:{
    //     name:'Due',
    // fa:'fa-plus-square',
    //     count:0,
    //     data: {},
    //     countUpdated:true,
    //     total:0,
    //     active:false,
    //     page:1,
    // filters:{},
    //     orderBy:{
    //         column:'updated_at',
    //         order:'DESC'
    //     }
    // },
    submitted:{
        name:'Submitted',
        id:4,
        fa:'fa-list-ul',
        count:0,
        data: {},
        countUpdated:true,
        total:0,
        active:false,
        page:1,
        filters:{},
        orderBy:{
            column:'updated_at',
            order:'DESC'
        }
    },
    completed:{
        name:'Completed',
        id:5,
        fa:'fa-check-circle',
        count:0,
        data: {},
        countUpdated:true,
        total:0,
        active:false,
        page:1,
        filters:{},
        orderBy:{
            column:'updated_at',
            order:'DESC'
        }
    },
}

let mutations = {
    queuesCountMutation : (state,counts) => {
        for(let qIndex in counts) {
            state.queues[qIndex].count = counts[qIndex];
            state.queues[qIndex].countUpdated = true;
        }
    },
    queueDataMutation : (state,{queue,data}) => {
        state.queues[queue].data = data;
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
    statusMutation:(state,status) => {
        state.status = status
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
                url: '/queues/'+param.queue,
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
                        commit('queueDataMutation', {queue:param.queue,data:resp.data})
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
                url: '/queues/counter',
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
        if (Object.keys(queues).indexOf(""+e.statusId) != -1) {
            refreshQueues.push(queues[""+e.statusId])
        }
        if (Object.keys(queues).indexOf(""+e.oldStatusId) != -1) {
            refreshQueues.push(queues[""+e.oldStatusId])
        }
        if (refreshQueues.length > 0) {
            //refreshQueues.push(queues["0"])
            if (state.status.indexOf(e.statusId) != -1 || state.status.indexOf(e.oldStatusId) != -1) {
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
        status:'1,2,3,4,6',
        homeDueOrders:[],
        homeRecentOrders:[],
    },
    getters: {
        allQueuesGetter : state => state.queues,
        activeQueueGetter : state => state.activeQueue,
        homeDueOrdersGetter : state => state.homeDueOrders,
        homeRecentOrdersGetter : state => state.homeRecentOrders,
        statusGetter : state => state.status,
        refreshableQueuesGetter : state => state.refreshableQueues,
        queueKeysGetter : state => {
            return Object.keys(state.queues)
        },
    },
    actions,
    mutations
}