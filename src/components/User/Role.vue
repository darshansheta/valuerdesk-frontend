<template>
    <div>
    <table class="table table-condensed table-hover">
        <thead>
            <tr>
                <th>Role</th>
                <th><i class="fa fa-bolt"></i></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(role,k) in roles">
                <td>{{role.label}}

                </td>
                <td>
                    <button class="btn btn-primary" @click.prevent="editRolePermission(role)"><i class="fa fa-legal"></i> Permission</button>
                    <!-- <role-tree
                        v-if="permissions.length"
                        class="item"
                        :permissions="permissions"
                        :role="role"
                      ></role-tree> -->
                </td>
            </tr>
        </tbody>
    </table>

        <b-modal
        v-if="editingRole"
        :keyboard="false"
        :backdrop="false"
        class="modal-right"
        v-model="showEditRolePermissionDialog"
        :title="`Manage Role Permission - ${editingRole.role.label}`"
        ref="modal"
        :dialog-style="{width:'50%'}"
        :footer="false"
        :before-close="hide"
    >
        <div class="row">
            <div class="col-sm-12">
                
           <role-tree
                v-if="permissions.length"
                class="item"
                :permissions="permissions"
                :role="editingRole"
              ></role-tree>
           <div class="form-group">
               <button type="submit" v-on:click.prevent="updateRolePermission" class="btn btn-primary ">UPDATE</button>
               <button type="button" class="btn btn-default" @click="hide">CANCEL</button>
           </div>

            </div>
        </div>
        </b-modal>
        
      </div>
</template>
<script>
import { mapGetters, mapActions,mapMutations } from 'vuex'
import RoleTree from './RoleTree'
export default {
    name:'Role',
    data: () => {
        return {
            permissions:[],
            selectedPermissions:['elements'],
            editingRole:null,
            showEditRolePermissionDialog: false,
        }
    },
    pros: {

    },
    mounted(){
        this.getRolesListAction().then((resp) => {
            this.permissions = resp.data.permissions
        })
    },
    components: {
        RoleTree
    },
    methods: {
        ...mapActions({
            getRolesListAction:'staff/getRolesListAction',
            updateRolePermissionAction:'staff/updateRolePermissionAction'
        }),
        ...mapMutations({
            rolesListMutation: 'staff/rolesListMutation'
        }),
        editRolePermission(role) {
            this.showEditRolePermissionDialog = !this.showEditRolePermissionDialog;
            this.editingRole = role;
        },
        updateRolePermission(){
            this.updateRolePermissionAction({
                roleId:this.editingRole.role.id,
                roleName:this.editingRole.role.name
            }).then((resp) => {
                this.editingRole = null;
                this.hide();
                this.$notify("Permission has been updated.");
            })
        },
        hide() {
            this.rolesListMutation({roles:this.roles});
            this.showEditRolePermissionDialog = false;

        }
  },
    computed: {
        ...mapGetters({
            roles:'staff/rolesGetter',
            //permissions:'staff/permissionsGetter',
        })
    }
}
</script>