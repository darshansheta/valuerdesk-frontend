<template>
    <div :class="getControlWrapperClass()">
        <div class="row" v-if="labelPosition === 'left'">
            <div class="col-md-4">
                <label class="control-label fb-cl" :class="{'bold': control.labelBold, 'italic': control.labelItalic, 'underline': control.labelUnderline}">
                    {{control.label}} <span v-if="control.required" style="color:red;">*</span></label> 
                </label>
            </div>
            <div class="col-md-8">
                       <textarea  class="form-control"
                   :readonly="control.readonly"
                   v-validate="vRules"
                   data-vv-as="above"
                   @input="onInput"
                   :name="control.name"
                   :value="value"></textarea>
                   <span class="help-block" v-show="errors.has(control.name)">{{errors.first(control.name)}}</span>
            </div>
        </div>
        <div v-else>
                <label class="control-label" :class="{'bold': control.labelBold, 'italic': control.labelItalic, 'underline': control.labelUnderline}">
                    {{control.label}} <span v-if="control.required" style="color:red;">*</span></label>
                </label>
                    <textarea  class="form-control"
                   :readonly="control.readonly"
                   v-validate="vRules"
                   data-vv-as="above"
                   @input="onInput"
                   :name="control.name"
                   :value="value"></textarea>
                   <span class="help-block" v-show="errors.has(control.name)">{{errors.first(control.name)}}</span>
        </div>
    </div>
</template>

<script>
    import abstractControl from "./../abstractControl";
    export default {
        name: "TextAreaControl",
        mixins: [abstractControl]
    }
</script>

<style scoped>
</style>
