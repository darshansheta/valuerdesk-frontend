<template>
    <b-modal
        :keyboard="false"
        :backdrop="false"
        class="modal-right"
        v-model="show"
        :title="`Edit Client Info. - ${order.fileNumber}`"
        ref="modal"
        :dialog-style="{width:'65%'}"
        :footer="false"
        :before-close="hide"
    >
    <form
        @submit.prevent="validateForm('editOrder')"
        autocomplete="off"
    >
        <div class="row">
            <div class="col-sm-6">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <vee-select
                            label="Client"
                            v-model="editOrder.clientId"
                            :rules="rules.order.clientId"
                            name="editOrder.clientId"
                            @change="getDetails"
                        >
                            <option value="">SELECT CLIENT</option>
                            <option v-for="(client,key) in clients" :value="client.id">{{client.name}}</option>
                        </vee-select>
                        <vee-select
                            label="Client User"
                            v-model="editOrder.clientUserId"
                            :rules="rules.order.clientUserId"
                            name="editOrder.clientUserId"
                        >
                            <option value="">{{clientUsers.length == 0 ? 'NO USERS' : 'SELECT USER'}}</option>
                                <option v-for="(user,key) in clientUsers" :value="user.id">{{user.name}}</option>
                        </vee-select>
                        <vee-select
                            label="Report Type"
                            v-model="editOrder.clientReportId"
                            :rules="rules.order.clientReportId"
                            name="editOrder.clientReportId"
                        >
                            <option value="">{{clientReports.length== 0 && editOrder.clientId != '' ? 'NO REPORTS CONFIGURED' :'SELECT REPORT'}}</option>
                            <option v-for="(report) in clientReports" :value="report.id">{{report.name}}</option>
                        </vee-select>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="form-group" :class="{'has-error': errors.has('editOrder.dueAtInput')}">
                            <label class="control-label">Due Date: <span style="color:red;">*</span></label>
                        <date-picker
                            name="editOrder.dueAtInput"
                            width="100%"
                            input-class="form-control"
                            v-model="editOrder.dueAtInput"
                            v-validate="rules.order.dueAt"
                            data-vv-as="Due Date"
                            :editable="false"
                            lang="en"
                            type="datetime"
                            format="YYYY-MM-DD HH:mm:ss"
                            value-type="format"
                            :time-picker-options="{ start: '00:00', step: '01:00', end: '23:00' }">
                                
                            </date-picker>
                            <span class="help-block" v-show="errors.has('editOrder.dueAtInput')">{{errors.first('editOrder.dueAtInput')}}</span>
                        </div>
                        <!-- <vee-input
                            label="Due Date"
                            v-model="editOrder.dueAtInput"
                            :rules="rules.order.dueAt"
                            placeholder="YYYY-MM-DD HH"
                            name="editOrder.dueAtInput"
                        /> -->
                        <vee-input
                            label="Reference#"
                            v-model="editOrder.referenceNumber"
                            :rules="rules.order.referenceNumber"
                            name="editOrder.referenceNumber"
                        />
                        <vee-input
                            v-if="false"
                            label="Fee"
                            v-model="editOrder.fee"
                            :rules="rules.order.fee"
                            name="editOrder.fee"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <vee-input
                                label="Address"
                                v-model="editOrder.address.address"
                                :rules="rules.order.address.address"
                                name="editOrder.address.address"
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <vee-input
                                label="Locality"
                                v-model="editOrder.address.locality"
                                :rules="rules.order.address.locality"
                                name="editOrder.address.locality"
                                />
                            </div>
                            <div class="col-sm-6">
                                <vee-input
                                label="Landmark"
                                v-model="editOrder.address.landmark"
                                :rules="rules.order.address.landmark"
                                name="editOrder.address.landmark"
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <vee-input
                                label="Subdistrict"
                                v-model="editOrder.address.subdistrict"
                                :rules="rules.order.address.subdistrict"
                                name="editOrder.address.subdistrict"
                                />
                            </div>
                            <div class="col-sm-6">
                                <vee-input
                                label="Pincode"
                                v-model="editOrder.address.pincode"
                                :rules="rules.order.address.pincode"
                                name="editOrder.address.pincode"
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <vee-input
                                label="District"
                                v-model="editOrder.address.district"
                                :rules="rules.order.address.district"
                                name="editOrder.address.district"
                                />
                            </div>
                            <div class="col-sm-6">
                                <vee-select
                                label="State"
                                v-model="editOrder.address.state"
                                :rules="rules.order.address.state"
                                name="editOrder.address.state">
                                <option value="">SELECT STATE</option>
                                <option v-for="state in $states" :value="state.name">{{state.name}}</option>
                            </vee-select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="row" style="margin-right: -10px;margin-left: -10px;">
            <div class="col-sm-12">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-sm-4">
                                <vee-input
                                label="Borrower First Name"
                                v-model="editOrder.borrower.firstName"
                                :rules="rules.order.borrower.firstName"
                                name="editOrder.borrower.firstName"
                                />
                            </div>
                            <div class="col-sm-4">
                                <vee-input
                                label="Middle Name"
                                v-model="editOrder.borrower.middleName"
                                :rules="rules.order.borrower.middleName"
                                name="editOrder.borrower.middleName"
                                />
                            </div>
                            <div class="col-sm-4">
                                <vee-input
                                label="Last Name"
                                v-model="editOrder.borrower.lastName"
                                :rules="rules.order.borrower.lastName"
                                name="editOrder.borrower.lastName"
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <vee-input
                                label="Phone"
                                v-model="editOrder.borrower.phone"
                                :rules="rules.order.borrower.phone"
                                name="editOrder.borrower.phone"
                                />
                            </div>
                            <div class="col-sm-6">
                                <vee-input
                                label="Email"
                                v-model="editOrder.borrower.email"
                                :rules="rules.order.borrower.email"
                                name="editOrder.borrower.email"
                                />
                            </div>
                        </div>
                    </div>

                    <table class="table table-condensed">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Type</th>
                                <th width="50">&nbsp;&nbsp;&nbsp; &nbsp; <a href="javascript:void(0)" @click="addContactPerson"><i class="fa fa-plus"></i></a> </th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(contact,k) in editOrder.contacts">
                                <tr>
                                    <td>{{(k+1)}}.</td>
                                    <td>{{[contact.firstName,contact.middleName,contact.lastName].join(' ')}}</td>
                                    <td>{{contact.phone}}</td>
                                    <td>{{contact.type}}</td>
                                    <td>
                                        <i class="fa fa-trash" @click.prevent="editOrder.contacts.splice( k, 1 );"></i>&nbsp;&nbsp;
                                        <i :class="{'fa fa-chevron-right': !contact.display,'fa fa-chevron-down': contact.display}" @click.prevent="contact.display = !contact.display"></i>
                                    </td>
                                </tr>
                                <tr v-show="contact.display">
                                    <td colspan="5" class="">
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <vee-input
                                                label="First Name"
                                                v-model="contact.firstName"
                                                :rules="rules.order.borrower.firstName"
                                                :name="`contact.firstName.${k}`"
                                                />
                                            </div>
                                            <div class="col-sm-4">
                                                <vee-input
                                                label="Middle Name"
                                                v-model="contact.middleName"
                                                :rules="rules.order.borrower.middleName"
                                                :name="`contact.middleName.${k}`"
                                                />
                                            </div>
                                            <div class="col-sm-4">
                                                <vee-input
                                                label="Last Name"
                                                v-model="contact.lastName"
                                                :rules="rules.order.borrower.lastName"
                                                :name="`contact.lastName.${k}`"
                                                />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <vee-input
                                                label="Phone"
                                                v-model="contact.phone"
                                                :rules="rules.order.borrower.phone"
                                                :name="`contact.phone.${k}`"
                                                />
                                            </div>
                                            <div class="col-sm-4">
                                                <vee-input
                                                label="E-Mail"
                                                v-model="contact.email"
                                                :rules="rules.order.borrower.email"
                                                :name="`contact.email.${k}`"
                                                />
                                            </div>
                                            <div class="col-sm-4">
                                                <vee-select
                                                label="Contact Type"
                                                v-model="contact.type"
                                                :rules="'required'"
                                                :name="`contact.type.${k}`"
                                                >
                                                <option value="">SELECT TYPE</option>
                                                <option value="co-borrower">Co-Borrower</option>
                                                <option value="owner">Owner</option>
                                                <option value="other">Other</option>
                                                </vee-select>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </template>
                            <tr v-if="order.contacts.length ==0">
                                <td colspan="5" align="center">No Contact(s).</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>

        <div class="row" style="margin-right: -10px;margin-left: -10px;">
            <div class="col-sm-12">
                <label class="control-label">Notes</label>
                <textarea class="form-control" style="resize: vertical;"></textarea>
                <div class="row" style="margin-top: 15px;">
                    <div class="col-xs-4">
                        <button type="submit" class="btn btn-primary btn-block">SUBMIT</button>
                    </div>
                    <div class="col-xs-4">
                        <button type="button" class="btn btn-block">RESET</button>
                    </div>
                    <div class="col-xs-4">
                        <button type="button" class="btn btn-default btn-block" @click="hide">CANCEL</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
       
    </b-modal>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Router from 'vue-router'
