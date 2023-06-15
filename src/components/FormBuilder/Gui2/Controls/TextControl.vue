<template>
    <div :class="getControlWrapperClass()">
        <div class="row" v-if="labelPosition === 'left'">
            <div class="col-md-4">
                <label class="control-label fb-cl" :class="{'bold': control.labelBold, 'italic': control.labelItalic, 'underline': control.labelUnderline}">
                    {{control.label}} <span v-if="control.required" style="color:red;">*</span>
                </label>
            </div>
            <div class="col-md-8">
                <input type="text"
                       class="form-control"
                       :readonly="control.readonly"
                       data-vv-as="above"
                       v-validate="vRules"
                       @input="onInput"
                       :name="control.name"
                       :value="value" />
                       <span class="help-block" v-show="errors.has(control.name)">{{errors.first(control.name)}}</span>
            </div>
        </div>
        <div v-else>
            <label class="control-label" :class="{'bold': control.labelBold, 'italic': control.labelItalic, 'underline': control.labelUnderline}">
                {{control.label}} <span v-if="control.required" style="color:red;">*</span>
            </label>

            <input type="text"
                   class="form-control"
                   data-vv-as="above"
                   v-validate="vRules"
                   donly="control.readonly"
                   @input="onInput"
                   :name="control.name"
                   :value="value" />
                   <span class="help-block" v-show="errors.has(control.name)">{{errors.first(control.name)}}</span>
        </div>
    </div>
</template>

<script>
    import abstractControl from "./../abstractControl";
    export default {
        name: "TextControl",
        mixins: [abstractControl]
    }
</script>

<style scoped>
</style>
