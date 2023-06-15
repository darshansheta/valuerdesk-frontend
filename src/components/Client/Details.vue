<template>
    <div>
        <div class="btn-toolbar pull-right">
            <div class="btn-group" role="group" aria-label="...">
              <button type="button" class="btn btn-default" @click="toggleBranchCreateDialog"> <i class="fa fa-suitcase"></i> New Branch</button>
              <button type="button" class="btn btn-default" @click="toggleUserCreateDialog"> <i class="fa fa-user"></i> New User</button>
            </div>
            <div class="btn-group" role="group" aria-label="...">
              <button type="button" class="btn btn-default" @click="toggleEditDialog"> <i class="fa fa-pencil"></i> Edit</button>
              <button type="button" class="btn btn-default" @click="confirmDelete(client.id)"><i class="fa fa-trash"></i> Delete</button>
            </div>
        </div>
        <tabs class="square-tabs">
          <tab title="Details" class="tab-border">
            <div class="row">
                <div class="col-md-6">
                    <label class="label-key">Company Name:</label><span>{{client.name}}</span>
                </div>
                <div class="col-md-6">
                    <label class="label-key">Register Date:</label><span>{{client.created_at}}</span>
                </div>
                <div class="col-md-6">
                    <label class="label-key">Address 1:</label><span>{{client.address.address}}</span>
                </div>
                <div class="col-md-6">
                    <!-- <label class="label-key">Address 2:</label><span></span> -->
                </div>
                <div class="col-md-6">
                    <label class="label-key">Landmark :</label><span>{{client.address.landmark}}</span>
                </div>
                <div class="col-md-6">
                    <label class="label-key">Locality :</label><span>{{client.address.locality}}</span>
                </div>
                <div class="col-md-6">
                    <label class="label-key">Pincode :</label><span>{{client.address.pincode}}</span>
                </div>
                <div class="col-md-6">
                    <label class="label-key">Subdistrict :</label><span>{{client.address.subdistrict}}</span>
                </div>
                <div class="col-md-6">
                    <label class="label-key">District :</label><span>{{client.address.district}}</span>
                </div>
                <div class="col-md-6">
                    <label class="label-key">State :</label><span>{{client.address.state}}</span>
                </div>
            </div>
          </tab>
          <tab title="Users">
            <br>
            <table class="table table-bordered table-condensed table-hover">
                <template v-for="(branch, id) in client.branches">
                    <thead>
                        <tr>
                            <td colspan="3">{{branch.name}}</td>
                            <td>
                                <div class="btn-group pull-right" role="group" aria-label="...">
                                    <button class="btn btn-xs btn-default pull-right" @click="confirmBranchDelete(branch.id)"><i class="fa fa-trash"></i></button>
                                    <button class="btn btn-xs btn-default pull-right" @click="toggleBranchEditDialog(branch.id)"><i class="fa fa-pencil"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="branch.users.length == 0">
                            <tr>
                                <td colspan="4"> No users!</td>
                            </tr>
                        </template>
                        <template v-for="(user, id) in branch.users">
                            <tr>
                                <td>{{user.name}}</td>
                                <td>{{user.phone}}</td>
                                <td>{{user.email}}</td>
                                <td>
                                    <div class="btn-group pull-right" role="group" aria-label="...">
                                        <button class="btn btn-xs btn-default pull-right" @click="confirmUserDelete(user.id)"><i class="fa fa-trash"></i></button>
                                        <button class="btn btn-xs btn-default pull-right" @click="toggleUserEditDialog(user.id)"><i class="fa fa-pencil"></i></button>
                                    </div>
                                </td>
                            </tr>
                        </template>
                        <tr>
                                <td colspan="4">
                                    <br>
                                </td>
                            </tr>
                    </tbody>
                </template>
            </table>
          </tab>
          <tab title="Reports">
            <br>
            <div class="btn-group pull-right" role="group" aria-label="...">
              <button type="button" class="btn btn-primary" v-show="showReportEdit" @click="updateClientReport" >Update</button>
              <button type="button" class="btn btn-default" @click="toggleReportEdit">{{(!showReportEdit) ? 'Edit' : 'Cancel'}}</button>
            </div>
            
            <table class="table table-bordered table-condensed table-hover">
              <thead>
                  <tr>
                      <th >Name  <label class="pull-right">Price</label></th>
                  </tr>
              </thead>
              <tbody>
                <tr v-for="(report,key) in client.reports" v-show="!showReportEdit && report.pivot.active == 1" >
                      <td>{{report.name}}</td>
                  </tr>
                  <tr v-show="client.reports.length == 0 && !showReportEdit">
                      <td>No data.</td>
                  </tr>
                      <tr v-show="showReportEdit" v-for="(report,key) in selectedReports" >
                          <td>
                            <label><input type="checkbox" v-model="report.selected" :value="report.reportId"></label>
                            {{report.name}}
                            <div class="pull-right"><input type="text" :readonly="!report.selected" v-model="report.price" class="form-control input-sm" name=""></div>
                        </td>
                      </tr>
              </tbody>
            </table>
          </tab>
          <tab title="Notes">
              <!--Note start-->
              <table class="table table-bordered">
                  <tbody>
                      <tr v-show="showCreateNote">
                          <td colspan="2">
                              <form>
                                <div class="form-group">
                                  <textarea class="form-control" placeholder="Add Note..." v-model="newNote.note">
                                      </textarea>
                                </div>
                                <div class="pull-right">
                                    <button type="submit" class="btn btn-primary btn-sm" @click.prevent="storeNote">SAVE</button>
                                    <button type="submit" class="btn btn-default  btn-sm" @click.prevent="showCreateNote = !showCreateNote">CANCEL</button>
                                </div>
                              </form>
                          </td>
                      </tr>
                      <tr v-if="showEditNote">
                          <td colspan="2">
                              <form>
                                <div class="form-group">
                                  <textarea class="form-control" placeholder="Add Note..." v-model="editNote.note">
                                      </textarea>
                                </div>
                                <div class="pull-right">
                                    <button type="submit" class="btn btn-primary btn-sm" @click.prevent="updateNote">UPDATE</button>
                                    <button type="submit" class="btn btn-default  btn-sm" @click.prevent="showEditNote = false;showCreateNote = false;">CANCEL</button>
                                </div>
                              </form>
                          </td>
                      </tr>
                      <tr v-show="!showCreateNote && !showEditNote">
                          <td colspan="2">
                              <button class="btn btn-sm btn-primary" @click="showCreateNote = !showCreateNote">Add Note</button>
                          </td>
                      </tr>
                      <tr v-for="(note,k) in notes">
                          <td>
                              <blockquote style="margin-bottom: 0px">
                                <p><pre>{{note.note}}</pre></p>
                                <small>{{note.creator.name}} <i class="fa fa-clock-o"></i> <cite title="Source Title">{{ note.createdAt | moment("Do MMMM YYYY, h:mm:ss a") }}</cite></small>
                          </blockquote>
                          </td>
                          <td width="20px">
                              <a href="javascript:void(0)" @click="showEditNote = true;showCreateNote = false; editNote = note;"><i class="fa fa-edit"></i></a>
                              <br>
                              <a href="javascript:void(0)" @click="deleteNote(note)"><i class="fa fa-trash"></i></a>

                          </td>
                      </tr>
                      <tr v-show="notes.length == 0">
                          <td colspan="2">No Note(s) created.</td>
                      </tr>
                  </tbody>
              </table>
              <!--Note end-->
          </tab>
        </tabs>
        <client-edit :show="showEditDialog" @hide="toggleEditDialog" :client="client" ></client-edit>
        
        <branch-create :show="showBranchCreateDialog" @hide="toggleBranchCreateDialog" :client-id="client.id" ></branch-create>
        <branch-edit v-if="showBranchEditDialog" :show="showBranchEditDialog" :client-id="client.id" @hide="toggleBranchEditDialog(0)" :branch="editBranch" ></branch-edit>

        <user-create :branches="client.branches" :show="showUserCreateDialog" @hide="toggleUserCreateDialog" :client-id="client.id" ></user-create>
        <user-edit :branches="client.branches" v-if="showUserEditDialog" :show="showUserEditDialog" :client-id="client.id" @hide="toggleUserEditDialog(0)" :user="editUser" ></user-edit>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Router from 'vue-router'
