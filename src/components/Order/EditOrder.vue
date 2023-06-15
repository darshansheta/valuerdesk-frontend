<style scoped="">
    .mx-datepicker {
        width: 100%;
    }
</style>
<template>
    <form @submit.prevent="validateForm('order')"
            autocomplete="off">
        <h3 class="semi-bold" style="margin-top: 10px;margin-bottom: 15px;">{{`EDIT ORDER - #${order.fileNumber}`}}</h3>

        <div class="row">
            <div class="col-md-9">
                <div class="panel panel-white">
                    <div class="panel-heading text-bold">
                        CLIENT INFORMATION
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-sm-4">
                                <vee-select
                                    label="Client"
                                    v-model="editOrder.clientId"
                                    :rules="rules.vRules.clientId"
                                    name="editOrder.clientId"
                                    @change="getDetails"
                                >
                                    <option value="">SELECT CLIENT</option>
                                    <option v-for="(client,key) in clients" :value="client.id">{{client.name}}</option>
                                </vee-select>
                            </div>
                            <div class="col-sm-4">
                                <vee-select
                                    label="Client User"
                                    v-model="editOrder.clientUserId"
                                    :rules="rules.vRules.clientUserId"
                                    name="editOrder.clientUserId"
                                >
                                    <option value="">{{clientUsers.length == 0 ? 'NO USERS' : 'SELECT USER'}}</option>
                                        <option v-for="(user,key) in clientUsers" :value="user.id">{{user.name}}</option>
                                </vee-select>
                            </div>
                            <div class="col-sm-4">
                                <vee-select
                                    label="Report Type"
                                    v-model="editOrder.clientReportId"
                                    :rules="rules.vRules.clientReportId"
                                    name="editOrder.clientReportId"
                                >
                                    <option value="">{{clientReports.length== 0 && editOrder.clientId != '' ? 'NO REPORTS CONFIGURED' :'SELECT REPORT'}}</option>
                                    <option v-for="(report) in clientReports" :value="report.id">{{report.name}}</option>
                                </vee-select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="form-group" :class="{'has-error': errors.has('editOrder.dueAtInput')}">
                                    <label class="control-label">Due Date: <span style="color:red;">*</span></label>
                                    <date-picker
                                        name="editOrder.dueAtInput"
                                        width="100%"
                                        input-class="form-control"
                                        v-model="dueAtInput"
                                        v-validate="rules.vRules.dueAt"
                                        :not-before="new Date()"
                                        :editable="false"
                                        data-vv-as="Due Date"
                                        :open.sync="datePickerPopupOpen"
                                        @change="handleDatePickerChange"
                                        type="datetime"
                                        format="YYYY-MM-DD HH:mm:ss"
                                        value-type="format"
                                        :time-picker-options="{ start: '00:00', step: '01:00', end: '23:00' }">
                                            
                                        </date-picker>
                                    <span class="help-block" v-show="errors.has('editOrder.dueAtInput')">{{errors.first('editOrder.dueAtInput')}}</span>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <vee-input
                                    label="Reference#"
                                    v-model="editOrder.referenceNumber"
                                    :rules="rules.vRules.referenceNumber"
                                    name="editOrder.referenceNumber"
                                />
                            </div>
                            <div class="col-sm-4">
                                <!-- <vee-input
                                    v-if="hasRole('admin')"
                                    label="Fee"
                                    v-model="editOrder.fee"
                                    :rules="rules.vRules.fee"
                                    name="editOrder.fee"
                                /> -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel panel-white">
                    <div class="panel-heading text-bold">
                        ADDRESS INFORMATION
                    </div>
                    <div class="panel-body">
                        <!-- <hr class="hr-custom"> -->
                        <div class="row">
                            <div class="col-sm-4">
                                <vee-input
                                label="Address"
                                v-model="editOrder.address.address"
                                :rules="rules.vRules.address.address"
                                name="editOrder.address.address"
                                />
                            </div>
                            <div class="col-sm-4">
                                <vee-input
                                label="Landmark"
                                v-model="editOrder.address.landmark"
                                :rules="rules.vRules.address.landmark"
                                name="editOrder.address.landmark"
                                />
                            </div>
                            <div class="col-sm-4">
                                <vee-input
                                label="Locality"
                                v-model="editOrder.address.locality"
                                :rules="rules.vRules.address.locality"
                                name="editOrder.address.locality"
                                />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-2">
                                <vee-input
                                label="Pincode"
                                v-model="editOrder.address.pincode"
                                :rules="'required'"
                                name="editOrder.address.pincode"
                                input-id="editOrderPincodeInputEle"
                                placeholder="Type to Search..."
                                />
                                <typeahead v-model="editOrder.address.pincode" v-if="mounteTypeahead" target="#editOrderPincodeInputEle" 
                                 async-src="/api/pincodes?q="
                                 @input="pincodeSelected"
                                 item-key="pincode"/>
                            </div>
                            
                            <div class="col-sm-2">
                                <vee-select
                                label="State"
                                v-model="editOrder.address.state"
                                :rules="rules.vRules.address.state"
                                name="editOrder.address.state">
                                <option value="">SELECT STATE</option>
                                <option v-for="state in $states" :value="state.name.toUpperCase()">{{state.name.toUpperCase()}}</option>
                            </vee-select>
                            </div>
                            <div class="col-sm-4">
                                <vee-input
                                label="Subdistrict"
                                v-model="editOrder.address.subdistrict"
                                :rules="rules.vRules.address.subdistrict"
                                name="editOrder.address.subdistrict"
                                />
                            </div>
                            <div class="col-sm-4">
                                <vee-input
                                label="District"
                                v-model="editOrder.address.district"
                                :rules="rules.vRules.address.district"
                                name="editOrder.address.district"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel panel-white">
                    <div class="panel-heading text-bold">
                        BORROWER INFORMATION
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-sm-4">
                                <vee-input
                                label="Borrower First Name"
                                v-model="editOrder.borrower.firstName"
                                :rules="rules.vRules.borrower.firstName"
                                name="editOrder.borrower.firstName"
                                />
                            </div>
                            <div class="col-sm-4">
                                <vee-input
                                label="Middle Name"
                                v-model="editOrder.borrower.middleName"
                                :rules="rules.vRules.borrower.middleName"
                                name="editOrder.borrower.middleName"
                                />
                            </div>
                            <div class="col-sm-4">
                                <vee-input
                                label="Last Name"
                                v-model="editOrder.borrower.lastName"
                                :rules="rules.vRules.borrower.lastName"
                                name="editOrder.borrower.lastName"
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-8">
                                <vee-input
                                label="Phone"
                                v-model="editOrder.borrower.phone"
                                :rules="rules.vRules.borrower.phone"
                                name="editOrder.borrower.phone"
                                />
                            </div>
                            <div class="col-sm-4">
                                <vee-input
                                label="Email"
                                v-model="editOrder.borrower.email"
                                :rules="rules.vRules.borrower.email"
                                name="editOrder.borrower.email"
                                />
                            </div>
                        </div>
                        <hr>
                        <h5 class="semi-bold">Other Contacts</h5>
                    </div>
                    <table class="table table-condensed">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th width="50">&nbsp;&nbsp;&nbsp; &nbsp; <a href="javascript:void(0)" @click="addContactPerson"><i class="fa fa-plus"></i></a> </th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(contact,k) in editOrder.contacts">
                                <tr>
                                    <td>{{(k+1)}}.</td>
                                    <td>{{[contact.firstName,contact.middleName,contact.lastName].join(' ')}}</td>
                                    <td>{{contact.phone}}</td>
                                    <!-- <td>{{contact.email}}</td> -->
                                    <td>
                                        <i class="fa fa-trash" @click.prevent="editOrder.contacts.splice( k, 1 );"></i>&nbsp;&nbsp;
                                        <i :class="{'fa fa-chevron-right': !contact.display,'fa fa-chevron-down': contact.display}" @click.prevent="contact.display = !contact.display"></i>
                                    </td>
                                </tr>
                                <tr v-show="contact.display">
                                    <td colspan="4" class="">
                                        <div class="row">
                                            <div class="col-md-3 col-sm-6">
                                                <vee-input
                                                label="First Name"
                                                v-model="contact.firstName"
                                                :rules="rules.vRules.borrower.firstName"
                                                :name="`contact.firstName.${k}`"
                                                />
                                            </div>
                                            <div class="col-md-3 col-sm-6">
                                                <vee-input
                                                label="Middle Name"
                                                v-model="contact.middleName"
                                                :rules="rules.vRules.borrower.middleName"
                                                :name="`contact.middleName.${k}`"
                                                />
                                            </div>
                                            <div class="col-md-3 col-sm-6">
                                                <vee-input
                                                label="Last Name"
                                                v-model="contact.lastName"
                                                :rules="rules.vRules.borrower.lastName"
                                                :name="`contact.lastName.${k}`"
                                                />
                                            </div>
                                            <div class="col-md-3 col-sm-6">
                                                <vee-input
                                                label="Phone"
                                                v-model="contact.phone"
                                                :rules="rules.vRules.borrower.phone"
                                                :name="`contact.phone.${k}`"
                                                />
                                            </div>
                                        </div>
                                        <!-- <div class="row">
                                            <div class="col-sm-4">
                                                <vee-input
                                                label="E-Mail"
                                                v-model="contact.email"
                                                :rules="rules.vRules.borrower.email"
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
                                        </div> -->
                                    </td>
                                </tr>
                            </template>
                            <tr v-if="editOrder.contacts.length ==0">
                                <td colspan="5" align="center">No Contact(s).</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-md-3">
                <div class="panel panel-white">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <label class="control-label">Notes</label>
                                <textarea class="form-control" v-model="editOrder.note" style="resize: vertical;" rows="10"></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="panel panel-white">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <button type="submit" class="btn btn-primary btn-block">SUBMIT</button>
                            </div>
                        </div>
                        <div class="row" style="margin-top: 10px">
                            <div class="col-sm-6">
                                <button type="button" class="btn btn-default btn-block" @click="hide">CANCEL</button>
                            </div>
                            <div class="col-sm-6">
                                <button type="button" class="btn btn-block">RESET</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        
    </form>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Router from 'vue-router'
