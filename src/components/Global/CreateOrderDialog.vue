<template>
    <b-modal
        :keyboard="false"
        :backdrop="false"
        class="modal-right"
        v-model="show"
        size="lg"
        :title="`NEW ORDER`"
        ref="modal"
        :dialog-style="{width:'50%'}"
        :footer="false"
        :before-close="hide"
    >
    <form @submit.prevent="validateForm('order')"
            autocomplete="off">
        
        <div class="row">
            <div class="col-sm-12">
                <div class="panel panel-default">
                    <div class="panel-heading custom-heading">
                        NEW ORDER
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-sm-4">
                                <vee-select
                                    label="Client"
                                    v-model="order.clientId"
                                    :rules="rules.order.clientId"
                                    name="order.clientId"
                                    @change="getDetails"
                                >
                                    <option value="">SELECT CLIENT</option>
                                    <option v-for="(client,key) in clients" :value="client.id">{{client.name}}</option>
                                </vee-select>
                            </div>
                            <div class="col-sm-4">
                                <vee-select
                                    label="Client User"
                                    v-model="order.clientUserId"
                                    :rules="rules.order.clientUserId"
                                    name="order.clientUserId"
                                >
                                    <option value="">{{clientUsers.length == 0 ? 'NO USERS' : 'SELECT USER'}}</option>
                                        <option v-for="(user,key) in clientUsers" :value="user.id">{{user.name}}</option>
                                </vee-select>
                            </div>
                            <div class="col-sm-4">
                                <vee-select
                                    label="Report Type"
                                    v-model="order.clientReportId"
                                    :rules="rules.order.clientReportId"
                                    name="order.clientReportId"
                                    @change="setFee"
                                >
                                    <option value="">{{clientReports.length== 0 && order.clientId != '' ? 'NO REPORTS CONFIGURED' :'SELECT REPORT'}}</option>
                                    <option v-for="(report) in clientReports" :value="report.id">{{report.name}}</option>
                                </vee-select>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group" :class="{'has-error': errors.has('order.dueAtInput')}">
                                    <label class="control-label">Due Date: <span style="color:red;">*</span></label>
                                    <date-picker
                                        name="order.dueAtInput"
                                        width="100%"
                                        input-class="form-control"
                                        v-model="order.dueAtInput"
                                        v-validate="rules.order.dueAt"
                                        :not-before="new Date()"
                                        :editable="false"
                                        data-vv-as="Due Date"
                                        lang="en"
                                        type="datetime"
                                        format="YYYY-MM-DD HH:mm:ss"
                                        value-type="format"
                                        :time-picker-options="{ start: '00:00', step: '01:00', end: '23:00' }">
                                            
                                        </date-picker>
                                    <span class="help-block" v-show="errors.has('order.dueAtInput')">{{errors.first('order.dueAtInput')}}</span>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <vee-input
                                    label="Reference#"
                                    v-model="order.referenceNumber"
                                    :rules="rules.order.referenceNumber"
                                    name="order.referenceNumber"
                                />
                            </div>
                            <div class="col-sm-4">
                                <vee-input
                                    v-if="hasRole('admin')"
                                    label="Fee"
                                    v-model="order.fee"
                                    :rules="rules.order.fee"
                                    name="order.fee"
                                />
                            </div>
                        </div>
                        <hr class="hr-custom">
                        <div class="row">
                            <div class="col-sm-4">
                                <vee-input
                                label="Address"
                                v-model="order.address.address"
                                :rules="rules.order.address.address"
                                name="order.address.address"
                                />
                            </div>
                            <div class="col-sm-4">
                                <vee-input
                                label="Locality"
                                v-model="order.address.locality"
                                :rules="rules.order.address.locality"
                                name="order.address.locality"
                                />
                            </div>
                            <div class="col-sm-4">
                                <vee-input
                                label="Landmark"
                                v-model="order.address.landmark"
                                :rules="rules.order.address.landmark"
                                name="order.address.landmark"
                                />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-4">
                                <vee-input
                                label="Subdistrict"
                                v-model="order.address.subdistrict"
                                :rules="rules.order.address.subdistrict"
                                name="order.address.subdistrict"
                                />
                            </div>
                            <div class="col-sm-4">
                                <vee-input
                                label="District"
                                v-model="order.address.district"
                                :rules="rules.order.address.district"
                                name="order.address.district"
                                />
                            </div>
                            <div class="col-sm-2">
                                <vee-input
                                label="Pincode"
                                v-model="order.address.pincode"
                                :rules="rules.order.address.pincode"
                                name="order.address.pincode"
                                />
                            </div>
                            
                            <div class="col-sm-2">
                                <vee-select
                                label="State"
                                v-model="order.address.state"
                                :rules="rules.order.address.state"
                                name="order.address.state">
                                <option value="">SELECT STATE</option>
                                <option v-for="state in $states" :value="state.name">{{state.name}}</option>
                            </vee-select>
                            </div>
                        </div>
                        <hr class="hr-custom">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <vee-input
                                        label="Borrower First Name"
                                        v-model="order.borrower.firstName"
                                        :rules="rules.order.borrower.firstName"
                                        name="order.borrower.firstName"
                                        />
                                    </div>
                                    <div class="col-sm-4">
                                        <vee-input
                                        label="Middle Name"
                                        v-model="order.borrower.middleName"
                                        :rules="rules.order.borrower.middleName"
                                        name="order.borrower.middleName"
                                        />
                                    </div>
                                    <div class="col-sm-4">
                                        <vee-input
                                        label="Last Name"
                                        v-model="order.borrower.lastName"
                                        :rules="rules.order.borrower.lastName"
                                        name="order.borrower.lastName"
                                        />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <vee-input
                                        label="Phone"
                                        v-model="order.borrower.phone"
                                        :rules="rules.order.borrower.phone"
                                        name="order.borrower.phone"
                                        />
                                    </div>
                                    <div class="col-sm-6">
                                        <vee-input
                                        label="Email"
                                        v-model="order.borrower.email"
                                        :rules="rules.order.borrower.email"
                                        name="order.borrower.email"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6">
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
                                        <template v-for="(contact,k) in order.contacts">
                                            <tr>
                                                <td>{{(k+1)}}.</td>
                                                <td>{{[contact.firstName,contact.middleName,contact.lastName].join(' ')}}</td>
                                                <td>{{contact.phone}}</td>
                                                <td>{{contact.type}}</td>
                                                <td>
                                                    <i class="fa fa-trash" @click.prevent="order.contacts.splice( k, 1 );"></i>&nbsp;&nbsp;
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
                </div>
            </div>
        </div>


        <div class="row" style="margin-right: -10px;margin-left: -10px;">
            <div class="col-sm-12">
                <div class="panel panel-default">
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
import DatePicker from 'vue2-datepicker';
import moment from 'moment';
import modalMixin from '@/mixins/modalMixin';

