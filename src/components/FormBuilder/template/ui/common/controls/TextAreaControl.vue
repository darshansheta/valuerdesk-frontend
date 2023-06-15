<template>
    <div class="controlItemWrapper" :class="control.className" :data-control-name="control.name">
        <div class="controlItem row" :id="control.name" v-if="labelPosition === 'left'">
            <div class="col-md-4">
                <label class="control-label fb-cl" :class="{'bold': control.labelBold, 'italic': control.labelItalic, 'underline': control.labelUnderline}">
                    {{controlLabel}} <span v-if="control.required" style="color:red;">*</span></label> 
                </label>
            </div>
            <div class="col-md-8">
                       <textarea  class="form-control"
                                :readonly="control.readonly"
                                :name="control.fieldName"
                                :value="demo_value"></textarea>
            </div>
        </div>
        <div class="controlItem row" :id="control.name" v-else>
            <div class="form-group col-md-12">
                <label class="control-label" :class="{'bold': control.labelBold, 'italic': control.labelItalic, 'underline': control.labelUnderline}">
                    {{controlLabel}} <span v-if="control.required" style="color:red;">*</span></label>
                </label>
                    <textarea  class="form-control"
                                :readonly="control.readonly"
                                :name="control.fieldName"
                                :value="demo_value"></textarea>
                
            </div>
        </div>
    </div>
</template>

<script>
    import abstractControlTemplate from "./abstractControlTemplate";
    export default {
        name: "TextAreaControl",
        props: ['control', 'labelPosition'],
        mixins: [abstractControlTemplate],
        computed: {
            demo_value() {
                if (!_.isEmpty(this.control.defaultValue)) {
                    return this.control.defaultValue;
                }

                return "";
            }
        }
    }
</script>

<style scoped>
label.h-center {
    padding-top: 7px;margin-bottom: 0;
}
</style>
