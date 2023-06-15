<template>
    <div>
        <p class="lead bb"> General Information</p>
        <div class="row">
            <div class="col-md-6">
                <div class="row">
                    <div class="col-xs-5">
                        <label class="label-key">Client:</label>
                    </div>
                    <div class="col-xs-7">
                        <span><b class="blc">{{order.client.name}}</b></span>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="row">
                    <div class="col-xs-5">
                        <label class="label-key">Order For:</label>
                    </div>
                    <div class="col-xs-7">
                        <span>{{order.clientUser.name}}</span><br>
                        <table style="margin-bottom: 10px;">
                            <tr>
                                <td><i class="fa fa-phone"></i> :&nbsp;&nbsp;</td>
                                <td>{{order.clientUser.phone}}</td>
                            </tr>
                            <tr>
                                <td><i class="fa fa-envelope"></i> :&nbsp;&nbsp;</td>
                                <td>{{order.clientUser.email}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="row">
                    <div class="col-xs-5">
                        <label class="label-key">Report:</label>
                    </div>
                    <div class="col-xs-7">
                        <span>{{order.reportName}}</span>
                    </div>
                </div>
                <!-- <div class="row">
                    <div class="col-xs-5">
                        <label class="label-key">Fee:</label>
                    </div>
                    <div class="col-xs-7">
                        <span> <i class="fa fa-inr"></i> {{order.fee}}</span> &nbsp;<i class="fa fa-edit " style="cursor: pointer;"></i>
                    </div>
                </div> -->
            </div>
            <div class="col-md-6">
                <!-----All Dates----->
                <div class="row">
                    <div class="col-xs-5">
                        <label class="label-key">Ordered Date:</label>
                    </div>
                    <div class="col-xs-7">
                        <span>{{order.createdAt | dateTime}}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-5">
                        <label class="label-key">Due Date:</label>
                    </div>
                    <div class="col-xs-7">
                        <span>{{order.dueAt | dateTime}}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-5">
                        <label class="label-key">Assigned Date:</label>
                    </div>
                    <div class="col-xs-7">
                        <span>{{order.assignedAt | dateTime}}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-5">
                        <label class="label-key">Schduled Date:</label>
                    </div>
                    <div class="col-xs-7">
                        <span>{{order.scheduledAt | dateTime}}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-5">
                        <label class="label-key">Schedule Completed Date:</label>
                    </div>
                    <div class="col-xs-7">
                        <span>{{order.scheduleCompletedAt | dateTime}}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-5">
                        <label class="label-key">Completed Date:</label>
                    </div>
                    <div class="col-xs-7">
                        <span>{{order.completedAt | dateTime}}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-5">
                        <label class="label-key">Paid Date:</label>
                    </div>
                    <div class="col-xs-7">
                        <span>{{order.paidAt | dateTime}}</span>
                    </div>
                </div>
                <!---------->
            </div>
        </div>
        <p class="lead bb"> Property Information <i class="fa fa-map-o" @click="toggleGoogleMapDialog"></i></p>
        <div class="row" style="margin-right: -10px;margin-left: -10px;">
            <div class="col-md-6">
                <div class="row">
                    <div class="col-xs-5">
                        <label class="label-key">Address:</label>
                    </div>
                    <div class="col-xs-7">
                        <span>{{order.property.address}}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-5">
                        <label class="label-key">Landmark:</label>
                    </div>
                    <div class="col-xs-7">
                        <span>{{order.property.landmark}}</span>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="row">
                    <div class="col-xs-5">
                        <label class="label-key">Locality:</label>
                    </div>
                    <div class="col-xs-7">
                        <span>{{order.property.locality}}</span>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="row">
                    <div class="col-xs-5">
                        <label class="label-key">Pincode:</label>
                    </div>
                    <div class="col-xs-7">
                        <span>{{order.property.pincode}}</span>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="row">
                    <div class="col-xs-5">
                        <label class="label-key">Subdistrict:</label>
                    </div>
                    <div class="col-xs-7">
                        <span>{{order.property.subdistrict}}</span>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="row">
                    <div class="col-xs-5">
                        <label class="label-key">District:</label>
                    </div>
                    <div class="col-xs-7">
                        <span>{{order.property.district}}</span>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="row">
                    <div class="col-xs-5">
                        <label class="label-key">State:</label>
                    </div>
                    <div class="col-xs-7">
                        <span>{{order.property.state}}</span>
                    </div>
                </div>
            </div>
        </div>
        <p class="lead bb">Borrower Information </p>
        <div class="row" style="margin-right: -10px;margin-left: -10px;">
            <div class="col-md-6">
                <div class="row">
                    <div class="col-xs-5">
                        <label class="label-key">Name:</label>
                    </div>
                    <div class="col-xs-7">
                        <span>{{[
                            order.property.borrowerFirstName,
                            order.property.borrowerMiddleName,
                            order.property.borrowerLastName].join(' ')}}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-5">
                        <label class="label-key">Phone:</label>
                    </div>
                    <div class="col-xs-7">
                        <span>{{order.property.borrowerPhone}}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-5">
                        <label class="label-key">Email:</label>
                    </div>
                    <div class="col-xs-7">
                        <span>{{order.property.borrowerEmail}}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-5">
                        <label class="label-key">Note:</label>
                    </div>
                    <div class="col-xs-7">
                        <span>{{order.property.note}}</span>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <table class="table table-condensed">
                    <thead>
                        <tr>
                            <th>Other Contacts <span class="pull-right"> <i class="fa fa-phone"></i></span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="contact in order.contacts">
                            <td>{{[
                            contact.firstName,
                            contact.middleName,
                            contact.lastName].join(' ')}} <span class="pull-right">{{contact.phone}}</span>  </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <google-map v-if="showGoogleMapDialog" :show="showGoogleMapDialog" @hide="toggleGoogleMapDialog" :order="order"></google-map>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import GoogleMap from './GoogleMap'

const initialData = () => {
  return {
            showEditDialog: false,
            showReportFormDialog: false,
            generateReportButtonDisabled:false,
            showGoogleMapDialog:false,
        }
}


export default {
    name: 'GeneralDetails',
    data:initialData,
    props: {
        order: {
            type:Object,
            default:function(){ return {}; }
        }
    },
    components: {
        GoogleMap
    },
    methods: {
        ...mapActions({
            
        }),
        toggleGoogleMapDialog() {
            this.showGoogleMapDialog = !this.showGoogleMapDialog;
        }
    },
    computed: {
    },
    watch: {
    }
}
</script>