const data = () => {
    return {
        rules:{order:rules('order')},
        order: {
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
            contacts:[]
        }
    }
}
export default {
    name: 'CreateOrderDialog',
    mixins:[modalMixin]
    data:data,
    props: {
        show : {
            type: Boolean,
        }
    },
    created() {
        this.getOrderFormMetaAction().then(resp => {
            this.order.dueAtInput =  this.$options.filters.dateTime(
                moment()
                    .add(resp.data.data.settings.dueDatePeriod,'days')
                    .format("YYYY-MM-DD HH:00:00")
            );
        })
    },
    mounted() {
    },
    components: {
        DatePicker
    },
    methods: {
        ...mapActions({
            createOrderAction: 'order/createOrderAction',
            getClientUserAndReportsAction: 'order/getClientUserAndReportsAction',
            getOrderFormMetaAction: 'order/getOrderFormMetaAction',
        }),
        validateForm(scope) {
            let self = this;
            this.$validator.validate().then((result) => {
                if (result) {
                    this.buttonDisabled = true;
                    this.createOrderAction(this.order).then((resp) => {
                        this.$router.push('/orders/'+resp.data.data.id);
                        this.$emit('hide');
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
            if (!this.order.clientId) {
                this.order.clientUserId = '';
                this.order.clientReportId = '';
            }
            this.getClientUserAndReportsAction({clientId:this.order.clientId})
        },
        addContactPerson() {
            this.order.contacts.push({
                firstName:'',
                middleName:'',
                lastName:'',
                phone:'',
                email:'',
                type:'',
                display:true
            });
        },
        setFee() {
            if (this.order.clientReportId) {
                const report = this.clientReports.find(report => {
                    return report.id == this.order.clientReportId
                })
                if (report) {
                    this.order.fee = report.price;
                    return 0;
                }
            }
            this.order.fee = 0;
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
        'order.dueAtInput': function(newVal,old) {
            this.order.dueAt = newVal.replace(' ','T')+this.$root.$tz
        }
    }
}
</script>