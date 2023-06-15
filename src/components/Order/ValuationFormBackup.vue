<template>
    <div>
        <form @submit.prevent="validateForm('valuationForm')"
            autocomplete="off">
        <h4 class="semi-bold">Valuation Form</h4>
        <div class="row">
            <div class="col-md-5 col-sm-12">
                <h5 class="semi-bold" v-show="withLand">Select Adopted Land Area</h5>
                <div class="panel panel-slg" v-show="withLand">
                    <table class="table table-condensed bg-slg">
                        <thead>
                            <tr>
                                <th>Land Area</th>
                                <th v-for="uom in ['ft','yd', 'm']" style="text-align: right;">{{uom}}&sup2;</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr :class="{'info': valuationForm.landAreaForm == 'survey'}">
                                <td>
                                    <input
                                        type="radio"
                                        name="valuationForm.landAreaForm"
                                        v-model="valuationForm.landAreaForm"
                                        value="survey"
                                    /> Survey/Site
                                </td>
                                <td v-for="uom in ['ft','yd', 'm']" align="right">
                                    {{convertArea(survey.landArea,survey.landAreaUom,uom)}} {{uom}}&sup2;
                                </td>
                            </tr>
                            <tr :class="{'info': valuationForm.landAreaForm == 'legalAddress'}">
                                <td>
                                    <input
                                        type="radio"
                                        name="valuationForm.landAreaForm"
                                        v-model="valuationForm.landAreaForm"
                                        value="legalAddress"
                                    /> Document
                                </td>
                                <td v-for="uom in ['ft','yd', 'm']" align="right">
                                    {{convertArea(legalAddress.landArea,legalAddress.landAreaUom,uom)}} {{uom}}&sup2;
                                </td>
                            </tr>
                            <tr :class="{'info': valuationForm.landAreaForm == 'planDetails'}">
                                <td>
                                    <input
                                        type="radio"
                                        name="valuationForm.landAreaForm"
                                        v-model="valuationForm.landAreaForm"
                                        value="planDetails"
                                    /> Plan
                                </td>
                                <td v-for="uom in ['ft','yd', 'm']"align="right">
                                    {{convertArea(planDetails.landArea,planDetails.landAreaUom,uom)}} {{uom}}&sup2;
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h5 class="semi-bold">Select Adopted Built Up Area</h5>
                <!----new version start---->
                <div class="row">
                    <div class="col-sm-12">
                        <div class="btn-group btn-group-justified" role="group" aria-label="...">
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-default">Document</button>
                              </div>
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-default">Survey/Plan</button>
                              </div>
                        </div>
                    </div>
                </div>
                <!----new version end---->
                <div class="panel panel-slg">
                    <table class="table table-condensed bg-slg">
                        <thead>
                            <tr>
                                <th>Built Up Area</th>
                                <th v-for="uom in ['ft','yd', 'm']" style="text-align: right;">{{uom}}&sup2;</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr  :class="{'info': valuationForm.builtUpAreaForm == 'survey'}">
                                <td>
                                    <input
                                        type="radio"
                                        name="valuationForm.builtUpAreaForm"
                                        v-model="valuationForm.builtUpAreaForm"
                                        value="survey"
                                    /> Survey/Site
                                </td>
                                <td v-for="uom in ['ft','yd', 'm']" align="right">
                                    {{convertArea(survey.builtUpArea,survey.landAreaUom,uom)}} {{uom}}&sup2;
                                </td>
                            </tr>
                            <tr :class="{'info': valuationForm.builtUpAreaForm == 'legalAddress'}">
                                <td>
                                    <input
                                        type="radio"
                                        name="valuationForm.builtUpAreaForm"
                                        v-model="valuationForm.builtUpAreaForm"
                                        value="legalAddress"
                                    /> Document
                                </td>
                                <td v-for="uom in ['ft','yd', 'm']" align="right">
                                    {{convertArea(legalAddress.builtUpArea,legalAddress.landAreaUom,uom)}} {{uom}}&sup2;
                                </td>
                            </tr>
                            <tr :class="{'info': valuationForm.builtUpAreaForm == 'planDetails'}">
                                <td>
                                    <input
                                        type="radio"
                                        name="valuationForm.builtUpAreaForm"
                                        v-model="valuationForm.builtUpAreaForm"
                                        value="planDetails"
                                    /> Plan
                                </td>
                                <td v-for="uom in ['ft','yd', 'm']"align="right">
                                    {{convertArea(planDetails.builtUpArea,planDetails.landAreaUom,uom)}} {{uom}}&sup2;
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- <div class="panel panel-slg">
                    <table class="table table-condensed bg-slg">
                        <thead>
                            <tr>
                                <th>Carpet Area</th>
                                <th v-for="uom in ['ft','yd', 'm']" style="text-align: right;">{{uom}}&sup2;</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Survey/Site</td>
                                <td v-for="uom in ['ft','yd', 'm']" align="right">
                                    {{convertArea(survey.carpetArea,survey.landAreaUom,uom)}} {{uom}}&sup2;
                                </td>
                            </tr>
                            <tr>
                                <td>Document</td>
                                <td v-for="uom in ['ft','yd', 'm']" align="right">
                                    {{convertArea(legalAddress.carpetArea,legalAddress.landAreaUom,uom)}} {{uom}}&sup2;
                                </td>
                            </tr>
                            <tr>
                                <td>Plan</td>
                                <td v-for="uom in ['ft','yd', 'm']"align="right">
                                    {{convertArea(planDetails.carpetArea,planDetails.landAreaUom,uom)}} {{uom}}&sup2;
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div> -->
            </div>

            <div class="col-md-7 col-sm-12">
                <h5 class="semi-bold">Market Value</h5>
                <div class="panel panel-slg">
                    <div class="panel-body">
                        <div class="form-horizontal">
                            <!-- <div class="form-group">
                                <label class="control-label col-sm-4">
                                    Prevailing Market Rate
                                </label>
                            </div> -->
                            <div class="form-group" :class="{'has-error': errors.has('valuationForm.rateOfSale')}">
                                <label class="control-label col-sm-4">Prevailing Market Rate</label>
                                <div class=" col-sm-4">
                                    <input
                                        class="form-control input-sm"
                                        type="text"
                                        name="valuationForm.rateOfSale"
                                        v-model="valuationForm.rateOfSale"
                                        v-validate="'decimal:2|required|min_value:0'"
                                        :data-vv-as="'Prevailing Market Rate'"
                                    />
                                    <span class="help-block" v-show="errors.has('valuationForm.rateOfSale')">{{errors.first('valuationForm.rateOfSale')}}</span>
                                </div>
                                <div class="col-sm-1 form-control-static">Rate/{{valuationForm.rateOfSaleUom}}&sup2;</div>
                                <div class="col-sm-2">
                                    <select
                                        class="form-control input-sm"
                                        name="valuationForm.rateOfSaleUom"
                                        v-model="valuationForm.rateOfSaleUom"
                                        v-validate="'required'"
                                    >
                                        <option v-for="(uom,key) in ['ft','yd', 'm']" :value="uom">{{uom}}&sup2;</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group" v-show="withLand">
                                <label class="col-sm-4 control-label">Market Value Of Land</label>
                                <div class="col-sm-8">
                                    <p class="form-control-static">= {{convertArea(landAreaConsidered,landAreaConsideredUom,valuationForm.rateOfSaleUom)}} {{valuationForm.rateOfSaleUom}}&sup2;  &times; <i class="fa fa-rupee"></i>. {{valuationForm.rateOfSale}}/{{valuationForm.rateOfSaleUom}}&sup2; </p>
                                </div>
                            </div>
                            <div class="form-group" v-show="withLand">
                                <label class="col-sm-4 control-label"></label>
                                <div class="col-sm-8">
                                    <p class="form-control-static">= <i class="fa fa-rupee"></i>.{{numberWithCommas(landMarketValue)}} {{valuationForm.rateOfSaleUom}}&sup2;</p>
                                </div>
                            </div>

                            <div class="form-group" :class="{'has-error': errors.has('valuationForm.rateOfConstruction')}"  v-show="withLand">
                                <label class="control-label col-sm-4">Construction Rate</label>
                                <div class=" col-sm-4">
                                    <input
                                        class="form-control input-sm"
                                        type="text"
                                        name="valuationForm.rateOfConstruction"
                                        v-model="valuationForm.rateOfConstruction"
                                        v-validate="'decimal:2|required|min_value:0'"
                                        :data-vv-as="'Prevailing Market Rate'"
                                    />
                                    <span class="help-block" v-show="errors.has('valuationForm.rateOfConstruction')">{{errors.first('valuationForm.rateOfConstruction')}}</span>
                                </div>
                                <div class="col-sm-1 form-control-static">Rate/{{valuationForm.rateOfConstructionUom}}&sup2;</div>
                                <div class="col-sm-2">
                                    <select
                                        class="form-control input-sm"
                                        name="valuationForm.rateOfConstructionUom"
                                        v-model="valuationForm.rateOfConstructionUom"
                                        v-validate="'required'"
                                    >
                                        <option v-for="(uom,key) in ['ft','yd', 'm']" :value="uom">{{uom}}&sup2;</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-4 control-label">Value of Construction</label>
                                <div class="col-sm-8" v-show="withLand">
                                    <p class="form-control-static">= {{convertArea(builtUpAreaConsidered,builtUpAreaConsideredUom,valuationForm.rateOfConstructionUom)}} {{valuationForm.rateOfConstructionUom}}&sup2;  &times; <i class="fa fa-rupee"></i>.{{valuationForm.rateOfConstruction}}/{{valuationForm.rateOfConstructionUom}}&sup2; </p>
                                </div>
                                <div class="col-sm-8" v-show="!withLand">
                                    <p class="form-control-static">= {{convertArea(builtUpAreaConsidered,builtUpAreaConsideredUom,valuationForm.rateOfSaleUom)}} {{valuationForm.rateOfSaleUom}}&sup2;  &times; <i class="fa fa-rupee"></i>.{{valuationForm.rateOfSale}}/{{valuationForm.rateOfSaleUom}}&sup2; </p>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label"></label>
                                <div class="col-sm-8">
                                    <p class="form-control-static">= <i class="fa fa-rupee"></i>.{{numberWithCommas(constructionMarketValue)}} {{valuationForm.rateOfConstructionUom}}</p>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">Fair Market Value of property</label>
                                <div class="col-sm-8">
                                    <p class="form-control-static">= <span v-show="withLand">Market Value Of Land +</span> Value Of Construction</p>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label"></label>
                                <div class="col-sm-8">
                                    <p class="form-control-static">=
                                        <span v-show="withLand"><i class="fa fa-rupee"></i>.
                                        {{numberWithCommas(landMarketValue)}} +</span> 
                                        <i class="fa fa-rupee"></i>.{{numberWithCommas(constructionMarketValue)}}</p>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label"></label>
                                <div class="col-sm-8">
                                    <p class="form-control-static">= <i class="fa fa-rupee"></i>.{{numberWithCommas(fairMarketValueComputed)}}, Says, <i class="fa fa-rupee"></i>.{{numberWithCommas(fairMarketValueThousandComputed)}}/-</p>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label"> In words <i class="fa fa-rupee"></i>.</label>
                                <div class="col-sm-8">
                                    <p class="form-control-static">= ( {{numberToWords(fairMarketValueThousandComputed)}})</p>
                                </div>
                            </div>
                            <!-- <vee-input
                                label="Prevailing Market Rate"
                                v-model="valuationForm.rateOfSale"
                                :rules="''"
                                input-class="input-sm"
                                name="valuationForm.rateOfSale"
                                labelCol="col-sm-4"
                                controlCol="col-sm-6"
                            /> -->
                        </div>
                    </div>
                </div>

                <div class="panel panel-slg">
                    <div class="panel-body">
                        <div class="form-horizontal">
                            <vee-input
                                label="Distress Sale Percentage %"
                                v-model="valuationForm.distressSalePercentage"
                                :rules="'required|decimal:2|min_value:0|max_value:100'"
                                i-type="number"
                                input-class="input-sm"
                                name="valuationForm.distressSalePercentage"
                                :help-text="`= <i class='fa fa-rupee'></i>. ${(fairMarketValueThousandComputed*parseFloat(valuationForm.distressSalePercentage)/100).toFixed(2)}`"
                                labelCol="col-sm-4"
                                controlCol="col-sm-6"
                            />
                            <vee-input
                                label="Force Sale Percentage %"
                                v-model="valuationForm.forceSalePercentage"
                                :rules="'required|decimal:2|min_value:0|max_value:100'"
                                i-type="number"
                                input-class="input-sm"
                                name="valuationForm.forceSalePercentage"
                                :help-text="`= <i class='fa fa-rupee'></i>. ${(fairMarketValueThousandComputed*parseFloat(valuationForm.forceSalePercentage)/100).toFixed(2)}`"
                                labelCol="col-sm-4"
                                controlCol="col-sm-6"
                            />
                            <vee-input
                                label="Realisable Percentage %"
                                v-model="valuationForm.realisablePercentage"
                                :rules="'required|decimal:2|min_value:0|max_value:100'"
                                i-type="number"
                                input-class="input-sm"
                                name="valuationForm.realisablePercentage"
                                :help-text="`= <i class='fa fa-rupee'></i>. ${(fairMarketValueThousandComputed*parseFloat(valuationForm.realisablePercentage)/100).toFixed(2)}`"
                                labelCol="col-sm-4"
                                controlCol="col-sm-6"
                            />
                            <vee-input
                                label="Realisable Distress Percentage %"
                                v-model="valuationForm.realisableDistressPercentage"
                                :rules="'required|decimal:2|min_value:0|max_value:100'"
                                i-type="number"
                                input-class="input-sm"
                                name="valuationForm.realisableDistressPercentage"
                                :help-text="`= <i class='fa fa-rupee'></i>. ${(fairMarketValueThousandComputed*parseFloat(valuationForm.realisableDistressPercentage)/100).toFixed(2)}`"
                                labelCol="col-sm-4"
                                controlCol="col-sm-6"
                            />
                            <vee-input
                                label="Insurable Value"
                                v-model="valuationForm.insurableValue"
                                :rules="'required|decimal:2|min_value:0'"
                                input-class="input-sm"
                                name="valuationForm.insurableValue"
                                labelCol="col-sm-4"
                                controlCol="col-sm-6"
                            />
                        </div>
                    </div>
                </div>
                <button class="btn btn-primary pull-right" :disabled="buttonDisabled" @click.prevent="validateForm('valuation')">SAVE</button>
            </div>
        </div>
    </form>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import areaUnitMixin from '@/mixins/areaUnitMixin';
