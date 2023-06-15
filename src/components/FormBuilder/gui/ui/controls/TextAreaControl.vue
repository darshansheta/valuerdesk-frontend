<template>
    <div>
        <div class="row" v-if="labelPosition === 'left'">
            <div class="col-md-4">
                <label :class="{'bold': control.labelBold, 'italic': control.labelItalic, 'underline': control.labelUnderline}">
                    {{control.label}} <span v-if="control.required" style="color:red;">*</span>
                </label>
            </div>
            <div class="col-md-8">
                
                <textarea class="form-control"
                          v-model="control.value"
                          :readonly="this.control.readonly"
                          :name="control.fieldName"></textarea>
            </div>
        </div>
        <div v-else class="form-group">
            <label :class="{'bold': control.labelBold, 'italic': control.labelItalic, 'underline': control.labelUnderline}">
                {{control.label}} <span v-if="control.required" style="color:red;">*</span>
            </label>

            <textarea class="form-control"
                      v-model="control.value"
                      :readonly="this.control.readonly"
                      :name="control.fieldName"></textarea>
        </div>
    </div>
</template>

<script>
    import {Hooks} from './../../../gui/components/hook_lists';

    export default {
        name: "TextAreaControl",
        props: ['control', 'labelPosition'],
        mounted() {
            if (!_.isEmpty(this.control.defaultValue)) {
                this.control.value = this.control.defaultValue;
            }

            // after hook
            Hooks.Control.afterInit.run(this.control, $(this.$el).find("textarea"));
        }
    }
</script>

<style scoped>

</style>
