<template>
    <b-modal
        :keyboard="false"
        :backdrop="false"
        class="modal-right"
        v-model="show"
        title="Edit Branch"
        ref="modal"
        :dialog-style="{width:'600px'}"
        :footer="false"
        :before-close="hide"
    >
        <form 
            class="form-horizontal"
            @submit.prevent="validateForm('branch')"
            autocomplete="off"
        >
            <vee-input
                control-col="col-sm-9"
                label-col="col-sm-3"
                label="Name"
                v-model="branch.name"
                :rules="vvRules.name"
                name="branch.name"
            />

            <vee-input
                control-col="col-sm-5"
                label-col="col-sm-3"
                label="Phone"
                v-model="branch.phone" 
                :rules="vvRules.phone"
                name="branch.phone"
            />

            <vee-input
                control-col="col-sm-5"
                label-col="col-sm-3"
                label="Code"
                v-model="branch.code" 
                :rules="vvRules.code"
                name="branch.code"
            />
            <vee-input
                control-col="col-sm-9"
                label-col="col-sm-3"
                label="Address"
                v-model="branch.address.address"
                :rules="vvRules.address.address"
                name="branch.address.address"
            />
            <vee-input
                control-col="col-sm-5"
                label-col="col-sm-3"
                label="Landmark"
                v-model="branch.address.landmark"
                :rules="vvRules.address.landmark"
                name="branch.address.landmark"
            />
            <vee-input
                control-col="col-sm-5"
                label-col="col-sm-3"
                label="Locality"
                v-model="branch.address.locality"
                :rules="vvRules.address.locality"
                name="branch.address.locality"
            />            <vee-input
                control-col="col-sm-5"
                label-col="col-sm-3"
                label="Pincode"
                v-model="branch.address.pincode"
                :rules="vvRules.address.pincode"
                name="branch.address.pincode"
            />            <vee-input
                control-col="col-sm-5"
                label-col="col-sm-3"
                label="Subdistrict"
                v-model="branch.address.subdistrict"
                :rules="vvRules.address.subdistrict"
                name="branch.address.subdistrict"
            />
            <vee-input
                control-col="col-sm-5"
                label-col="col-sm-3"
                label="District"
                v-model="branch.address.district"
                :rules="vvRules.address.district"
                name="branch.address.district"
            />
            <div 
                class="form-group"
                :class="{'has-error': errors.has('branch.address.state')}"
            >
                <label for="" class="control-label col-sm-3">State</label>
                <div class="col-sm-5">        
                    <select
                        class="form-control"
                        v-model="branch.address.state"
                        v-validate="vvRules.address.state"
                        name="branch.address.state"
                    >
                        <option value="">SELECT STATE</option>
                        <option v-for="state in $states" :value="state.code">{{state.name}}</option>
                    </select>
                    <span 
                        class="help-block"
                        v-show="errors.has('branch.address.state')"
                    >
                        {{errors.first('branch.address.state')}}
                    </span>
                </div>
            </div>


            <div class="form-group">
                <div class="col-sm-offset-3 col-sm-9">
                    <button type="submit" :disabled="buttonDisabled" v-on:click.prevent="validateForm('branch')" class="btn btn-primary ">SUBMIT</button>
                    <button type="button" class="btn btn-default" @click="hide">CANCEL</button>
                </div>
            </div>
        </form>
    </b-modal>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'
    import Router from 'vue-router'
    import rules from '@/validations/rules';
    const initialData = () => {
        return {
            vvRules: rules('clientBranch'),
            buttonDisabled:false

        }
    }


    export default {
        name: 'Create',
        data:initialData,
        props: {
            show : {
                type: Boolean
            },
            clientId:Number,
            branch:{
                type: Object,
            }
        },
        mounted() {
        },
        components: {
        },
        methods: {
            ...mapActions({
                updateBranchAction: 'client/updateBranchAction',
            }),
            validateForm(scope) {
                let self = this;
                this.$validator.validate().then((result) => {
                    if (result) {
                        this.buttonDisabled = true;
                        this.updateBranchAction({ clientId:this.clientId,id:this.branch.id, ...this.branch}).then((resp) => {
                            Object.assign(this.$data, initialData())
                            this.errors.clear();
                            this.$emit('hide');
                        }).catch(function(e){
                            console.log(e)
                        }).finally(function(res) {
                            self.buttonDisabled = false;
                        });

                    }
                });
            },
            hide() {
                this.$emit('hide')
            }
        }
    }
</script>