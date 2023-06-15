<template>
	<div class="row">
	    <div class="col-sm-12">
	        <div class="input-group" style="margin-bottom: 5px;">
	            <dropdown class="input-group-btn">
	                <btn class="btn btn-default"><span class="caret"></span></btn>
	                <template slot="dropdown">
	                  <li><a role="button" @click.prevent="getReportAttributesAction"> <i class="fa fa-refresh"></i> Refresh</a></li>
	                </template>
	              </dropdown>
                <input type="text" class="form-control" placeholder="Search...." v-model="attributeSearch">
	              <div class="input-group-btn">
	              <btn class="btn btn-primary" @click="toggleCreateDialog">NEW</btn>
	          	</div>
	        </div>

	        <table class="table table-condensed table-hover table-bordered bg-white">
	            <thead>
	                <tr>
	                    <th>#</th>
	                    <th>Placeholder</th>
                        <th>Label</th>
	                    <th>Type</th>
	                    <th>Options</th>
	                    <!-- <th>Default</th> -->
	                    <th>Required</th>
	                    <th><i class="fa fa-bolt"></i></th>
	                </tr>
	            </thead>
                <tbody>
                    <tr v-for="(attribute,id, index) in attributes">
                        <td>{{index + 1}}</td>
                        <td>{{attribute.placeholder}}</td>
                        <td>{{attribute.label}}</td>
                        <td>{{attribute.type}}</td>
                        <td>{{attribute.options.map((o) => o.option).join(',')}}</td>
                        <!-- <td>{{attribute.default}}</td> -->
                        <td>{{attribute.required ? 'Yes':'No'}}</td>
                        <td>
                            <button class="btn btn-xs btn-default" @click="toggleEditAttributeDialog(attribute)"> <i class="fa fa-pencil"></i> Edit</button> 
                            <button class="btn btn-xs btn-danger" @click="confirmDelete(attribute)"> <i class="fa fa-times"></i></button>
                        </td>
                    </tr>
                    <tr v-show="Object.keys(attributes).length == 0">
                        <td colspan="8">No records found.</td>
                    </tr>
                </tbody>
	        </table>
	    </div>

	    <!-------Attribute create form------->
	    <b-modal
	        :keyboard="false"
	        :backdrop="false"
	        class="modal-right"
	        v-model="showCreateDialog"
	        title="Create Report Attribute"
	        ref="modal"
            size="md-40"
	        :dialogg-style="{width:'600px'}"
	        :footer="false"
	    >
	        <div class="col-sm-12">
            <form 
	            class="form-horizontal"
	            @submit.prevent="validateForm('attribute')"
	            autocomplete="off"
	        >
	            <vee-input
	                label="Placeholder"
	                v-model="newAttribute.placeholder" 
	                rules="required|alpha_num_underscore|placeholder_unique"
	                name="placeholder"
                    controlCol="col-sm-6"
                    labelCol="col-sm-3 text-left"
	            />
                <vee-input
                    label="Label"
                    v-model="newAttribute.label"
                    rules="required|max:200"
                    name="label"
                    controlCol="col-sm-6"
                    labelCol="col-sm-3 text-left"
                />

	            <vee-select
                    label="Type"
                    v-model="newAttribute.type"
                    rules="required"
                    name="Type"
                    controlCol="col-sm-6"
                    labelCol="col-sm-3 text-left"
                >
                    <option value="">SELECT TYPE</option>
                    <option v-for="(eleType,key) in ['text','dropdown','checkbox','textarea','radio', 'hidden']" :value="eleType">{{eleType}}</option>
                </vee-select>
                <hr>
                <template v-if="['dropdown','checkbox','radio'].indexOf(newAttribute.type) != -1" >
                    <div class="form-group" :class="{'has-error': errors.has('options_value')}">
                        <label class="control-label col-sm-3 text-left">Options <i class="fa fa-plus" @click="addOption"></i> </label>
                        <div class="col-sm-9">
                    <template v-for="(option,key) in newAttribute.options" >
                        <div class="row">
                            <div class="col-sm-5">
                          <input type="text" name="options_text" placeholder="Text" key="options_text" class=" form-control" v-model="option.text" v-validate="'required|max:200'">  
                        </div>
                        <div class="col-sm-5">
                           <input type="text" name="options_value"  placeholder="Value" key="options_value" class="form-control col-sm-5" v-model="option.value" v-validate="'required|max:200'"> 
                        </div>
                            <button class="btn btn-danger col-sm-2" type="button" @click="deleteOption(key)"> <i class="fa fa-close"></i> </button>
                        </div>
                        </template>
                        </div>
                        <span class="help-block" v-show="errors.has('options_value')">{{errors.first('options_value')}}</span>
                        <span class="help-block" v-show="errors.has('options_text')">{{errors.first('options_text')}}</span>
                        </div>
                        <hr>
                </template>

                <div class="form-group"">
                    <label class="control-label col-sm-3 text-left"> Default Value Type </label>
                    <div class="col-sm-9">
                        <!-- <btn-group class="btn-group-bb">
                          <btn input-type="radio" input-value="static" v-model="newAttribute.defaultValueType">Static</btn>
                          <btn input-type="radio" input-value="placeholder" v-model="newAttribute.defaultValueType">Placeholder</btn>
                          <btn input-type="radio" input-value="derived" v-model="newAttribute.defaultValueType">Derived</btn>
                          
                        </btn-group> -->
                        <div class="btn-group-bb btn-group">
                            <label class="btn btn-default" for="br-1"><input type="radio" id="br-1" value="static" v-model="newAttribute.defaultValueType"> Static</input></label> 
                            <label class="btn btn-default" for="br-2"><input type="radio" id="br-2" value="placeholder" v-model="newAttribute.defaultValueType"> Placeholder</input></label> 
                            <label class="btn btn-default" for="br-3"><input type="radio" id="br-3" value="derived" v-model="newAttribute.defaultValueType"> Derived</input></label> 
                        </div>
                    </div>
                </div>

                <div class="form-group"" :class="{'has-error': errors.has('Placeholder')}">
                    <label class="control-label col-sm-3 text-left"> Default Value </label>
                    <div class="col-sm-6" v-if="newAttribute.defaultValueType == 'placeholder'" >
                        
                        <v-select 
                            v-model="newAttribute.placeholderId" 
                            :options="placeholders" 
                            title="Select Placeholder" 
                            label="placeholder"
                            name="Placeholder"
                            :reduce="placeholder => placeholder.id" 
                            v-validate="{ required: newAttribute.defaultValueType == 'placeholder' }"
                            >
                                <template slot="option" slot-scope="option">
                                        <h5 style="margin:0px;">{{option.placeholder}}</h5>
                                    </template>
                            </v-select>
                            <span class="help-block" v-show="errors.has('Placeholder')">{{errors.first('Placeholder')}}</span>
                    </div>
                    <div class="col-sm-9" v-else-if="newAttribute.defaultValueType == 'derived'" >

                        <vue-tribute :options="tributeOptions" @tribute-replaced="tributeReplace">
                            <textarea class="form-control" rows="6" v-model="newAttribute.derived"></textarea>
                          </vue-tribute> 
                    </div>
                    <div class="col-sm-9" v-else-if="newAttribute.defaultValueType == 'static'" >
                        
                            <textarea class="form-control" rows="6" v-model="newAttribute.default"></textarea>

                    </div>
                </div>
                

                <!-- <vee-input
	                label="Default Value"
	                v-model="newAttribute.default" 
	                rules=""
	                name="Default"
                    controlCol="col-sm-6"
                    labelCol="col-sm-3 text-left"
	            />
 -->
                <vee-select
                    label="Is Required"
                    v-model="newAttribute.required"
                    rules="required"
                    name="Default"
                    controlCol="col-sm-6"
                    labelCol="col-sm-3 text-left"
                >
                    <option value="1">YES</option>
                    <option value="0">NO</option>
                </vee-select>

	            <div class="form-group">
	                <div class="col-sm-offset-3 col-sm-9">
	                    <button type="submit" :disabled="buttonDisabled" v-on:click.prevent="validateForm('attribute')" class="btn btn-primary ">SUBMIT</button>
	                    <button type="button" class="btn btn-default" @click="toggleCreateDialog">CANCEL</button>
	                </div>
	            </div>
	        </form>
            </div>
	    </b-modal>
	    <!-------------->
        <edit-attribute v-if="showEditAttributeDialog" :show="showEditAttributeDialog" @hide="toggleEditAttributeDialog({})" :edit-attribute="editingAttribute" ></edit-attribute>
	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Dropdown from '@/components/Shared/Dropdown';
