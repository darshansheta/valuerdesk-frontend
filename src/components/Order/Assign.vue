
<style scoped>
    .square {
        height: 15px;
        width: 15px;
    }
</style>
<template>
    <b-modal
        :keyboard="false"
        :backdrop="false"
        class="modal-right"
        v-model="show"
        title="Assign Order"
        ref="modal"
        :dialog-style="{width:'70%'}"
        :footer="false"
        :before-close="hide"
        :append-to-body="true"
    >
       <table class="table table-condensed table-hover">
           <thead>
               <tr>
                   <th><i class="fa fa-check"></i></th>
                   <th>Name</th>
                   <th>Pending</th>
                   <th>Completed</th>
                   <th>All</th>
               </tr>
           </thead>
           <tbody>
               <tr v-for="(assignee , id) in assignees">
                   <td> <input type="radio" :value="assignee.id" class="square" v-model="assigneeId"> </td>
                   <td>{{assignee.name}}</td>
                   <td>{{assignee.pendingOrdersCount}}</td>
                   <td>{{assignee.completedOrdersCount}}</td>
                   <td>{{assignee.ordersCount}}</td>
               </tr>
           </tbody>
       </table>
       <div class="form-group">
           <button type="submit" :disabled="buttonDisabled || assigneeId == 0" v-on:click.prevent="assignOrder" class="btn btn-primary ">ASSIGN</button>
           <button type="button" class="btn btn-default" @click="hide">CANCEL</button>
       </div>
    </b-modal>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Router from 'vue-router'
import rules from '@/validations/rules';

const initialData = () => {
    return {
        assigneeId:0,
        buttonDisabled:false
    }
}


export default {
    name: 'Assign',
    data:initialData,
    props: {
        show : {
            type: Boolean
        },
        assignees : {
            type: Array,
            default: () => []
        },
        order:{
            type:Object,
            default:() => {}
        }
    },
    components: {
    },
    methods: {
        ...mapActions({
            
            assignOrderAction: 'order/assignOrderAction',
        }),
        assignOrder() {
            let self = this;
            if (this.assigneeId) {
                this.assignOrderAction({id:this.order.id,assigneeId:this.assigneeId}).then((resp)=>{
                    self.$notify({
                        content: `Order has been assigned.`,
                        duration: 5000
                    });
                    self.$emit('hide');
                }).catch(function(e){
                    self.$notify({
                        type:'danger',
                        content: `Something went wrong. Please reload order.`,
                        duration: 5000
                    });
                }).finally(function(res){
                    self.buttonDisabled = false;
                });
            }
        },
        hide() {
            this.$emit('hide')
        }
    },
    computed: {
    }
}
</script>