export default {
    name: 'ValuationForm',
    mixins:[areaUnitMixin],
    created() {
        this.mountObject()
        
    },
    data:function(){
        return {
            buttonDisabled:false,
            valuationForm: {
                landAreaForm                 : 'legalAddress',
                builtUpAreaForm              : 'legalAddress',
                rateOfSale                   : 0,
                rateOfSaleUom                : 'yd',
                rateOfConstruction           : 0,
                rateOfConstructionUom        : 'yd',
                landValue                    : 0,
                constructionValue            : 0,
                fairMarketValue              : 0,
                distressSalePercentage       : 0,
                forceSalePercentage          : 0,
                realisablePercentage         : 0,
                realisableDistressPercentage : 0,
                insurableValue               : 0,
            }
        }
    },
    props:{
        order:{
            type: Object,
            default: () => {}
        },
        survey: {
            type: Object,
            default: () => {}
        },
        legalAddress: {
            type:Object,
            default: () => {}
        },
        planDetails: {
            type:Object,
            default: () => {}
        },
        valuation: {
            type:Object,
            default: () => {}
        }
    },
    methods: {
        ...mapActions({
            // getPropertyDetailsAction: 'order/getPropertyDetailsAction',
            // getLegalAddressAction: 'order/getLegalAddressAction',
            // getPlanDetailsAction: 'order/getPlanDetailsAction',
            // getValuationAction: 'order/getValuationAction',
            saveValuationAction: 'order/saveValuationAction',
        }),
        mountObject() {
            let form = {
                landAreaForm                 :this.valuation.landAreaForm,
                builtUpAreaForm              :this.valuation.builtUpAreaForm,
                rateOfSale                   :this.valuation.rateOfSale,
                rateOfSaleUom                :this.valuation.rateOfSaleUom,
                rateOfConstruction           :this.valuation.rateOfConstruction,
                rateOfConstructionUom        :this.valuation.rateOfConstructionUom,
                landValue                    :this.valuation.landValue,
                constructionValue            :this.valuation.constructionValue,
                fairMarketValue              :this.valuation.fairMarketValue,
                distressSalePercentage       :this.valuation.distressSalePercentage,
                forceSalePercentage          :this.valuation.forceSalePercentage,
                realisablePercentage         :this.valuation.realisablePercentage,
                realisableDistressPercentage :this.valuation.realisableDistressPercentage,
                insurableValue               :this.valuation.insurableValue,
            };
            this.valuationForm = form;
        },
        validateForm(scope) {
            let self = this;
            this.$validator.validate().then((result) => {
                if (result) {
                    this.buttonDisabled = true;
                    this.saveValuationAction({id:this.order.id,...this.valuationForm}).then((resp) => {
                        self.$notify('Valuation details saved successfully.');
                    }).catch(function(e){
                        console.log(e)
                    }).finally(function(res){
                        self.buttonDisabled = false;
                    });

                }
            });
        }
    },
    computed: {
        ...mapGetters({
            // survey: 'order/propertyDetailsGetter',
            // legalAddress : 'order/legalAddressGetter',
            // planDetails: 'order/planDetailsGetter',
            // valuationObject: 'order/valuationGetter',
        }),
        withLand : function () {
            return ['Office','Shop','Flat'].indexOf(this.survey.propertyType) == -1;
        },
        surveyBuiltUpArea : function () {
            return this.survey.floors ? this.survey.floors.reduce( (sum, floor) => {
                const val = parseFloat(floor.builtUpArea);
                    return !isNaN(val) ? sum + val : sum;
            },0).toFixed(2) : 0;
        },
        surveyCarpetArea : function () {
            return this.surveyfloors ? this.survey.floors.reduce( (sum, floor) => {
                const val = parseFloat(floor.carpetArea);
                    return !isNaN(val) ? sum + val : sum;
            },0).toFixed(2) : 0;
        },
        landAreaConsidered : function() {
            return this[this.valuationForm.landAreaForm] ? this[this.valuationForm.landAreaForm].landArea: 0;
        },
        landAreaConsideredUom : function() {
            return this.valuationForm.landAreaForm != 'survey' ?  this[this.valuationForm.landAreaForm] ? this[this.valuationForm.landAreaForm].landAreaUom : 'yd' : this.survey.landAreaUom;
        },
        builtUpAreaConsidered : function() {
            return this[this.valuationForm.builtUpAreaForm] ? this[this.valuationForm.builtUpAreaForm].builtUpArea: 0;
        },
        builtUpAreaConsideredUom : function() {
            return this[this.valuationForm.builtUpAreaForm] ? this[this.valuationForm.builtUpAreaForm].landAreaUom: 'yd';
        },
        landMarketValue : function () {
            let val = this.convertArea(
                this.landAreaConsidered,
                this.landAreaConsideredUom,
                this.valuationForm.rateOfSaleUom
            ) * this.valuationForm.rateOfSale;

            return parseFloat(val).toFixed(2);
        },
        constructionMarketValue : function () {
            const area = this[this.valuationForm.builtUpAreaForm].builtUpArea || 0;
            const uom = this[this.valuationForm.builtUpAreaForm].landAreaUom || 'yd';

            const rate = this.withLand ? this.valuationForm.rateOfConstruction : this.valuationForm.rateOfSale;
            const rateUom = this.withLand ? this.valuationForm.rateOfConstructionUom : this.valuationForm.rateOfSaleUom;
            let val = this.convertArea(
                area,
                uom,
                rateUom
            ) * rate;

            return parseFloat(val).toFixed(2);
        },
        fairMarketValueComputed : function () {
            return parseFloat(parseFloat(this.constructionMarketValue) + parseFloat(this.landMarketValue)).toFixed(2);
        },
        fairMarketValueThousandComputed : function () {
            return Math.trunc(parseFloat(this.fairMarketValueComputed)/1000)*1000;
        }
    },
    watch: {
        valuation: function(val) {
            this.mountObject();
        }
    }
}
</script>