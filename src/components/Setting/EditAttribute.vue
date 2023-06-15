<template>
    
    <b-modal
            :keyboard="false"
            :backdrop="false"
            class="modal-right"
            v-model="show"
            title="Edit Report Attribute"
            ref="modal"
            :dialog-style="{width:'600px'}"
            :footer="false"
            :before-close="hide"
        >
        <div class="col-sm-12">
            <form 
                class="form-horizontal"
                @submit.prevent="validateForm('attribute')"
                autocomplete="off"
            >
                <vee-input
                    label="Placeholder"
                    v-model="attribute.placeholder" 
                    :rules="`required|alpha_num_underscore|placeholder_unique:${attribute.id}`"
                    name="placeholder"
                    controlCol="col-sm-6"
                    labelCol="col-sm-3 text-left"
                />
                <vee-input
                    label="Label"
                    v-model="attribute.label"
                    rules="required|max:200"
                    name="label"
                    controlCol="col-sm-6"
                    labelCol="col-sm-3 text-left"
                />

                <vee-select
                    label="Type"
                    v-model="attribute.type"
                    rules="required"
                    name="Type"
                    controlCol="col-sm-6"
                    labelCol="col-sm-3 text-left"
                >
                    <option value="">SELECT TYPE</option>
                    <option v-for="(eleType,key) in ['text','dropdown','checkbox','textarea','radio','hidden']" :value="eleType">{{eleType}}</option>
                </vee-select>

                <hr>
                <template v-if="['dropdown','checkbox','radio'].indexOf(attribute.type) != -1" >
                    <div class="form-group" :class="{'has-error': errors.has('options_value')}">
                        <label class="control-label col-sm-3 text-left">Options <i class="fa fa-plus" @click="addOption"></i> </label>
                        <div class="col-sm-9">
                    <template v-for="(option,key) in attribute.options" >
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
                    {{attribute.defaultValueType}}
                    <label class="control-label col-sm-3 text-left"> Default Value Type </label>
                    <div class="col-sm-9">
                        <!-- <btn-group class="btn-group-bb">
                          <btn input-type="radio" input-value="static" v-model="attribute.defaultValueType">Static</btn>
                          <btn input-type="radio" input-value="placeholder" v-model="attribute.defaultValueType">Placeholder</btn>
                          <btn input-type="radio" input-value="derived" v-model="attribute.defaultValueType">Derived</btn>
                          
                        </btn-group> -->
                        <div class="btn-group-bb btn-group">
                            <label class="btn btn-default" for="ebr-1"><input type="radio" name="editAttribute-dt" id="ebr-1" value="static" v-model="attribute.defaultValueType"> Static</input></label> 
                            <label class="btn btn-default" for="ebr-2"><input type="radio" name="editAttribute-dt" id="ebr-2" value="placeholder" v-model="attribute.defaultValueType"> Placeholder</input></label> 
                            <label class="btn btn-default" for="ebr-3"><input type="radio" name="editAttribute-dt" id="ebr-3" value="derived" v-model="attribute.defaultValueType"> Derived</input></label> 
                        </div>
                    </div>
                </div>

                <div class="form-group"" :class="{'has-error': errors.has('Placeholder')}">
                    <label class="control-label col-sm-3 text-left"> Default Value </label>
                    <div class="col-sm-6" v-show="attribute.defaultValueType == 'placeholder'" >
                        
                        <v-select 
                            v-model="attribute.placeholderId" 
                            :options="placeholders" 
                            title="Select Placeholder" 
                            label="placeholder"
                            name="Placeholder"
                            :reduce="placeholder => placeholder.id" 
                            v-validate="{ required: attribute.defaultValueType == 'placeholder' }"
                            >
                                <template slot="option" slot-scope="option">
                                        <h5 style="margin:0px;">{{option.placeholder}}</h5>
                                    </template>
                            </v-select>
                            <span class="help-block" v-show="errors.has('Placeholder')">{{errors.first('Placeholder')}}</span>
                    </div>
                    <div class="col-sm-9" v-show="attribute.defaultValueType == 'derived'" >
                        {{attribute.derived}}
                        <!-- <vue-tribute :options="tributeOptions"> -->
                            <textarea class="form-control" rows="6" id="edit-attr-derived" @tribute-replaced="tributeReplaced" v-model="attribute.derived"></textarea>
                          <!-- </vue-tribute>  -->
                    </div>
                    <div class="col-sm-9" v-show="attribute.defaultValueType == 'static'" >
                        
                            <textarea class="form-control" rows="6" v-model="attribute.default"></textarea>

                    </div>
                </div>

                <vee-select
                    label="Is Required"
                    v-model="attribute.required"
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
                        <button type="button" class="btn btn-default" @click="hide">CANCEL</button>
                    </div>
                </div>
            </form>
            </div>
        </b-modal>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Dropdown from '@/components/Shared/Dropdown';
