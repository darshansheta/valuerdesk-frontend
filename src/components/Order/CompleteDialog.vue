
<template>
    <b-modal
        :keyboard="false"
        :backdrop="false"
        class="modal-right"
        v-model="show"
        :title="`Complete Order - ${order.fileNumber}`"
        ref="modal"
        :dialog-style="{width:'50%'}"
        :footer="false"
        :before-close="hide"
        :append-to-body="true"
    >
    <div class="form-group">
        <label>Note</label>
        <textarea type="email" class="form-control" v-model="note" placeholder="Note..."></textarea>
    </div>
    <div class="form-group">
       <button type="submit" :disabled="buttonDisabled" v-on:click.prevent="completeOrder" class="btn btn-primary ">COMPLETE</button> <span style="float: left;">&nbsp;</span>
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
        buttonDisabled:false,
        note:''
    }
}


export default {
    name: 'CompleteDialog',
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
    components: {
    },
    methods: {
        ...mapActions({
            
            completeOrderAction: 'order/completeOrderAction',
        }),
        completeOrder() {
            let self = this;
            this.completeOrderAction({id:this.order.id,note:this.note}).then((resp)=>{
                self.$notify({
                    content: `Order has been completed.`,
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
            
        },
        hide() {
            this.$emit('hide')
        }
    },
    computed: {
    }
}
</script>