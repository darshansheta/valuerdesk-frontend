<template>
    <div>
        <h4 class="semi-bold">Valuation Form</h4>
        <div class="row">
            <div class="col-md-9 col-sm-12">
            <form @submit.prevent="saveSelection('selection')">
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
                            <tr :class="{'info': valuationForm.landAreaForm == 'plan'}">
                                <td>
                                    <input
                                        type="radio"
                                        name="valuationForm.landAreaForm"
                                        v-model="valuationForm.landAreaForm"
                                        value="plan"
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
                                <button
                                type="button"
                                class="btn btn-default"
                                :class="{ 'active': valuationForm.constructionAreaForm == 'surveyPlan'}"
                                @click="selectConstructionAreaForm('surveyPlan')"
                                >
                            Survey/Plan</button>
                            </div>

                            <div class="btn-group" role="group">
                                <button
                                    type="button"
                                    class="btn btn-default"
                                    :class="{ 'active': valuationForm.constructionAreaForm == 'legalAddress' }"
                                    @click="selectConstructionAreaForm('legalAddress')"
                                >Document</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-3 padding-md" :class="{opacity_5: valuationForm.constructionAreaForm != 'legalAddress'}">
                    <div class="col-sm-4">
                        <div class="card card-default clickable" @click="selectConstructionSubAreaLA('superBuiltUp')" :class="{active: valuationForm.constructionSubAreaForm == 'superBuiltUp'}">
                            <span class="card-body">
                              <span class="h4 heading" style="text-align: right;"> {{convertArea(legalAddress.superBuiltUpArea,legalAddress.areaUom,'m')}} m<sup>2</sup></span>
                              <p style="text-align: right;">Super built-up area</p>
                            </span>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="card card-default clickable" @click="selectConstructionSubAreaLA('builtUp')" :class="{active: valuationForm.constructionSubAreaForm == 'builtUp'}">
                            <span class="card-body">
                              <span class="h4 heading" style="text-align: right;">{{convertArea(legalAddress.builtUpArea,legalAddress.areaUom,'m')}} m<sup>2</sup></span>
                              <p style="text-align: right;">Built-up area</p>
                            </span>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="card card-default clickable" @click="selectConstructionSubAreaLA('carpet')" :class="{active: valuationForm.constructionSubAreaForm == 'carpet'}">
                            <span class="card-body">
                              <span class="h4 heading" style="text-align: right;">{{convertArea(legalAddress.carpetArea,legalAddress.areaUom,'m')}} m<sup>2</sup></span>
                              <p style="text-align: right;">Carpet area</p>
                            </span>
                        </div>
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="col-md-6">
                    </div>
                    <div class="col-sm-6">
                        <div class="btn-group btn-group-justified" role="group" aria-label="...">
                            <div class="btn-group" role="group">
                                <button
                                    type="button"
                                    class="btn btn-default btn-sm"
                                    :disabled="valuationForm.constructionAreaForm != 'surveyPlan'"
                                    :class="{ 'btn-primary': valuationForm.constructionSubAreaForm == 'minimum'}"
                                    @click="selectConstructionSubAreaFormSurveyPlan('minimum')"
                                >
                            Minimum</button>
                            </div>

                            <div class="btn-group" role="group">
                                <button
                                    type="button"
                                    class="btn btn-default btn-sm"
                                    :disabled="valuationForm.constructionAreaForm != 'surveyPlan'"
                                    :class="{ 'btn-primary': valuationForm.constructionSubAreaForm == 'custom' }"
                                    @click="selectConstructionSubAreaFormSurveyPlan('custom')"
                                >Custom</button>
                            </div>
                        </div>
                    </div>
                </div>
                <table class="table table-bordered" :class="{opacity_5: (
                    valuationForm.constructionAreaForm != 'surveyPlan' ||
                    valuationForm.constructionSubAreaForm == 'minimum'
                    )}">
                    <thead>
                        <tr class="active">
                            <th rowspan="2" colspan="2" >Floors</th>
                            <th colspan="2">Built-up Area</th>
                            <th colspan="2">Carpet Area</th>
                        </tr>
                        <tr class="active">
                            <th width="20%">Survey</th>
                            <th>Plan</th>
                            <th>Survey</th>
                            <th>Plan</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(floor,fk) in surveyData.floors">
                            <template v-for="(ss,kk) in floor.structures">
                                <tr>
                                    <td
                                        v-if="kk == 0"
                                        :rowspan="floor.structures.length"
                                    >
                                        {{floor.floor}}
                                    </td>
                                    <td
                                        class="text-truncate"
                                        style="max-width: 75px;"
                                    >
                                        {{ss.name}}
                                    </td>
                                    <td
                                        align="right"
                                        class="clickable"
                                        :class="{pa: ss.pivot.considered == 'survey' && floor.considered == 'structure' }"
                                        @click="setFloorStructureConsideredArea(fk,kk,'survey')"
                                    >
                                        {{convertArea(ss.pivot.survey_bu_area, surveyData.areaUom, 'm')}} m<sup>2</sup>
                                    </td>
                                    <td
                                        align="right"
                                        class="clickable"
                                        :class="{pa: ss.pivot.considered == 'plan' && floor.considered == 'structure' }"
                                        @click="setFloorStructureConsideredArea(fk,kk,'plan')"
                                    >
                                        {{convertArea(ss.pivot.plan_bu_area, planDetails.areaUom, 'm')}} m<sup>2</sup>
                                    </td>
                                    <td
                                        align="right"
                                        class="clickable"
                                        :rowspan="floor.structures.length"
                                        v-if="kk == 0"
                                        :class="{pa: floor.considered == 'surveyCarpet'}"
                                        @click="setFloorConsideredArea(fk,'surveyCarpet')"
                                    >
                                        {{convertArea(floor.surveyCarpetArea,surveyData.areaUom,'m')}} m<sup>2</sup>
                                    </td>
                                    <td
                                        align="right"
                                        class="clickable"
                                        :rowspan="floor.structures.length"
                                        v-if="kk == 0"
                                        :class="{pa: floor.considered == 'planCarpet'}"
                                        @click="setFloorConsideredArea(fk,'planCarpet')"
                                    >
                                        {{convertArea(floor.planCarpetArea,planDetails.areaUom,'m')}} m<sup>2</sup>
                                    </td>
                                </tr>
                            </template>
                        </template>
                        <!-- <tr v-for="floor in survey.floors">
                            <td>{{floor.floor}}</td>
                            <td class="primary-active clickable">
                                <table class="table table-condensed mb-0 bg-transparent">
                                    <tbody>
                                <tr v-for="ss in floor.structures">
                                   <td class="text-truncate border-top-0" style="max-width: 75px;"><small>{{ss.name}}</small></td> 
                                    <td align="right" class="border-top-0">
                                        <h5 class="m-0">{{ss.pivot.survey_bu_area}}</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="border-top"><small>Total</small></td>
                                    <td class="border-top" align="right">{{floor.builtUpArea}}</td>
                                </tr>
                                </tbody>
                                </table>
                            </td>
                            <td align="right">{{floor.carpetArea}}</td>
                            <td>
                                <table class="table table-condensed mb-0 bg-transparent">
                                    <tbody>
                                <tr v-for="ss in floor.structures">
                                   <td class="text-truncate border-top-0" style="max-width: 75px;"><small>{{ss.name}}</small></td> 
                                    <td align="right" class="border-top-0">
                                        <h5 class="m-0">{{ss.pivot.plan_bu_area}}</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="border-top"><small>Total</small></td>
                                    <td class="border-top" align="right">{{floor.planBuiltUpArea}}</td>
                                </tr>
                                </tbody>
                                </table>
                            </td>
                            <td align="right">{{floor.planCarpetArea}}</td>
                        </tr> -->
                    </tbody>
                </table>

                <template v-if="(
                    survey.floors.filter(f => {
                        return f.surveyHasOpenTerrace || f.planHasOpenTerrace;
                    }).length
                    )">
                <h5 class="semi-bold">Select Open Terrace Area</h5>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="btn-group btn-group-justified" role="group" aria-label="...">
                            <div class="btn-group" role="group">
                                <button
                                type="button"
                                class="btn btn-default"
                                :class="{ 'btn-primary': valuationForm.openTerraceAreaForm == 'survey'}"
                                @click="selectOpenTerraceAreaForm('survey')"
                                >
                            Survey - {{convertArea(survey.computedOpenTerraceArea,survey.areaUom,'m')}} m<sup>2</sup>  </button>
                            </div>

                            <div class="btn-group" role="group">
                                <button
                                    type="button"
                                    class="btn btn-default"
                                    :class="{ 'btn-primary': valuationForm.openTerraceAreaForm == 'plan' }"
                                    @click="selectOpenTerraceAreaForm('plan')"
                                >Plan - {{convertArea(planDetails.computedOpenTerraceArea,planDetails.areaUom,'m')}} m<sup>2</sup>  </button>
                            </div>
                        </div>
                    </div>
                </div>
                </template>
                <div class="row mt-2">
                    <div class="col-sm-12">
                        <button type="submit" :disabled="buttonDisabled" class="btn btn-primary pull-right">SAVE SELECTION</button>
                    </div>
                </div>
                <!-- <div class="panel panel-slg">
                    
                </div>
                 -->
                 <!----new version end---->
            
            </form>

            <form  @submit.prevent="saveDepreciation('depreciation')">
                <hr>
                <h5 class="semi-bold">Depreciation</h5>
                <div class="panel panel-slg">
                    <div class="panel-body">
                        <div class="form-horizontal">
                            <vee-input
                                label="Age of Construction (year)"
                                v-model="valuationForm.age"
                                :rules="'required|integer|min_value:0'"
                                i-type="number"
                                input-class="input-sm"
                                name="valuationForm.age"
                                labelCol="col-sm-4"
                                controlCol="col-sm-6"
                            />
                            <vee-input
                                label="Life of Construction (year)"
                                v-model="valuationForm.life"
                                :rules="'required|integer|min_value:0'"
                                i-type="number"
                                input-class="input-sm"
                                name="valuationForm.life"
                                labelCol="col-sm-4"
                                controlCol="col-sm-6"
                            />
                            <vee-input
                                label="Salvage % "
                                v-model="valuationForm.salvagePercentage"
                                :rules="'required|decimal:2|min_value:0|max_value:100'"
                                i-type="number"
                                input-class="input-sm"
                                name="valuationForm.salvagePercentage"
                                labelCol="col-sm-4"
                                controlCol="col-sm-6"
                            />
                            <vee-input
                                label="Depreciated Rate"
                                v-model="valuation.depreciatedRate"
                                :rules="'required|decimal:2|min_value:0'"
                                i-type="number"
                                input-class="input-sm"
                                name="valuationForm.depreciatedRate"
                                :readonly="true"
                                labelCol="col-sm-4"
                                controlCol="col-sm-6"
                            />
                            <vee-input
                                label="Depreciated Cost"
                                v-model="valuation.depreciatedCost"
                                :rules="'required|decimal:2|min_value:0'"
                                i-type="number"
                                input-class="input-sm"
                                name="valuationForm.depreciatedCost"
                                :readonly="true"
                                labelCol="col-sm-4"
                                controlCol="col-sm-6"
                            />
                            <vee-input
                                label="New Construction Cost"
                                v-model="valuation.newConstructionCost"
                                :rules="'required|decimal:2|min_value:0'"
                                i-type="number"
                                input-class="input-sm"
                                name="valuationForm.newConstructionCost"
                                :readonly="true"
                                labelCol="col-sm-4"
                                controlCol="col-sm-6"
                            />
                        </div>
                    </div>
                </div>
                <button type="submit" :disabled="buttonDisabled" class="btn btn-primary pull-right">SAVE</button>
            </form>
            </div>

            <form @submit.prevent="validateForm('valuationForm')"
            autocomplete="off">
            <div class="col-md-9 col-sm-12">
                <h5 class="semi-bold">Market Value</h5>
                <div class="panel panel-slg">
                    <div class="panel-body">
                        <div class="">
                            <!-- <div class="form-group">
                                <label class="control-label col-sm-4">
                                    Prevailing Market Rate
                                </label>
                            </div> -->
                            <div class="row" v-if="withLand">
                                <div class="col-sm-8">
                                    <vee-input
                                        :label="`Prevailing Market Rate/${valuationForm.rateOfSaleUom}\u00B2`"
                                        v-model="valuationForm.rateOfSale"
                                        :rules="'decimal:2|required|min_value:0'"
                                        name="valuationForm.rateOfSale"
                                        float-label
                                        i-type="number"
                                    />
                                </div>
                                <div class="col-sm-4">
                                    <vee-select
                                        :label="`Rate Unit`"
                                        name="valuationForm.rateOfSaleUom"
                                        v-model="valuationForm.rateOfSaleUom"
                                        :rules="'required'"
                                        float-label
                                    >
                                        <option v-for="(uom,key) in ['ft','yd', 'm']" :value="uom">{{uom}}&sup2;</option>
                                    </vee-select>
                                </div>
                            </div>
                            <!-- <div class="form-group" :class="{'has-error': errors.has('valuationForm.rateOfSale')}">
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
                            </div> -->
                            <!-- <div class="form-group" v-show="withLand">
                                <label class="col-sm-4 control-label">Market Value Of Land</label>
                                <div class="col-sm-8">
                                    <p class="">= {{convertArea(landAreaConsidered,landAreaConsideredUom,valuationForm.rateOfSaleUom)}} {{valuationForm.rateOfSaleUom}}&sup2;  &times; <i class="fa fa-rupee"></i>. {{valuationForm.rateOfSale}}/{{valuationForm.rateOfSaleUom}}&sup2; </p>
                                </div>
                            </div>
                            <div class="form-group" v-show="withLand">
                                <label class="col-sm-4 control-label"></label>
                                <div class="col-sm-8">
                                    <p class="form-control-static">= <i class="fa fa-rupee"></i>.{{numberWithCommas(valuationForm.landValue)}} {{valuationForm.rateOfSaleUom}}&sup2;</p>
                                </div>
                            </div> -->
                            <hr style="margin-top: 0;"  v-show="withLand">
                            <div class="row" v-for="(sv, svi) in valuationForm.structures">
                                <div class="col-sm-4">
                                    <vee-input
                                        :label="`${sv.structure.name} - Construction Rate/${valuationForm.rateOfConstructionUom}\u00B2`"
                                        v-model="sv.rate"
                                        :rules="'decimal:2|required|min_value:0'"
                                        :name="`valuationForm.rateOfConstruction.${svi}`"
                                        float-label
                                        i-type="number"
                                    />
                                </div>
                                <div class="col-sm-4">
                                    <vee-input
                                        :label="`${sv.structure.name} - Construction Jantri Rate/${valuationForm.rateOfConstructionUom}\u00B2`"
                                        v-model="sv.jantriRate"
                                        :rules="'decimal:2|required|min_value:0'"
                                        :name="`valuationForm.rateOfConstruction.${svi}`"
                                        float-label
                                        i-type="number"
                                    />
                                </div>
                                <div class="col-sm-4">
                                    <vee-input
                                        :label="`${sv.structure.name} - total Area ${valuationForm.rateOfConstructionUom}\u00B2`"
                                        v-model="sv.area"
                                        :rules="''"
                                        readonly
                                        :name="`valuationForm.area.${svi}`"
                                        float-label
                                        i-type="number"
                                    />
                                </div>
                                <div class="col-sm-4" v-if="svi == 0">
                                    <vee-select
                                        :label="`Rate Unit`"
                                        name="valuationForm.rateOfConstructionUom"
                                        v-model="valuationForm.rateOfConstructionUom"
                                        :rules="'required'"
                                        float-label
                                    >
                                        <option v-for="(uom,key) in ['ft','yd', 'm']" :value="uom">{{uom}}&sup2;</option>
                                    </vee-select>
                                </div>
                            </div>

                            <!-- <div class="form-group" :class="{'has-error': errors.has('valuationForm.rateOfConstruction')}"  v-show="withLand">
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
                            </div> -->
                            <hr style="margin-top: 0;">
                            <div class="row" v-if="valuationForm.openTerraceAreaForm">
                                <div class="col-sm-8">
                                    <vee-input
                                        :label="`Open Terrace Rate/${valuationForm.rateOfOpenTerraceUom}\u00B2`"
                                        v-model="valuationForm.rateOfOpenTerrace"
                                        :rules="'decimal:2|required|min_value:0'"
                                        name="valuationForm.rateOfOpenTerrace"
                                        float-label
                                        i-type="number"
                                    />
                                </div>
                                <div class="col-sm-4">
                                    <vee-select
                                        :label="`Rate Unit`"
                                        name="valuationForm.rateOfOpenTerraceUom"
                                        v-model="valuationForm.rateOfOpenTerraceUom"
                                        :rules="'required'"
                                        float-label
                                    >
                                        <option v-for="(uom,key) in ['ft','yd', 'm']" :value="uom">{{uom}}&sup2;</option>
                                    </vee-select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8">
                                    <div class="form-group"">
                                        <textarea placeholder="Amenities note" style="resize: vertical;" class="form-control" name="valuationForm.amenitiesNote" v-model="valuationForm.amenitiesNote"></textarea>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <vee-input
                                        :label="`Amenities value`"
                                        v-model="valuationForm.amenitiesValue"
                                        :rules="'decimal:2|min_value:0'"
                                        name="valuationForm.amenitiesValue"
                                        float-label
                                        i-type="number"
                                    />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">Fair Market Value of property</label>
                                <div class="col-sm-9">
                                    <table width="100%">
                                        <tr v-show="withLand">
                                            <td>
                                                + <i class="fa fa-rupee"></i>.   <span class="pull-right">{{numberWithCommas(valuationForm.landValue)}}</span>
                                            </td>
                                            <td>
                                                &nbsp; - Market Value Of Land
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><template v-show="!withLand">+ </template> <i class="fa fa-rupee"></i>.  <span class="pull-right">{{numberWithCommas(valuationForm.constructionValue)}}</span></td>
                                            <td> &nbsp; - Value Of Construction</td>
                                        </tr>
                                        <tr v-show="valuationForm.openTerraceAreaForm">
                                            <td class="pb-2">
                                                + <i class="fa fa-rupee"></i>.  <span class="pull-right">{{numberWithCommas(valuationForm.openTerraceValue)}}</span>
                                            </td>
                                            <td> &nbsp; - Open terrace value</td>
                                        </tr>
                                        <tr>
                                            <td class="pb-2">
                                                + <i class="fa fa-rupee"></i>.  <span class="pull-right">{{numberWithCommas(valuationForm.amenitiesValue)}}</span>
                                            </td>
                                            <td>
                                                 &nbsp; - Amenities value
                                            </td>
                                        </tr>
                                        <tr class="mt-2">
                                            <td class="border-top pt-2">
                                                = <i class="fa fa-rupee"></i>. <span class="pull-right">{{numberWithCommas(valuationForm.fairMarketValue)}}</span>
                                            </td>
                                            <td class="border-top pt-2">
                                                &nbsp;Says, <i class="fa fa-rupee"></i>.{{numberWithCommas(fairMarketValueThousandComputed)}}/-
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label"> In words <i class="fa fa-rupee"></i>.</label>
                                <div class="col-sm-9">
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
                                :dhelp-text="`= <i class='fa fa-rupee'></i>. ${(fairMarketValueThousandComputed*parseFloat(valuationForm.distressSalePercentage)/100).toFixed(2)}`"
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
                                :dhelp-text="`= <i class='fa fa-rupee'></i>. ${(fairMarketValueThousandComputed*parseFloat(valuationForm.forceSalePercentage)/100).toFixed(2)}`"
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
                                :dhelp-text="`= <i class='fa fa-rupee'></i>. ${(fairMarketValueThousandComputed*parseFloat(valuationForm.realisablePercentage)/100).toFixed(2)}`"
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
                                :dhelp-text="`= <i class='fa fa-rupee'></i>. ${(fairMarketValueThousandComputed*parseFloat(valuationForm.realisableDistressPercentage)/100).toFixed(2)}`"
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
            </form>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import areaUnitMixin from '@/mixins/areaUnitMixin';
