<template>
    <b-modal
        :keyboard="false"
        :backdrop="false"
        class="modal-right"
        v-model="show"
        :title="`${report.name}'s Attribute`"
        ref="modal"
        :dialog-style="{width:'90%'}"
        :footer="false"
        :before-close="hide"
    >
       <div class="row">
           <div class="col-sm-6">
                <h4>All Attributes</h4>
                <table class="table table-condensed table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Placeholder</th>
                            <th>Label</th>
                            <th>Type</th>
                            <th><i class="fa fa-bolt"></i></th>
                        </tr>
                    </thead>
                       <tbody>
                           <tr v-for="(attribute) in elements" v-if="reportElementsIds.indexOf(attribute.id) == -1">
                               <td>{{attribute.placeholder}}</td>
                               <td>{{attribute.label}}</td>
                               <td>{{attribute.type}}</td>
                               <td>
                                    <i class="fa fa-plus" @click="addElement(attribute.id)"></i>
                               </td>
                           </tr>
                           <tr v-show="Object.keys(elements).length == 0">
                               <td colspan="5">No records found.</td>
                           </tr>
                       </tbody>
                </table>
           </div>
           <div class="col-sm-6">
               <h4 class="pull-left">Report Attributes</h4> 
               <div class="btn-group pull-right" role="group" aria-label="...">
                    <button type="button" class="btn btn-primary" :disabled="buttonDisabled" @click="updateReportElements">UPDATE</button>
                    <button type="button" class="btn btn-default" @click="hide">CANCEL</button>
                </div>
               <table class="table table-condensed table-hover table-bordered">
                   <thead>
                       <tr>
                           <th>Placeholder</th>
                           <th>Label</th>
                           <th>Type</th>
                           <th><i class="fa fa-bolt"></i></th>
                       </tr>
                   </thead>
                        <draggable v-model="reportElementsIds" :element="'tbody'" :options="{group:'eles'}" @start="drag=true" @end="drag=false">
                          <tr v-for="(eleId,eleIndex) in reportElementsIds" v-if="elements[eleId]">
                              <td>{{elements[eleId].placeholder}}</td>
                              <td>{{elements[eleId].label}}</td>
                              <td>{{elements[eleId].type}}</td>
                              <td>
                                   <i class="fa fa-times" @click="removeElement(eleId)"></i>
                              </td>
                          </tr>
                      </draggable>
                          <!-- <tr v-show="reportElementsIds.length == 0">
                              <td colspan="5">No records found.</td>
                          </tr> -->
               </table>
           </div>
       </div>
    </b-modal>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Router from 'vue-router'
import rules from '@/validations/rules';
import draggable from 'vuedraggable';

const initialData = () => {
    return {
        buttonDisabled:false,
        reportElementsIds:[]
    }
}


export default {
    name: 'ManageElement',
    data:initialData,
    props: {
        show : {
            type: Boolean
        },
        reportElements : {
            type: Array,
            default: () => []
        },
        report:{
            type:Object,
            default:() => {}
        }
    },
    created() {
        this.reportElementsIds = this.reportElements.map((ele) => {
            return ele.id;
        });
    },
    mounted() {
        this.getReportAttributesAction();
    },
    components: {
        draggable
    },
    methods: {
        ...mapActions({
            updateReportElementsAction: 'report/updateReportElementsAction',
            getReportAttributesAction:'setting/getReportAttributesAction'
        }),
        addElement(elementId) {
            this.reportElementsIds.push(elementId)
        },
        removeElement(elementId) {
            this.reportElementsIds = this.reportElementsIds.filter((eleId) => eleId != elementId);
        },
        updateReportElements(){
            let params = {
                id:this.report.id,
                reportElementsIds:this.reportElementsIds
            }
            let self = this;
            this.updateReportElementsAction(params).then((resp)=>{
                    self.$notify({
                        content: `Report Element has been updated.`,
                        duration: 5000
                    });
                    self.$emit('hide');
                }).catch(function(e){
                    self.$notify({
                        type:'danger',
                        content: `Something went wrong.`,
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
        ...mapGetters({
            elements: 'setting/attributesGetter'
        })
    }
}
</script>