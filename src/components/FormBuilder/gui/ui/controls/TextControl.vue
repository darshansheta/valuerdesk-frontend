<template>
    <div>
        <div class="row" v-if="labelPosition === 'left'">
            <div class="col-md-4">
                <label :class="{'bold': control.labelBold, 'italic': control.labelItalic, 'underline': control.labelUnderline}">
                    {{control.label}} <span v-if="control.required" style="color:red;">*</span>
                </label>
            </div>
            <div class="col-md-8">
                <input type="text"
                       class="form-control"
                       :readonly="this.control.readonly"
                       @input="valueUpdated($event)"
                       v-if="!control.isMultiLine"
                       :name="control.fieldName"
                       :value="control.value" />
                <textarea v-else class="form-control"
                          :value="control.value"
                          :readonly="this.control.readonly"
                          @input="valueUpdated($event)"
                          :name="control.fieldName"></textarea>
            </div>
        </div>
        <div v-else class="form-group">
            <label :class="{'bold': control.labelBold, 'italic': control.labelItalic, 'underline': control.labelUnderline}">
                {{control.label}} <span v-if="control.required" style="color:red;">*</span>
            </label>

            <input type="text"
                   class="form-control"
                   :readonly="this.control.readonly"
                   @input="valueUpdated($event)"
                   v-if="!control.isMultiLine"
                   :name="control.fieldName"
                   :value="control.value" />
            <textarea v-else class="form-control"
                      :value="control.value"
                      :readonly="this.control.readonly"
                      @input="valueUpdated($event)"
                      :name="control.fieldName"></textarea>
        </div>
    </div>
</template>

<script>
    import {Hooks} from './../../../gui/components/hook_lists';

    export default {
        name: "TextControl",
        props: ['control', 'labelPosition','sectionName'],
        mounted() {
            if (!_.isEmpty(this.control.defaultValue) && _.isEmpty(this.control.value)) {
                this.control.value = this.control.defaultValue;
            }

            // after hook
            Hooks.Control.afterInit.run(this.control, $(this.$el).find(this.control.isMultiLine ? "textarea" : "input"));
        },
        methods: {
            valueUpdated($event) {
                //console.log(this.$parent.$parent.$parent.$parent.$parent.setValue)
                //console.log(this.$refs.FormBuilderGui)
                //return
                this.$parent.$parent.$parent.$parent.$parent.setValue({
                    [this.sectionName] : {
                        [this.control.fieldName]: $event.target.value
                    }
                });
                //this.$emit('input',this.control.fieldName,$event.target.value)
            }
        }
    }
</script>

<style scoped>

</style>
