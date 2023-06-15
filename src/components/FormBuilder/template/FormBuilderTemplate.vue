<template>
    <div class="row" style="margin: 0 20px;">
        <div class="col-md-9">
            <section-component :form="form" ref="SectionComponent" :elements="elements"></section-component>
        </div>
        <div class="col-md-3">
            <sidebar-component :elements="elements"></sidebar-component>
        </div>

        <preview-component ref="PreviewComponent" :form="form" v-if="showPreview" :show="showPreview" @hide="togglePreview"></preview-component>
    </div>
</template>

<script>
    import SectionComponent from "./ui/SectionComponent";
    import SidebarComponent from "./ui/SidebarComponent";
    import PreviewComponent from "./ui/PreviewComponent";

    var default_form_value = () => ({
        sections: [],
        layout: "",
        _uniqueId: Math.random()
    });

    export default {
        name: "form-builder-template",
        components: {
            PreviewComponent,
            SidebarComponent,
            SectionComponent
        },
        props: {
            form: {
                type: Object
            },
            elements: {
                type: Array,
                default: () => []
            }
        },
        data: () => ({
            showPreview:false
        }),
        // data: () => ({
        //     form: {
        //         sections: [],
        //         layout: "",
        //         _uniqueId: Math.random()
        //     }
        // }),
        methods: {
            getValue() {
                return this.form;
            },
            setValue(val) {
                this.form = val;
            },
            preview() {
                //this.$refs.PreviewComponent.openModal(this.form);
            },
            togglePreview() {
                this.showPreview = !this.showPreview;
            }
        }
    }
</script>

<style scoped>

</style>