import Btn from '@/components/Shared/button/Btn';
import BtnGroup from '@/components/Shared/button/BtnGroup';
import EditAttribute from './EditAttribute';
import VueTribute from 'vue-tribute'
const data = () => {
        return {
            attributeSearch: '',
            showCreateDialog:false,
            showEditAttributeDialog:false,
            buttonDisabled:false,
            newAttribute:{
                label:'',
                placeholder:'',
                type:'',
                defaultValueType:'static',
                 default:'',
                 derived:'',
                required:0,
                options:[],
                placeholderId:''

            }
        }
    }
export default{
    name: 'ReportAttribute',
    created() {
        
    },
    mounted() {
        this.getReportAttributesAction();
        this.getAllPlaceholdersAction();
    },
    data: data,
    props: {
    },
    components: {
        EditAttribute,
        Dropdown,
        Btn,
        BtnGroup,
        VueTribute
    },
    methods: {
        ...mapActions({
            createReportAttributeAction:'setting/createReportAttributeAction',
            getReportAttributesAction:'setting/getReportAttributesAction',
            deleteReportAttributeAction:'setting/deleteReportAttributeAction',
            getAllPlaceholdersAction: 'common/getAllPlaceholdersAction',
        }),
        toggleCreateDialog(){
            this.showCreateDialog = !this.showCreateDialog;
        },
        addOption(){
            this.newAttribute.options.push({text:'', value:''});
        },
        deleteOption: function (index) {
          this.newAttribute.options.splice(index, 1);
        },
        validateForm(scope) {
            let self = this;
            this.$validator.validate().then((result) => {
                if (result) {
                    this.buttonDisabled = true;
                    this.createReportAttributeAction(this.newAttribute).then((resp) => {
                        this.newAttribute = data().newAttribute;
                        this.errors.clear();
                        this.$notify({
                            content: `Attribute created successfully.`,
                            duration: 3000
                        });
                    }).catch(function(e){
                        console.log(e)
                    }).finally(function(res){
                        self.buttonDisabled = false;
                    });

                }
            });
        },
        toggleEditAttributeDialog(attribute) {
            //console.log(attribute.options)
            this.editingAttribute = { ...attribute }
            this.showEditAttributeDialog = !this.showEditAttributeDialog;
        },
        confirmDelete(attribute) {
            let self = this;
            this.$confirm({
                title: 'Delete',
                content:"Are you sure, do you really want to delete this Attribute?"
            }).then(() => {
                this.deleteReportAttributeAction({id:attribute.id}).then(() => {
                    self.$notify('Attribute deleted succesffully.');
                })
            })
        },
        tributeReplace(e)
        {
            console.log('tributeReplace',e,1)
        }
    },
    computed: {
        ...mapGetters({
            attributes: 'setting/attributesGetter',
            placeholders : 'common/placeholdersGetters'
        }),
        hiddenAttributes: function() {
            return this.attributes.filter(attr => {
                return attr.type == 'hidden';
            })
        },
        tributeOptions:function () {
            //console.log(this.attributes)
            // Build data to be used in At.JS config.
            let elementPlaceholders = Object.values(this.attributes).filter(attr => {
                return attr.type == 'hidden';
            }).map(function (value, i) {
              return {
                'key': value.placeholder, 'placeholder': value.placeholder, 'label': value.label
              };
            });

            // Build data to be used in At.JS config.
            let placeholders = this.placeholders.map(function (value, i) {
              return {
                'key': value.placeholder, 'placeholder': value.placeholder, 'label': ''
              };
            });
            placeholders = [...elementPlaceholders, ...placeholders];

            return {
              values:placeholders,
              selectTemplate: function(item) {
                return '${' + item.original.placeholder + '}';
              },
              menuItemTemplate: function (item) {
                  return `${item.original.placeholder} <small>${item.original.label}</small>`;
                }
            }
        }
    }
}
</script>