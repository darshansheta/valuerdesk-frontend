<template>
    <div :class="getControlWrapperClass()">
        <div class="row" v-if="labelPosition === 'left'">
            <div class="col-md-4">
                <label class="control-label fb-cl" :class="{'bold': control.labelBold, 'italic': control.labelItalic, 'underline': control.labelUnderline}">
                    {{control.label}} <span v-if="control.required" style="color:red;">*</span>
                </label>
            </div>
            <div class="col-md-8">
                <div class="radio" v-for="item in control.dataOptions">
                  <label>
                    <input 
                        type="radio" 
                        :readonly="control.readonly"
                        data-vv-as="above"
                        v-validate="vRules"
                        :checked="isItemChecked(item)"
                        :name="control.name"
                        :value="item.value"
                        @click="onSelection(item)"
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
            <div class="radio" v-for="item in control.dataOptions">
              <label>
                <input 
                    type="radio" 
                    :readonly="control.readonly"
                    data-vv-as="above"
                    v-validate="vRules"
                    :checked="isItemChecked(item)"
                    :name="control.name"
                    :value="item.value"
                    @click="onSelection(item)"
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
        name: "RadioControl",
        mixins: [abstractControl],
        methods: {
            onSelection(item) {
                this.value = this.getItemValue(item);
            },
            isItemChecked(item) {
                let currentValue = this.getItemValue(item);
                return currentValue === this.value;
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
