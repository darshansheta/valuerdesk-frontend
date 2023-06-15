<style type="text/css" scoped="">
    .tab-border {
        padding: 10px 0 0 0;
    }
</style>
<template>
    <div class="row" style="margin-top: 10px; background-color: #fff">
        <sale-filter :queue="'all'" @filterChange="filterChangeHandler('all',$event)"></sale-filter>
        <my-table 
            v-bind:fields="fields" 
            v-bind:reducerAppend="reducerAppend" 
            v-bind:staticAppends="staticAppends" 
            v-bind:reducerPrepend="reducerPrepend" 
            v-bind:data="queues['all'].data"
            v-bind:displayIndex="true"
            v-bind:responsive="true"
            :table-class="['table-condensed table-hover']"
            v-on:change="filterQueue('all',$event)"
            style="margin:10px 5px 0 5px;"
            v-on:export="filterQueueAction({queue:'all',export:1})"
            :exportButton="false"
            :reducer="'clientId'"
            >
            <div slot="action" slot-scope="props" class="text-right">
                <action-bar :order="props.rowData" :dashBoardDropdown="true"></action-bar>
            </div>
            <div
                slot="status"
                slot-scope="props"
                v-html="$options.filters.statusLabel(props.rowData.statusId)"
                :title="`${props.rowData.address},${props.rowData.district},${props.rowData.state},${props.rowData.pincode}`"
            >
            </div>
            <div
                slot="file_d"
                slot-scope="props"
                
            >
            <a @click="loadOrder(props.rowData.id)" href="javascript:void(0)">{{props.rowData.fileNumber}}</a>
            </div>
        </my-table>
    </div>
</template> 
<script>
import SaleFilter from  '@/components/Sale/SaleFilter'
import { mapGetters, mapActions, mapMutations } from 'vuex';
import MyTable from '@/components/Shared/MyTable/MyTable'
import CssConfig from '@/components/Shared/VuetableCssConfig.js'
import moment from 'moment';
import ActionBar from '@/components/Order/ActionBar'

let reducerPrepend = [
                {
                    name: '0.clientName',
                    title:'Client Name',
                    colspan:"11",
                    dataClass:'bold',
                    sortField: false,
                    href:function(rows){
                        return `/clients/${rows[0].clientId}`;
                    }
                },

            ];

let reducerAppend = [
                {
                    name: '',
                    title:'Total Fee : ',
                    colspan:"6",
                    dataClass:'text-right',
                    sortField: false,
                    callback:function(rows){
                        return `<strong>Total Fee: </strong>`;
                    }
                },
                {
                    name: '',
                    title:'Total Fee',
                    dataClass:'text-right text-bold',
                    sortField: false,
                    callback:function(rows){
                        return rows.reduce((data, row) =>{
                            return data = data + parseFloat(row.fee)
                        },0.0).toFixed(2);
                    }
                },
                {
                    name: '',
                    title:'Total Fee Paid',
                    dataClass:'text-right text-bold',
                    sortField: false,
                    callback:function(rows){
                        return rows.reduce((data, row) => {
                            return data = data + (row.paymentStatusId == 1 ? parseFloat(row.fee) : 0.0)
                        },0.0).toFixed(2);
                    }
                },
                {
                    name: '',
                    title:'Total Due',
                    dataClass:'text-right text-bold',
                    sortField: false,
                    callback:function(rows){
                        return rows.reduce((data, row) => {
                            return data = data + (row.paymentStatusId == 0 ? parseFloat(row.fee) : 0.0)
                        },0.0).toFixed(2);
                    }
                },
                {
                    name: '0.a', // any undifned propert can be used to display nothing
                    title:'',
                    colspan:'3',
                    sortField: false,
                },
                

            ];

