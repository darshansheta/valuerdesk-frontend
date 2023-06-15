import Login from '@/components/Auth/Login'
import Home from '@/components/Home/Home'
import Dashboard from '@/components/Dashboard/Dashboard'
import AllQueue from '@/components/Dashboard/AllQueue'
import Client from '@/components/Client/Client'
import Report from '@/components/Report/Report'
import UserLayout from '@/components/User/Layout'
import Staff from '@/components/User/Staff'
import Setting from '@/components/Setting/Setting'
import Order from '@/components/Order/Order'
import CreateClient from '@/components/Client/Create'
import ClientDetail from '@/components/Client/Details'
import store from '@/vuex/store';
import Sale from '@/components/Sale/Sale';

export default [
{
    path: '/',
    redirect: '/dashboard',
    component: Home,
    meta: {
        auth: true
    }
},
{
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
        guest: true,
    },
},
{
    path: '/logout',
    name: 'logout',
    beforeEnter: (to, from, next) => {
        //console.log(store)
        store.dispatch('AUTH_LOGOUT')
    },
    meta: {
        auth: true,
    },
},
{
    path: '/dashboard',
    name: 'dashboard',
    component: AllQueue,
    meta: {
        auth: true,
        permission: 'dashboard' // setting it to null to allow access by all user types || 'dashboard'
    },
    beforeEnter: (to, from, next) => {
        //console.log(store)
        store.dispatch('dashboard/setActiveQueueAction','all')
        next();
    }
},
{
    path: '/clients/:id?',
    name: 'clients',
    component: Client,
    children: [
    {

        path: 'create',
        component: CreateClient
    },
    /*{

        path: ':id',
        component: ClientDetail,
        beforeEnter: (to, from, next) => {
            
            store.dispatch('client/getClientDetailsAction',{id:to.params.id}).then(function() {
                next();
            });
        }
    }*/
    ],
    meta: {
        auth: true,
        permission: 'clients'
    }
},
{
    path: '/reports',
    name: 'reports',
    component: Report,
    meta: {
        auth: true,
        permission: 'reports'
    }
},
{
    path: '/orders/:id',
    name: 'ordersd',
    component: Order,
},
{
    path: '/orders/:id?',
    name: 'orders',
    component: Order,
    meta: {
        auth: true,
        permission: 'orders'
    },
   /* beforeEnter: (to, from, next) => {
        if (!Object.keys(store.state.order.order).length || store.state.order.order.id != to.params.id) {
            store.dispatch('order/getOrderDetailsAction',{id:to.params.id})
        }
        next();
    }*/
},
{
    path: '/users',
    name: 'users',
    component: UserLayout,
    meta: {
        auth: true,
        permission: 'users'
    }
},
{
    path: '/sales',
    name: 'sales',
    component: Sale,
    meta: {
        auth: true,
        permission: 'sales'
    }
},
{
    path: '/settings',
    name: 'settings',
    component: Setting,
    meta: {
        auth: true,
        permission: 'settings'
    }
}
]
