<template>
    <b-modal
        :keyboard="false"
        :backdrop="false"
        classd="modal-right"
        v-model="show"
        title="Preview Your Form"
        :dialog-style="{width:'70%'}"
        :footer="false"
        :appendToBody="true"
        :before-close="hide"
    >
       <form-builder-gui  v-if="formData !== null" ref="FormBuilderGui" :form="formData" :key="formData._uniqueId"></form-builder-gui>
       <div class="form-group">
           <button type="button" class="btn btn-default" @click="hide">CLOSE</button>
       </div>
    </b-modal>
</template>

<script>
    import FormBuilderGui from './../../gui/FormBuilderGui';

    export default {
        name: "PreviewComponent",
        components: {FormBuilderGui},
        props: {
            form : {
                type: Object,
                default:null
            },
            show : {
                type: Boolean
            },
        },
        data: () => ({
            previewModal: null,
            formData: null
        }),
        methods: {
            openModal(formData) {
                // set data
                this.formData = _.cloneDeep(this.form);
                this.formData._uniqueId = Math.random();

                // open
                // this.previewModal.modal('show');
            },
            closeModal() {
                this.previewModal.modal('hide');
            },
            getData() {
                console.log(this.$refs.FormBuilderGui.getValue());
            },
            hide() {
                this.$emit('hide')
            }
        },
        mounted() {
           // this.previewModal = $(this.$el);
           this.openModal()
        }
    }
</script>

<style scoped>

</style>
