<template>
    <div style="padding-top: 15px; ">
    <div class="row">
        <div class="col-md-10">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Search...." v-model="staffSearch">
                <dropdown class="input-group-btn">
                    <btn class="btn btn-default"><span class="caret"></span></btn>
                    <template slot="dropdown">
                      <li>
                        <a role="button" href="javascript:void(0)" @click="getStaffListAction">Refresh Hard</a>
                        </li>
                    </template>
                  </dropdown>
            </div>
        </div>
        <div class="col-md-2">
            <button class="btn btn-primary btn-block" @click="toggleCreateDialog">NEW</button>
        </div>
    </div>
    <div class="row" style="padding-top: 15px; ">
        <div class="col-md-12" style="">
            <div class="panel panel-default">
                <div class="table-responsive">
                <table class="table table-condensed table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(staff,cIndex) in allStaff" >
                            <td>{{staff.name}}</td>
                            <td>{{staff.username}}</td>
                            <td>{{staff.email}}</td>
                            <td>{{staff.phone}}</td>
                            <td>
                                <select :readonly="!hasRole('admin')" class="form-control input-sm" :value="staff.levelId" @change="changeLevel(staff,$event)">
                                    <option value="0">SELECT</option>
                                    <option v-for="level in userLevels" :value="level.id">{{level.label}}</option>
                                </select>
                            </td>
                            <td>
                                <button class="btn btn-sm btn-default" @click="toggleEditDialog(staff)"> <i class="fa fa-pencil"></i> Edit</button>
                                <button class="btn btn-sm btn-danger" @click="confirmDelete(staff)"> <i class="fa fa-times"></i></button>
                                <button class="btn btn-sm btn-default" @click="toggleNoteDialog(staff)"> <i class="fa fa-file-text"></i></button>
                            </td>
                        </tr>
                        <tr v-show="allStaff.length == 0">
                            <td colspan="5">No records found.</td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
            <div class="clearfix"></div>
        </div>
    </div>

    <staff-create :show="showCreateDialog" @hide="toggleCreateDialog" ></staff-create>
    <staff-edit :show="showEditDialog" @hide="toggleEditDialog({})" :staff="currentEditingStaff" v-if="currentEditingStaff && showEditDialog" ></staff-edit>
    <note-dialog v-if="showNoteDialog" :show="showNoteDialog" @hide="toggleNoteDialog({})" :user="noteOfUser"></note-dialog>
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import StaffCreate from './Create'
import StaffEdit from './Edit'

import Dropdown from '@/components/Shared/Dropdown';
import Btn from '@/components/Shared/button/Btn';
import NoteDialog from './NoteDialog'

export default{
    name: 'Staff',
    created() {
        //here data and pro can be changed but DOM is not available
    },
    mounted() {
        //here DOM/template is created 
        if (this.$route.params.id) {
            this.getStaffDetailsAction({id: this.$route.params.id});
        }
        this.getStaffListAction();
    },
    data: function() {
        return {
            staffSearch: '',
            showCreateDialog:false,
            showNoteDialog:false,
            showEditDialog:false,
            currentEditingStaff:{},
            noteOfUser:{},
        }
    },
    props: {
    },
    components: {
        StaffCreate,
        StaffEdit,
        Dropdown,
        Btn,
        NoteDialog
    },
    beforeRouteUpdate (to, from, next) {
        if (to.name == 'allStaff' && to.params.id != undefined) {
            this.getStaffDetailsAction({id:to.params.id})
            next();
        } else {
            next();
        }
    },
    methods: {
        ...mapActions({
            getStaffDetailsAction: 'staff/getStaffDetailsAction',
            getStaffListAction: 'staff/getStaffListAction',
            deleteStaffAction: 'staff/deleteStaffAction',
            changeLevelAction: 'staff/changeLevelAction',
        }),
        toggleCreateDialog() {
            this.showCreateDialog = !this.showCreateDialog;
        },
        toggleEditDialog(staff) {
            this.currentEditingStaff = {...staff}; // SIMPLEST WAY TO turn down vuex mutation error and copy object by VALUE (not by reference)
            this.showEditDialog = !this.showEditDialog; 
        },
        toggleNoteDialog(staff) {
            this.noteOfUser = {...staff}; // SIMPLEST WAY TO turn down vuex mutation error and copy object by VALUE (not by reference)
            this.showNoteDialog = !this.showNoteDialog; 
        },
        confirmDelete(staff) {
            let self = this;
            this.$confirm({
                title: 'Delete',
                content:"Are you sure, do you really want to delete this user?"
            }).then(() => {
                this.deleteStaffAction({id:staff.id}).then(() => {
                    self.$notify('Staff deleted succesffully.');
                })
            })
        },
        changeLevel(staff,e) {
            let self = this;
            this.$confirm({
                title: 'Change Role',
                content:"Are you sure, do you really want to change Role?"
            }).then(() => {
                this.changeLevelAction({id:staff.id,levelId:e.target.value}).then(() => {
                    self.$notify('Staff Role updated succesffully.');
                })
            }).catch(() => {
                e.target.value = staff.levelId
            })
        }
    },
    computed: {
        ...mapGetters({
            staff: 'staff/staffDetailsGetter',
            allStaff: 'staff/allStaffGetter',
            userLevels:'staff/userLevelsGetter',
        })
    }
}
</script>