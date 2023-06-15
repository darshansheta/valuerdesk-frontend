<template>
    <b-modal
        :keyboard="false"
        :backdrop="false"
        class="modal-right"
        v-model="show"
        title="Create Client"
        ref="modal"
        :dialog-style="{width:'700px'}"
        :footer="false"
        :before-close="hide"
    >
        <form 
            class="form-horizontal"
            @submit.prevent="validateForm('client')"
            autocomplete="off"
        >
            <vee-input
                control-col="col-sm-10"
                label-col="col-sm-2"
                label="Name"
                v-model="client.name"
                :rules="vvRules.name"
                name="client.name"
            />

            <vee-input
                control-col="col-sm-5"
                label-col="col-sm-2"
                label="Phone"
                v-model="client.phone" 
                :rules="vvRules.phone"
                name="client.phone"
            />
            <vee-input
                control-col="col-sm-10"
                label-col="col-sm-2"
                label="Address"
                v-model="client.address.address"
                :rules="vvRules.address.address"
                name="client.address.address"
            />
            <vee-input
                control-col="col-sm-5"
                label-col="col-sm-2"
                label="Landmark"
                v-model="client.address.landmark"
                :rules="vvRules.address.landmark"
                name="client.address.landmark"
            />
            <vee-input
                control-col="col-sm-5"
                label-col="col-sm-2"
                label="Locality"
                v-model="client.address.locality"
                :rules="vvRules.address.locality"
                name="client.address.locality"
            />            <vee-input
                control-col="col-sm-5"
                label-col="col-sm-2"
                label="Pincode"
                v-model="client.address.pincode"
                :rules="vvRules.address.pincode"
                name="client.address.pincode"
            />            <vee-input
                control-col="col-sm-5"
                label-col="col-sm-2"
                label="Subdistrict"
                v-model="client.address.subdistrict"
                :rules="vvRules.address.subdistrict"
                name="client.address.subdistrict"
            />
            <vee-input
                control-col="col-sm-5"
                label-col="col-sm-2"
                label="District"
                v-model="client.address.district"
                :rules="vvRules.address.district"
                name="client.address.district"
            />
            <div 
                class="form-group"
                :class="{'has-error': errors.has('client.address.state')}"
            >
                <label for="" class="control-label col-sm-2">State</label>
                <div class="col-sm-5">        
                    <select
                        class="form-control"
                        v-model="client.address.state"
                        v-validate="vvRules.address.state"
                        name="client.address.state"
                    >
                        <option value="">SELECT STATE</option>
                        <option v-for="state in $states" :value="state.code">{{state.name}}</option>
                    </select>
                    <span 
                        class="help-block"
                        v-show="errors.has('client.address.state')"
                    >
                        {{errors.first('client.address.state')}}
                    </span>
                </div>
            </div>


            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit" :disabled="buttonDisabled" v-on:click.prevent="validateForm('client')" class="btn btn-primary ">SUBMIT</button>
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
            client: {
                name:'',
                phone:'',
                address: {
                    address: '',
                    landmark:'',
                    locality:'',
                    pincode: '',
                    subdistrict: '',
                    district: '',
                    state: '',
                }
            },
            vvRules: rules('client'),
            buttonDisabled:false

        }
    }


    export default {
        name: 'Create',
        data:initialData,
        props: {
            show : {
                type: Boolean,
            }
        },
        mounted() {
        },
        components: {
        },
        methods: {
            ...mapActions({
                createClientAction: 'client/createClientAction',
            }),
            validateForm(scope) {
                let self = this;
                this.$validator.validate().then((result) => {
                    if (result) {
                        //this['client/createClientAction'](this.client).then((resp) => { //this will also work
                        this.buttonDisabled = true;
                        this.createClientAction(this.client).then((resp) => {
                            this.$router.push('/clients/'+resp.data.data.id);
                            Object.assign(this.$data, initialData())
                            this.errors.clear();
                            this.$emit('hide');
                        }).catch(function(e){
                            console.log(e)
                        }).finally(function(res){
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