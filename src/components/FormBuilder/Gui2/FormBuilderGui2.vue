<template>
    <div class="col-md-12">
        <template v-if="form.sections && form.sections.length">
            <template v-for="(section, sectionIndex) in form.sections">
                <div class="row">
                    <div class="col-md-12">
                        <div class="panel panel-white">
                            <div class="panel-heading" style="background-color: #f6f8fa;">
                                {{section.label}}
                                <div class="pull-right">
                                    <i :class="['fa',(displaySection[sectionIndex] ? 'fa-toggle-up' : 'fa-toggle-down')]" @click="toggleSectionDisplay(sectionIndex)"></i>
                                </div>
                            </div>
                            <div class="panel-body" v-show="displaySection[sectionIndex]">
                                <div class="row" v-if="!section.isDynamic" v-for="row in section.rows">
                                    <template v-for="control in row.controls">
                                            <component 
                                                :is="getControlInstance(control.type)"
                                                :control="control"
                                                :label-position="section.labelPosition"
                                                :sectionName='section.name'
                                                :model="value"
                                                :key="control.name"
                                                @change="modelChange"
                                            ></component>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </template>
    </div>
</template>

<script>
    import {CONTROL_TYPES} from "@/components/FormBuilder/config/control_constant";
    export default {
        name: "FormBuilderGui2",
        components: {},
        props: {
            form: {
                type: Object
            },
            value: Object
        },
        data: () => ({
            displaySection: [],
        }),
        methods: {
            getControlInstance(type) {
                if (!CONTROL_TYPES[type]) {
                    console.error(`Control type ${type} doesn't exist to render.`);
                    return;
                }
                // set control
                return CONTROL_TYPES[type].source.gui2;
            },
            isSectionDisplay(sectionKey) {
                if (this.displaySection[sectionKey] === undefined) {
                    return true;
                } else {
                    return this.displaySection[sectionKey];
                }
            },
            toggleSectionDisplay(sectionKey) {
                let displaySection = {...this.displaySection};
                if (displaySection[sectionKey] === undefined) {
                    displaySection[sectionKey] = false ;
                } else {
                    displaySection[sectionKey] = !displaySection[sectionKey]
                }

                
                this.displaySection = displaySection
                
            },
            modelChange(k,v){
                this.$emit('change',k,v)
            }
        },
        created() {
            // this.form = JSON.parse(localStorage.getItem('BUILD_FORM'));
            //let displaySection = [];
            if (this.form.sections != undefined && this.form.sections.length) {
                this.displaySection = this.form.sections.map((sec,key) => {
                    return true;
                });
            }
        },
        watch: {
            // value: {
            //     handler: function(newVal) {
            //         console.log(newVal, 'newval');
            //     },
            //     deep: true
            // }
        }
    }
</script>

<style scoped>

</style>
