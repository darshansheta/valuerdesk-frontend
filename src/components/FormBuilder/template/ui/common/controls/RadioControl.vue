<template>
    <div class="controlItemWrapper" :class="control.className" :data-control-name="control.name">
        <div class="controlItem row" :id="control.name" v-if="labelPosition === 'left'">
            <div class="col-md-4">
                <label class="control-label fb-cl" :class="{'bold': control.labelBold, 'italic': control.labelItalic, 'underline': control.labelUnderline}">
                    {{controlLabel}} <span v-if="control.required" style="color:red;">*</span></label>
                </label>
            </div>
            <div class="col-md-8">
                <div class="radio" v-for="item in control.dataOptions">
                  <label>
                    <input 
                        type="radio" 
                        :name="control.fieldName"
                        disabled="" 
                        >
                    {{item.text}}
                  </label>
                </div>
            </div>
        </div>
        <div class="controlItem row" :id="control.name" v-else>
            <div class="form-group col-md-12">
                <label class="control-label" :class="{'bold': control.labelBold, 'italic': control.labelItalic, 'underline': control.labelUnderline}">
                    {{controlLabel}} <span v-if="control.required" style="color:red;">*</span></label>
                </label>
                <div class="radio" v-for="item in control.dataOptions">
                  <label>
                    <input 
                        type="radio" 
                        :name="control.fieldName"
                        disabled="" 
                        >
                    {{item.text}}
                  </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import abstractControlTemplate from "./abstractControlTemplate";
    export default {
        name: "RadioControl",
        props: ['control', 'labelPosition'],
        mixins: [abstractControlTemplate],
    }
</script>

<style scoped>

</style>
