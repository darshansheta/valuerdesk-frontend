<template>
    <div>
        <h4 class="semi-bold">Survay Form / {{order.assignee.name || 'N/A'}}</h4>
        <form @submit.prevent="validateForm('survey')" autocomplete="off">
            <div class="form-horizontal">
            <div class="row">
                <!--for basic details-->
                <div class="col-lg-6">
                    <div class="panel panel-default">
                        <div class="panel-heading text-bold">
                            Basic Details
                            <div class="pull-right"><i :class="['fa',(showBasic ? 'fa-angle-up' : 'fa-angle-down')]" @click="showBasic = !showBasic"></i></div>
                        </div>
                        <div class="panel-body" v-show="showBasic">
                            <div class="form-group">
                                <label class="control-label col-sm-3">Address </label>
                                <div class="col-sm-9">
                                    <textarea class="form-control" rowspan="3" v-model="propertyDetail.address"></textarea>
                                </div>
                            </div>

                            <vee-select
                                label="Type"
                                v-model="propertyDetail.propertyType"
                                :rules="''"
                                labelCol="col-sm-3"
                                controlCol="col-sm-4"
                                name="propertyDetail.propertyType"
                            >
                                <option value="">SELECT</option>
                            <option v-for="pType in ['Flat', 'Plot','House','Tenement','Office','Shop']" :value="pType">{{pType}}</option>
                            </vee-select>
                            <vee-input
                                label="Shown By"
                                placeholder=""
                                class=""
                                v-model="propertyDetail.shownBy"
                                :rules="''"
                                name="propertyDetail.shownBy"
                                labelCol="col-sm-3"
                                controlCol="col-sm-4"
                            />
                            <vee-input
                                label="Property Name"
                                v-model="propertyDetail.name"
                                :rules="''"
                                name="propertyDetail.name"
                                labelCol="col-sm-3"
                                controlCol="col-sm-4"
                            />
                            <!-- <vee-input
                                label="Number Of Floor"
                                v-model="propertyDetail.floorCount"
                                :rules="''"
                                name="propertyDetail.floorCount"
                                labelCol="col-sm-3"
                                controlCol="col-sm-4"
                                iType="number"
                            /> -->
                            
                            <div class="form-group">
                                <label class="control-label col-sm-3"></label>
                                <div class="col-sm-9">
                                    <div class="checkbox">
                                        <label>
                                            <input type="checkbox" v-model="propertyDetail.isBuildingDemarcated"> Is Building
                                        </label>
                                  </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-sm-3"></label>
                                <div class="col-sm-9">
                                    <div class="checkbox">
                                        <label>
                                            <input type="checkbox" v-model="propertyDetail.isPropertyDemarcated"> Is Property
                                        </label>
                                  </div>
                                </div>
                            </div>

                            <vee-input
                                label="Land Area"
                                v-model="propertyDetail.landArea"
                                :rules="'decimal:2'"
                                name="propertyDetail.landArea"
                                labelCol="col-sm-3"
                                controlCol="col-sm-4"
                            />

                            <vee-select
                                label="Unit"
                                v-model="propertyDetail.landAreaUom"
                                :rules="'required'"
                                labelCol="col-sm-3"
                                controlCol="col-sm-4"
                                name="propertyDetail.landAreaUom">
                                <option v-for="uom in ['ft', 'm','yd']" :value="uom">{{uom}}&sup2;</option>
                            </vee-select>
                            
                            <div class="form-group">
                                <label class="control-label col-sm-3">All Floors</label>
                                <div class="col-sm-9">
                                    <p class="form-control-static">{{propertyDetail.floors.map( floor => floor.floor).join(' + ')}}</p>
                                </div>
                            </div>
                            
                            

                        </div>
                    </div>
                </div>
                <!--end basic details-->
                <!--for Amenities-->
                <div class="col-lg-6">
                    <div class="panel panel-default">
                        <div class="panel-heading text-bold">
                            Amenities
                            <div class="pull-right"><i :class="['fa',(showAmenities ? 'fa-angle-up' : 'fa-angle-down')]" @click="showAmenities = !showAmenities"></i></div>
                        </div>
                        <div class="panel-body" v-show="showAmenities">
                            
                                <vee-select
                                    label="Road"
                                    v-model="propertyDetail.road"
                                    :rules="''"
                                    labelCol="col-sm-3"
                                    controlCol="col-sm-4"
                                    name="propertyDetail.road"
                                >
                                    <option value="">SELECT TYPE</option>
                                    <option value="WBM">WBM</option>
                                    <option value="Block">Block</option>
                                    <option value="Tarred">Tarred</option>
                                    <option value="RCC">RCC</option>
                                    <option value="No road">No road</option>
                                </vee-select>

                                <vee-select
                                    label="COP"
                                    v-model="propertyDetail.cop"
                                    :rules="''"
                                    labelCol="col-sm-3"
                                    controlCol="col-sm-4"
                                    name="propertyDetail.cop"
                                >
                                    <option value="">SELECT TYPE</option>
                                    <option value="Developed">Developed</option>
                                    <option value="Undeveloped">Undeveloped</option>
                                    <option value="absent">absent</option>
                                </vee-select>
                                
                                <div class="form-group">
                                    <label class="control-label col-sm-3"></label>
                                    <div class="col-sm-9">
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" v-model="propertyDetail.security"> Security
                                            </label>
                                      </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="control-label col-sm-3"></label>
                                    <div class="col-sm-9">
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" v-model="propertyDetail.comWall"> Common Wall
                                            </label>
                                      </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="control-label col-sm-3"></label>
                                    <div class="col-sm-9">
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" v-model="propertyDetail.comGate"> Common Gate
                                            </label>
                                      </div>
                                    </div>
                                </div>

                                <vee-select
                                    label="W/s"
                                    v-model="propertyDetail.ws"
                                    :rules="''"
                                    labelCol="col-sm-3"
                                    controlCol="col-sm-4"
                                    name="propertyDetail.ws"
                                >
                                    <option value="">SELECT</option>
                                    <option value="Self">Self</option>
                                    <option value="SMC">SMC</option>
                                    <option value="Soc.">Soc.</option>
                                    <option value="LA">LA</option>
                                </vee-select>

                                <vee-select
                                    label="Construction"
                                    v-model="propertyDetail.construction"
                                    :rules="''"
                                    labelCol="col-sm-3"
                                    controlCol="col-sm-4"
                                    name="propertyDetail.construction"
                                >
                                    <option value="">SELECT</option>
                                    <option value="Uniform">Uniform</option>
                                </vee-select>

                                <vee-select
                                    label="Electricity"
                                    v-model="propertyDetail.electricity"
                                    :rules="''"
                                    labelCol="col-sm-3"
                                    controlCol="col-sm-4"
                                    name="propertyDetail.electricity"
                                >
                                    <option value="">SELECT</option>
                                    <option value="Torrent">Torrent</option>
                                    <option value="DGVCL">DGVCL</option>
                                </vee-select>

                                <vee-select
                                    label="Sewerage"
                                    v-model="propertyDetail.sewerage"
                                    :rules="''"
                                    labelCol="col-sm-3"
                                    controlCol="col-sm-4"
                                    name="propertyDetail.sewerage"
                                >
                                    <option value="">SELECT</option>
                                    <option value="SP">SP</option>
                                    <option value="SMC">SMC</option>
                                    <option value="LA">LA</option>
                                </vee-select>

                                <div class="form-group">
                                    <label class="control-label col-sm-3">Other amenities</label>
                                    <div class="col-sm-9">
                                        <div class="checkbox">
                                            <label v-for="am in propertyMeta.amenity">
                                                <input type="checkbox" v-model="propertyDetail.amenities" :value="am.id"> {{am.name}} &nbsp;
                                            </label>
                                      </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-3">Total Area Floor wise</label>
                                    <div class="col-sm-9">
                                        <p class="form-control-static"> <strong> Built up:</strong> {{propertyDetail.computedBuiltUpArea}} {{propertyDetail.landAreaUom}}&sup2;</p>
                                        <p class="form-control-static"> <strong> Carpet:</strong> {{propertyDetail.computedCarpetArea}} {{propertyDetail.landAreaUom}}&sup2;</p>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
                <!--end Amenities-->
            </div>
            </div>
        

        <!---->
    
        <!--=-->

        <!---->
        <div class="panel panel-default">
            <div class="panel-heading text-bold">
                Accommodation
                <div class="pull-right"><i :class="['fa',(showAccommodation ? 'fa-angle-up' : 'fa-angle-down')]" @click="showAccommodation = !showAccommodation"></i></div>
            </div>
            <table class="table" v-show="showAccommodation">
                <thead>
                    <tr>
                        <th colspan="4">Floors: {{ propertyDetail.floors.map(floor => floor.floor).filter(Boolean).join(' + ') }}  <button type="button" class="btn btn-default btn-xs pull-right" @click="addAccommodation"> <i class="fa fa-plus"></i> </button> </th>
                    </tr>
                    <tr class="active">
                        <!-- <th>No.</th> -->
                        <th>Floor</th>
                        <th>Structure</th>
                        <th>Use / Occupancy</th>
                        <th>Accommodation</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(acc,k) in propertyDetail.floors">
                        <tr>
                            <td colspan="6" style="border-bottom:1px solid transparent;">{{k+1}}. {{acc.floor}}
                                <div class="pull-right"> 
                                    <!-- <i :class="['fa',(acc.display ? 'fa-eye-slash' : 'fa-eye')]" @click="acc.display = !acc.display"></i> &nbsp; -->
                                     <button type="button" class="btn btn-danger btn-xs pull-right" @click="removeAccommodation(k)"> <i class="fa fa-times"></i> </button></div>
                            </td>
                        </tr>
                        <tr style="" class="">
                            <!-- <td>
                                {{k+1}}.
                            </td> -->
                            <td width="220px">
                                <!-- <div :class="{'has-error': errors.has('floor.name.'+k)}">
                                    <input style="width: 150px;" placeholder="Floor..." class="form-control input-sm" type="text" data-vv-as="Floor" v-validate="''" :name="'floor.name.'+k" v-model="acc.floor"></input>
                                    <span class="help-block" v-show="errors.has('floor.name.'+k)">{{errors.first('floor.name.'+k)}}</span>
                                </div> -->

                                <vee-input
                                    :label="`Floor Name`"
                                    input-class=""
                                    v-model="acc.floor"
                                    :rules="'required'"
                                    style="width: 200px; margin-bottom: 5px; "
                                    :name="'floor.name.'+k"
                                    float-label
                                />
                                <vee-input
                                    :label="`Built-up Area - (${propertyDetail.landAreaUom}\u00B2)`"
                                    input-class=""
                                    :value="acc.structures.reduce((t, s) => { return t + (s.available ? parseFloat(s.buArea) : 0); },0)"
                                    :rules="'decimal:2'"
                                    style="width: 200px; margin-bottom: 5px;"
                                    name="acc.builtUpArea"
                                    float-label
                                    readonly
                                />

                                <!-- <span v-for="uom in ['ft', 'm','yd']" v-if="uom != propertyDetail.landAreaUom">
                                    {{convertArea(acc.builtUpArea,propertyDetail.landAreaUom,uom)}} <strong>{{uom}}&sup2;</strong>
                                </span> -->

                                <vee-input
                                    :label="`Carpet Area - (${propertyDetail.landAreaUom}\u00B2)`"
                                    input-class=""
                                    v-model="acc.carpetArea"
                                    :rules="'decimal:2'"
                                    style="width: 200px; margin-bottom: 5px;"
                                    name="acc.carpetArea"
                                    float-label
                                />
                                <vee-input
                                    :label="`Constructed year`"
                                    input-class=""
                                    v-model="acc.constructedYear"
                                    :rules="''"
                                    style="width: 200px; margin-bottom: 5px;"
                                    name="acc.constructedYear"
                                    float-label
                                />
                                <toggle-button v-model="acc.surveyHasOpenTerrace" /> Has terrace?


                                <vee-input
                                    v-if="acc.surveyHasOpenTerrace"
                                    :label="`Terrace area - (${propertyDetail.landAreaUom}\u00B2)`"
                                    input-class=""
                                    v-model="acc.surveyOpenTerraceArea"
                                    :rules="'decimal:2'"
                                    style="width: 200px; margin-bottom: 5px;"
                                    name="acc.surveyOpenTerraceArea"
                                    float-label
                                />
                                <!-- <span v-for="uom in ['ft', 'm','yd']" v-if="uom != propertyDetail.landAreaUom">
                                    {{convertArea(acc.carpetArea,propertyDetail.landAreaUom,uom)}} <strong>{{uom}}&sup2;</strong>
                                </span> -->

                            </td>
                            <td>
                                <treeselect
                                    :multiple="true"
                                    :value="getStructure(acc.structures)"
                                    @input="setStructure($event,k)"
                                    :clearable="false"
                                    :options="acc.structures"
                                    placeholder="Select structure(s)..."
                                />
                                <template v-for="ss in acc.structures" v-if="ss.available">
                                    <vee-input
                                        :label="`${ss.label} - built-up area (${propertyDetail.landAreaUom}\u00B2)`"
                                        input-class=""
                                        v-model="ss.buArea"
                                        :rules="'decimal:2'"
                                        class="mb-2 mt-2"
                                        iType="number"
                                        :name="'floor.name.'+k+'.ss.'+ss.id"
                                        float-label
                                    />
                                </template>
                            </td>
                            <td>
                                <treeselect
                                    :multiple="true"
                                    :clearable="false"
                                    :options="propertyMeta.use"
                                    placeholder="Select use(s)..."
                                    v-model="acc.uses"
                                    style="margin-bottom: 5px;"
                                />
                                <treeselect
                                    :multiple="true"
                                    :clearable="false"
                                    :options="propertyMeta.occupancy"
                                    placeholder="Select Occupancy..."
                                    v-model="acc.occupancies"
                                />
                            </td>
                            
                            <td  style="width:500px;">
                                <div style="width: 100%; max-height: 180px; overflow-y: auto;">
                                    <div v-for="(ac,kk) in acc.accommodations" style="margin-top: 4px; width:225px;float: left">
                                        <div class="input-group input-group-sm" style="width:90px;float: left">
                                              <span class="input-group-addon">
                                                <input type="checkbox" :id="'acc'+k+kk" @change="changeAccommodation(k,kk,$event)" v-model="ac.available" aria-label="...">
                                              </span>
                                          <input type="number" class="form-control" min="1" :readonly="!ac.available" v-model="ac.count" @change="">
                                        </div>
                                        <label class="" >&nbsp; {{ac.accommodation}} </label>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        
                    </template>
                </tbody>
            </table>
        </div>
        <div class="form-horizontal">
        <div class="panel panel-default">
            <div class="panel-heading text-bold">
                Other details
            </div>
            <table class="table table-condensed" v-show="showAccommodation">
                <tbody>
                    <tr>
                        <td>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label class="control-label">Flooring </label>
                                    
                                        <div class="checkbox" v-for="floor in propertyMeta.flooring">
                                            <label>
                                                <input type="checkbox" :value="floor.id" v-model="propertyDetail.floorings"> {{floor.name}}
                                            </label>
                                        </div>
                                    
                                </div>
                            </div>
                            <!-------->
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label class="control-label">Wiring </label>
                                    
                                        <div class="checkbox" v-for="wiring in propertyMeta.wiring">
                                            <label>
                                                <input type="checkbox" :value="wiring.id" v-model="propertyDetail.wirings"> {{wiring.name}}
                                            </label>
                                        </div>
                                    
                                </div>
                                <div class="form-group">
                                    <label class="control-label">Switches </label>
                                    
                                        <div class="checkbox" v-for="switchn in propertyMeta.switch">
                                            <label>
                                                <input type="checkbox" :value="switchn.id" v-model="propertyDetail.switches"> {{switchn.name}}
                                            </label>
                                        </div>
                                    
                                </div>
                            </div>
                            <!-------->
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label class="control-label">Kitchen </label>
                                    
                                        <div class="checkbox" v-for="kitchen in propertyMeta.kitchen">
                                            <label>
                                                <input type="checkbox" :value="kitchen.id" v-model="propertyDetail.kitchenRocks"> {{kitchen.name}}
                                            </label>
                                        </div>
                                    
                                </div>
                            </div>
                            <!-------->
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label class="control-label">Dedo in Bath/Toilet </label>
                                    
                                        <div class="checkbox" v-for="dado in propertyMeta.dado">
                                            <label>
                                                <input type="checkbox" :value="dado.id" v-model="propertyDetail.dadoes"> {{dado.name}}
                                            </label>
                                        </div>
                                    
                                </div>
                            </div>
                            <!-------->
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                    </tr>
                </tbody>
            </table>

            <table class="table table-condensed" v-show="showAccommodation">
                <tbody>
                    <tr>
                        <td>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label class="control-label">{{propertyDetail.doors[0].name}} </label>
                                    
                                        <div class="checkbox" v-for="door in propertyMeta.door">
                                            <label>
                                                <input type="checkbox" :value="door.id" v-model="propertyDetail.doors[0].details"> {{door.name}}
                                            </label>
                                        </div>
                                    
                                </div>
                            </div>
                            <!-------->
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label class="control-label">{{propertyDetail.doors[1].name}} </label>
                                    
                                        <div class="checkbox" v-for="door in propertyMeta.door">
                                            <label>
                                                <input type="checkbox" :value="door.id" v-model="propertyDetail.doors[1].details"> {{door.name}}
                                            </label>
                                        </div>
                                    
                                </div>
                            </div>
                            <!-------->
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label class="control-label">Windows </label>
                                    
                                        <div class="checkbox" v-for="windowobj in propertyMeta.window">
                                            <label>
                                                <input type="checkbox" :value="windowobj.id" v-model="propertyDetail.windows"> {{windowobj.name}}
                                            </label>
                                        </div>
                                    
                                </div>
                            </div>
                            <!-------->
                        </td>
                    </tr>
                    <tr>
                        <td>
                                <label class="control-label">Maintenance Detail </label>
                                
                                    <textarea class="form-control" v-model="propertyDetail.maintenanceNote"></textarea>
                                
                            
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
        <!--=-->
        <div class="panel panel-default">
            <div class="panel-heading text-bold">
                Near By Area
                <div class="pull-right"><i :class="['fa',(showNearBy ? 'fa-angle-up' : 'fa-angle-down')]" @click="showNearBy = !showNearBy"></i></div>
            </div>
            <div class="panel-body" v-show="showNearBy">
                <div class="row">
                    <div class="col-lg-6">
                        <vee-input
                            label="Year of construction"
                            v-model="propertyDetail.constructedYear"
                            :rules="''"
                            labelCol="col-sm-3"
                            controlCol="col-sm-6"
                            name="propertyDetail.constructedYear"
                        />
                        <vee-input
                            label="Market Value"
                            v-model="propertyDetail.marketValue"
                            :rules="''"
                            labelCol="col-sm-3"
                            controlCol="col-sm-6"
                            name="propertyDetail.marketValue"
                        />
                        <vee-input
                            label="Loan Requirement"
                            v-model="propertyDetail.loanRequirement"
                            :rules="''"
                            labelCol="col-sm-3"
                            controlCol="col-sm-6"
                            name="propertyDetail.loanRequirement"
                        />
                        <vee-input
                            label="Rent"
                            v-model="propertyDetail.rent"
                            :rules="''"
                            labelCol="col-sm-3"
                            controlCol="col-sm-6"
                            name="propertyDetail.rent"
                        />
                        <vee-input
                            label="East"
                            v-model="propertyDetail.east"
                            :rules="''"
                            labelCol="col-sm-3"
                            controlCol="col-sm-6"
                            name="propertyDetail.east"
                        />
                        <vee-input
                            label="West"
                            v-model="propertyDetail.west"
                            :rules="''"
                            labelCol="col-sm-3"
                            controlCol="col-sm-6"
                            name="propertyDetail.west"
                        />
                        <vee-input
                            label="North"
                            v-model="propertyDetail.north"
                            :rules="''"
                            labelCol="col-sm-3"
                            controlCol="col-sm-6"
                            name="propertyDetail.north"
                        />
                        <vee-input
                            label="South"
                            v-model="propertyDetail.south"
                            :rules="''"
                            labelCol="col-sm-3"
                            controlCol="col-sm-6"
                            name="propertyDetail.south"
                        />
                    </div>
                    <div class="col-lg-6">
                        <vee-input
                            label="Railway Km"
                            v-model="propertyDetail.railwayKm"
                            :rules="''"
                            labelCol="col-sm-3"
                            controlCol="col-sm-6"
                            name="propertyDetail.railwayKm"
                        />
                        <vee-input
                            label="Busstand Km"
                            v-model="propertyDetail.busstandKm"
                            :rules="''"
                            labelCol="col-sm-3"
                            controlCol="col-sm-6"
                            name="propertyDetail.busstandKm"
                        />
                        <vee-input
                            label="Market Km."
                            v-model="propertyDetail.marketKm"
                            :rules="''"
                            labelCol="col-sm-3"
                            controlCol="col-sm-6"
                            name="propertyDetail.marketKm"
                        />
                        <vee-input
                            label="Mainroad Km."
                            v-model="propertyDetail.mainroadKm"
                            :rules="''"
                            labelCol="col-sm-3"
                            controlCol="col-sm-6"
                            name="propertyDetail.mainroadKm"
                        />
                        <vee-input
                            label="Latitude"
                            v-model="propertyDetail.latitude"
                            :rules="''"
                            labelCol="col-sm-3"
                            controlCol="col-sm-6"
                            name="propertyDetail.latitude"
                        />
                        <vee-input
                            label="Longitude"
                            v-model="propertyDetail.longitude"
                            :rules="''"
                            labelCol="col-sm-3"
                            controlCol="col-sm-6"
                            name="propertyDetail.longitude"
                        />
                        <vee-input
                            label="Name Of User"
                            v-model="propertyDetail.userName"
                            :rules="''"
                            name="propertyDetail.userName"
                            labelCol="col-sm-3"
                            controlCol="col-sm-6"
                        />
                        <div class="form-group">
                            <label class="col-sm-3 control-label">Remark </label>
                            <div class="col-sm-9">              
                                <textarea class="form-control" v-model="propertyDetail.remark"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <button type="button" class="btn btn-primary pull-right" @click.prevent="validateForm('survey')">SUBMIT</button>
        </form>
    </div>
