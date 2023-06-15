<template>
    <b-modal
        :keyboard="false"
        :backdrop="false"
        class="modal-right"
        v-model="show"
        title="Edit Client"
        ref="modal"
        :dialog-style="{width:'700px'}"
        :footer="false"
        :before-close="hide"
    >
        <form 
            class="form-horizontal"
            @submit.prevent="validateForm('staff')"
            autocomplete="off"
        >
            <vee-input
                control-col="col-sm-7"
                label-col="col-sm-2"
                label="Name"
                v-model="staff.name"
                :rules="vvRules.name"
                name="staff.name"
            />

            <vee-input
                control-col="col-sm-7"
                label-col="col-sm-2"
                label="Email"
                v-model="staff.email" 
                :rules="vvRules.email"
                name="staff.email"
            />
            <vee-input
                control-col="col-sm-7"
                label-col="col-sm-2"
                label="Phone"
                v-model="staff.phone" 
                :rules="vvRules.phone"
                name="staff.phone"
            />
            <!-- <vee-input
                control-col="col-sm-7"
                label-col="col-sm-2"
                label="Username"
                v-model="staff.username" 
                :rules="vvRules.username"
                name="staff.username"
            /> -->

            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit" :disabled="buttonDisabled" v-on:click.prevent="validateForm('staff')" class="btn btn-primary ">SUBMIT</button>
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
            vvRules: rules('staff'),
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
            staff:{
                type:Object,
                default: function() {
                    return {
                        id:0,
                        name:'',
                        email:'',
                        phone:'',
                        username:'',
                        password:'',
                    }
                }
            }
        },
        mounted() {
        },
        components: {
        },
        methods: {
            ...mapActions({
                updateStaffAction: 'staff/updateStaffAction',
            }),
            validateForm(scope) {
                let self = this;
                this.$validator.validate().then((result) => {
                    if (result) {
                        this.buttonDisabled = true;
                        this.updateStaffAction(this.staff).then((resp) => {
                            self.hide()
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