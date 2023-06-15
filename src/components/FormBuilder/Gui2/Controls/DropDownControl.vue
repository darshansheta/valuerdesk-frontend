<template>
    <div :class="getControlWrapperClass()">
        <div class="row" v-if="labelPosition === 'left'">
            <div class="col-md-4">
                <label class="control-label fb-cl" :class="{'bold': control.labelBold, 'italic': control.labelItalic, 'underline': control.labelUnderline}">
                    {{control.label}} <span v-if="control.required" style="color:red;">*</span>
                </label>
            </div>
            <div class="col-md-8">
                <select class="form-control"
                    v-model="value"
                    :readonly="control.readonly"
                    data-vv-as="above"
                    v-validate="vRules"
                    :name="control.name"
                >
                    <option value="">Select Option</option>
                    <option  v-for="item in control.dataOptions" :value="item.value">{{item.text}}</option>
                </select>
                <span class="help-block" v-show="errors.has(control.name)">{{errors.first(control.name)}}</span>
            </div>
        </div>
        <div v-else>
            <label class="control-label" :class="{'bold': control.labelBold, 'italic': control.labelItalic, 'underline': control.labelUnderline}">
                {{control.label}} <span v-if="control.required" style="color:red;">*</span>
            </label>
            <select class="form-control"
                v-model="value"
                :readonly="control.readonly"
                data-vv-as="above"
                v-validate="vRules"
                :name="control.name"
            >
                <option value="">Select Option</option>
                <option  v-for="item in control.dataOptions" :value="item.value">{{item.text}}</option>
            </select>
            <span class="help-block" v-show="errors.has(control.name)">{{errors.first(control.name)}}</span>
        </div>
    </div>
</template>

<script>
    import { isObject, isNil } from "lodash";
    import abstractControl from "./../abstractControl";
    export default {
        name: "RadioControl",
        mixins: [abstractControl],
        methods: {

        }
    }
</script>

<style scoped>
</style>
