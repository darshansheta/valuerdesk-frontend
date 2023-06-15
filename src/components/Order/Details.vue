<template>
    <b-modal
        :keyboard="false"
        :backdrop="false"
        class="modal-top"
        v-model="showDetail"
        :title="`Order# - ${order.fileNumber}`"
        ref="modal"
        :dialog-style="{height:'100%'}"
        :footer="false"
        :before-close="hide"
    >
    <div>
        <action-bar :order="order" @toggleEditForm="$emit('toggleEditForm')"></action-bar>
        <tabs justified class="square-tabs order-detail-tabs bg-white" @change="tabsChange">
            <tab  title="Details" class="tab-border">
                <general-details :order="order"></general-details>
            </tab>
            <!-- <tab title="Updates">
            </tab> -->
            <tab title="Reports">
                <report-document :order="order"></report-document>
            </tab>
            <!-- <tab title=" <i class='fa fa-map-o'></i> Map" :html-title="true">
                <google-map :order="order"></google-map>
            </tab> -->
            <tab title="Activities">
                <notification :order="order" :notifications="notifications" ></notification>
            </tab>
        </tabs>
        
    </div>
     </b-modal> 
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Router from 'vue-router'
import GeneralDetails from './GeneralDetails'
import ActionBar from './ActionBar'
import Notification from './Notification'
import GoogleMap from './GoogleMap'
import ReportDocument from './ReportDocument'

const initialData = () => {
  return {
            showEditDialog: false,
            showReportFormDialog: false,
            generateReportButtonDisabled:false,
            showDetail:true
        }
}


export default {
    name: 'Details',
    created() {
        console.log('detail created', this.order.id)
    },
    mounted() {
        console.log('detail mounted', this.order.id)
    },
    data:initialData,
    props: {
        show : {
            type: Boolean,
            default: true
        },
        order: {
            type:Object,
            default:function(){ return {}; }
        }
    },
    components: {
        GeneralDetails,
        ActionBar,
        Notification,
        GoogleMap,
        ReportDocument
    },
    methods: {
        ...mapActions({
            getOrderNotificationsAction: 'order/getOrderNotificationsAction',
        }),
        tabsChange(index) {
            if (index == 2) {
                this.getOrderNotificationsAction({id:this.order.id})
            }
        },
        hide() {
            this.$router.push('/dashboard')
            this.showDetail = false;
            this.$emit('hide')
        }
    },
    computed: {
        ...mapGetters({
            notifications: 'order/notificationsGetter'
        })
    },
    watch: {
    }
}
</script>