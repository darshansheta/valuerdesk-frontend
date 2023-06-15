<template>
    <div :class="getControlWrapperClass()">
        <div class="row" v-if="labelPosition === 'left'">
            <div class="col-md-4">
                <label class="control-label fb-cl" :class="{'bold': control.labelBold, 'italic': control.labelItalic, 'underline': control.labelUnderline}">
                    {{control.label}} <span v-if="control.required" style="color:red;">*</span>
                </label>
            </div>
            <div class="col-md-8">
                <div class="checkbox" v-for="item in control.dataOptions">
                  <label>
                    <input 
                        type="checkbox" 
                        :readonly="control.readonly"
                        data-vv-as="above"
                        v-validate="vRules"
                        :checked="isItemChecked(item)"
                        :name="control.name"
                        :value="item.value"
                         @change="onChanged($event, item)"
                        >
                    {{item.text}}
                  </label>
                </div>
                <span class="help-block" v-show="errors.has(control.name)">{{errors.first(control.name)}}</span>
            </div>
        </div>
        <div v-else>
            <label class="control-label" :class="{'bold': control.labelBold, 'italic': control.labelItalic, 'underline': control.labelUnderline}">
                {{control.label}} <span v-if="control.required" style="color:red;">*</span>
            </label>
            <div class="checkbox" v-for="item in control.dataOptions">
              <label>
                <input 
                    type="checkbox" 
                    :readonly="control.readonly"
                    data-vv-as="above"
                    v-validate="vRules"
                    :checked="isItemChecked(item)"
                    :name="control.name"
                    :value="item.value"
                     @change="onChanged($event, item)"
                    >
                {{item.text}}
              </label>
            </div>
            <span class="help-block" v-show="errors.has(control.name)">{{errors.first(control.name)}}</span>
        </div>
    </div>
</template>

<script>
    import { isObject, isNil, clone } from "lodash";
    import abstractControl from "./../abstractControl";
    export default {
        name: "CheckBoxControl",
        mixins: [abstractControl],
        methods: {
            isItemChecked(item) {
                return this.value && this.value.indexOf(this.getItemValue(item)) !== -1;
            },
            onChanged(event, item) {
                if (isNil(this.value) || !Array.isArray(this.value)) {
                    this.value = [];
                }

                if (event.target.checked) {
                    // Note: If you modify this.value array, it won't trigger the `set` in computed field
                    const arr = clone(this.value);
                    arr.push(this.getItemValue(item));
                    this.value = arr;
                } else {
                    // Note: If you modify this.value array, it won't trigger the `set` in computed field
                    const arr = clone(this.value);
                    arr.splice(this.value.indexOf(this.getItemValue(item)), 1);
                    this.value = arr;
                }
            },
            getItemValue(item) {
                if (isObject(item)) {
                    if (typeof this.control.dataOptions !== "undefined" && this.control.dataOptions.length > 0) {
                        let f = this.control.dataOptions.find((dd) => {
                            return dd == item
                        });

                        if (f) {
                            return f.value
                        } else {
                            return null;
                        }
                    }
                } else {
                    return item;
                }
            }
        }
    }
</script>

<style scoped>
</style>
