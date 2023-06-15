<template>
    <div>
    <navbar v-show="isLoggedIn" fixed-top class="navbar-light shadow-sm nav-white" v-model="isCollasped">
        <router-link to="/" class="navbar-brand" active-class="active" slot="brand" >
          VD
        </router-link>
        <template slot="collapse-btn">
            <button class="navbar-toggle" type="button" @click="toggleNavModal"> <i class="fa fa-bars"></i> </button>
        </template>
        <template slot="collapse">
            <navbar-nav>
              <router-link tag="li" to="/dashboard" active-class="active"  v-if="hasPermission('dashboard')">
                <a><i class="fa fa-trello"></i> Dashboard</a>
              </router-link>
              <router-link tag="li" to="/orders" v-if="hasPermission('orders')" active-class="active">
                <a><i class="fa fa-file-text-o"></i> Orders</a>
              </router-link>
              <router-link tag="li" :to="'/clients'" active-class="active"  v-if="hasPermission('clients')">
                <a><i class="fa fa-bank dfa-black-tie"></i> Clients</a>
              </router-link>
              <router-link tag="li" :to="'/reports'" active-class="active"  v-if="hasPermission('reports')">
                <a><i class="fa fa-folder"></i> Reports</a>
              </router-link>
              <!-- <router-link tag="li" :to="'/sales'" active-class="active"  v-if="hasPermission('sales')">
                <a> <i class="fa fa-credit-card"></i> Sales</a>
                </router-link> -->
              <router-link tag="li" :to="'/settings'" active-class="active"  v-if="hasPermission('settings')">
                <a> <i class="fa fa-cog"></i> Settings</a>
              </router-link>
              
            </navbar-nav>

            <navbar-nav right>
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{user.name}} <span class="caret"></span></a>
                  <ul class="dropdown-menu">
                    <router-link tag="li" :to="'/users'" active-class="active"  v-if="hasPermission('users')">
                      <a><i class="fa fa-users"></i> Users</a>
                    </router-link>
                    <!-- <router-link tag="li" :to="'/settings'" active-class="active"  v-if="hasPermission('settings')">
                      <a> <i class="fa fa-cog"></i> Settings</a>
                    </router-link> -->
                    <li role="separator" class="divider"></li>
                    
                    <router-link v-show="isLoggedIn" tag="li" to="/logout" active-class="active">
                      <a><i class="fa fa-power-off"></i> <label class="hidden-sm" style="margin-bottom: 0;margin-left: 5px;"> Logout</label></a>
                    </router-link>

                  </ul>
                </li>
                <router-link tag="li" to="/login" active-class="active" v-show="!isLoggedIn">
                  <a><i class="fa fa-power-on"></i> Login</a>
                </router-link>
            </navbar-nav>
            <navbar-nav right>
                <button class="btn navbar-btn btn-default btn-primary" style="border-radius: 50%" @click="redirectToCreateOrder"> <i class="fa fa-plus"></i> </button>
            </navbar-nav>
        </template>
    </navbar>
    <b-modal
        :keyboard="true"
        :backdrop="true"
        class="modal-left"
        v-model="displayNavModal"
        :title="``"
        ref="modal"
        :dialog-style="{width:'40%'}"
        :footer="false"
        :header="false"
    >
        <ul class="nav nav-pills nav-stacked">

          <router-link tag="li" to="/dashboard" active-class="active"  v-if="hasPermission('dashboard')">
            <a><i class="fa fa-trello"></i> Dashboard</a>
          </router-link>
          <router-link tag="li" to="/orders" v-if="hasPermission('orders')" active-class="active">
            <a><i class="fa fa-file-text-o"></i> Orders</a>
          </router-link>
          <router-link tag="li" :to="'/clients'" active-class="active"  v-if="hasPermission('clients')">
            <a><i class="fa fa-bank dfa-black-tie"></i> Clients</a>
          </router-link>
          <router-link tag="li" :to="'/reports'" active-class="active"  v-if="hasPermission('reports')">
            <a><i class="fa fa-folder"></i> Reports</a>
          </router-link>
          <!-- <router-link tag="li" :to="'/sales'" active-class="active"  v-if="hasPermission('sales')">
            <a> <i class="fa fa-credit-card"></i> Sales</a>
          </router-link> -->
          <router-link tag="li" :to="'/settings'" active-class="active"  v-if="hasPermission('settings')">
                <a> <i class="fa fa-cog"></i> Settings</a>
              </router-link>
          
       

            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{user.name}} <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <router-link tag="li" :to="'/users'" active-class="active"  v-if="hasPermission('users')">
                  <a><i class="fa fa-users"></i> Users</a>
                </router-link>
                <router-link tag="li" :to="'/settings'" active-class="active"  v-if="hasPermission('settings')">
                  <a> <i class="fa fa-cog"></i> Settings</a>
                </router-link>
                <li role="separator" class="divider"></li>
                
                <router-link v-show="isLoggedIn" tag="li" to="/logout" active-class="active">
                  <a><i class="fa fa-power-off"></i> <label class="hidden-sm" style="margin-bottom: 0;margin-left: 5px;"> Logout</label></a>
                </router-link>

              </ul>
            </li>
            <router-link tag="li" to="/login" active-class="active" v-show="!isLoggedIn">
              <a><i class="fa fa-power-on"></i> Login</a>
            </router-link>
            <li>
            <a href="javascript:void(0)" style="" @click="redirectToCreateOrder"> <i class="fa fa-plus"></i> NEW ORDER </a>
            </li>
        </ul>
        <!-- <ul class="nav nav-pills nav-stacked">
            <li data-v-0a4729a6="" role="presentation" class="no-link"><a data-v-0a4729a6="" role="button"><b data-v-0a4729a6="">Usage</b></a></li>
            <li data-v-0a4729a6="" role="presentation"><a data-v-0a4729a6="" href="/getting-started" class="sub-list" role="button">
                              Getting Started
                            </a></li>
        </ul> -->
    </b-modal>
    </div>
    <!-- <nav class="navbar navbar-light navbar-default navbar-fixed-top shadow-sm nav-white" dark-class="navbar-custom-dark" v-show="isLoggedIn" >
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" v-on:click.prevent="toggleCollapse()" data-toggle="collapse" data-target="#main-navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                
                <router-link to="/" class="navbar-brand" active-class="active" >
                  VD
                </router-link>
            </div>
            <div id="main-navbar" class="navbar-collapse" :class="{'collapse' : collapse}">
                <ul class="nav navbar-nav">
                    <router-link tag="li" to="/dashboard" active-class="active"  v-if="hasPermission('dashboard')">
                      <a><i class="fa fa-trello"></i> Dashboard</a>
                    </router-link>
                    <router-link tag="li" to="/orders" v-if="hasPermission('orders')" active-class="active">
                      <a><i class="fa fa-file-text-o"></i> Orders</a>
                    </router-link>
                    <router-link tag="li" :to="'/clients'" active-class="active"  v-if="hasPermission('clients')">
                      <a><i class="fa fa-bank dfa-black-tie"></i> Clients</a>
                    </router-link>
                    <router-link tag="li" :to="'/reports'" active-class="active"  v-if="hasPermission('reports')">
                      <a><i class="fa fa-folder"></i> Reports</a>
                    </router-link>
                    <router-link tag="li" :to="'/users'" active-class="active"  v-if="hasPermission('users')">
                      <a><i class="fa fa-users"></i> Users</a>
                    </router-link>
                    <router-link tag="li" :to="'/sales'" active-class="active"  v-if="hasPermission('sales')">
                      <a> <i class="fa fa-credit-card"></i> Sales</a>
                    </router-link>
                    <router-link tag="li" :to="'/settings'" active-class="active"  v-if="hasPermission('settings')">
                      <a> <i class="fa fa-cog"></i> Settings</a>
                    </router-link>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                        
                        <router-link v-show="isLoggedIn" tag="li" to="/logout" active-class="active">
                          <a><i class="fa fa-power-off"></i> Logout</a>
                        </router-link>
                        <router-link tag="li" to="/login" active-class="active" v-show="!isLoggedIn">
                          <a><i class="fa fa-power-on"></i> Login</a>
                        </router-link>
                    
                </ul>
            </div>
        </div>
    </nav> -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Navbar from '@/components/Shared/navbar/Navbar';
import NavbarNav from '@/components/Shared/navbar/NavbarNav';
export default {
    name: 'AppNav',
    components: {
        Navbar,
        NavbarNav
    },
    data: function(){
        return {
            isCollasped:false,
            displayNavModal:false,

        }
    },
    computed: {
        ...mapGetters({
        isLoggedIn:'isLoggedIn',
        user:'userGetter'
      })
    },
    methods: {
        ...mapActions({
            showCreateFormAction:'order/showCreateFormAction'
        }),
        toggleCollapse : function () {
            this.isCollasped = !this.isCollasped;
        },
        toggleNavModal : function () {
            this.displayNavModal = !this.displayNavModal;
        },
        redirectToCreateOrder: function () {
            this.showCreateFormAction({status:true})
            if (this.$route.name != 'orders') {
                this.$router.push({ name: 'orders'})
            }
        }
    },
    watch: {
        $route:function(newVal, oldVal) {
            this.displayNavModal = false;
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>