let staticAppends = [
                [
                    {
                        name: '',
                        title:'Page Total Fee : ',
                        colspan:"6",
                        dataClass:'text-right',
                        sortField: false,
                        callback:function(rows){
                            return `<strong>Page Total Fee: </strong>`;
                        }
                    },
                    {
                        name: '',
                        title:'Total Fee',
                        dataClass:'text-right text-bold',
                        sortField: false,
                        callback:function(data){
                            return data.data ? data.data.reduce((data, row) =>{
                                return data = data + parseFloat(row.fee)
                            },0.0).toFixed(2) : 0;
                        }
                    },
                    {
                        name: '',
                        title:'Total Fee Paid',
                        dataClass:'text-right text-bold',
                        sortField: false,
                        callback:function(data){
                            return data.data ? data.data.reduce((data, row) => {
                                return data = data + (row.paymentStatusId == 1 ? parseFloat(row.fee) : 0.0)
                            },0.0).toFixed(2) : 0;
                        }
                    },
                    {
                        name: '',
                        title:'Total Due',
                        dataClass:'text-right text-bold',
                        sortField: false,
                        callback:function(data){
                            return data.data ? data.data.reduce((data, row) => {
                                return data = data + (row.paymentStatusId == 1 ? parseFloat(row.fee) : 0.0)
                            },0.0).toFixed(2) : 0;
                        }
                    },
                    {
                        name: '0.a', // any undifned propert can be used to display nothing
                        title:'',
                        colspan:'3',
                        sortField: false,
                    }
                ],
                [
                    {
                        name: '',
                        title:'All Pages Total Fee : ',
                        colspan:"6",
                        dataClass:'text-right',
                        sortField: false,
                        callback:function(rows){
                            return `<strong>All Pages Total Fee: </strong>`;
                        }
                    },
                    {
                        name: 'totalFee',
                        title:'Total Fee',
                        dataClass:'text-right text-bold',
                        sortField: false,
                    },
                    {
                        name: 'totalPaid',
                        title:'Total Fee Paid',
                        dataClass:'text-right text-bold',
                        sortField: false,
                    },
                    {
                        name: 'totalUnPaid',
                        title:'Total Due',
                        dataClass:'text-right text-bold',
                        sortField: false,
                    },
                    {
                        name: '0.a', // any undifned propert can be used to display nothing
                        title:'',
                        colspan:'3',
                        sortField: false,
                    }
                ]

            ];
let fields = [{
                name: 'id',
                title:'#',
                sortField: 'id',
                visible:false
            },/* {
                name: 'fileNumber',
                sortField: 'file_number',
                title: 'File#',
                href:function(row){
                    return `/orders/${row.id}`;
                },
                callback(val) {
                    return '#'+val;
                }
            },*/{
                name: 'file_d',
                sortField: 'file_number',
                Title: 'File#'
            }, {
                name: 'status',
                title: 'Status'
            },/*{
                name: 'clientName',
                sortField: 'client_name',
                title: 'Client',
                href:function(row){
                    return `/clients/${row.clientId}`;
                }
            },*/ {
                name: 'clientUserName',
                sortField: 'client_user_name',
                title: 'Order For',
            }, {
                name: 'reporName',
                sortField: 'report_name',
                title: 'Report Type',
            },/*  {
                name: 'borrowerFullname',
                sortField: 'borrower_fullname',
                title: 'Borrower',
            },*/  {
                name: 'assigneeName',
                sortField: 'assignee_name',
                title: 'Assignee',
            }, {
                name:'fee',
                sortField:false,
                title:'Fee',
                dataClass: 'text-right',
                titleClass: 'text-right'

            }, {
                name:'',
                sortField:false,
                title:'Paid Amount',
                dataClass: 'text-right',
                titleClass: 'text-right',
                callback:function(row) {
                    return row.paymentStatusId == 1 ? row.fee : '0.00';
                }
            }, {
                name:'',
                sortField:false,
                title:'Due amount',
                dataClass: 'text-right',
                titleClass: 'text-right',
                callback:function(row) {
                    return row.paymentStatusId == 0 ? row.fee : '0.00';
                }
            },
              {
                name: 'createdAt',
                sortField: 'created_at',
                title: 'Create Date',
                callback: function(date) {
                    
                    return moment(date).format('DD/MM/YYYY  h:mm A');

                }
            },
            {
                name:'action',
                title:'Action'
            }
            ];
            const data = () => {
                return {
                    fields: fields,
                    reducerAppend,
                    reducerPrepend,
                    staticAppends,
                }
            }
export default{
    name: 'Sale',
    components: {
        SaleFilter,
        MyTable,
        ActionBar
    },
    data:data,
    mounted(){
        //this.getQueuesCountAction(['all','assigned','scheduled']);
        this.getQueuesCountAction(['all','paid','unPaid']);
        //this.filterQueue(this.activeQueue);
        this.filterQueue('all');
    },
    methods:{
        ...mapActions({
            getQueuesCountAction:'sale/getQueuesCountAction',
            filterQueueAction:'sale/filterQueueAction',
            setActiveQueueAction:'sale/setActiveQueueAction',
        }),
        ...mapMutations({
            filtersMutation: 'sale/filtersMutation'
        }),
        onTabChange (index, indexTo, done) {
            console.log(this.queueKeys[index])
            this.setActiveQueueAction(this.queueKeys[index])
          },
        filterQueue(queue,data){
            this.filtersMutation({queue,...data})
            this.filterQueueAction({queue:this.activeQueue})
        },
        filterChangeHandler(queue,filters) {
            console.log(filters.paymentStatus)
            this.filterQueue(queue,{filters})
        }
    },
    computed: {
        ...mapGetters({
            queues: 'sale/allQueuesGetter',
            activeQueue: 'sale/activeQueueGetter',
            queueKeys: 'sale/queueKeysGetter',
        }),
    },
}
</script>