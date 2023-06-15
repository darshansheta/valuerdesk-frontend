<template>    <div class="container">
          <div class="row">
            <div class="col-md-4 col-md-offset-4">
              <div class="panel panel-default" v-if="showLoginForm">
                <div class="panel-heading">
                  <h3 class="panel-title">Login</h3>
                </div>
                <div class="panel-body">
                  <form>
                    <div class="form-group"
                        v-bind:class="{'has-error' : authStatus == 'error' }"
                    >
                      <label for="">Username</label>
                      <input type="text" v-model="user.username" name="username" class="form-control" placeholder="">
                    </div>
                    <div class="form-group"
                           v-bind:class="{'has-error' : authStatus == 'error' }"
                    >
                      <label for="">Password</label>
                      <input type="password" v-model="user.password" class="form-control" placeholder="" name="password">
                    </div>
                    <button type="submit" v-on:click.prevent="onLoginSubmit(user)" class="btn btn-default">Submit</button>
                  </form>
                </div>
              </div>
              <div v-else>
                  <div class="alert alert-danger">Please allow location service.</div>
              </div>
            </div>
          </div>
        </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import uuid from 'uuid'

const initialData = () => {
  return {
            //default:function () {
                user: {
                    username:'',
                    password:''
                },
                showLoginForm:true
            //}   
        }
}

//console.log(initialData);

export default {
    name: 'Login',
    data:initialData,
    mounted(){
        this.findMe()
    },
    methods: {
        ...mapActions({
              'login' : 'AUTH_LOGIN',
              getClientsListAction: 'client/getClientsListAction',
            }),
        onLoginSubmit (user) {
           
          this.login(user).then(() => {
            this.$router.push('/dashboard')
            this.getClientsListAction();
          }).catch(function(e){
            console.log(e)
        });


          //this.resetUserInForm()
        },
        findMe() {
            let self = this;
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((position) => {
                console.log(position)
                self.showLoginForm = true;
              }, () => {
                self.showLoginForm = true;
                console.error('Error: The Geolocation service failed. Please allow location service.')
              });
            } else {
              console.error("Geolocation is not supported by this browser.");
            }
        }
    },
    computed: mapGetters({
    authStatus: 'authStatus'
  })
}    
</script>