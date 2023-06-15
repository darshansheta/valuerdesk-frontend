<template>
    <div>
    <template v-if="!dashBoardDropdown">
    <div class="btn-toolbar" role="toolbar" aria-label="..." style="margin-bottom: 4px;">
      <div class="btn-group" role="group" aria-label="...">
      <h4 style="margin-top: 8px;margin-bottom: 7px;">#<b>{{order.fileNumber}}</b></h4>
      </div>
      <div class="btn-group" role="group" aria-label="...">
      <h4 style="margin-top: 5px;margin-bottom: 0px;"><span v-html="$options.filters.statusLabel(order.statusId)"></span></h4>
      </div>
      <!-- <div class="btn-group pull-right" role="group" aria-label="...">
        <button type="button" class="btn btn-primary" @click="$emit('toggleCreateForm')"> <i class="fa fa-plus-square"></i> NEW</button>
      </div> -->
      <div class="btn-group pull-right" role="group" aria-label="...">
            <button type="button" class="btn btn-default" v-if="allowNew" @click="toggleResetDialog"> <i class="fa fa-recycle"></i> RESET(NEW)</button>
            <button type="button" class="btn btn-default" v-if="allowOnHold" @click="toggleOnHoldDialog"> <i class="fa fa-pause"></i> ON HOLD</button>
            <button type="button" class="btn btn-default" v-if="order.statusId == 6" @click="toggleResumeDialog"> <i class="fa fa-play"></i> RESUME</button>
            <button type="button" class="btn btn-default" v-if="allowCancel" @click="toggleCancelDialog"> <i class="fa fa-ban"></i> CANCEL</button>
      </div>
      <button type="button" class="btn btn-default  pull-right" @click="$emit('toggleEditForm')"> <i class="fa fa-edit"></i> EDIT</button>
      <div class="btn-group pull-right" role="group" aria-label="...">
            <button type="button" readonly class="btn btn-success" v-if="order.statusId == 5"> <i class="fa fa-check"></i> COMPLETED</button>
            <button type="button" class="btn btn-default" @click="toggleCompleteDialog" v-if="allowComplete"> <i class="fa fa-check"></i> COMPLETE</button>
            <button type="button" class="btn btn-default" @click="toggleScheduleDialog" v-if="allowSchedule"> <i class="fa fa-calendar"></i> SCHEDULE</button>
            <button type="button" class="btn btn-default" @click="toggleAssignDialog" v-if="allowAssign"> <i class="fa fa-user-plus"></i> ASSIGN</button>
      </div>
    </div>
</template>
<template v-else>
    <!-- Single button -->
    <!-- <div class="btn-group">
      <button type="button" class="btn btn-default dropdown-toggle btn-xs" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="showDD = !showDD">
        <span class="caret"></span>
      </button>
      <ul class="dropdown-menu dropdown-menu-right" :style="{ 'display': (showDD) ? 'block' : 'none' }">
        <li><a href="#">Action</a></li>
        <li><a href="#">Another action</a></li>
        <li><a href="#">Something else here</a></li>
        <li role="separator" class="divider"></li>
        <li><a href="#">Separated link</a></li>
      </ul>
    </div> -->
    <dropdown ref="dropdown" menu-right :not-close-elements="ele" append-to-body>
      <button class="btn btn-default btn-xs"> <span class="caret"></span> </button>
      <template slot="dropdown">
        <li><a role="button" v-if="allowNew" @click="toggleResetDialog"> <i class="fa fa-recycle"></i> RESET(NEW)</a></li>
        <li><a role="button" v-if="allowOnHold" @click="toggleOnHoldDialog"> <i class="fa fa-pause"></i> ON HOLD</a></li>
        <li><a role="button" v-if="order.statusId == 6" @click="toggleResumeDialog"> <i class="fa fa-play"></i> RESUME</a></a>
        <li><a role="button" v-if="allowCancel" @click="toggleCancelDialog"> <i class="fa fa-ban"></i> CANCEL</a></li>
        <li role="separator" class="divider"></li>
        <li><a role="button" readonly v-if="order.statusId == 5"> <i class="fa fa-check"></i> COMPLETED</a></li>
        <li><a role="button" @click="toggleCompleteDialog" v-if="allowComplete"> <i class="fa fa-check"></i> COMPLETE</a></li>
        <li><a role="button" @click="toggleScheduleDialog" v-if="allowSchedule"> <i class="fa fa-calendar"></i> SCHEDULE</a></li>
        <li><a role="button" @click="toggleAssignDialog" v-if="allowAssign"> <i class="fa fa-user-plus"></i> ASSIGN</a></li>
      </template>
    </dropdown>