import rules from '@/validations/rules';

const initialData = () => {
    return {
        rules:{order:rules('order')},
        buttonDisabled:false,
        note:'',
        editOrder: {
            clientId: '',
            clientUserId: '',
            clientReportId: '',
            dueAt:'',
            dueAtInput:'',
            referenceNumber:'',
            fee:'',
            address: {
                address: '',
                landmark: '',
                locality: '',
                pincode: '',
                subdistrict: '',
                district: '',
                state: '',
            },
            borrower:{
                firstName:'',
                middleName:'',
                lastName:'',
                phone:'',
                email:''
            },
            contacts:[]
        }
    }
}

import DatePicker from 'vue2-datepicker';
export default {
    name: 'EditOrderDialog',
    data:initialData,
    props: {
        show : {
            type: Boolean
        },
        order:{
            type:Object,
            default:() => {}
        }
    },
    mounted() {
        this.editOrder.clientId = this.order.clientId;
        this.editOrder.clientUserId = this.order.clientUserId;
        this.editOrder.clientReportId = this.order.clientReportId;
        this.editOrder.dueAtInput =  this.$options.filters.dateTime(this.order.dueAt);
        this.editOrder.referenceNumber = this.order.referenceNumber;
        this.editOrder.fee = this.order.fee;

        this.editOrder.address.address = this.order.property.address;
        this.editOrder.address.landmark = this.order.property.landmark;
        this.editOrder.address.locality = this.order.property.locality;
        this.editOrder.address.pincode = this.order.property.pincode;
        this.editOrder.address.subdistrict = this.order.property.subdistrict;
        this.editOrder.address.district = this.order.property.district;
        this.editOrder.address.state = this.order.property.state;

        this.editOrder.borrower.firstName = this.order.property.borrowerFirstName;
        this.editOrder.borrower.middleName = this.order.property.borrowerMiddleName;
        this.editOrder.borrower.lastName = this.order.property.borrowerLastName;
        this.editOrder.borrower.phone = this.order.property.borrowerPhone;
        this.editOrder.borrower.email = this.order.property.borrowerEmail;
        this.editOrder.contacts = this.order.contacts.map((contact) => {
            return {...contact,display:true};
        });

        this.getDetails();
    },
    components: {
        DatePicker
    },
    methods: {
        ...mapActions({
            updateOrderAction: 'order/updateOrderAction',
            getClientUserAndReportsAction: 'order/getClientUserAndReportsAction',
        }),
        validateForm(scope) {
            let self = this;
            this.$validator.validate().then((result) => {
                if (result) {
                    this.buttonDisabled = true;
                    this.updateOrderAction({id:this.order.id, order:this.editOrder}).then((resp) => {
                        
                        self.hide();
                    }).catch(function(e){
                        console.log(e)
                    }).finally(function(res){
                        self.buttonDisabled = false;
                    });

                }
            });
        },
        hide() {
            this.$emit('hide')
        },
        getDetails(){
            this.getClientUserAndReportsAction({clientId:this.editOrder.clientId}).then(res => {
                this.editOrder.clientUserId = ""+this.order.clientUserId;
                this.editOrder.clientReportId = ""+this.order.clientReportId;
            })
        },
        addContactPerson() {
            this.editOrder.contacts.push({
                firstName:'',
                middleName:'',
                lastName:'',
                phone:'',
                email:'',
                type:'',
                display:true
            });
        }
    },
    computed: {
        ...mapGetters({
            clients: 'client/allClientsGetter',
            clientUsers: 'order/clientUsersGetter',
            clientReports: 'order/clientReportsGetter'
        }),
    },
    watch:{
        'editOrder.dueAtInput': function(newVal,old) {
            this.editOrder.dueAt = newVal.replace(' ','T')+this.$root.$tz
        }
    }
}
</script>