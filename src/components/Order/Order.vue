<template>
    <div>
        <div class="row" v-if="false">
            <!-- <div class="col-md-4 orders-tabs" style="padding:0px;border: 1px solid #ddd;">
             <div class="col-md-4 orders-tab text-center" :class="{active: activeTab == 'open' }" @click="activeTab = 'open'">
                Open
            </div>
            <div class="col-md-4 orders-tab text-center" :class="{active: activeTab == 'completed' }" @click="activeTab = 'completed'">
                Completed
            </div>
            <div class="col-md-4 orders-tab text-center" :class="{active: activeTab == 'cancelled' }" @click="activeTab = 'cancelled'">
                Cancelled
            </div> 
            </div> -->
            <div class="col-md-11 orders-filters" style="padding-top:10px;padding-bottom:10px;border: 1px solid #ddd;">
                <div class="row">
                    <div class="col-sm-1 col-xs-2">
                        <!--<label for="control-label">Status</label>-->
                        <select class="form-control" v-model="filters.statusId" >
                            <option value="">STATUS ALL</option>
                            <option v-for="(status,statusId) in $root.$statuses" :value="statusId">{{status}}</option>
                        </select>
                    </div>
                    <div class="col-sm-1 col-xs-2">
                        <!--<label for="control-label">File No</label>-->
                        <input type="text" class="form-control" v-model="filters.fileNumber" placeholder="File#">
                    </div>
                    <div class="col-sm-1 col-xs-2">
                        <!--<label for="control-label">Ref. No.</label>-->
                        <input type="text" class="form-control" v-model="filters.referenceNumber" placeholder="Reference#">
                    </div>
                    <div class="col-sm-2 col-xs-2">
                        <!--<label for="control-label">Ref. No.</label>-->
                        <input type="text" class="form-control" v-model="filters.address" placeholder="Address">
                    </div>
                    <div class="col-sm-2 col-xs-2">
                        <!--<label for="control-label">Ref. No.</label>-->
                        <input type="text" class="form-control" v-model="filters.borrower" placeholder="Borrower Name">
                    </div>
                    <div class="col-sm-1 col-xs-2">
                        <!--<label for="control-label">Client</label>-->
                        <select class="form-control" v-model="filters.clientId">
                            <option value="">CLIENTS ALL</option>
                            <option v-for="(client,key) in clients" :value="client.id">{{client.name}}</option>
                        </select>
                    </div>
                    <div class="col-sm-2 col-xs-4">
                        <!--<label for="control-label">File No</label>-->
                        <date-picker lang='en' format=" D MMMM,YY" value-type="format" input-class="form-control" v-model="filters.createdAt" range :confirm="true" ></date-picker>
                    </div>
                    <div class="col-sm-2 col-xs-4">
                        <button class="btn btn-block"> <i class="fa fa-search"></i> SEARCH</button>
                    </div>
                </div>
                <!-- <div class="row">
                    <div class="col-sm-3">
                        <label for="control-label">Client</label>
                        <select class="form-control"></select>
                    </div>
                    <div class="col-sm-3">
                        <label for="control-label">Staff</label>
                        <select class="form-control"></select>
                    </div>
                    <div class="col-sm-3">
                        <label for="control-label">Vistor</label>
                        <select class="form-control"></select>
                    </div>
                    <div class="col-sm-3">
                        <label for="control-label">State</label>
                        <select class="form-control"></select>
                    </div>
                </div> -->
            </div>
            <div class="col-md-1" style="padding-top:10px;padding-bottom:10px;border: 1px solid #ddd;">
                <button class="btn btn-primary btn-block" @click="showCreateFormAction({status:true})"  @hide="toggleCreateForm" >NEW</button>
            </div>
        </div>
        <div class="row" style="margin-top: 10px;">
            <!-- <div class="col-sm-3">
                <order-card v-for="(order,key) in orders" :order="order" :key='key'></order-card>
                <span v-show="orders.length == 0"> No records found.</span>
            </div> -->
            <div class="col-sm-12">
                <order-details v-if="Object.keys(order).length && !showCreateFormState && !showEditForm" :order="order" @toggleEditForm="toggleEditForm" ></order-details>
                <create-order v-if="showCreateFormState" @hide="toggleCreateForm"></create-order> 
                <edit-order v-if="showEditForm && !showCreateFormState" @hide="toggleEditForm" :order="order"></edit-order> 
                <div 
                    class="alert alert-info text-center" 
                    role="alert"
                    v-if="!Object.keys(order).length && !showCreateFormState && !showEditForm"
                >
                    You have not selected any orders from dashboard to display, please select one.
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import rules from '@/validations/rules';
import CreateOrder from './Create';
import EditOrder from './EditOrder';
import OrderDetails from './Details';
import OrderCard from './Card';
import _ from 'lodash';
import DatePicker from 'vue2-datepicker';

const initialData = () => {
    return {
        showEditForm: false,
        activeTab: 'open',
        filters: {
            createdAt: '',
            fileNumber: '',
            referenceNumber: '',
            address: '',
            clientId: '',
            statusId: '',
        },
        page:1,
    }
}

export default {
    name:'Order',
    data:initialData,
    beforeRouteUpdate (to, from, next) {
        if (to.name == 'orders' && to.params.id != undefined) {
            this.getOrderDetailsAction({id:to.params.id})
            this.showEditForm = false;
            next();
        } else {
            next();
        }
    },
    mounted() {
        if (this.$route.params.id) {
            //this.getOrderDetailsAction({id: this.$route.params.id});
            this.showEditForm = false;
        }
    },
    activated() {
        if (this.$route.params.id) {
            this.getOrderDetailsAction({id: this.$route.params.id});
            this.showEditForm = false;
        }
    },
    components : {
        DatePicker,
        CreateOrder,
        OrderDetails,
        OrderCard,
        EditOrder
    },
    methods: {
        ...mapActions({
            getOrderDetailsAction:'order/getOrderDetailsAction',
            getOrdersListAction:'order/getOrdersListAction',
            showCreateFormAction:'order/showCreateFormAction',
        }),
    toggleCreateForm() {
        this.showCreateFormAction({status: !this.showCreateFormState})
    },
    toggleEditForm() {
        this.showEditForm = !this.showEditForm;
        //this.showCreateFormAction({status: !this.showCreateFormState})
    },
    filterOrders(){
        this.getOrdersListAction({
            page:this.page,
            filters:this.filters,
            activeTab: this.activeTab
        });
    }
  },
  computed: {
    ...mapGetters({
        order: 'order/orderDetailsGetter',
        orders: 'order/allOrdersGetter',
        showCreateFormState: 'order/showCreateFormGetter',
        clients: 'client/allClientsGetter',
    }),
  },
  watch: {
    filters: {
        handler:_.debounce(function(){
            this.filterOrders();
        },300),
        deep: true
    }
  }

}
</script>