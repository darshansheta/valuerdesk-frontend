<template>
    <b-modal
        :keyboard="false"
        :backdrop="false"
        classd="modal-right"
        v-model="show"
        title="Section Configuration"
        :dialog-style="{width:'70%'}"
        :footer="false"
        :appendToBody="true"
        :before-close="hide"
        id="SectionConfigModal"
    > 
       <template v-if="section !== null">
           <div class="form-group">
               <label>Section Client Key</label>
               <input type="text" class="form-control" v-model="section.clientKey">
           </div>
           <div class="form-group">
               <label>Label Position</label>
               <select class="form-control" v-model="section.labelPosition">
                   <option value="left">Horizontal</option>
                   <option value="top">Vertical</option>
               </select>
           </div>
           <div class="form-group" v-if="false">
               <label><input type="checkbox" v-model="section.isDynamic"> Is Dynamic Form?</label>
           </div>

           <div class="row" v-if="section.isDynamic">
               <div class="col-md-6">
                   <label>Min instance</label>
                   <input type="number"
                          min="0"
                          class="form-control"
                          data-toggle='tooltip'
                          title="Minimum instance for dynamic section"
                          v-model="section.minInstance">
               </div>
               <div class="col-md-6">
                   <label>Max instance</label>
                   <input type="number"
                          min="0"
                          class="form-control"
                          data-toggle='tooltip'
                          title="Maximum instance for dynamic section. 0 for unlimited."
                          v-model="section.maxInstance">
               </div>
           </div>
       </template>
       <div class="form-group">
        <button type="button" class="btn btn-default" @click="save">Save</button>
           <button type="button" class="btn btn-default" @click="hide">CLOSE</button>
       </div>
    </b-modal>
</template>

<script>
    const SECTION_ID = "#sectionConfigModal";

    export default {
        name: "SectionConfigModal",
        props:{
            updateSectionInfo: {
                type:String
            },
            show : {
                type: Boolean
            },
            sectionInfo: {
                type:Object,
            },
            secIndex: {
                type: [Number, String]
            }
        },
        data: () => ({
            index: null,
            section: null
        }),
        methods: {
            openModal(sectionInfo, index) {
                this.section = _.cloneDeep(this.sectionInfo);
                this.index = _.clone(this.secIndex);
                //$(SECTION_ID).modal('show');
                console.log(this.secIndex,this.sectionInfo)
            },
            closeModal() {
                $(SECTION_ID).modal('hide');
            },
            save() {
                if (_.isEmpty(this.section.clientKey)) {
                    this.section.clientKey = this.section.name;
                }
                // format data
                this.section.minInstance = parseInt(this.section.minInstance);
                this.section.maxInstance = parseInt(this.section.maxInstance);

                this.$emit('updateSectionInfo', this.section, this.index);
                this.hide();
            },
            hide() {
                this.$emit('hide')
            }
        },
        mounted() {
            console.log(this.secIndex, this.sectionInfo)
            this.openModal();
            $("[data-toggle='tooltip']").tooltip();
        }
    }
</script>

<style scoped>

</style>
