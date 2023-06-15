<template>
    <b-modal
        :keyboard="false"
        :backdrop="false"
        class="modal-right"
        v-model="show"
        title="Create Staff"
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
            <vee-input
                control-col="col-sm-7"
                label-col="col-sm-2"
                label="Username"
                v-model="staff.username" 
                :rules="vvRules.username"
                name="staff.username"
            />
            <vee-input
                control-col="col-sm-7"
                label-col="col-sm-2"
                label="Password"
                i-type="password"
                v-model="staff.password" 
                :rules="vvRules.password"
                name="staff.password"
            />
                <!-- <vee-select
                control-col="col-sm-7"
                label-col="col-sm-2"
                label="Type"
                v-model="staff.roleId"
                :rules="vvRules.roleId"
                name="staff.roleId">
                <option value="">SELECT ANY</option>
                <option value="2">Staff</option>
                <option value="3">Assignee</option>
            </vee-select> -->


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
import { mapGetters, mapActions } from 'vuex';
import Router from 'vue-router';
import rules from '@/validations/rules';
import _ from "lodash"

    const initialData = () => {
        return {
            staff: {
                name:'',
                email:'',
                phone:'',
                username:'',
                password:'',
            },
            vvRules: rules('staff'),
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
                createStaffAction: 'staff/createStaffAction',
            }),
            validateForm(scope) {
                let self = this;
                this.$validator.validate().then((result) => {
                    if (result) {
                        //this['staff/createStaffAction'](this.staff).then((resp) => { //this will also work
                        this.buttonDisabled = true;
                        this.createStaffAction(this.staff).then((resp) => {
                            Object.assign(this.$data, initialData())
                            this.errors.clear();
                            this.$emit('hide');
                        }).catch(function(e){
                            if(e.response.data && e.response.data.errors) {
                                self.$notify({
                                  type: 'danger',
                                  title: 'Error',
                                  html:true,
                                  icon:'fa fa-times',
                                  content: [
                                    '<ul>',
                                    ..._.map(e.response.data.errors, (i) => `<li>${i}</li>` ),
                                    '</ul>',
                                  ].join(''),
                                  duration: 0
                                })    
                            }
                            // self.$notify({
                            //   type: 'danger',
                            //   title: 'Error',
                            //   content: `You are loggedin succesfully..`,
                            //   duration: 1500
                            // })
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