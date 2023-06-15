import store from '@/vuex/store'

Echo.private('users')
    .listen('Client.Created', (e) => {
        store.dispatch('client/getClientsListAction')
    })
    .listen('Client.Updated', (e) => {
        store.dispatch('client/getClientsListAction')
    });