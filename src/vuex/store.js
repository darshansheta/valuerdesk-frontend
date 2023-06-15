import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import dashboard from './modules/dashboard'
import sale from './modules/sale'
import company from './modules/company'
import client from './modules/client'
import report from './modules/report'
import order from './modules/order'
import staff from './modules/staff'
import setting from './modules/setting'
import common from './modules/common/common'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

let store = new Vuex.Store({
    modules: {
        auth,
        dashboard,
        sale,
        client,
        report,
        order,
        staff,
        setting,
        common
    },
    strict: debug
});

export default store;