</template>
    <assign-dialog v-if="showAssignDialog" :assignees="assignees" :show="showAssignDialog" @hide="toggleAssignDialog" :order="order"></assign-dialog>
    <schedule-dialog v-if="allowSchedule && showScheduleDialog" :show="showScheduleDialog" @hide="toggleScheduleDialog" :order="order"></schedule-dialog>
    <complete-dialog v-if="allowComplete && showCompleteDialog" :show="showCompleteDialog" @hide="toggleCompleteDialog" :order="order"></complete-dialog>
    <on-hold-dialog v-if="allowOnHold && showOnHoldDialog" :show="showOnHoldDialog" @hide="toggleOnHoldDialog" :order="order"></on-hold-dialog>
    <resume-dialog v-if="!allowOnHold && showResumeDialog" :show="showResumeDialog" @hide="toggleResumeDialog" :order="order"></resume-dialog>
    <reset-dialog v-if="allowNew && showResetDialog" :show="showResetDialog" @hide="toggleResetDialog" :order="order"></reset-dialog>
    <cancel-dialog v-if="allowCancel && showCancelDialog" :show="showCancelDialog" @hide="toggleCancelDialog" :order="order"></cancel-dialog>

    <edit-order-dialog v-if="showEditOrderInfoDialog" :show="showEditOrderInfoDialog" @hide="toggleEditOrderInfoDialog" :order="order"></edit-order-dialog>
    </div>
</template>
<script>
import AssignDialog from './Assign';
import ScheduleDialog from './Schedule';
import CompleteDialog from './CompleteDialog';
import OnHoldDialog from './OnHoldDialog';
import ResumeDialog from './ResumeDialog';
import ResetDialog from './ResetDialog';
import CancelDialog from './CancelDialog';
import EditOrderDialog from './EditOrderDialog';
import Dropdown from '@/components/Shared/Dropdown';
import { mapGetters, mapActions } from 'vuex'
const initialData = () => {
  return {
        ele:[],
        showEditDialog: false,
        showAssignDialog: false,
        showScheduleDialog: false,
        showCompleteDialog: false,
        showOnHoldDialog: false,
        showResumeDialog: false,
        showResetDialog: false,
        showCancelDialog: false,
        showEditOrderInfoDialog: false,
        showDD: false,
    }
}
export default {
    name: 'ActionBar',
    mounted() {
        if (this.$refs.dropdown) {
            this.ele.push(this.$refs.dropdown.$el)
        }
    },
    data:initialData,
    props: {
        order: {
            type:Object,
            default:function(){ return {}; }
        },
        dashBoardDropdown: {
            type:Boolean,
            default:false
        }
    },
    components: {
        Dropdown,
        AssignDialog,
        ScheduleDialog,
        CompleteDialog,
        OnHoldDialog,
        ResumeDialog,
        ResetDialog,
        CancelDialog,
        EditOrderDialog,
    },
    methods: {
        ...mapActions({
            getStaffForAssignmentAction: 'order/getStaffForAssignmentAction',
        }),
        toggleAssignDialog() {
            let self = this;
            if (this.showAssignDialog) {
                this.showAssignDialog = false;
            } else {
                this.getStaffForAssignmentAction().then(( response )=>{
                    self.showAssignDialog = true;
                } )
            }
        },
        toggleScheduleDialog() {
            this.showScheduleDialog = !this.showScheduleDialog;
        },
        toggleCompleteDialog() {
            this.showCompleteDialog = !this.showCompleteDialog;
        },
        toggleOnHoldDialog() {
            this.showOnHoldDialog = !this.showOnHoldDialog;
            console.log(333,this.showOnHoldDialog,this.allowOnHold)
        },
        toggleResumeDialog() {
            this.showResumeDialog = !this.showResumeDialog;
        },
        toggleResetDialog() {
            this.showResetDialog = !this.showResetDialog;
        },
        toggleCancelDialog() {
            this.showCancelDialog = !this.showCancelDialog;
        },
        toggleEditOrderInfoDialog() {
            this.showEditOrderInfoDialog = !this.showEditOrderInfoDialog;
        }
    },
    computed: {
        ...mapGetters({
            assignees: 'order/assigneesGetter'
        }),
        allowNew(){ //1
            return [2,3,4,5,6,7].indexOf(this.order.statusId) != -1;
        },
        allowAssign(){//2
            return [1,3,4,5,6].indexOf(this.order.statusId) != -1;
        },
        allowSchedule(){//3
            return [2,3,4,5,6].indexOf(this.order.statusId) != -1;
        },
        allowSubmit(){//4
            return [2,3,5,6].indexOf(this.order.statusId) != -1;
        },
        allowComplete(){//5
            return [4,6].indexOf(this.order.statusId) != -1;
        },
        allowOnHold(){//6
            return [1,2,3,4,5].indexOf(this.order.statusId) != -1;
        },
        allowCancel(){//7
            return [1,2,3,4,5,6].indexOf(this.order.statusId) != -1;
        }
    },
    watch: {
    }
}
</script>