import _ from 'lodash';
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
                constructionAreaForm              : 'surveyPlan',
                constructionSubAreaForm              : null,
                openTerraceAreaForm              : null,
                rateOfSale                   : 0,
                rateOfSaleUom                : 'yd',
                rateOfConstruction           : 0,
                rateOfConstructionUom        : 'yd',
                rateOfOpenTerrace        : 0,
                rateOfOpenTerraceUom        : 'm',
                amenitiesNote        : null,
                amenitiesValue        : 0,
                landValue                    : 0,
                constructionValue            : 0,
                jantriValue            : 0,
                openTerraceValue            : 0,
                fairMarketValue              : 0,
                distressSalePercentage       : 0,
                forceSalePercentage          : 0,
                realisablePercentage         : 0,
                realisableDistressPercentage : 0,
                insurableValue               : 0,
                age               : 0,
                life               : 0,
                salvagePercentage               : 0,
                structures               : [],
            },
            surveyData: {
                propertyType : '',
                areaUom      : '',
                landArea     : 0,
                landAreaUom  : '',
                floors       : [],
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
            saveSelectionAction: 'order/saveSelectionAction',
            saveDepreciationAction: 'order/saveDepreciationAction',
        }),
        mountObject() {
            let ss = this.valuation.structures.map(s => {
                let ts = {...s};
                ts.structure = {...s.structure};
                return ts;
            }) ;

            let form = {
                landAreaForm                 :this.valuation.landAreaForm,
                constructionAreaForm              :this.valuation.constructionAreaForm,
                constructionSubAreaForm              :this.valuation.constructionSubAreaForm,
                openTerraceAreaForm              :this.valuation.openTerraceAreaForm,
                rateOfSale                   :this.valuation.rateOfSale,
                rateOfSaleUom                :this.valuation.rateOfSaleUom,
                rateOfConstruction           :this.valuation.rateOfConstruction,
                rateOfConstructionUom        :this.valuation.rateOfConstructionUom,
                rateOfOpenTerrace        : this.valuation.rateOfOpenTerrace,
                rateOfOpenTerraceUom        :  this.valuation.rateOfOpenTerraceUom,
                amenitiesNote        : this.valuation.amenitiesNote,
                amenitiesValue        : this.valuation.amenitiesValue,
                landValue                    :this.valuation.landValue,
                openTerraceValue                    :this.valuation.openTerraceValue,
                constructionValue            :this.valuation.constructionValue,
                jantriValue            :this.valuation.jantriValue,
                fairMarketValue              :this.valuation.fairMarketValue,
                distressSalePercentage       :this.valuation.distressSalePercentage,
                forceSalePercentage          :this.valuation.forceSalePercentage,
                realisablePercentage         :this.valuation.realisablePercentage,
                realisableDistressPercentage :this.valuation.realisableDistressPercentage,
                insurableValue               :this.valuation.insurableValue,
                age               :this.valuation.age,
                life               :this.valuation.life,
                salvagePercentage               :this.valuation.salvagePercentage,
                structures               :ss,//[...this.valuation.structures],
            };
            this.valuationForm = form;
            this.updateSurveyObject();
        },
        updateSurveyObject() {
            let surveyData = {

            };

            if (Object.keys(this.survey).length) {
                surveyData = {
                    propertyType : this.survey.propertyType,
                    areaUom      : this.survey.areaUom,
                    landArea     : this.survey.landArea,
                    landAreaUom  : this.survey.landAreaUom,
                    floors       : JSON.parse(JSON.stringify(this.survey.floors)),
                }
            }
            this.surveyData = surveyData;
            if (this.valuationForm.constructionSubAreaForm == 'minimum') {
                this.setStructureAreaBy('minimum')
            }
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
        },
        saveSelection(scope) {
            let self = this;
            this.buttonDisabled = true;
            this.saveSelectionAction({
                id:this.order.id,
                ...this.valuationForm,
                floors: this.surveyData.floors
            }).then((resp) => {
                self.$notify('Area selection saved successfully.');
            }).catch(function(e){
                console.log(e)
            }).finally(function(res){
                self.buttonDisabled = false;
            });

                
        },
        saveDepreciation(scope) {
            let self = this;
            this.buttonDisabled = true;
            this.saveDepreciationAction({
                id:this.order.id,
                age: this.valuationForm.age,
                life: this.valuationForm.life,
                salvagePercentage: this.valuationForm.salvagePercentage
            }).then((resp) => {
                self.$notify('Area Depreciation data saved successfully.');
            }).catch(function(e){
                console.log(e)
            }).finally(function(res){
                self.buttonDisabled = false;
            });

                
        },
        selectConstructionAreaForm(form) {
            this.valuationForm.constructionAreaForm = form;
            if (this.valuationForm.constructionAreaForm == 'legalAddress') {
                this.valuationForm.constructionSubAreaForm = 'superBuiltUp';
                this.setStructureAreaBy(null)
            } else {
                this.selectConstructionSubAreaFormSurveyPlan('minimum');
            }
            
        },
        selectConstructionSubAreaLA(subForm) {
            if (this.valuationForm.constructionAreaForm == 'legalAddress') {
                this.valuationForm.constructionSubAreaForm = subForm;
            }
        },
        selectConstructionSubAreaFormSurveyPlan(subForm) {
            if (this.valuationForm.constructionAreaForm == 'surveyPlan') {
                this.valuationForm.constructionSubAreaForm = subForm;

                if (this.valuationForm.constructionSubAreaForm == 'minimum') {
                    this.setStructureAreaBy('minimum')
                }
            }
        },
        selectOpenTerraceAreaForm(form) {
            this.valuationForm.openTerraceAreaForm = form;
        },
        setStructureAreaBy( type ) {
            for(let fk in this.surveyData.floors) {
                let floor = this.surveyData.floors[fk];
                for (let sk in floor.structures) {
                    let structure = floor.structures[sk];
                    this.surveyData.floors[fk].considered = 'structure';
                    if (type == 'minimum') {
                        if (structure.pivot.survey_has && structure.pivot.plan_has) {
                            if (this.convertArea(structure.pivot.survey_bu_area, this.surveyData.areaUom, 'm', 0)  >= this.convertArea(structure.pivot.plan_bu_area, this.planDetails.areaUom, 'm', 0)) {
                                this.surveyData.floors[fk].structures[sk].pivot.considered = 'plan'
                            } else {
                                this.surveyData.floors[fk].structures[sk].pivot.considered = 'survey'
                            }
                        } else if(structure.pivot.survey_has) {
                            this.surveyData.floors[fk].structures[sk].pivot.considered = 'survey'
                        } else if(structure.pivot.plan_has){
                            this.surveyData.floors[fk].structures[sk].pivot.considered = 'plan'
                        }
                    } else if (type == null) {
                        this.surveyData.floors[fk].structures[sk].pivot.considered = null;
                    }
                }
            }
        },
        setFloorStructureConsideredArea(fk,sk,considered) {
            if (
                this.valuationForm.constructionAreaForm == 'surveyPlan' &&
                this.valuationForm.constructionSubAreaForm == 'custom' &&
                ['survey', 'plan', null].indexOf(considered) > -1
            ) {
                this.surveyData.floors[fk].considered = 'structure';
                this.surveyData.floors[fk].structures[sk].pivot.considered = considered
            }
        },
        setFloorConsideredArea(fk,considered) {
            if (
                this.valuationForm.constructionAreaForm == 'surveyPlan' &&
                this.valuationForm.constructionSubAreaForm == 'custom' &&
                ['surveyCarpet', 'planCarpet'].indexOf(considered) > -1
            ) {
                this.surveyData.floors[fk].considered = considered
                for( let sk in this.surveyData.floors[fk].structures) {
                    this.surveyData.floors[fk].structures[sk].pivot.considered = null;
                }
            }
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
            return 0 ;
        },
        builtUpAreaConsideredUom : function() {
            return 'm' ;
        },
        fairMarketValueThousandComputed : function () {
            return Math.trunc(parseFloat(this.valuationForm.fairMarketValue)/1000)*1000;
        }
    },
    watch: {
        valuation: function(val) {
            this.mountObject();
        },
        valuationForm: {
            handler(newVal, oldVal) {
                if (newVal.constructionSubAreaForm == 'minimum') {
                    this.setStructureAreaBy('minimum');
                }
            },
            deep:true
        },
        survey: function(val){
            this.updateSurveyObject();
        }
    }
}
</script>