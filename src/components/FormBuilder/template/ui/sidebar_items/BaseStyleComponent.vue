<template>
    <div>
        <div class="row mt-2" v-if="false && control.type !== 'checkbox'">
            <div class="col-md-12">
                <div class="form-group">
                    <label>Default value</label>
                    <input type="text" class="form-control" v-model="control.defaultValue">
                </div>
            </div>
        </div>

        <div class="row mt-2">
            <div class="col-md-12">
                <div class="form-group" v-if="false">
                    <label>Control label</label>
                    <input type="text" class="form-control" readonly="" :value="label">
                </div>
                <div class="form-group">
                    <label><input type="checkbox" v-model="control.labelBold"> Bold</label>
                    <label><input type="checkbox" v-model="control.labelItalic"> Italic</label>
                    <label><input type="checkbox" v-model="control.labelUnderline"> Underline</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BaseStyleComponent",
        props: {
            control: {
                type: Object
            },
            elements: {
                type: Array,
                default: () => []
            }
        },
        computed: {
            label() {
                let ele = this.elements.filter(ele => {
                    return ele.placeholder == this.control.fieldName
                });
                if (ele.length) {
                    this.control.label = ele[0].label;
                    return ele[0].label;
                }
                return '';
            }
        }
    }
</script>

<style scoped>

</style>
