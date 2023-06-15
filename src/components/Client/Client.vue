<template>
    <div class="row" style="padding-top: 15px; ">
        <div class="col-md-4" style="">
            <div class="panel panel-default bg-white">

                <!-- <div class="panel-heading">
                    
                </div> -->
                <div class="panel-body">
                    <div class="row">
                        <div class="col-sm-9">
                            <input type="text" class="form-control" v-model="clientSearch" placeholder="Search Clients ....">
                        </div>
                        <div class="col-sm-3">
                            <button class="btn btn-primary btn-block" tag="a" @click="toggleCreateDialog">New</button>
                        </div>
                    </div>
                </div>
                <table class="table">
                </table>
            </div>
            <!-- <div class="panel panel-default"> -->
                <table class="table table-bordered table-condensed table-hover bg-white">
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(client,cIndex) in clients" >
                            <router-link tag="td" :to="'/clients/'+client.id" active-class="info">
                                {{client.name}}
                            </router-link>
                        </tr>
                    </tbody>
                </table>
            <!-- </div> -->
            <div class="clearfix"></div>
        </div>
        <div class="col-md-8" style="">
            <client-details class="bg-white" v-if="client.id && !showCreateDialog" :client="client"></client-details>
            <client-create :show="showCreateDialog" @hide="toggleCreateDialog" ></client-create>
            
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ClientDetails from './Details'
import ClientCreate from './Create'
export default{
    name: 'Client',
    created() {
        //here data and pro can be changed but DOM is not available
    },
    beforeMount() {
    },
    mounted() {
        //here DOM/template is created 
        if (this.$route.params.id && !this.isLoading) {
            this.requestLoading();
            this.getClientDetailsAction({id: this.$route.params.id}).finally(resp => {
                this.loaded();
            });
            
        }
    },
    data: function() {
        return {
            clientSearch: '',
            showCreateDialog:false,
        }
    },
    props: {
    },
    components: {
        ClientDetails,
        ClientCreate
    },
    beforeRouteUpdate (to, from, next) {
        if (to.name == 'clients' && to.params.id != undefined) {
            this.requestLoading();
            let self = this;
            this.getClientDetailsAction({id:to.params.id}).then(resp => {
                this.loaded();
            })
            next();
        } else {
            next();
        }
    },
    methods: {
        ...mapActions({
            getClientDetailsAction: 'client/getClientDetailsAction',
        }),
        toggleCreateDialog() {
            this.showCreateDialog = !this.showCreateDialog;
        }
    },
    computed: {
        ...mapGetters({
            client: 'client/clientDetailsGetter'
            //clients: 'client/allClientsGetter'
            //clients: this.$store.getters['client/allClientsGetter'](this.clientSearch)
        }),
        clients() {
            return this.$store.getters['client/filterClientsByName'](this.clientSearch)
        }
    }
}
</script>