import Btn from '@/components/Shared/button/Btn';
import BtnGroup from '@/components/Shared/button/BtnGroup';
import EditAttribute from './EditAttribute';
import VueTribute from 'vue-tribute';
import Tribute  from 'tributejs';
const data = () => {
        return {
            attribute:{
                label:'',
                placeholder:'',
                type:'',
                defaultValueType:'static',
                 default:'',
                 derived:'',
                required:0,
                options:[],
                placeholderId:''

            },
            tribute:null,
            buttonDisabled:false
        }
    }
export default{
    name: 'EditAttribute',
    created() {
        this.editAttribute.options = this.editAttribute.options.map(function(opt) {
            return { value: opt.value, text: opt.text, id:opt.id};
        });
        this.attribute = {
             id               : this.editAttribute.id,
             label            : this.editAttribute.label,
             placeholder      : this.editAttribute.placeholder,
             type             : this.editAttribute.type,
             defaultValueType : this.editAttribute.default_value_type,
             default          : this.editAttribute.default,
             derived          : this.editAttribute.derived,
             required         : this.editAttribute.required,
             options          : this.editAttribute.options,
             placeholderId    : this.editAttribute.placeholder_id,
        };
        
    },
    mounted() {
        //this.attribute.defaultValueType = this.editAttribute.default_value_type;
        //this.attribute.placeholderId = this.editAttribute.placeholder_id;
        this.tribute = new Tribute({
              values: this.allplaceholders,
              selectTemplate: function(item) {
                return '${' + item.original.placeholder + '}';
              },
              menuItemTemplate: function (item) {
                  return `${item.original.placeholder} <small>${item.original.label}</small>`;
                }
            });
        console.log(document.getElementById('edit-attr-derived'))
        this.tribute.attach(document.getElementById('edit-attr-derived'))
    },
    data: data,
    props: {
        show : {
            type: Boolean
        },
        editAttribute: {
            type:Object,
            default: () => {}
        }
    },
    components: {
        Dropdown,
        Btn,
        BtnGroup,
        VueTribute
    },
    methods: {
        ...mapActions({
            updateReportAttributeAction:'setting/updateReportAttributeAction',
            getAllPlaceholdersAction: 'common/getAllPlaceholdersAction',
        }),
        addOption(){
            this.attribute.options.push({value:''});
        },
        deleteOption: function (index) {
          this.attribute.options.splice(index, 1);
        },
        validateForm(scope) {
            let self = this;
            this.$validator.validate().then((result) => {
                if (result) {
                    this.buttonDisabled = true;
                    this.updateReportAttributeAction(this.attribute).then((resp) => {
                        
                        this.$notify({
                            content: `Attribute updated successfully.`,
                            duration: 3000
                        });
                        self.hide();
                    }).catch(function(e){
                        console.log(e)
                    }).finally(function(res){
                        self.buttonDisabled = false;
                    });

                }
            });
        },
        hide() {
            this.$emit('hide')
        },
        tributeReplaced(e)
        {
            console.log(e.target,e.target.value,e)
            this.attribute.derived = e.target.value
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
                return '{' + item.original.placeholder + '}';
              },
              menuItemTemplate: function (item) {
                  return `${item.original.placeholder} <small>${item.original.label}</small>`;
                }
            }
        },
        allplaceholders:function() {
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
            return [...elementPlaceholders, ...placeholders];
        }
    },
    watch: {
        allplaceholders(val) {
            console.log(123)
            this.tribute.appendCurrent(val);
        }
    }
}
</script>