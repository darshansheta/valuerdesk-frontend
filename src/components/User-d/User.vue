<template>
    <div class="row">
        <div class="col-sm-10 col-sm-offset-1">
            <router-link tag="li" to="/user/create" active-class="hidden">
              <a>Home</a>
            </router-link>
            <router-link tag="li" to="/user" exact-active-class="hidden">
              <a>user</a>
            </router-link>
            <router-view></router-view>
           <user-list v-bind:users="users"></user-list> 
        </div>
    </div>
</template>
<script>
import UserList from  '@/components/User/List'
import { mapGetters } from 'vuex'
export default {
    name: 'User',
    components:{
        UserList
    },
    computed: mapGetters({
    users: 'getUsers'
  })
}    
</script>
<style></style>