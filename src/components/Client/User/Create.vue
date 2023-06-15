<template>
    <b-modal
        :keyboard="false"
        :backdrop="false"
        class="modal-right"
        v-model="show"
        title="Create User"
        ref="modal"
        :dialog-style="{width:'600px'}"
        :footer="false"
        :before-close="hide"
    >
        <form 
            class="form-horizontal"
            @submit.prevent="validateForm('user')"
            autocomplete="off"
        >
            <vee-input
                control-col="col-sm-9"
                label-col="col-sm-3"
                label="Name"
                v-model="user.name"
                :rules="vvRules.name"
                name="user.name"
            />

            <vee-input
                control-col="col-sm-5"
                label-col="col-sm-3"
                label="Phone"
                v-model="user.phone" 
                :rules="vvRules.phone"
                name="user.phone"
            />

            <vee-input
                control-col="col-sm-5"
                label-col="col-sm-3"
                label="Email"
                v-model="user.email" 
                :rules="vvRules.email"
                name="user.email"
            />
            <div 
                class="form-group"
                :class="{'has-error': errors.has('user.branchId')}"
            >
                <label for="" class="control-label col-sm-3">Branch</label>
                <div class="col-sm-5">        
                    <select
                        class="form-control"
                        v-model="user.branchId"
                        v-validate="vvRules.branchId"
                        name="user.branchId"
                    >
                        <option value="">Select Branch</option>
                        <option v-for="branch in branches" v-bind:value="branch.id">
                            {{ branch.name }}
                        </option>
                    </select>
                    <span 
                        class="help-block"
                        v-show="errors.has('user.branchId')"
                    >
                        {{errors.first('user.branchId')}}
                    </span>
                </div>
            </div>


            <div class="form-group">
                <div class="col-sm-offset-3 col-sm-9">
                    <button type="submit" :disabled="buttonDisabled" v-on:click.prevent="validateForm('user')" class="btn btn-primary ">SUBMIT</button>
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
            user: {
                name:'',
                email:'',
                branchId:'',
                phone:''
            },
            vvRules: rules('clientUser'),
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
            branches:Array
        },
        mounted() {
        },
        components: {
        },
        methods: {
            ...mapActions({
                createUserAction: 'client/createUserAction',
            }),
            validateForm(scope) {
                let self = this;
                this.$validator.validate().then((result) => {
                    if (result) {
                        this.buttonDisabled = true;
                        this.createUserAction({ clientId:this.clientId, ...this.user}).then((resp) => {
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