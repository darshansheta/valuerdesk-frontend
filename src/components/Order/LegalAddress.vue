<style scoped>
    .legal-address-table td[colspan='12'] {
        width: 20%;
    }
    .legal-address-table td[colspan='15'] {
        width: 25%;
    }
    .mx-datepicker {
        width: 100%;
    }
</style>
<template>
<div>
    <form autocomplete="off">
    <h4 class="semi-bold">Document Details</h4>
    <table class="table bg-slg table-bordered table-condensed legal-address-table">
        <tbody>
            <tr>
                <td width="50%">
                    <div class="form-group" :class="{'has-error': errors.has('address.documents')}">
                        <label class="control-label" >Provided documents: <span style="color:red;">*</span></label> 
                        <div class="row">
                        <div class="col-sm-6" v-for="doc in propertyMeta.legal_document">
                            <div class="checkbox">
                            <label>
                                <input type="checkbox" data-vv-as="This" :value="doc.id" name="address.documents" v-model="address.documents" v-validate="'required'"> {{doc.name}}
                            </label>
                            </div>
                        </div>
                        </div>
                    </div>
                </td>
                <td width="50%">
                    <div class="form-group" :class="{'has-error': errors.has('address.ownershipDetail')}">
                    <label class="control-label">Ownership Detail: <span style="color:red;">*</span> </label>
                    
                        <textarea data-vv-as="ownershipDetail" rows="5" v-validate="'required'" style="resize: vertical;" class="form-control" name="address.ownershipDetail" v-model="address.ownershipDetail"></textarea>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>

    <h4>Legal Address & Area</h4>
    
    <table class="table bg-slg table-bordered table-condensed legal-address-table">
        <tbody>
            <tr>
                <td colspan="12">
                    
                </td>
                <td colspan="12">
                    <vee-input
                    label="No."
                    input-class="input-sm"
                    v-model="address.propertyNo"
                    :rules="'required'"
                    name="address.propertyNo"
                    />
                </td>
                <td colspan="12">
                    <vee-input
                    label="Floor"
                    input-class="input-sm"
                    v-model="address.floor"
                    :rules="''"
                    name="address.floor"
                    />
                </td>
                <td colspan="12">
                    <vee-input
                    label="Wing"
                    input-class="input-sm"
                    v-model="address.wingName"
                    :rules="''"
                    name="address.wingName"
                    />
                </td>
                <td colspan="12">
                    <vee-input
                    label="Society Name"
                    input-class="input-sm"
                    v-model="address.societyName"
                    :rules="''"
                    name="address.societyName"
                    />
                </td>
            </tr>
            <tr>
                
                <td colspan="12">
                    <vee-input
                    label="Revenue Survey No."
                    input-class="input-sm"
                    v-model="address.revenueSurveyNo"
                    :rules="''"
                    name="address.revenueSurveyNo"
                    />
                </td>
                <td colspan="12">
                    <vee-input
                    label="Revised Revenue Survey No."
                    input-class="input-sm"
                    v-model="address.reRevenueSurveyNo"
                    :rules="''"
                    name="address.reRevenueSurveyNo"
                    />
                </td>
                <td colspan="12">
                    <vee-input
                    label="Block No."
                    input-class="input-sm"
                    v-model="address.blockNo"
                    :rules="''"
                    name="address.blockNo"
                    />
                </td>
                <td colspan="12">
                    <vee-input
                    label="Amalgamated New Block No."
                    input-class="input-sm"
                    v-model="address.amalgamatedNewBlockNo"
                    :rules="''"
                    name="address.amalgamatedNewBlockNo"
                    />
                </td>
                <td colspan="12">
                    <vee-input
                    label="Village Limit Of"
                    input-class="input-sm"
                    v-model="address.villageLimitOf"
                    :rules="''"
                    name="address.villageLimitOf"
                    />
                </td>
            </tr>
            <tr>
                <td colspan="12">
                    <vee-input
                    label="Original Plot No."
                    input-class="input-sm"
                    v-model="address.originalPlotNo"
                    :rules="''"
                    name="address.originalPlotNo"
                    />
                </td>
                <td colspan="12">
                    <vee-input
                    label="Final Plot No."
                    input-class="input-sm"
                    v-model="address.finalPlotNo"
                    :rules="''"
                    name="address.finalPlotNo"
                    />
                </td>
                <td colspan="12">
                    <vee-input
                    label="Sub Plot No."
                    input-class="input-sm"
                    v-model="address.subPlotNo"
                    :rules="''"
                    name="address.subPlotNo"
                    />
                </td>
                <td colspan="12">
                    <vee-input
                    label="Taluka"
                    input-class="input-sm"
                    v-model="address.taluka"
                    :rules="'required'"
                    name="address.taluka"
                    />
                </td>
                <td colspan="12">
                    <vee-input
                    label="Tehsil No."
                    input-class="input-sm"
                    v-model="address.tehsilNo"
                    :rules="''"
                    name="address.tehsilNo"
                    />
                </td>
            </tr>
            <tr>
                <td colspan="12">
                    <vee-input
                    label="city Survey Nondh No."
                    input-class="input-sm"
                    v-model="address.citySurveyNondhNo"
                    :rules="''"
                    name="address.citySurveyNondhNo"
                    />
                </td>
                <td colspan="12">
                    <vee-input
                    label="city Survey Ward No."
                    input-class="input-sm"
                    v-model="address.citySurveyWardNo"
                    :rules="''"
                    name="address.citySurveyWardNo"
                    />
                </td>
                <td colspan="12">
                    <vee-input
                    label="City Survey Sheet No."
                    input-class="input-sm"
                    v-model="address.citySurveySheetNo"
                    :rules="''"
                    name="address.citySurveySheetNo"
                    />
                </td>
                <td colspan="12">
                    <vee-input
                    label="Khata No."
                    input-class="input-sm"
                    v-model="address.khataNo"
                    :rules="''"
                    name="address.khataNo"
                    />
                </td>
                <td colspan="12">
                    <vee-input
                    label="Chalta No."
                    input-class="input-sm"
                    v-model="address.chaltaNo"
                    :rules="''"
                    name="address.chaltaNo"
                    />
                </td>
            </tr>
            <tr>
                <td colspan="15" width="25%">
                    <vee-input
                    label="Hissa No."
                    input-class="input-sm"
                    v-model="address.hissaNo"
                    :rules="''"
                    name="address.hissaNo"
                    />
                </td>
                <td colspan="15" width="25%">
                    <vee-input
                    label="District"
                    input-class="input-sm"
                    v-model="address.district"
                    :rules="'required'"
                    name="address.district"
                    />
                </td>
                <td colspan="15" width="25%">
                    <vee-select
                        label="State"
                        v-model="address.state"
                        :rules="'required'"
                        input-class="input-sm"
                        name="address.state">
                        <option value="">SELECT STATE</option>
                        <option v-for="state in $states" :value="state.name">{{state.name}}</option>
                    </vee-select>
                </td>
                <td colspan="15" width="25%">
                    <vee-input
                    label="Pincode"
                    input-class="input-sm"
                    v-model="address.pincode"
                    :rules="'required'"
                    name="address.pincode"
                    />
                </td>
            </tr>
            <tr class="tr-white">
                <td colspan="60">
                    &nbsp;
                    
                </td>
            </tr>
            <tr>
                <td colspan="15">
                    <div class="col-sm-8">
                        <vee-input
                            label="Plot/Land Area"
                            input-class="input-sm"
                            v-model="address.landArea"
                            :rules="'decimal:2'"
                            name="address.landArea"
                        />
                        <p v-for="uom in ['ft', 'm','yd']" v-if="uom != address.landAreaUom">
                            {{convertArea(address.landArea,address.landAreaUom,uom)}} <strong>{{uom}}&sup2;</strong>
                        </p>
                    </div>
                    <div class="col-sm-4">
                        <vee-select
                            label="Unit"
                            input-class="input-sm"
                            v-model="address.landAreaUom"
                            :rules="'required'"
                            name="address.landAreaUom">
                            <option v-for="uom in ['ft', 'm','yd']" :value="uom">{{uom}}&sup2;</option>
                        </vee-select>
                    </div>
                </td>
                <td colspan="45">
                    <div class="col-sm-10">
                        <div class="row">
                            <div class="col-sm-4">
                                <vee-input
                                    label="Built-up Area"
                                    input-class="input-sm"
                                    v-model="address.builtUpArea"
                                    :rules="'decimal:2'"
                                    name="address.builtUpArea"
                                />
                                <p v-for="uom in ['ft', 'm','yd']" v-if="uom != address.areaUom">
                                    {{convertArea(address.builtUpArea,address.areaUom,uom)}} <strong>{{uom}}&sup2;</strong>
                                </p>
                            </div>
                            <div class="col-sm-4">
                                <vee-input
                                    label="Super Built-up Area"
                                    input-class="input-sm"
                                    v-model="address.superBuiltUpArea"
                                    :rules="'decimal:2'"
                                    name="address.superBuiltUpArea"
                                />
                                <p v-for="uom in ['ft', 'm','yd']" v-if="uom != address.areaUom">
                                    {{convertArea(address.superBuiltUpArea,address.areaUom,uom)}} <strong>{{uom}}&sup2;</strong>
                                </p>
                            </div>
                            <div class="col-sm-4">
                                <vee-input
                                    label="Carpet Area"
                                    input-class="input-sm"
                                    v-model="address.carpetArea"
                                    :rules="'decimal:2'"
                                    name="address.carpetArea"
                                />
                                <p v-for="uom in ['ft', 'm','yd']" v-if="uom != address.areaUom">
                                    {{convertArea(address.carpetArea,address.areaUom,uom)}} <strong>{{uom}}&sup2;</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-2">
                        <vee-select
                            label="Unit"
                            input-class="input-sm"
                            v-model="address.areaUom"
                            :rules="'required'"
                            name="address.areaUom">
                            <option v-for="uom in ['ft', 'm','yd']" :value="uom">{{uom}}&sup2;</option>
                        </vee-select>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>

    <!--===========-->
    <h4>Approved Plan Details</h4>
    <table class="table bg-slg table-bordered table-condensed legal-address-table">
        <tbody>
            <tr>
                <td colspan=12>
                    <label class="control-label">Plan Provided </label>
                    &nbsp;<toggle-button v-model="plan.planProvided" @change="calculatePermissibleArea" /> {{plan.planProvided}}
                </td>
            </tr>
            <tr  v-if="plan.planProvided">
                <td colspan="6">
                    <div class="form-group" :class="{'has-error': errors.has('plan.detail')}">
                    <label class="control-label">Plan Detail: <span style="color:red;">*</span> </label>
                    
                        <textarea rows="5"  style="resize: vertical;" class="form-control" name="plan.detail" v-model="plan.detail"></textarea>
                    </div>
                </td>
                <td colspan="3">
                    <div class="form-group">
                        <label class="control-label">Approved Date</label>
                    <date-picker lang='en' format="YYYY-MM-DD" value-type="format" input-class="form-control input-sm" v-model="plan.approvedDate" :confirm="false" ></date-picker>
                    </div>
                </td>
                <td colspan="3">
                    <vee-input
                    label="Approved authority."
                    input-class="input-sm"
                    v-model="plan.authority"
                    :rules="''"
                    name="plan.authority"
                    />
                </td>
            </tr>
            <tr class="tr-white">
                <td colspan="12">
                    Area details
                    
                </td>
            </tr>
            <tr>
                <td colspan="3" width="25%">
                    <div class="col-sm-8">
                        <template v-if="plan.planProvided">
                            <vee-input
                                label="Plot/Land Area"
                                input-class=""
                                i-type="number"
                                v-model="plan.landArea"
                                :rules="'decimal:2'"
                                name="plan.landArea"
                                float-label
                            />
                            <p v-for="uom in ['ft', 'm','yd']" v-if="uom != plan.landAreaUom">
                                {{convertArea(plan.landArea,plan.landAreaUom,uom)}} <strong>{{uom}}&sup2;</strong>
                            </p>
                        </template>
                        <template v-else>
                            <vee-select
                                label="Plot/Land Area to be Consider"
                                input-class=""
                                v-model="plan.permissibleConsideredLandArea"
                                :rules="''"
                                @change="calculatePermissibleArea"
                                name="plan.permissibleConsideredLandArea"
                                float-label
                            >
                                <option value="">SELECT</option>
                                <option value="document">Document - {{convertArea(address.landArea,address.landAreaUom,plan.landAreaUom)}} {{plan.landAreaUom}}&sup2;</option>
                                <option value="survey">Survey - {{convertArea(survey.landArea,survey.landAreaUom,plan.landAreaUom)}} {{plan.landAreaUom}}&sup2;</option>
                            </vee-select>
                            <p v-for="uom in ['ft', 'm','yd']" v-if="plan.permissibleConsideredLandArea == 'document' && uom != plan.landAreaUom">
                                {{convertArea(address.landArea,address.landAreaUom,uom)}} <strong>{{uom}}&sup2;</strong>
                            </p>
                            <p v-for="uom in ['ft', 'm','yd']" v-if="plan.permissibleConsideredLandArea == 'survey' && uom != plan.landAreaUom">
                                {{convertArea(survey.landArea,survey.landAreaUom,uom)}} <strong>{{uom}}&sup2;</strong>
                            </p>
                        </template>
                    </div>
                    <div class="col-sm-4">
                        <vee-select
                            label="Unit"
                            input-class=""
                            v-model="plan.landAreaUom"
                            :rules="'required'"
                            float-label
                            name="plan.landAreaUom">
                            <option v-for="uom in ['ft', 'm','yd']" :value="uom">{{uom}}&sup2;</option>
                        </vee-select>
                    </div>
                </td>
                <td colspan="10">
                    <div class="col-sm-5" v-if="!plan.planProvided">
                        <div class="row">
                            <div class="col-sm-5">
                                <vee-input
                                    label="Permissible %"
                                    input-class="input-sm"
                                    v-model="plan.permissiblePercentage"
                                    :rules="'required|decimal:2|min_value:0|max_value:100'"
                                    name="plan.permissiblePercentage"
                                    @change="calculatePermissibleArea"
                                    iType="number"
                                />  
                            </div>
                            <div class="col-sm-7">
                                <vee-select
                                    label="GF + Permissible floors"
                                    input-class="input-sm"
                                    v-model="plan.permissibleFloors"
                                    :rules="'required|numeric|min_value:0|max_value:100'"
                                    name="plan.permissibleFloors"
                                    @change="calculatePermissibleArea"
                                >
                                <option v-for="nn in [0,1,2,3,4,5,6,7,8,9]" :value="nn">{{nn}}</option>
                            </vee-select>
                            </div>
                        </div>
                        <p>
                            <strong>FSI: </strong> {{fsi}}
                        </p>
                    </div>
                    <div :class="[plan.planProvided ? 'col-sm-12' : 'col-sm-7']">
                        <div class="row">
                            <div :class="[survey.withLand ? 'col-sm-8' : 'col-sm-4']">
                                  <vee-input
                                      label="Total Built-up Area"
                                      input-class="input-sm"
                                      v-model="plan.computedBuiltUpArea"
                                      :rules="'decimal:2'"
                                      name="plan.computedBuiltUpArea"
                                      :readonly="true"
                                  />
                                  <p v-for="uom in ['ft', 'm','yd']" v-if="uom != plan.areaUom">
                                      {{convertArea(plan.computedBuiltUpArea,plan.areaUom,uom)}} <strong>{{uom}}&sup2;</strong>
                                  </p>
                            </div>
                            <div class="col-sm-4" v-if="!survey.withLand">
                                <vee-input
                                    label="Carpet Area"
                                    input-class="input-sm"
                                    v-model="plan.computedCarpetArea"
                                    :rules="'decimal:2'"
                                    name="plan.computedCarpetArea"
                                    :readonly="true"
                                />
                                <p v-for="uom in ['ft', 'm','yd']" v-if="uom != plan.areaUom">
                                    {{convertArea(plan.computedCarpetArea,plan.areaUom,uom)}} <strong>{{uom}}&sup2;</strong>
                                </p>
                            </div>
                            <div class="col-sm-4">
                                <vee-select
                                    label="Unit"
                                    input-class="input-sm"
                                    v-model="plan.areaUom"
                                    :rules="'required'"
                                    name="plan.areaUom">
                                    <option v-for="uom in ['ft', 'm','yd']" :value="uom">{{uom}}&sup2;</option>
                                </vee-select>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
            <tr class="tr-white">
                <td colspan="12">
                    <table class="table table-striped borderless">
                        <thead>
                            <tr>
                                <th>
                                    Floor wise Built-up & Carpet area 
                                    <button type="button" class="btn btn-default pull-right" @click="addFloorObject">
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        <template v-for="(floor,k) in plan.floors">
                            <tr>
                                <td>
                                    <div class="row">
                                        <div class="col-md-3 col-sm-4">
                                            <vee-input
                                                
                                                :label="`Floor Name`"
                                                v-model="floor.floor"
                                                :rules="'required'"
                                                :name="`plan.floor.name.${floor.id}`"
                                                float-label
                                            />
                                            <vee-input
                                                
                                                :label="`Built-up Area`"
                                                v-model="floor.computedPlanBuiltUpArea"
                                                :rules="'decimal:2'"
                                                :name="`plan.computedPlanBuiltUpArea.${floor.id}`"
                                                iType="number"
                                                float-label
                                                readonly
                                            /> 
                                        </div>
                                        <div class="col-md-3 col-sm-4">
                                            <treeselect
                                                :multiple="true"
                                                :value="getStructure(floor.structures)"
                                                @input="setStructure($event,k)"
                                                :clearable="false"
                                                :options="floor.structures"
                                                placeholder="Select structure(s)..."
                                                :disabled="!plan.planProvided"
                                            />
                                            <template v-for="ss in floor.structures" v-if="ss.available">
                                                <vee-input
                                                    :label="`${ss.label} - built-up area (${plan.landAreaUom}\u00B2)`"
                                                    input-class=""
                                                    v-model="ss.buArea"
                                                    :rules="'decimal:2'"
                                                    class="mb-2 mt-2"
                                                    iType="number"
                                                    :name="'floor.name.'+k+'.ss.'+ss.id"
                                                    float-label
                                                    :readonly="!plan.planProvided"
                                                />
                                            </template>
                                        </div>
                                        <div class="col-md-3">
                                            <vee-input
                                                v-if="!survey.withLand"
                                                dlabelCol="col-sm-3"
                                                dcontrolCol="col-sm-6"
                                                :label="`Floor carpet area`"
                                                v-model="floor.planCarpetArea"
                                                :rules="'decimal:2'"
                                                :name="`plan.planCarpetArea.${floor.id}`"
                                                :readonly="!plan.planProvided"
                                                iType="number"
                                                float-label
                                            />
                                            <toggle-button v-model="floor.planHasOpenTerrace" :disabled="!plan.planProvided" /> Has terrace?


                                            <vee-input
                                                v-if="floor.planHasOpenTerrace"
                                                :label="`Terrace area - (${plan.landAreaUom}\u00B2)`"
                                                input-class=""
                                                v-model="floor.planOpenTerraceArea"
                                                :rules="'decimal:2'"
                                                style="width: 200px; margin-bottom: 5px;"
                                                :name="`floor.planOpenTerraceArea-${k}`"
                                                float-label
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </template>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td colspan="12">
                    
                    &nbsp;
                </td>
            </tr>
        </tbody>
    </table>

    <button class="btn btn-primary pull-right" :disabled="buttonDisabled" @click.prevent="saveLegalAddress('legal')">SAVE</button>
    <!--===========-->

    </form>
