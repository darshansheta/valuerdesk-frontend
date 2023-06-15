import {
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_ERROR,
    AUTH_LOGOUT
} from './mutationTypes'

import store from '@/vuex/store';
import Pusher from "pusher-js"
import Echo from "laravel-echo"

export default {
    [AUTH_LOGOUT]: (state) => {
        state.token = false;
        state.user = false;
    },
    [AUTH_REQUEST]: (state) => {
        state.status = 'loading'
    },
    [AUTH_SUCCESS]: (state, {token,user}) => {
        axios.defaults.headers.common.Authorization = 'Bearer ' + token;
        state.token = token;
        state.status = 'success'

        state.gotResponse = true;

        state.user = user
    },
    [AUTH_ERROR]: (state) => {
        state.status = 'error'
        state.gotResponse = true;
    },
    setEchoMuation: (state, echo) => {
        state.echo =  echo;
    },
    updateGotResponseMutation: (state, status) => {
        state.gotResponse =  status;
    },
    settingsMutation: (state, settings) => {
        state.settings =  settings;
    },
    authACLMutation: (state, data) => {
        state.permissions = data.permissions;
        if (data.levelRole) {
            state.levelRole = data.levelRole.role;
        }
        state.roles = data.roles;
    },
    fallbackRoute: (state, fallbackRoute) => {
        state.fallbackRoute = fallbackRoute;
    },
}