/* ============
 * Actions for the auth module
 * ============
 *
 * The actions that are available on the
 * auth module.
 */

import {
  AUTH_LOGIN,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_LOGOUT
} from './mutationTypes'
import axios from 'axios'
import Pusher from "pusher-js"
import Echo from "laravel-echo"
import Vue from 'vue'
import { router } from '@/plugins/vue-route';

export default {
  [AUTH_LOGIN] : ({commit, dispatch}, user) => {
      return new Promise((resolve, reject) => { // The Promise used for router redirect in login
        commit(AUTH_REQUEST)
        axios({url: 'auth/login', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.access_token
            localStorage.setItem('token', token) // store the token in localstorage
            
            commit(AUTH_SUCCESS, {token:token,user:resp.data.user})
            //commit('updateGotResponseMutation', true)

            dispatch('setInitialStateAction',resp.data)

            resolve(resp)
          })
        .catch(err => {
          commit(AUTH_ERROR, err)
          commit('updateGotResponseMutation', true)
          localStorage.removeItem('token') // if the request fails, remove any possible user token if possible
          reject(err.response.data.error)
        }).finally(function(res){
            
        });
      })
    },
    checkAuthAction : ({commit, dispatch}, user) => {
        return new Promise((resolve, reject) => {
          commit(AUTH_REQUEST)
          axios({url: 'auth/check', method: 'GET' })
            .then(resp => {
                
                const token = localStorage.getItem('token')

                commit(AUTH_SUCCESS, {token:token,user:resp.data.user})
                //commit('updateGotResponseMutation', true)

                dispatch('setInitialStateAction',resp.data)


                
                resolve(resp)
                


            })
          .catch(err => {
            commit('updateGotResponseMutation', true)
            // already handle by plugin/axios.js
          }).finally(function(res){
            
        });
        })
    },
    setInitialStateAction: ({commit, dispatch},data) => {
        
        /*
         * fire intial actions
         * TODO: load following item on intial
         * feature settings of subs(like document email)
         * global settings of sub
         * user permissions
         * client,report, 
        */
        dispatch(
            'dashboard/getQueuesCountAction',
            ['open','new','assigned','scheduled','submitted','completed','onHold']
        ); 
        dispatch('client/getClientsListAction'); 
        dispatch('report/getReportsListAction'); 
        dispatch('staff/getStaffListAction')
        commit('settingsMutation', data.settings);
        commit('authACLMutation', data);


        /*
         * Setup pusher
        */ 
        let pusher = new Pusher('20acfb0327f48cac3058', {
              cluster: 'ap2',
              forceTLS: true,
              authEndpoint: process.env.VUE_APP_API_LOCATION+'broadcasting/auth',
              auth: {
                  headers: axios.defaults.headers.common
                }
            });

        let echo =  new Echo({
            broadcaster: 'pusher',
            client:pusher,
        });

        echo.private(`${data.subName}.staff`)
        .listen('Client.Created', (e) => {
            dispatch('client/getClientsListAction')
        })
        .listen('Client.Updated', (e) => {
            dispatch('client/getClientsListAction')
        })
        .listen('Client.Deleted', (e) => {
            dispatch('client/getClientsListAction')
        })
        .listen('Report.Saved', (e) => {
            dispatch('report/getReportsListAction')
        })
        .listen('Staff.Saved', (e) => {
            dispatch('staff/getStaffListAction')
        });

        //if (vendors.filter(e => e.name === 'Magenic').length > 0) {
        // here we can create channel listener without checking roles because auth is don on server when echo instance is created
        if (data.roles.some(role => {
            return ['admin','staff'].indexOf(role.name) != -1
        })) {
            echo.private(`${data.subName}.staff`)
            .listen('Order.Saved', (e) =>  {
                dispatch('dashboard/echoPusherEventsAction',e)
            //     let queues = {
            //         1: 'new',
            //         2: 'assigned',
            //         3: 'scheduled',
            //         4: 'submitted',
            //         5: 'completed',
            //         6: 'onHold',
            //     };
            //     let refreshQueues = [];
            // if (Object.keys(queues).indexOf(""+e.statusId) != -1) {
            //         refreshQueues.push(queues[""+e.statusId])
            //     }
            //     if (Object.keys(queues).indexOf(""+e.oldStatusId) != -1) {
            //         refreshQueues.push(queues[""+e.oldStatusId])
            //     }
            //     if (refreshQueues.length > 0) {
            //         dispatch('dashboard/getQueuesCountAction',refreshQueues)
            //         dispatch('dashboard/updateRefreshableQueuesAction',refreshQueues)
                    
            //     }
            });
        }
        //echo.private(`${data.subName}.staff`);

        //at the end redirect request
        const mainTabs = [
            'dashboard',
            'orders',
            'clients',
            'reports',
            'users',
            'settings'
        ];
        let routeTo = 'dashboard';
        for(let mi in mainTabs) {
            if(
                data.permissions.filter((p) => {
                    return p.name == mainTabs[mi]
                }).length > 0 && routeTo == 'dashboard'
            ) {

                routeTo = mainTabs[mi];
            }
        }
        commit('fallbackRoute',routeTo)
        if (
            data.permissions.filter((p) => {
                return p.name == router.currentRoute.name
            }).length == 0
        ) {
            //router.push('/'+routeTo)
        }
    },

    [AUTH_LOGOUT] : ({commit, dispatch}) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_LOGOUT)
            localStorage.removeItem('token')
            window.location.href = '/login';
            //Vue.router.push('login')
            delete axios.defaults.headers.common['Authorization']
            resolve()
        })
    }
};