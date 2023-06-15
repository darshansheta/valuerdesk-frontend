<template>
    <div>
        <div class="row">
            <div class="col-md-6 hidden">
                <div class="form-group">
                    <label>ID</label>
                    <input type="text" readonly class="form-control" :value="control.name">
                </div>
            </div>
            <div class="col-md-12 hidden">
                <div class="form-group">
                    <label>Control type</label>
                    <input type="text" readonly class="form-control" :value="typeFirstUpper">
                </div>
            </div>
            <div class="col-md-12">
                <div class="form-group">
                    <label>Name</label>
                    <v-select 
                        v-model="control.fieldName" 
                        :options="allowEles" 
                        title="Field Name must be UNIQUE in Section!" 
                        :reduce="ele => ele.placeholder"
                        @input="setConfig"
                        >
                            <template slot="option" slot-scope="option">
                                    <h5 style="margin:0px;">{{option.placeholder}}</h5>
                                    <p style="margin-bottom:5px;">{{option.label}}</p>
                                </template>
                        </v-select>
                    <!-- <input type="text" class="form-control" v-model="control.fieldName"
                           data-toggle="tooltip" title="Field Name must be UNIQUE in Section!"> -->
                           <!-- <select class="form-control" v-model="control.fieldName" data-toggle="tooltip" title="Field Name must be UNIQUE in Section!" @change="setConfig">
                               <option value="">SELECT ELEMENT</option>
                               <option v-for="ele in allowEles" :value="ele.placeholder">{{ele.placeholder}}</option>
                           </select> -->
                </div>
            </div>
            <div class="col-md-12">
                <div class="form-group">
                    <label>Width</label>
                    <select class="form-control" v-model="control.className">
                        <option v-for="(label, value) in widthOptions" :value="value">{{label}}</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="row mt-2">
            <div class="col-md-12">
                <label>
                    <!-- <b>This field is {{!control.required ? 'not ' : ''}} required.</b> -->
                    <!-- <input type="checkbox" name="isRequired" v-model="control.required" readonly> Required? -->
                </label>

               <!--  <label>
                    <input type="checkbox" name="isReadonly" v-model="control.readonly" readonly> Readonly?
                </label> -->
                <hr>
            </div>
        </div>
    </div>
</template>

<script>
    import {FORM_CONSTANTS} from "@/components/FormBuilder/config/constants";
    import {ControlHandler} from '@/components/FormBuilder/template/handler/control_handler';
    export default {
        name: "BaseConfigComponent",
        props: {
            control: {
                type: Object
            },
            elements: {
                type: Array,
                default: () => []
            }
        },
        data: () => ({
            widthOptions: FORM_CONSTANTS.WidthOptions,
        }),
        mounted() {
            $('[data-toggle="tooltip"]').tooltip(); // trigger tooltip
        },
        methods: {
            setConfig() {
                // let self = this;
                // let ele = this.elements.filter( ele => {
                //     return ele.placeholder == self.control.fieldName
                // });
                //console.log(ele,this.control,this.control.fieldName)
                // if (ele.length) {
                //     this.control.required = ele[0].required;
                // }
            }
        },
        computed: {
            typeFirstUpper() {
                return this.control.type.charAt(0).toUpperCase() + this.control.type.slice(1);
            },
            allowEles() {
                return this.elements.filter(ele => {
                    let controlNames = ControlHandler.getControlNames();
                    //console.log(controlNames)
                    return ele.type == this.control.type &&  (controlNames.indexOf(ele.placeholder) == -1 || ele.placeholder == this.control.fieldName );
                })
            }
        }
    }
</script>

<style scoped>

</style>
