<style scoped="">
.left-nav-btn {
    font-size: 11px;
    text-align: center;
}
</style>
<template>
<div style="padding-top: 10px;">
    <div class="row" style="padding-left: 10px;padding-right: 10px;">
        <div class="col-md-1">
            <div class="list-group">
                <button type="button" class="list-group-item semi-bold p-10 left-nav-btn" style="line-height: 1;" :class="{'active': dynamicCompnent=='SurveyForm'}" @click="toggleDynamicCompnent('SurveyForm')" >
                    <i class="fa-3x fa fa-check-square-o"></i>
                    {{dynamicCompnent == 'SurveyForm' && false ? 'HIDE' : ''}} <br>
                    SURVEY FORM
                    <!-- <i class="fa-3x fa fa-arrow-right pull-right"></i> -->
                </button>
                <button type="button" class="list-group-item semi-bold p-10 left-nav-btn" style="line-height: 1;" :class="{'active': dynamicCompnent=='LegalAddress' }" @click="toggleDynamicCompnent('LegalAddress')">
                     <i class="fa-3x fa fa-folder-o"></i>
                    {{dynamicCompnent == 'LegalAddress' && false ? 'HIDE' : ''}} <br>
                    DOCUMENT DATA
                    <!-- <i class="fa-3x fa fa-arrow-right pull-right"></i> -->
                </button>
                <button type="button" class="list-group-item semi-bold p-10 left-nav-btn" style="line-height: 1;" :class="{'active': dynamicCompnent=='PropertyImage' }" @click="toggleDynamicCompnent('PropertyImage')">
                     <i class="fa-3x fa fa-image"></i>
                    {{dynamicCompnent == 'PropertyImage' && false ? 'HIDE' : ''}} <br>
                    PROPERTY IMAGES
                    <!-- <i class="fa-3x fa fa-arrow-right pull-right"></i> -->
                </button>
                <button type="button" class="list-group-item semi-bold p-10 left-nav-btn" style="line-height: 1;" :class="{'active': dynamicCompnent=='ValuationForm' }" @click="toggleDynamicCompnent('ValuationForm')">
                     <i class="fa-3x fa fa-star-o"></i>
                    {{dynamicCompnent == 'ValuationForm' && false ? 'HIDE' : ''}} <br>
                    VALUATION FORM
                    <!-- <i class="fa-3x fa fa-arrow-right pull-right"></i> -->
                </button>
                <button type="button" class="list-group-item semi-bold p-10 left-nav-btn" style="line-height: 1;" @click="toggleReportFormDialog">
                    <i class="fa-3x fa fa-file-text-o"></i> 
                    REPORT FORM <br>
                    <!-- <i class="fa-3x fa fa-arrow-right pull-right"></i> -->
                </button>
                <li class="list-group-item p-10 left-nav-btn">
                    <small>Updated:</small><br>
                    <span class="semi-bold" style="color:#555;">{{order.report.updatedAt | dateTime}}</span>
                </li>
                <li class="list-group-item p-10 left-nav-btn">
                    <small>File:</small><br>
                    <span class="semi-bold" style="color:#555;">
                        <template v-if="order.report.uri">
                            <a href="javascript:void(0)" @click.prevent="getReportDocument" >{{order.report.name}}</a>
                            <form name="docForm" action="" target="_black"></form>
                        </template>
                        <template v-else>N/A</template>
                    </span>
                </li>
            </div>
        </div>
        <div class="col-md-11">
            <template v-if="
                Object.keys(propertyMeta).length &&
                Object.keys(survey).length &&
                Object.keys(legalAddress).length &&
                Object.keys(planDetails).length &&
                Object.keys(valuation).length
            ">
                <template v-for=" (dc,k) in ['SurveyForm','LegalAddress','PropertyImage','ValuationForm']">
                    <component 
                        :is="dc"
                        :order="order"
                        v-show="dynamicCompnent == dc"
                        :propertyMeta="propertyMeta"
                        :survey="survey"
                        :legalAddress="legalAddress"
                        :planDetails="planDetails"
                        :valuation="valuation"
                    ></component>
                </template>
            </template>
            <!-- <template v-if="['SurveyForm','LegalAddress','PropertyImage','ValuationForm'].indexOf(dynamicCompnent) != -1">
            <component 
                :is="dynamicCompnent"
                :order="order"
            ></component>
            </template> -->

        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            
            
        </div>
        <hr>
    </div>
    <div class="row" style="margin-top: 5px">
        <div class="col-md-6">
            <!-- <div class="row" style="margin-bottom: 5px;">
            <div class="col-md-6">
                <button class="btn btn-primary btn-block" @click="toggleReportFormDialog">REPORT FORM</button>
            </div>
            <div class="col-md-6">
                <button class="btn btn-info btn-block" @click.prevent="generateReport" :disabled="generateReportButtonDisabled">GENERATE REPORT</button>
            </div>
            </div> -->
            <!-- <table class="table table table-condensed table-hover table-bordered">
                <tbody>
                    <tr>
                        <th>Last Updated: </th>
                        <td>{{order.report.updatedAt | dateTime}}</td>
                    </tr>
                    <tr>
                        <th>File: </th>
                        <td>
                            <template v-if="order.report.uri">
                                <a href="javascript:void(0)" @click.prevent="getReportDocument" >{{order.report.name}}</a>
                                <form name="docForm" action="" target="_black"></form>
                            </template>
                            <template v-else>N/A</template>
                        </td>
                    </tr>
                    <tr>
                        <th>Generated: </th>
                        <td>{{order.report.uploadedAt | dateTime}}</td>
                    </tr>
                </tbody>
            </table> -->
        </div>
        <div class="col-md-6">
        </div>
    </div>
    
    <report-form-dialog v-if="showReportFormDialog" :show="showReportFormDialog" @hide="toggleReportFormDialog" :order="order" :reportData="reportData" :report="reportBody"></report-form-dialog>
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ReportFormDialog from './ReportForm'
import SurveyForm from './SurveyForm';
import LegalAddress from './LegalAddress';
import ValuationForm from './ValuationForm';
import PropertyImage from './PropertyImage';
import axios from 'axios';
export default{
    name:'ReportDocument',
    activated(){
        this.dataLoaded = false;
        this.initLoad();
        
    },
    mounted(){
        
        this.initLoad();
        
    },
    data:function(){
        return {
            dataLoaded: false,
            showReportFormDialog: false,
            generateReportButtonDisabled:false,
            dynamicCompnent:null
        }
    },
    props:{
        order:{
            type: Object,
            default: () => {}
        }
    },
    components: {
        ReportFormDialog,
        SurveyForm,
        LegalAddress,
        ValuationForm,
        PropertyImage
    },
    methods: {
        ...mapActions({
            getReportElementsAction: 'order/getReportElementsAction',
            generateReportAction: 'order/generateReportAction',
            getReportDocumentAction: 'order/getReportDocumentAction',
            getOrderNotificationsAction: 'order/getOrderNotificationsAction',

            getPropertyMetaAction: 'setting/getPropertyMetaAction',
            getPropertyDetailsAction: 'order/getPropertyDetailsAction',
            getLegalAddressAction: 'order/getLegalAddressAction',
            getPlanDetailsAction: 'order/getPlanDetailsAction',
            getValuationAction: 'order/getValuationAction',
        }),
        initLoad() {
            if (! this.dataLoaded) {
                this.dataLoaded = true;
                this.getPropertyMetaAction().then((res) => {
                    let self = this;
                    //this.addAccommodation()
                    this.getPropertyDetailsAction({id:this.order.id});
                    this.getLegalAddressAction({id:this.order.id});
                    this.getPlanDetailsAction({id:this.order.id});
                    this.getValuationAction({id:this.order.id});
                })
            }
            
        },
        toggleReportFormDialog() {
            let self = this;
            if (this.showReportFormDialog) {
                this.showReportFormDialog = false;
            } else {
                this.getReportElementsAction({id:this.order.id, reportId:this.order.reportId}).then(( response )=>{
                    self.showReportFormDialog = true;
                } )
            }
        },
        generateReport(){
            let self = this;
            this.generateReportButtonDisabled = true;
            this.generateReportAction({id:this.order.id, reportId:this.order.reportId}).then( (response) => {

            }).finally((resp) => {
                self.generateReportButtonDisabled = false;
            })
        },
        getReportDocument(){
            this.getReportDocumentAction({id:this.order.id, reportId:this.order.reportId}).then( (response) => {
                //console.log(22,response.data.url)
                //document.querySelector('form[name=docForm]').action = response.data.url;
                //document.querySelector('form[name=docForm]').submit();
                window.open(response.data.url, '_blank');
            })
        },
        toggleDynamicCompnent(comp) {
            if (this.dynamicCompnent != comp) {
                this.dynamicCompnent = comp;
            } else {
                this.dynamicCompnent = null;
            }
        }
    },
    computed: {
        ...mapGetters({
            reportElements: 'order/reportElementsGetter',
            reportData: 'order/reportDataGetter',
            reportBody: 'order/reportBodyGetter',

            propertyMeta: 'setting/propertyMetaGetter',
            survey: 'order/propertyDetailsGetter',
            legalAddress : 'order/legalAddressGetter',
            planDetails: 'order/planDetailsGetter',
            valuation: 'order/valuationGetter',
        })
    }
}
</script>