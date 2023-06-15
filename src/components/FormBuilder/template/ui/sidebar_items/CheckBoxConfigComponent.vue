<template>
    <div class="row mt-2" style="display: none;">

        <div class="col-md-12">
            <table class="table table-bordered table-striped">
                <thead>
                <tr>
                    <th class="text-center" width="10%">
                        <i class="fa fa-plus clickable" @click="addOption"></i>
                    </th>
                    <th width="40%">Value</th>
                    <th>Text</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(option, index) in control.dataOptions" :class="'staticSource_' + index">
                    <td class="text-center">
                        <i icon="times" class="clickable" @click="removeOption(index)"></i>
                    </td>
                    <td>
                        <input type="text" class="form-control txtId" v-model="option.value">
                    </td>
                    <td>
                        <input type="text" class="form-control txtText" v-model="option.text">
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    
    import {FORM_CONSTANTS} from "@/components/FormBuilder/config/constants";

    export default {
        name: "CheckBoxConfigComponent",
        components: { },
        props: {
            control: {
                type: Object
            },
        },
        methods: {
            addOption() {
                this.control.dataOptions.push(_.clone(FORM_CONSTANTS.OptionDefault));
            },
            removeOption(index) {
                this.control.dataOptions.splice(index, 1);
            }
        },
        mounted() {
            // add default options
            if (this.control.dataOptions && this.control.dataOptions.length <= 0) {
                this.addOption();
            }
        },
    }
</script>

<style scoped>

</style>
