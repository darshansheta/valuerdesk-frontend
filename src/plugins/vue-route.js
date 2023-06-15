/* ============
 * Vue Router
 * ============
 *
 * The official Router for Vue.js. It deeply integrates with Vue.js core
 * to make building Single Page Applications with Vue.js a breeze.
 *
 * http://router.vuejs.org/en/index.html
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from '@/router/index';
import store from '@/vuex/store';
import hasPermission from '@/utils/permission';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode:'history',
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.auth) && !store.getters.isLoggedIn) {
    /*
     * If the user is not authenticated and visits
     * a page that requires authentication, redirect to the login page
     */
    next({
      name: 'login',
    });
  } else if (to.matched.some(m => m.meta.guest) && store.getters.isLoggedIn) {
    /*
     * If the user is authenticated and visits
     * an guest page, redirect to the dashboard page
     */
    next({
      name: '/',
    });
  }/* else if(to.meta.permission != undefined && !hasPermission(to.meta.permission,'rouee')) {
    console.log(store.state.auth.fallbackRoute,'fallback',!hasPermission(to.meta.permission,'rlog'),from)
    next({
      name: store.state.auth.fallbackRoute,
    });
  }*/ else {
    if(to.meta.permission != undefined) {
        if(store.state.auth.gotResponse) {
            if(!hasPermission(to.meta.permission,'rouee') && to.meta.permission != store.state.auth.fallbackRoute) {
                //console.log(store.state.auth.fallbackRoute,'fallback',!hasPermission(to.meta.permission,'rlog'),from)
                next({
                  name: store.state.auth.fallbackRoute,
                });
            } else {
                next();
            }
        } else {
            store.dispatch('checkAuthAction').then((resp)=>{
                //console.log(to.meta.permission , store.state.auth.fallbackRoute)
                if(!hasPermission(to.meta.permission,'rouee2') && to.meta.permission != store.state.auth.fallbackRoute){
                    next({
                  name: store.state.auth.fallbackRoute,
                });
                } else {
                    next()
                }
            })
        }
    } else {
        next();
    }
  }
});

Vue.router = router;

export default {
  router,
};