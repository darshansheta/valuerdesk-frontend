<style type="text/css" scoped>
    .queue-filters div[class*=col-] {
        padding-left: 2px;
        padding-right: 2px;
    }
</style>
<template>
    <div class="container-fluid" style="border-bottom: 1px solid rgb(221, 221, 221);padding-bottom: 10px;padding-top: 10px">
        <div class="row">
            <div class="col-md-12 queue-filters">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="row" style="margin-right: -2px;margin-left: 0;">

                            <div class="col-xs-3">
                                <select class="form-control" v-model="status">
                                    <option value="1,2,3,4,6">ALL OPEN</option>
                                    <option value="1">NEW</option>
                                    <option value="2">ASSIGNED</option>
                                    <option value="3">SCHEDULED</option>
                                    <option value="4">SUBMITTED</option>
                                    <option value="5">COMPLETED</option>
                                    <option value="6">ON HOLD</option>
                                    <option value="7">CANCELLED</option>
                                </select>
                            </div>
                            <div class="col-xs-3">
                                <input type="text" class="form-control" v-model="filters.fileNumber" placeholder="File#">
                            </div>
                            <div class="col-xs-3">
                                <input type="text" class="form-control" v-model="filters.referenceNumber" placeholder="Reference#">
                            </div>
                            <div class="col-xs-3">
                                <select class="form-control" v-model="filters.clientId">
                                    <option value="">CLIENTS</option>
                                    <option v-for="(client,key) in clients" :value="client.id">{{client.name}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-8">
                        <!-- filters -->
                        <div class="row" style="margin-right: 0;margin-left: -2px;">
                            <div class="col-sm-2 col-xs-2">
                                <input type="text" class="form-control" v-model="filters.address" placeholder="Address">
                            </div>
                            <div class="col-sm-2 col-xs-2">
                                <input type="text" class="form-control" v-model="filters.borrower" placeholder="Borrower Name">
                            </div>
                            <div class="col-sm-2 col-xs-2">
                                <select class="form-control" v-model="filters.reportId">
                                    <option value="">REPORTS</option>
                                    <option v-for="(report,key) in reports" :value="report.id">{{report.name}}</option>
                                </select>
                            </div>
                            <div class="col-sm-2 col-xs-2">
                                <select class="form-control" v-model="filters.assigneeId">
                                    <option value="">ASSIGNEE</option>
                                    <option v-for="(staff,key) in staffUsers" :value="staff.id">{{staff.name}}</option>
                                </select>
                            </div>
                            <div class="col-sm-2 col-xs-2">
                                <select class="form-control" v-model="filters.staffId">
                                    <option value="">STAFF</option>
                                    <option v-for="(staff,key) in staffUsers" :value="staff.id">{{staff.name}}</option>
                                </select>
                            </div>
                            <div class="col-sm-2 col-xs-2">
                                <date-picker lang='en' format="YYYY-MM-DD" value-type="format" input-class="form-control" v-model="filters.createdAt" range :confirm="true" ></date-picker>
                            </div>
                        </div>
                        <!-- ------- -->
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions,mapMutations } from 'vuex';
import _ from 'lodash';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
const initialData = () => {
    return {
        filters: {
            createdAt: '',
            fileNumber: '',
            referenceNumber: '',
            borrower: '',
            address: '',
            clientId: '',
            reportId: '',
            assigneeId: '',
            staffId: '',
        }
    }
}
export default {
    name:'QueueFilter',
    data:initialData,
    props:{
        queue:String
    },
    components : {
        DatePicker
    },
    methods: {

        ...mapMutations({
            filtersMutation: 'dashboard/filtersMutation'
        }),
    },
    computed: {
        ...mapGetters({
            clients: 'client/allClientsGetter',
            reports: 'report/allReportsGetter',
            staffUsers: 'staff/allStaffGetter',
        }),
        status: {
            get () {
                return this.$store.state.dashboard.status
            },
            set (val) {
                this.$store.commit('dashboard/statusMutation',val)
            }
        }
    },
    watch: {
        filters: {
            handler:_.debounce(function(){
                this.$emit('filterChange',{...this.filters,status:this.status});
            },300),
            deep: true
        },
        status: function(val) {
            this.$emit('filterChange',{...this.filters,status:this.status});
        }
  }
}
</script>