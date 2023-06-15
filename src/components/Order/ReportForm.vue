<style type="text/css">
    .table-0 td{
      padding: 0 !important;
      margin: 0 !important;
    }
</style>
<template>
    <b-modal
        :keyboard="false"
        :backdrop="false"
        class="modal-bottom"
        v-model="show"
        :title="'Report Form #'+order.fileNumber"
        ref="modal"
        :dialog-style="{height:'95%'}"
        :footer="false"
        :header="false"
        :before-close="hide"
        :append-to-body="true"
    >

        <div class=" pull-right">
            <button
              type="button"
              class="close"
              aria-label="Close"
              @click="hide"
              style="position: relative;z-index: 1060"
              >
              <!-- 1060 is bigger than dialog z-index 1050 because it got cover by title sometimes -->
              <span aria-hidden="true">×</span>
          </button>
          <h4 style="margin-top: 0;width: 280px"> Report Form of - # {{order.fileNumber}}</h4>
        </div>
    <tabs>
        <!-- <tab title="REPORT">
            <div class="container">
                <br>
                
                <hr>
                <br> 
                <br>
            </div>
        </tab> -->
        <tab title="FORM">
            <br>
            <!-- <form-builder type="gui" :form="reportForm" v-model="formData" ref="FormBuilder" ></form-builder> -->
            

            <form @submit.prevent="validateForm('order')">
            <div class="container">
                <form-builder-gui2 :form="report.form" v-model="formData" ></form-builder-gui2>
            </div>
            <hr>
            <!-- <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        
                        <template v-for="(element,id) in dataElements">
                            <template v-if="element.element.type == 'text'">
                                <vee-input
                                    :label="element.element.label"
                                    v-model="element.value"
                                    :rules="element.element.required == 1 ? 'required' : ''"
                                    :placeholder="element.element.placeholder"
                                    :name="element.element.placeholder"
                                />
                            </template>
                            <template v-else-if="element.element.type == 'checkbox'">
                                <div class="form-group" :class="{'has-error': errors.has(element.element.placeholder)}">
                                    <label class="control-label">{{element.element.label}} <span v-if="element.element.required" style="color:red;">*</span></label>
                                    <div class="checkbox" v-for="(option,index) in element.element.options">
                                        <label>
                                            <input type="checkbox" v-validate="element.element.required ? 'required' : '' " :name="element.element.placeholder" v-model="element.value" :value="option.option">
                                            {{option.option}}
                                        </label>
                                    </div>
                                </div>
                            </template>
                            <template v-else-if="element.element.type == 'radio'">
                                <div class="form-group" :class="{'has-error': errors.has(element.element.placeholder)}">
                                    <label class="control-label">{{element.element.label}} <span v-if="element.element.required" style="color:red;">*</span></label>
                                    <div class="radio" v-for="(option,index) in element.element.options">
                                        <label>
                                            <input type="radio" v-validate="element.element.required ? 'required' : '' " :name="element.element.placeholder" v-model="element.value" :value="option.option">
                                            {{option.option}} 
                                        </label>
                                    </div>
                                </div>
                            </template>
                            <template v-else-if="element.element.type == 'dropdown'">
                                <vee-select
                                    :label="element.element.label"
                                    v-model="element.value"
                                    :rules="element.element.required == 1 ? 'required' : ''"
                                    :name="element.element.placeholder"
                                >
                                    <option value="">SELECT VALUE</option>
                                    <option v-for="(option,key) in element.element.options" :value="option.option">{{option.option}}</option>
                                </vee-select>
                            </template>
                            <template v-else-if="element.element.type == 'textarea'">
                                <div class="form-group" :class="{'has-error': errors.has(element.element.placeholder)}">
                                    <label class="control-label">{{element.element.label}} <span v-if="element.element.required" style="color:red;">*</span></label>
                                    <textarea 
                                        v-validate="element.element.required ? 'required' : '' "
                                        :name="element.element.placeholder"
                                        v-model="element.value"
                                        class="form-control"
                                    />
                                </div>
                            </template>
                        </template>

                    </div>
                </div>
            </div> -->
            <div slot="footer">
                <div class="row">
                    <div class="col-xs-6"><button v-show="[2,3,5,6].indexOf(order.statusId) && order.assigneeId != 0" class="btn btn-primary btn-block" type="submit" :disabled="buttonDisabled || order.statusId == 4">{{order.statusId == 4 ? 'REPORT IS ALREADY SUBMITTED' : 'SUBMIT REPORT'}}</button></div>
                    <div class="col-xs-6"><button class="btn btn-info btn-block" type="button" @click="saveReport">SAVE & CONTINUE</button></div>
                </div>
            </div>
            </form>
        </tab><!-- 
        <tab title="SURVEY">
            <div class="container">
                <survey-form :order="order"></survey-form> 
            </div>
        </tab> -->
        <tab title="PREVIEW">
            <br>
            <div class="container">
            <!-- <div class="report-view" v-html="report.body" style="border:1px solid #a1a1a1; padding: 5px;"></div> -->
            <div class="report-view" style="border:1px solid #a1a1a1; padding: 5px;" v-if="reportUrl">
                <!-- <iframe  style="width: 100%; height: 100%;" 
                :src="'https://docs.google.com/gview?url='+baseUrl+'/vds/'+order.report.uri+'?embedded=true'"
                :dummy-src="'https://docs.google.com/gview?url='+baseUrl+'/api/orders/'+order.id+'/report/'+order.reportId+'/doc?token='+tokenC+'&embedded=true'"  frameborder="0"></iframe> -->
                <iframe v-if="reportUrl" :src="'https://view.officeapps.live.com/op/embed.aspx?src='+reportUrl" style="width: 100%; height: 550px;"  frameborder='0'>This is an embedded <a target='_blank' href='http://office.com'>Microsoft Office</a> document, powered by <a target='_blank' href='http://office.com/webapps'>Office Online</a>.</iframe>
            </div>
            </div>
            <br>

            <div class="container">
                <!-- <form class="form-inline" name="appraisedValue" @submit.prevent="updateAppraisedValue('appraisedValue')">
                    <div class="form-group" :class="{'has-error': errors.has('appraisedValue')}">
                        <label >Appraised Value:&nbsp;&nbsp;&nbsp;</label>
                         <span v-show="!showAppraisedValueFrom"><b>{{order.appraisedValue}}</b> &nbsp; <button class="btn btn-default" type="button"> <i class="fa fa-pencil" @click="toggleAppraisedValueFrom"></i> </button></span>
                         <span v-show="showAppraisedValueFrom">
                            <input type="text" v-model="appraisedValue"  class="form-control" name="appraisedValue"> <button class="btn btn-primary" @click.prevent="updateAppraisedValue('appraisedValue')">SAVE</button>  &nbsp; &nbsp; <button @click="toggleAppraisedValueFrom" class="btn btn-danger" type="button"> <i class="fa fa-times"></i></button>    
                         </span>
                    </div>
                </form>
 -->
                <hr>
                <button class="btn btn-info" @click.prevent="generateReport" :disabled="generateReportButtonDisabled">GENERATE REPORT</button>

            </div>
        </tab>
        <div slot="nav-right" style="width: 50%">
            
        </div>
    </tabs>
