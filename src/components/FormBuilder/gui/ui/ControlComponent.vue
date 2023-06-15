<template>
    <div class="controlItem form-group" :class="control.className">
        <component :is="controlInstance" :control="control" :label-position="labelPosition" :sectionName='sectionName'></component>
    </div>
</template>

<script>
    import {Hooks} from '@/components/FormBuilder/gui/components/hook_lists';
    import {CONTROL_TYPES} from "@/components/FormBuilder/config/control_constant";

    export default {
        name: "ControlComponent",
        props: ['control', 'labelPosition', 'sectionName'],
        data: () => ({
            controlInstance: null,
        }),
        created() {
            if (!CONTROL_TYPES[this.control.type]) {
                console.error(`Control type ${this.control.type} doesn't exist to render.`);
                return;
            }

            Hooks.Control.beforeRegister.run(this.control);

            // set control
            this.controlInstance = CONTROL_TYPES[this.control.type].source.gui;
        },
        mounted() {
            Hooks.Control.afterRegister.run(this.control);
        }
    }
</script>

<style scoped>

</style>
