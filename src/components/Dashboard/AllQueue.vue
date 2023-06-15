<style type="text/css" scoped="">
    .tab-border {
        padding: 10px 0 0 0;
    }
</style>
<template>
    <div class="row" style="margin-top: 10px;">
        <queue-filter :queue="'all'" @filterChange="filterChangeHandler('all',$event)" class="bg-white"></queue-filter>
        <my-table 
            v-bind:fields="fields" 
            v-bind:data="queues['all'].data"
            v-bind:displayIndex="true"
            v-bind:responsive="true"
            :table-class="['table-condensed table-hover bg-white']"
            v-on:change="filterQueue('all',$event)"
            style="margin:10px 5px 0 5px;"
            v-on:export="filterQueueAction({queue:'all',export:1})"
            :exportButton="true"
            >
            <div slot="action" slot-scope="props" class="text-right">
                <action-bar :order="props.rowData" :dashBoardDropdown="true"></action-bar>
            </div> 
            <div
                slot="address"
                slot-scope="props"
                :style="{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow:'ellipsis',
                    width:'300px'
                }"
                :title="`${props.rowData.address},${props.rowData.district},${props.rowData.state},${props.rowData.pincode}`"
            >
                {{props.rowData.address}},{{props.rowData.district}},{{props.rowData.state}},{{props.rowData.pincode}}
            </div>
            <div
                slot="status"
                slot-scope="props"
                v-html="$options.filters.statusLabel(props.rowData.statusId)"
            ></div>
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
import QueueFilter from  '@/components/Dashboard/QueueFilter'
import { mapGetters, mapActions, mapMutations } from 'vuex';
import MyTable from '@/components/Shared/MyTable/MyTable'
import CssConfig from '@/components/Shared/VuetableCssConfig.js'
import moment from 'moment';
import ActionBar from '@/components/Order/ActionBar'

let fields = [{
                name: 'id',
                title:'#',
                sortField: 'id',
                visible:false
            }, /*{
                name: 'fileNumber',
                sortField: 'file_number',
                title: 'File#',
                href:function(row){
                    return `/orders/${row.id}`;
                },
                callback(val) {
                    return '#'+val;
                }
            },*/ {
                name: 'file_d',
                sortField: 'file_number',
                Title: 'File#'
            }, {
                name: 'address',
                title: 'Address',
            }, {
                name: 'status',
                title: 'Status'
            },{
                name: 'clientName',
                sortField: 'client_name',
                title: 'Client',
                href:function(row){
                    return `/clients/${row.clientId}`;
                }
            }, /*{
                name: 'clientUserName',
                sortField: 'client_user_name',
                title: 'Order For',
            },*/ {
                name: 'reporName',
                sortField: 'report_name',
                title: 'Report Type',
            },  {
                name: 'borrowerFullname',
                sortField: 'borrower_fullname',
                title: 'Borrower',
            },  {
                name: 'assigneeName',
                sortField: 'assignee_name',
                title: 'Assignee',
            },  {
                name: 'updatedAt',
                sortField: 'updated_at',
                title: 'Last Updated',
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
                    fields: fields
                }
            }
export default{
    name: 'AllQueue',
    components: {
        QueueFilter,
        MyTable,
        ActionBar
    },
    data:data,
    mounted(){
        //this.getQueuesCountAction(['all','assigned','scheduled']);
        this.getQueuesCountAction(['all','new','assigned','scheduled','submitted','completed','onHold']);
        //this.filterQueue(this.activeQueue);
        this.filterQueue('all');
    },
    methods:{
        ...mapActions({
            getQueuesCountAction:'dashboard/getQueuesCountAction',
            filterQueueAction:'dashboard/filterQueueAction',
            setActiveQueueAction:'dashboard/setActiveQueueAction',
        }),
        ...mapMutations({
            filtersMutation: 'dashboard/filtersMutation'
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
            this.filterQueue(queue,{filters})
        }
    },
    computed: {
        ...mapGetters({
            queues: 'dashboard/allQueuesGetter',
            activeQueue: 'dashboard/activeQueueGetter',
            queueKeys: 'dashboard/queueKeysGetter',
        }),
    },
}
</script>