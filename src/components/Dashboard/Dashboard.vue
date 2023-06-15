<style type="text/css" scoped="">
    .tab-border {
        padding: 10px 0 0 0;
    }
</style>
<template>
    <div class="row">
        <tabs justified class="dashboard-tabs" @change="onTabChange">
            <template v-for="(queue,queueKey) in queues">
                <tab  :title="`<b style=font-size:18px;font-weight:500;>${queue.count}</b> <br><span>${queue.name}</span>`" class="tab-border" html-title>
                    <queue-filter :queue="queueKey" @filterChange="filterChangeHandler(queueKey,$event)"></queue-filter>
                    <my-table 
                    v-bind:fields="fields" 
                    v-bind:data="queue.data"
                    v-bind:displayIndex="true"
                    v-bind:responsive="true"
                    :table-class="['table-condensed table-hover table-bordered']"
                    v-on:change="filterQueue(queueKey,$event)"
                    style="margin:10px 5px 0 5px;"
                    v-on:export="filterQueueAction({queue:queueKey,export:1})"
                    :exportButton="true"
                    >
                    <div slot="action" slot-scope="props">
                        {{props.rowData.file_number}}
                    </div> 
                </my-table>
                </tab>
            </template>
        </tabs>
    </div>

</template> 
<script>
import QueueFilter from  '@/components/Dashboard/QueueFilter'
import { mapGetters, mapActions, mapMutations } from 'vuex';
import MyTable from '@/components/Shared/MyTable/MyTable'
import CssConfig from '@/components/Shared/VuetableCssConfig.js'
import moment from 'moment';

let fields = [{
                name: 'id',
                title:'#',
                sortField: 'id',
                visible:false
            }, {
                name: 'file_number',
                sortField: 'file_number',
                title: 'File#',
                href:function(row){
                    return `/orders/${row.id}`;
                }
            }, {
                name: 'client_name',
                sortField: 'client_name',
                title: 'Client',
                href:function(row){
                    return `/clients/${row.client_id}`;
                }
            }, {
                name: 'client_user_name',
                sortField: 'client_user_name',
                title: 'Order For',
            }, {
                name: 'report_name',
                sortField: 'report_name',
                title: 'Report Type',
            },  {
                name: 'address',
                sortField: 'address',
                title: 'Address',
            },  {
                name: 'borrower_fullname',
                sortField: 'borrower_fullname',
                title: 'Borrower',
            },  {
                name: 'district',
                sortField: 'district',
                title: 'City',
            },  {
                name: 'state',
                sortField: 'state',
                title: 'State',
            },  {
                name: 'created_at',
                sortField: 'created_at',
                title: 'Created',
                callback: function(date) {
                    
                    return moment(date).format('DD/MM/YYYY  h:mm A');

                }
            },  {
                name: 'assignee_name',
                sortField: 'assignee_name',
                title: 'Assignee',
            },  {
                name: 'updated_at',
                sortField: 'updated_at',
                title: 'Last Updated',
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
    name: 'Dashboard',
    components: {
        QueueFilter,
        MyTable
    },
    data:data,
    mounted(){
        //this.getQueuesCountAction(['open','assigned','scheduled']);
        //this.getQueuesCountAction(['open','new','assigned','scheduled','submitted','completed','onHold']);
        this.filterQueue(this.activeQueue);
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