import rules from '@/validations/rules';
import DatePicker from 'vue2-datepicker';
import moment from 'moment';
import Typeahead from '../Shared/typeahead/Typeahead';
import 'vue2-datepicker/index.css';

const data = () => {
    return {
        rules:{vRules:rules('order')},
        editOrderPincodeInputEle:null,
        mounteTypeahead:false,
        datePickerPopupOpen:false,
        dueAtInput:'',
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
                LastName:'',
                phone:'',
                email:''
            },
            contacts:[],
            note:'',
        }
    }
}
export default {
    name: 'EditOrder',
    data:data,
    props: {
        show : {
            type: Boolean,
        },
        order:{
            type:Object,
            default:() => {}
        }
    },
    created() {
        //this.editOrderPincodeInputEle = this.$refs.editOrderPincodeInputEle
        // this.getOrderFormMetaAction().then(resp => {
        //     this.editOrder.dueAtInput =  this.$options.filters.dateTime(
        //         moment()
        //             .add(resp.data.data.settings.dueDatePeriod,'days')
        //             .format("YYYY-MM-DD HH:00:00")
        //     );
        // })
    },
    mounted() {
        if (document.getElementById('editOrderPincodeInputEle')) {
            this.mounteTypeahead = true;
        }
        this.editOrder.clientId = this.order.clientId;
        this.editOrder.clientUserId = this.order.clientUserId;
        this.editOrder.clientReportId = this.order.clientReportId;
        this.dueAtInput =  this.$options.filters.dateTime(this.order.dueAt);
        this.editOrder.referenceNumber = this.order.referenceNumber;
        //this.editOrder.fee = this.order.fee;

        this.editOrder.address.address = this.order.property.address;
        this.editOrder.address.landmark = this.order.property.landmark;
        this.editOrder.address.locality = this.order.property.locality;
        this.editOrder.address.pincode = this.order.property.pincode;
        this.editOrder.address.subdistrict = this.order.property.subdistrict;
        this.editOrder.address.district = this.order.property.district;
        this.editOrder.address.state = this.order.property.state.toUpperCase();

        this.editOrder.borrower.firstName = this.order.property.borrowerFirstName;
        this.editOrder.borrower.middleName = this.order.property.borrowerMiddleName;
        this.editOrder.borrower.lastName = this.order.property.borrowerLastName;
        this.editOrder.borrower.phone = this.order.property.borrowerPhone;
        this.editOrder.borrower.email = this.order.property.borrowerEmail;
        this.editOrder.note = this.order.property.note;
        this.editOrder.contacts = this.order.contacts.map((contact) => {
            return {...contact,display:true};
        });

        this.getDetails();
    },
    components: {
        DatePicker,
        Typeahead
    },
    methods: {
        ...mapActions({
            updateOrderAction: 'order/updateOrderAction',
            getClientUserAndReportsAction: 'order/getClientUserAndReportsAction',
            getClientUserAndReportsAction: 'order/getClientUserAndReportsAction',
            getOrderFormMetaAction: 'order/getOrderFormMetaAction',
        }),
        handleDatePickerChange(val , type) {
            if (type == 'time') {
                this.datePickerPopupOpen = false;
            }
        },
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
        },
        pincodeSelected(pin,a) {
            if (pin.subdistrict) {
                this.editOrder.address.subdistrict = pin.subdistrict
                this.editOrder.address.district = pin.district
                this.editOrder.address.state = pin.state
            }
        }
    },
    computed: {
        ...mapGetters({
            clients: 'client/allClientsGetter',
            clientUsers: 'order/clientUsersGetter',
            clientReports: 'order/clientReportsGetter'
            //clients: 'client/allClientsGetter'
            //clients: this.$store.getters['client/allClientsGetter'](this.clientSearch)
        }),
    },
    watch:{
        // 'order.dueAtInput': function(newVal,old) {
        //     this.editOrder.dueAt = newVal.replace(' ','T')+this.$root.$tz
        // },
        dueAtInput: {
            handler(newVal, oldVal) {
                //console.log(newVal.dueAtInput,oldVal.dueAtInput,24,newVal.dueAtInput.replace(' ','T')+this.$root.$tz)
                //if (newVal.dueAtInput != oldVal.dueAtInput) {
                    this.editOrder.dueAt = newVal.replace(' ','T')+this.$root.$tz
                //}
            },
            deep:true
        }
    }
}
</script>