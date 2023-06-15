<template>
    <b-modal
        :keyboard="false"
        :backdrop="false"
        class="modal-right"
        v-model="show"
        :title="'Schedule Order #'+order.fileNumber"
        ref="modal"
        :dialog-style="{width:'750px'}"
        :footer="false"
        :before-close="hide"
        :append-to-body="true"
    >
    <div class="row">
        <div class="col-sm-6">
            <h4>Scheduled At : <small><b>{{scheduledAt | dateTime('long')}}</b></small></h4>
            <date-picker style="float: left;" :today-btn="false" :clear-btn="false" icon-control-left="fa fa-angle-left" icon-control-right="fa fa-angle-right" v-model="scheduledAtDate"/>
            <div class="" style="width:70%;float:left">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <select class="form-control" v-model="scheduledAtHour">
                                <option value="">HH</option>
                                <option v-for="(hh,key) in  $_.range(1,12)" :value="hh">{{('0' + hh).slice(-2)}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                        <select class="form-control" v-model="scheduledAtAA">
                            <option value="">AA</option>
                            <option value="0">AM</option>
                            <option value="12">PM</option>
                        </select>
                        </div>
                    </div>
               
               </div>
            </div>
        </div>
        <div class="col-sm-6">
            <h4>Schedule Completed At : <small><b>{{scheduleCompletedAt | dateTime('long')}}</b></small></h4>
            <date-picker style="float: left;" :today-btn="false" :clear-btn="false" icon-control-left="fa fa-angle-left" icon-control-right="fa fa-angle-right" v-model="scheduleCompletedAtDate"/>
            
            <div class="" style="width:70%;float:left">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <select class="form-control" v-model="scheduleCompletedAtHour">
                                <option value="">HH</option>
                                <option v-for="(hh,key) in  $_.range(1,12)" :value="hh">{{('0' + hh).slice(-2)}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                        <select class="form-control" v-model="scheduleCompletedAtAA">
                            <option value="">AA</option>
                            <option value="0">AM</option>
                            <option value="12">PM</option>
                        </select>
                        </div>
                    </div>
               
               </div>
               
            </div>
        </div>
    </div>
        <div class="form-group">
            <label>Note</label>
            <textarea type="email" class="form-control" v-model="note" placeholder="Note..."></textarea>
        </div>
    
       <div class="clearfix"></div>
       <hr>
       <div class="form-group">
           <button type="button" :disabled="(buttonDisabled || scheduledAt == null)" v-on:click.prevent="scheduleOrder" class="btn btn-primary ">SCHEDULE</button> 
           <button type="button" class="btn btn-default" @click="hide">CANCEL</button>
       </div>
    </b-modal>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Router from 'vue-router'
import rules from '@/validations/rules';
import DatePicker from '@/components/Shared/datepicker/DatePicker';
import TimePicker from '@/components/Shared/timepicker/TimePicker';

const initialData = () => {
    return {
        scheduledAtDate:'',
        scheduledAtHour: '',
        scheduledAtAA: '',
        scheduleCompletedAtDate:'',
        scheduleCompletedAtHour: '',
        scheduleCompletedAtAA: '',
        note: '',
        buttonDisabled:false
    }
}


export default {
    name: 'Schedule',
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
        if (this.order.scheduledAt){
            this.scheduledAtDate = this.$options.filters.dateTime(this.order.scheduledAt).substring(0,10);
            let hour = parseInt(this.$options.filters.dateTime(this.order.scheduledAt).substring(11,13));
            this.scheduledAtHour = (hour > 12) ? hour - 12 : hour;
            this.scheduledAtAA = (hour > 12) ? 12 : 0;
        }
        if (this.order.scheduleCompletedAt){
            this.scheduleCompletedAtDate = this.$options.filters.dateTime(this.order.scheduleCompletedAt).substring(0,10);
            let hour = parseInt(this.$options.filters.dateTime(this.order.scheduleCompletedAt).substring(11,13));
            this.scheduleCompletedAtHour = (hour > 12) ? hour - 12 : hour;
            this.scheduleCompletedAtAA = (hour > 12) ? 12 : 0;
        }
    },
    components: {
        DatePicker,
        TimePicker
    },
    methods: {
        ...mapActions({
            
            scheduleOrderAction: 'order/scheduleOrderAction',
        }),
        scheduleOrder() {
            let self = this;
            if (
                (   
                    this.order.scheduledAt != null &&
                    this.isScheduledAtDirty
                ) ||
                (   
                    this.order.scheduleCompletedAt != null &&
                    this.isScheduleCompletedAtDirty
                ) 
            ) {
                if (this.note.trim() == '') {
                    alert('Please add note.');
                return 0;
                }
            }
            if (this.scheduledAt) {
                this.scheduleOrderAction({
                    id:this.order.id,
                    scheduledAt: this.scheduledAt,
                    scheduleCompletedAt:this.scheduleCompletedAt,
                    note:this.note
                }).then((resp)=>{
                    self.$root.notify(`Order has been assigned.`);
                    self.$emit('hide');
                }).catch(function(e){
                    self.$root.notifyError();
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
        scheduledAt(){
            if (this.scheduledAtDate != '' && this.scheduledAtHour != '' && this.scheduledAtAA != '') {
                return this.scheduledAtDate+'T'+('0' + (parseInt(this.scheduledAtHour) + parseInt(this.scheduledAtAA))).slice(-2)+':00:00'+this.$tz;
            }
            return null;
        },
        scheduleCompletedAt(){
            if (this.scheduleCompletedAtDate != '' && this.scheduleCompletedAtHour != '' && this.scheduleCompletedAtAA != '') {
                return this.scheduleCompletedAtDate+'T'+('0' + (parseInt(this.scheduleCompletedAtHour) + parseInt(this.scheduleCompletedAtAA))).slice(-2)+':00:00'+this.$tz;
            }
            return null;
        },
        isScheduledAtDirty() {
            return (new Date(this.order.scheduledAt)).getTime() != (new Date(this.scheduledAt)).getTime()
        },
        isScheduleCompletedAtDirty() {
            return (new Date(this.order.scheduleCompletedAt)).getTime() != (new Date(this.scheduleCompletedAt)).getTime()
        },
    }
}
</script>