</div>
</template>
<script>
import {mapActions, mapGetters } from 'vuex';
import areaUnitMixin from '@/mixins/areaUnitMixin';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
    name:'LegalAddress',
    mixins:[areaUnitMixin],
    inject: ['$validator'],
    components:{
        DatePicker
    },
    props: {
        order: {
            type:Object,
            default: () => {}
        },
        survey: {
            type:Object,
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
        propertyMeta: {
            type:Object,
            default: () => {}
        }
    },
    data: () => {
        return {
            address : {
                propertyNo            : '',
                floor                 : '',
                wingName              : '',
                societyName           : '',
                revenueSurveyNo       : '',
                reRevenueSurveyNo     : '',
                blockNo               : '',
                amalgamatedNewBlockNo : '',
                villageLimitOf        : '',
                originalPlotNo        : '',
                finalPlotNo           : '',
                subPlotNo             : '',
                taluka                : '',
                tehsilNo              : '',
                citySurveyNondhNo     : '',
                citySurveyWardNo      : '',
                khataNo               : '',
                chaltaNo              : '',
                citySurveySheetNo     : '',
                hissaNo               : '',
                district              : '',
                state                 : '',
                pincode               : '',
                documents             : [],
                ownershipDetail       : '',
                landArea              : '',
                landAreaUom           : 'm',
                builtUpArea           : '',
                superBuiltUpArea           : '',
                carpetArea            : '',
                areaUom               : 'm',
            },
            plan: {
                detail                        : '',
                approvedDate                  : '',
                authority                     : '',
                landArea                      : '',
                landAreaUom                   : 'm',
                computedBuiltUpArea                   : '',
                computedCarpetArea                    : '',
                areaUom                       : 'm',
                areaUom                       : 'm',
                planProvided                  : true,
                permissibleConsideredLandArea : 'document',
                permissibleFloors             : 0,
                permissiblePercentage         : 0,
                floors                        : []
            },
            buttonDisabled:false
        }
    },
    created() {
        this.mountObject();
    },
    methods: {
        ...mapActions({
            getPropertyMetaAction: 'setting/getPropertyMetaAction',
            saveLegalAddressAction: 'order/saveLegalAddressAction',
            getLegalAddressAction: 'order/getLegalAddressAction',
            getPlanDetailsAction: 'order/getPlanDetailsAction',
        }),
        saveLegalAddress(scope) {
            let self = this;
            let elements = {};
            
            this.$validator.validate().then((result) => {
                if (result) {
                    this.buttonDisabled = true;
                    this.saveLegalAddressAction({
                        id: this.order.id,
                        ...this.address,
                        plan: this.plan,

                    }).then((resp) => {
                        self.$notify('Legal Address saved successfully.');
                        //this.$router.push('/orders/'+resp.data.data.id);
                        this.$emit('hide');
                        this.errors.clear();
                    }).catch(function(e){
                        self.$notify({content:'Something went wrong.',type:'danger'});
                    }).finally(function(res){
                        self.buttonDisabled = false;
                    });

                } else {
                    self.$notify({
                        type:'danger',
                        content: `Please fill required field(s)`,
                        duration: 5000
                    });
                }
            });
        },
        mountObject() {
            if (Object.keys(this.legalAddress).length && Object.keys(this.planDetails).length && Object.keys(this.survey).length) {
                let address = {
                    propertyNo            : this.legalAddress.propertyNo,
                    floor                 : this.legalAddress.floor,
                    wingName              : this.legalAddress.wingName,
                    societyName           : this.legalAddress.societyName,
                    revenueSurveyNo       : this.legalAddress.revenueSurveyNo,
                    reRevenueSurveyNo     : this.legalAddress.reRevenueSurveyNo,
                    blockNo               : this.legalAddress.blockNo,
                    amalgamatedNewBlockNo : this.legalAddress.amalgamatedNewBlockNo,
                    villageLimitOf        : this.legalAddress.villageLimitOf,
                    originalPlotNo        : this.legalAddress.originalPlotNo,
                    finalPlotNo           : this.legalAddress.finalPlotNo,
                    subPlotNo             : this.legalAddress.subPlotNo,
                    taluka                : this.legalAddress.taluka,
                    tehsilNo              : this.legalAddress.tehsilNo,
                    citySurveyNondhNo     : this.legalAddress.citySurveyNondhNo,
                    citySurveyWardNo      : this.legalAddress.citySurveyWardNo,
                    khataNo               : this.legalAddress.khataNo,
                    chaltaNo              : this.legalAddress.chaltaNo,
                    citySurveySheetNo     : this.legalAddress.citySurveySheetNo,
                    hissaNo               : this.legalAddress.hissaNo,
                    district              : this.legalAddress.district,
                    state                 : this.legalAddress.state,
                    pincode               : this.legalAddress.pincode,
                    documents             : this.legalAddress.documents,
                    ownershipDetail       : this.legalAddress.ownershipDetail,
                    landArea              : this.legalAddress.landArea,
                    landAreaUom           : this.legalAddress.landAreaUom,
                    builtUpArea           : this.legalAddress.builtUpArea,
                    superBuiltUpArea           : this.legalAddress.superBuiltUpArea,
                    carpetArea            : this.legalAddress.carpetArea,
                    areaUom               : this.legalAddress.areaUom,
                };

                let plan = {
                    detail                        : this.planDetails.detail,
                    approvedDate                  : this.planDetails.approvedDate,
                    authority                     : this.planDetails.authority,
                    landArea                      : this.planDetails.landArea,
                    landAreaUom                   : this.planDetails.landAreaUom,
                    computedBuiltUpArea                   : this.planDetails.computedBuiltUpArea,
                    computedCarpetArea                    : this.planDetails.computedCarpetArea,
                    areaUom                       : this.planDetails.areaUom,
                    planProvided                  : !!this.planDetails.planProvided,
                    permissibleConsideredLandArea : this.planDetails.permissibleConsideredLandArea,
                    permissibleFloors             : this.planDetails.permissibleFloors,
                    permissiblePercentage         : this.planDetails.permissiblePercentage,
                    floors                        : this.plan.floors
                }

                this.plan = plan;
                this.address = address;
                this.updateFloorList();
            }
        },
        updateFloorList() {
            let floors = this.survey.floors.map( (floor, index) => {
                return this.createFloorObject(floor.id, floor, index);
            });
            this.plan.floors = floors;
            this.calculatePermissibleArea();
        },
        addFloorObject(event,id, am) {
            //console.log(id,am)
            id = id || null;
            am = am || [];
            this.plan.floors.push(this.createFloorObject(id,am))
        },
        createFloorObject(floorId, floor, floorIndex) {
            return {
                id: floorId,
                floor: floor.floor,
                planOpenTerraceArea:floor.planOpenTerraceArea,
                planHasOpenTerrace: floor.planHasOpenTerrace ? floor.planHasOpenTerrace : false,
                structures: this.propertyMeta.structure.map((obj) => {
                    let found = floor.structures ? floor.structures.filter((aa) => {
                            return aa.id == obj.id && aa.pivot.plan_has
                        }) : [];
                    //console.log(found.length, '===')
                    return {
                        
                        available:!!found.length || obj.name == 'RCC',
                        label: obj.name,
                        id: obj.id,
                        buArea: found.length ? found[0].pivot.plan_bu_area : 0,

                    }
                }),
                //computedPlanBuiltUpArea: !isNaN(floorIndex) && this.plan.floors[floorIndex] ? this.plan.floors[floorIndex].computedPlanBuiltUpArea : floor.computedPlanBuiltUpArea,
                computedPlanBuiltUpArea: floor.computedPlanBuiltUpArea,
                planCarpetArea: floor.planCarpetArea,
            }
        },
        getStructure(data) {
            return data.filter(i => i.available).map(i => i.id)
        },
        setStructure(val,floorIndex) {
            let acc = this.plan.floors[floorIndex].structures;
            acc.forEach( i => {
                if (val.indexOf(i.id) > -1) {
                    i.available = true;
                } else {
                    i.available = false;
                }
            })
            this.plan.floors[floorIndex].structures = acc;
        },
        calculatePermissibleArea() {
            let floors = [];
            if (!this.plan.planProvided) {
                for (var i = 0; i < this.plan.floors.length; i++) {
                    let floor = {...this.plan.floors[i]};
                    if ((parseInt(this.plan.permissibleFloors) + 1) > i) {
                        floor.planHasOpenTerrace = false;
                        floor.planOpenTerraceArea = 0;
                        floor.structures = floor.structures.map(s => {
                            if(s.label == 'RCC') {
                                s.available = true;
                                let area = parseFloat((parseFloat(this.plan.permissiblePercentage)/100)*this.consideredLandArea).toFixed(2);
                                if (isNaN(area)) {
                                    s.buArea = 0
                                } else {
                                    s.buArea = area;
                                }
                            } else {
                                s.available = false;
                                s.buArea = 0;
                            }

                            return s;
                        })
                        //floor.computedPlanBuiltUpArea = parseFloat((parseFloat(this.plan.permissiblePercentage)/100)*this.consideredLandArea).toFixed(2);

                        // if (isNaN(floor.computedPlanBuiltUpArea)) {
                        //     floor.computedPlanBuiltUpArea = '';
                        // }
                    } else {
                        floor.structures = floor.structures.map(s => {
                            s.available = false;
                            s.buArea = 0;
                            return s;
                        })
                    }
                    floors.push(floor);
                }
            this.plan.floors = floors;
            }
        }
    },
    computed: {
        ...mapGetters({
            //legalAddress : 'order/legalAddressGetter',
            //planDetails : 'order/planDetailsGetter',
           // propertyMeta: 'setting/propertyMetaGetter',
        }),
        fsi(){
            return parseFloat((parseFloat(this.plan.permissiblePercentage)* (1 + parseInt(this.plan.permissibleFloors))) /100 ).toFixed(2)
        },
        consideredLandArea() {
            if (this.plan.permissibleConsideredLandArea == 'document') {
                return this.convertArea(this.address.landArea,this.address.landAreaUom,this.plan.areaUom);
            } else if (this.plan.permissibleConsideredLandArea == 'survey') {
                return this.convertArea(this.survey.landArea,this.survey.landAreaUom,this.plan.areaUom);
            }
            return 0;
        }
    },
    watch: {
        legalAddress: function(val){
            this.mountObject();
        },
        planDetails: function(val){
            this.mountObject();
        },
        survey: function(val){
            this.updateFloorList();
        },
        plan: {
            handler(newVal, oldVal){
                if (newVal.planProvided != oldVal.planProvided) {
                    if (!newVal.planProvided) {
                        //this.calculatePermissibleArea();
                    }
                }
            },
            deep: true
        }
    }
}
</script>