
import axios from 'axios';
import store from '@/vuex/store';

/* ============
 * axios
 * ============
 *
 * Promise based HTTP client for the browser and node.js.
 * Because Vue Resource has been retired, axios will now been used
 * to perform AJAX-requests.
 *
 * https://github.com/mzabriskie/axios
 */

//console.log(process.env.VUE_APP_API_LOCATION)

axios.defaults.baseURL = process.env.VUE_APP_API_LOCATION;
axios.defaults.headers.common.Accept = 'application/json';
import Notification from '@/services/notification/notification.js';
//axios.defaults.headers.common.DD = Math.random();
const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common.Authorization = 'Bearer ' + token
}
axios.interceptors.response.use(
  response => {
    let msg = '';

    if (response.data) {
        let data = response.data;
        if (data.message && ['post','put'].indexOf(response.config.method.toLowerCase()) != -1 ) {
            msg = data.message
        } 
    }
    if (msg) {
        Notification.notify({
                        content: msg,
                        duration: 5000
                    });
    }
    store.dispatch('common/setRequestStatusAction',{status:'loaded'})
    return response
},
  (error) => {
    if(axios.isCancel(error)) {
        return ;
    }
    if(error.response != undefined) {
        if (error.response.status === 401 && error.response.config.url.indexOf('login') == -1 ) {
          store.dispatch('AUTH_LOGOUT');
        }
        else if (['token_invalid','token_expired','token_not_provided'].indexOf(error.response.data.error) !=  -1) {
          store.dispatch('AUTH_LOGOUT');
        }
    }

    return Promise.reject(error);
   
  });

// window.Pusher = Pusher;

// let pusher = new Pusher('20acfb0327f48cac3058', {
//       cluster: 'ap2',
//       forceTLS: true,
//       authEndpoint: process.env.VUE_APP_API_LOCATION+'broadcasting/auth',
//       auth: {
//           headers: axios.defaults.headers.common
//         }
//     });

// window.Echo =  new Echo({
//     broadcaster: 'pusher',
//     key: '20acfb0327f48cac3058',
//     cluster: 'eu',
//     encrypted: true,
//     client:pusher,

// });

window.axios = axios;