</template>
<script type="text/javascript">
import {mapGetters, mapActions} from 'vuex'
import areaUnitMixin from '@/mixins/areaUnitMixin';
import rules from '@/validations/rules';
export default {
    name: 'SurveyForm',
    mixins:[areaUnitMixin],
    created() {
        this.propertyDetail.doors.push({
            name:'Main Door',
            details:[]
        })
        this.propertyDetail.doors.push({
            name:'Rest Door',
            details:[]
        })
        // this.propertyDetail.floors.push({
        //     floor:'Ground Floor',
        //     structures:[],
        //     uses:[],
        //     occupancies:[],
        //     builtUpArea:'',
        //     display:true
        //     //plot_area_area:'',
        // })
        this.mountObject();
    },
    data: () => {
        return {
            propertyDetail: {
                address         :'',
                propertyType         :'',
                uses            :[],
                shownBy         :'',
                name            :'',
                floorCount      :'',
                isBuildingDemarcated      :false,
                isPropertyDemarcated      :false,
                landArea        : '',
                landAreaUom         : '',
                road            :'',
                cop             :'',
                security        :false,
                comWall         :false,
                comGate         :false,
                ws              :'',
                construction    :'',
                electricity     :'',
                sewerage        :'',
                grill           :'',
                constructedYear :'',
                marketValue     :'',
                loanRequirement :'',
                rent            :'',
                east            :'',
                west            :'',
                north           :'',
                south           :'',
                railwayKm       :'',
                busstandKm      :'',
                marketKm        :'',
                mainroadKm      :'',
                latitude        :'',
                longitude       :'',
                userName        :'',
                sketchUrl       :'',
                remark          :'',
                amenities       : [],
                accommodations  : [],
                floorings       : [],
                switches        : [],
                wirings         : [],
                kitchenRocks    : [],
                dadoes          : [],
                doors           : [],
                windows         : [],
                maintenanceNote : '',
                floors          :[]
            },
            showBasic:true,
            showAmenities:true,
            showAccommodation:true,
            showNearBy:true,
            showFloor:true,
        }
    },
    props: {
        order:{
            type: Object,
            default: () => {}
        },
        propertyMeta: {
            type: Object,
            default: () => {}
        },
        survey: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        ...mapActions({
            getPropertyMetaAction: 'setting/getPropertyMetaAction',
            getPropertyDetailsAction: 'order/getPropertyDetailsAction',
            savePropertyDetailsAction: 'order/savePropertyDetailsAction',
        }),
        mountObject() {
            if (Object.keys(this.survey).length) {
                //console.log(this.survey,this.propertyDetail.address,[...this.survey.uses])
                this.propertyDetail.address         = this.survey.address;
                this.propertyDetail.propertyType         = this.survey.propertyType;
                this.propertyDetail.shownBy         = this.survey.shownBy;
                this.propertyDetail.name            = this.survey.name;
                this.propertyDetail.floorCount      = this.survey.floorCount;
                this.propertyDetail.isBuildingDemarcated      = !!this.survey.isBuildingDemarcated;
                this.propertyDetail.isPropertyDemarcated      = !!this.survey.isPropertyDemarcated;
                this.propertyDetail.landArea        = this.survey.landArea;
                this.propertyDetail.landAreaUom         = this.survey.landAreaUom;
                this.propertyDetail.road            = this.survey.road;
                this.propertyDetail.cop             = this.survey.cop;
                this.propertyDetail.security        = this.survey.security;
                this.propertyDetail.comWall         = this.survey.comWall;
                this.propertyDetail.comGate         = this.survey.comGate;
                this.propertyDetail.ws              = this.survey.ws;
                this.propertyDetail.construction    = this.survey.construction;
                this.propertyDetail.electricity     = this.survey.electricity;
                this.propertyDetail.sewerage        = this.survey.sewerage;
                this.propertyDetail.grill           = this.survey.grill;
                this.propertyDetail.constructedYear = this.survey.constructedYear;
                this.propertyDetail.marketValue     = this.survey.marketValue;
                this.propertyDetail.loanRequirement = this.survey.loanRequirement;
                this.propertyDetail.rent            = this.survey.rent;
                this.propertyDetail.east            = this.survey.east;
                this.propertyDetail.west            = this.survey.west;
                this.propertyDetail.north           = this.survey.north;
                this.propertyDetail.south           = this.survey.south;
                this.propertyDetail.railwayKm       = this.survey.railwayKm;
                this.propertyDetail.busstandKm      = this.survey.busstandKm;
                this.propertyDetail.marketKm        = this.survey.marketKm;
                this.propertyDetail.mainroadKm      = this.survey.mainroadKm;
                this.propertyDetail.latitude        = this.survey.latitude;
                this.propertyDetail.longitude       = this.survey.longitude;
                this.propertyDetail.userName        = this.survey.userName;
                this.propertyDetail.sketchUrl       = this.survey.sketchUrl;
                this.propertyDetail.remark          = this.survey.remark;
                this.propertyDetail.maintenanceNote = this.survey.maintenanceNote;
                //this.propertyDetail.terraces    = [...this.survey.terraces];
                this.propertyDetail.kitchenRocks    = [...this.survey.kitchenRocks];
                this.propertyDetail.amenities       = [...this.survey.amenities];
                this.propertyDetail.floorings       = [...this.survey.floorings];
                this.propertyDetail.switches        = [...this.survey.switches];
                this.propertyDetail.wirings         = [...this.survey.wirings];
                this.propertyDetail.dadoes          = [...this.survey.dadoes];
                this.propertyDetail.windows         = [...this.survey.windows];
                this.propertyDetail.doors           = [...this.survey.doors];
                //this.propertyDetail.floors          = [...this.survey.floors];

                if (!this.survey.floors.length) {
                    this.propertyDetail.floors = [];
                    this.addAccommodation();
                } else {
                    let aa = this.survey.floors.map((item) => {
                        return this.createAccommodationObj(item.id,item)
                    })
                    //console.log({...aa})
                    this.propertyDetail.floors  = [...aa];
                }
                
                if (!this.survey.doors.length) {
                    this.propertyDetail.doors.push({
                        name:'Main Door',
                        details:[]
                    })
                    this.propertyDetail.doors.push({
                        name:'Rest Door',
                        details:[]
                    })
                } else {
                    this.propertyDetail.doors  = this.survey.doors.map((item) => {
                        return {
                            id:item.id,
                            name:item.door,
                            details: item.door_details.map((dt) => {
                                return dt.id;
                            })
                        }
                    });
                }
            }
        },
        addAccommodation(event,id,am) {
            //console.log(id,am)
            id = id || null;
            am = am || [];
            this.propertyDetail.floors.push(this.createAccommodationObj(id,am))
        },
        createAccommodationObj(id, am){
            //console.log({...am})
            return {
                floor: am.floor ? am.floor :  '', 
                //structures: am.structures ? [...am.structures] : [],
                uses: am.uses ? [...am.uses] : [],
                occupancies: am.occupancies ? [...am.occupancies] : [],
                builtUpArea: am.computedSurveyBuiltUpArea ? am.computedSurveyBuiltUpArea : '',
                carpetArea: am.surveyCarpetArea ? am.surveyCarpetArea : '',
                display:true,
                id:id,
                surveyHasOpenTerrace: am.surveyHasOpenTerrace ? am.surveyHasOpenTerrace : false,
                surveyOpenTerraceArea: am.surveyOpenTerraceArea ? am.surveyOpenTerraceArea : 0,
                constructedYear: am.constructedYear ? am.constructedYear : null,
                structures: this.propertyMeta.structure.map((obj) => {
                    let found = am.structures ? am.structures.filter((aa) => {
                        //console.log(aa.id ,obj.id,aa.id == obj.id)
                            return aa.id == obj.id && aa.pivot.survey_has
                        }) : [];
                    //console.log(found.length, '===')
                    return {
                        
                        available:!!found.length,
                        label: obj.name,
                        id: obj.id,
                        buArea: found.length ? found[0].pivot.survey_bu_area : 0,

                    }
                }),
                accommodations :this.propertyMeta.accommodation.map((obj) => {
                    let found = am.amenities ? am.amenities.filter((aa) => {
                        //console.log(aa.id ,obj.id,aa.id == obj.id)
                            return aa.id == obj.id
                        }) : [];
                    //console.log(found.length, '===')
                    return {
                        
                        available:!!found.length,
                        accommodation: obj.name,
                        id: obj.id,
                        count: found.length ? found[0].pivot.count : 0,

                    }
                }) 
            }
        },
        removeAccommodation(index) {
            if(!confirm('Are you sure?')) {
                return ;
            }
            this.propertyDetail.floors = this.propertyDetail.floors.filter((obj,i) => {
                return i != index;
            })
        },
        changeAccommodation(k,kk,event) {
            if (event.target.checked) {
                this.propertyDetail.floors[k].accommodations[kk].count = 1;
            } else {
                this.propertyDetail.floors[k].accommodations[kk].count = 0;
            }
        },
        validateForm(scope) {

            let self = this;
            this.$validator.validate().then((result) => {
                if (result) {
                    this.requestLoading();
                    //console.log(this.propertyDetail)
                    this.savePropertyDetailsAction({
                        id: this.order.id,
                        propertyDetail: this.propertyDetail,
                    }).then((resp) => {
                        this.loaded();
                        this.errors.clear();
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
        getStructure(data) {
            return data.filter(i => i.available).map(i => i.id)
        },
        setStructure(val,floorIndex) {
            let acc = this.propertyDetail.floors[floorIndex].structures;
            acc.forEach( i => {
                if (val.indexOf(i.id) > -1) {
                    i.available = true;
                } else {
                    i.available = false;
                }
            })
            this.propertyDetail.floors[floorIndex].structures = acc;
        }
    },
    computed: {
        ...mapGetters({
            //propertyMeta: 'setting/propertyMetaGetter',
            //survey: 'order/propertyDetailsGetter'
        })
    },
    watch: {
        survey: function(val) {
            this.mountObject();
            //console.log(val)
        }
    }
}
</script>