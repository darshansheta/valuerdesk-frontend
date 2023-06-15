import {ALL_COMPANY,SET_PARAMS,LAST_DAYS,SET_FILTERS } from './mutationType'
import Vue from 'vue'
import _ from 'lodash'
export default {
    [ALL_COMPANY] : (state,companies) => {
        state.companies = companies
        
    },
    [SET_PARAMS] : (state,params) => {
        //state.params = params
        //
        //console.log('state.params.filters')
        //console.log(params.filters.symbol)
        //console.log(state.params.filters.symbol)
        
        return new Promise((resolve, reject) => {
          //Vue.set(state.params, 'newProp', 123)
        if (params.filters != undefined && state.params.filters != undefined) {
            Object.assign(state.params, params);
            //state.params.filters.symbol = params.filters.symbol;
            //Vue.set(state.params, 'filters', params.filters)
        } else {
            state.params = {...state.params, ...params};
        }

          resolve()
      })
        
    },
    [LAST_DAYS] : (state,days) => {
        state.days = days
        
    },
    [SET_FILTERS] : (state,filters) => {
        state.params.filters = filters
        console.log(345)
    }
}