import ClientEdit from './Edit'
import BranchCreate from './Branch/Create'
import BranchEdit from './Branch/Edit'
import UserCreate from './User/Create'
import UserEdit from './User/Edit'
import note from '@/mixins/note'

const initialData = () => {
  return {
            showEditDialog: false,
            showBranchCreateDialog: false,
            showBranchEditDialog: false,
            editBranch:{},
            showUserCreateDialog: false,
            showUserEditDialog: false,
            editUser:{},
            showReportEdit:false,
            reports:[],
            selectedReports:[],
        }
}


export default {
    name: 'Details',
    created() {
    },
    mounted() {
        this.notableType = 'client';
        this.notableId = this.client.id;
        this.getNotes();
    },
    data:initialData,
    props: {
        client: {
            type:Object,
            default:function(){ return {}; }
        }
    },
    mixins: [note],
    components: {
        ClientEdit,
        BranchCreate,
        BranchEdit,
        UserCreate,
        UserEdit
    },
    methods: {
        ...mapActions({
            createClientAction: 'client/createClientAction',
            deleteClientAction: 'client/deleteClientAction',

            getBranchDetailsAction: 'client/getBranchDetailsAction',
            getBranchesAction: 'client/getBranchesAction',
            deleteBranchAction: 'client/deleteBranchAction',

            getUserDetailsAction: 'client/getUserDetailsAction',
            getUsersAction: 'client/getUsersAction',
            deleteUserAction: 'client/deleteUserAction',
            updateClientReportAction: 'client/updateClientReportAction',
            getReportsListAction: 'report/getReportsListAction',
        }),
        toggleEditDialog() {
            this.showEditDialog = !this.showEditDialog;
        },
        toggleBranchCreateDialog() {
            this.showBranchCreateDialog = !this.showBranchCreateDialog;
        },
        toggleBranchEditDialog(branchId) {
            if (branchId != 0) {
                this.getBranchDetailsAction({clientId:this.client.id,id:branchId}).then((resp) => {
                    this.editBranch = resp.data.data;
                    this.showBranchEditDialog = !this.showBranchEditDialog;
                });
            } else {
                this.showBranchEditDialog = !this.showBranchEditDialog;
            }
        },
        toggleUserCreateDialog() {
            this.showUserCreateDialog = !this.showUserCreateDialog;
        },
        toggleUserEditDialog(userId) {
            if (userId != 0) {
                this.getUserDetailsAction({clientId:this.client.id,id:userId}).then((resp) => {
                    this.editUser = resp.data.data;
                    this.showUserEditDialog = !this.showUserEditDialog;
                });
            } else {
                this.showUserEditDialog = !this.showUserEditDialog;
            }
        },
        confirmDelete(id) {
            let self = this
            this.$confirm({
                      title: 'Delete',
                      content: 'Are you really want to delete this?'
                    }).then(() => {
                        this.deleteClientAction({id}).then(() => {
                            self.$router.push('/clients');
                        })
                    }).catch(() => {
                    });
        },
        confirmBranchDelete(id) {
            let self = this
            this.$confirm({
                      title: 'Delete',
                      content: 'Are you really want to delete this branch?'
                    }).then(() => {
                        this.deleteBranchAction({clientId:this.client.id,id}).then(() => {
                        })
                    }).catch(() => {
                    });
        },
        confirmUserDelete(id) {
            let self = this
            this.$confirm({
                      title: 'Delete',
                      content: 'Are you really want to delete this user?'
                    }).then(() => {
                        this.deleteUserAction({clientId:this.client.id,id}).then(() => {
                        })
                    }).catch(() => {
                    });
        },
        toggleReportEdit() {
            let self = this;
            this.getReportsListAction().then((resp) => {
                self.reports = resp.data.data;
                self.showReportEdit = !self.showReportEdit;
                let selectedReports = {};

                for(let idx in self.client.reports) {
                        let report = self.client.reports[idx];
                    if (report.pivot.active == 1) {
                        selectedReports[report.id] = report.pivot.price;
                    }
                }

                self.selectedReports = resp.data.data.map(report => {
                    return {
                        selected : selectedReports[report.id] != undefined,
                        reportId : report.id,
                        name     : report.name,
                        price    : selectedReports[report.id] ? selectedReports[report.id] : '0.00' 
                    }
                });
            })
        },
        updateClientReport() {
            let self = this; 
            this.updateClientReportAction({clientId:this.client.id,reports:this.selectedReports}).then(
                (resp) => {
                self.showReportEdit = !self.showReportEdit;
                self.$notify({
                      content: `Report synced successfully!`,
                      duration: 1500
                    })
            })
        }
    },
    computed: {
    },
    watch: {
    }
}
</script>