<style>
.home-card .card {
    box-shadow: 0 0 35px 0 rgba(154,161,171,.15);
}
</style>
<template>
<div style="margin-top: 10px;background-color: #fafbfe;height:100vh;">
<div class="row" style="margin-bottom: 10px;">
    <div class="col-md-12">
        <div class="row">
            <template v-for="(queue,queueKey) in queues">
                    <template v-if="queueKey != 'open' && queueKey != 'all' ">
                    <div class="col-md-2 col-sm-4 col-xs-6 home-card">
                        <div class="card card-default" style=" margin-bottom: 10px;">
                            <div class="card-body card-5-7">
                                <div class="card-left">
                                    <i :class="'fa '+queue.fa" style="font-size: 55px;" aria-hidden="true"></i>
                                </div>
                                <div class="card-right">
                                    <h3 style="color:#6c757d;font-weight: 600;">{{queue.count}}</h3>
                                    <p class="text-mutedd" style="color:#98a6ad!important;"> {{queue.name}} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </template>
            </template>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-md-3">
        <div class="panel panel-white">
          <div class="panel-heading"><b><i class="fa fa-history"></i> Closest Due Orders</b></div>
          <table class="table table-striped">
            <tbody>
                <tr v-for="(order,k) in dues">
                    <td class="text-left">
                    <router-link :to="`/orders/${order.id}`">
                      #{{order.file_number}}
                    </router-link>
                    </td>
                    <td class="text-center" v-html="$options.filters.statusLabel(order.status_id)"></td>
                    <td class="text-right">{{ order.due_at | moment("DD/MM/YYYY  h:mm A") }}</td>
                </tr>
            </tbody>
          </table>
        </div>
    </div>
    <div class="col-md-3">
        <div class="panel panel-white">
          <div class="panel-heading"><b><i class="fa fa-plus-square"></i> Recent Orders</b></div>
          <table class="table table-striped">
            <tbody>
                <tr v-for="(order,k) in recents">
                    <router-link :to="`/orders/${order.id}`">
                      #{{order.file_number}}
                    </router-link>
                    <td class="text-center" v-html="$options.filters.statusLabel(order.status_id)"></td>
                    <td class="text-right">{{ order.created_at | moment("DD/MM/YYYY  h:mm A") }}</td>
                </tr>
            </tbody>
          </table>
        </div>
    </div>
</div>
</div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex';
export default {
    name:'Home',
    data : () => {
        return {

        };
    },
    props:{

    },
    mounted(){
        this.getHomeOrdersAction()
    },
    methods:{
        ...mapActions({
            getHomeOrdersAction: 'dashboard/getHomeOrdersAction'
        })
    },
    computed: {
        ...mapGetters({
            queues: 'dashboard/allQueuesGetter',
            dues: 'dashboard/homeDueOrdersGetter',
            recents: 'dashboard/homeRecentOrdersGetter',
        }),
    }
}
</script>