import {ALL_COMPANY,SET_PARAMS,LAST_DAYS, ALL_FIELDS,SET_FILTERS} from './mutationType'

export default {
    [ALL_COMPANY] : ({commit, dispatch}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: 'companies', params: param, method: 'GET' })
            .then(resp => {
                commit(ALL_COMPANY, resp.data)
                if(resp.data.length && resp.data[0].stocks != undefined) {
                    commit(LAST_DAYS, resp.data[0].stocks)
                    //commit(ALL_FIELDS, resp.data[0].stocks)
                }
                resolve(resp)
            })
        })
    },
    [SET_PARAMS] : ({commit, dispatch}, params) => {
        return new Promise((resolve, reject) => {
            if (params.filters != undefined) {
                commit(SET_PARAMS, params)
            } else {
                commit(SET_PARAMS, params)
            }
          resolve()
      })
        
    }
}