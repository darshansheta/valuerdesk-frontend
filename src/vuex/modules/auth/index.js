import mutations from './mutations'
import actions from './actions'

export default {
    state: {
        token: localStorage.getItem('token') || '',
        user: {},
        status: '',
        echo: null,
        isAuthenticated: state => !!state.token,
        gotResponse: false,
        settings: {},
        levelRole:{},
        roles:[],
        permissions:[],
        fallbackRoute:'dashboard'
    },
    getters: {
        isLoggedIn : state => !!state.token,
        userGetter : state => state.user,
        authStatus: state => state.status,
        token: state => state.token,
        gotResponseGetter: state => state.gotResponse,
        settingsGetter: state => state.settings
    },
    actions,
    mutations
}