</b-modal>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
//import { clone } from "lodash";
import SurveyForm from './SurveyForm';
import LegalAddress from './LegalAddress';
//import FormBuilder from '@/components/FormBuilder/FormBuilder';
import FormBuilderGui2 from '@/components/FormBuilder/Gui2/FormBuilderGui2';
const token = localStorage.getItem('token')
const baseUrl = window.location.origin;
let data = () => {
    return {
        dataElements:[],
        buttonDisabled:false,
        showAppraisedValueFrom: false,
        //reportForm:{},
        formData:{},
        generateReportButtonDisabled:false,
        token:token,
        baseUrl:baseUrl,
        reportUrl:null
    }
}
export default {
    name: 'ReportForm',
    data: data,
    props:{
        show : {
            type: Boolean
        },
        elements:{
            type: Array,
            default: () => []
        },
        order:{
            type: Object,
            default: () => {}
        },
        report:{
            type: Object,
            default: () => {}
        },
        reportData:{
            type: Object,
            default: () => {}
        }
    },
    created(){

        this.formData =  JSON.parse(JSON.stringify(this.reportData));
        //console.log(this.formData,this.reportData)
        //this.reportForm = {...this.report.form};
        this.appraisedValue = ((order) => {order.appraisedValue}) (this.order)
        if (this.order.report.uri) {
            this.reportUrl = this.baseUrl+'/vds/'+this.order.report.uri+'?t='+(Math.random()*100)
        }
    },
    components: {
        SurveyForm,
        LegalAddress,
        FormBuilderGui2
    },
    methods:{
        reportFormChange(k,v) {
            console.log(k,v,'reportFormChange');
            let o = this.formData
            this.$set(o,k,v)
        },
        ...mapActions({
            getReportFormAction: 'order/getReportFormAction',
            generateReportAction: 'order/generateReportAction',
            syncReportElementsAction: 'order/syncReportElementsAction',
            updateAppraisedValueAction: 'order/updateAppraisedValueAction',
            getReportDocumentAction: 'order/getReportDocumentAction',
        }),
        validateForm(scope) {
            let self = this;
            this.$validator.validate().then((result) => {
                if (result && this.order.statusId != 4) {
                    this.buttonDisabled = true;
                    this.syncReportElementsAction({
                        id: this.order.id,
                        reportId:this.order.reportId,
                        sectionElements: this.formData,
                        isSubmit:true

                    }).then((resp) => {
                        self.$notify('Report submitted & saved successfully.');
                        //this.$router.push('/orders/'+resp.data.data.id);
                        this.$emit('hide');
                    }).catch(function(e){
                        self.$notify({content:'Something went wrong.',type:'danger'});
                    }).finally(function(res){
                        self.buttonDisabled = false;
                    });

                }
            });
        },
        saveReport(){
            this.errors.clear();
            let self = this;
            
            this.buttonDisabled = true;
            this.syncReportElementsAction({
                id: this.order.id,
                reportId:this.order.reportId,
                sectionElements:this.formData

            }).then((resp) => {
                self.$notify('Report saved successfully.');
            }).catch(function(e){
                //console.log(e)
                self.$notify({content:'Something went wrong.',type:'danger'});
            }).finally(function(res){
                self.buttonDisabled = false;
            });

        },
        updateAppraisedValue(scope){
            let self = this;
            //this.$validator.validate(scope).then((result) => {
                //if (result) {
                    this.buttonDisabled = true;
                    this.updateAppraisedValueAction({id:this.order.id,appraisedValue:this.appraisedValue}).then((resp) => {
                        self.toggleAppraisedValueFrom()
                    }).catch(function(e){
                        //console.log(e)
                    }).finally(function(res){
                        
                    });

                //}
            //});
        },
        hide() {
            this.$emit('hide')
        },
        toggleAppraisedValueFrom(){
            this.showAppraisedValueFrom = !this.showAppraisedValueFrom;
        },
        generateReport(){
            let self = this;
            this.generateReportButtonDisabled = true;
            self.reportUrl = null;
            this.generateReportAction({id:this.order.id, reportId:this.order.reportId}).then( (response) => {

                this.getReportDocumentAction({id:self.order.id, reportId:self.order.reportId}).then( (response) => {
                    self.reportUrl = response.data.url+"?t="+(Math.random()*100);
                    console.log(222)
                })

            }).finally((resp) => {
                self.generateReportButtonDisabled = false;
            })
        }
    },
    computed: {
        ...mapGetters({

        }),
        tokenC : () => {
            return localStorage.getItem('token')
        },
        cReportUrl: () => {
            const aa =this.baseUrl+'/vds/'+this.order.report.uri+'?t='+(Math.random()*100)
            console.log(aa, 'computed')
            return aa;
        }
    },
    watch : {
    }
}
</script>