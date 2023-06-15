
import axios from 'axios';
import qs from 'qs';

let mutations = {
    staffListMutation : (state,staff) => {
        state.staff = staff
        
    },
    rolesListMutation : (state,{roles,userLevels}) => {
        state.roles = roles
        if (userLevels) {
            state.userLevels = userLevels
        }
        let selectedPermission = {};

        roles.forEach((role,index) => {
            selectedPermission[role.role.name] = role.role.permissions.map((permission) => {
                return permission.name;
            })
        });

        state.selectedPermission = {...selectedPermission};
        state.persistedPermission = {...selectedPermission};
    },
    updatePermission:(state,{role,permission,checked}) => {
        if (checked) {
            if (state.selectedPermission[role].indexOf(permission) === -1) {
                state.selectedPermission[role].push(permission)
            }
        } else {
            let idx = state.selectedPermission[role].indexOf(permission);
            if (idx !== -1) {
                state.selectedPermission[role].splice(idx,1);
            }
        }
    }
}


function jsonToQueryString(json) {
    return '?' + 
        Object.keys(json).map(function(key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
}

let actions = {
    getStaffListAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: '/staff', method: 'GET'})
            .then(resp => {
                commit('staffListMutation', resp.data.data)
                resolve(resp)

            }).catch(err => {
                reject(err)
            })
        })
    },
    createStaffAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: '/staff', data: param, method: 'POST'})
            .then(resp => {
                dispatch('getStaffListAction')
                resolve(resp)

            }).catch(err => {
                reject(err)
            })
        })
    },
    deleteStaffAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: '/staff/'+param.id, method: 'DELETE'})
            .then(resp => {
                resolve(resp)
                dispatch('getStaffListAction')
            }).catch(err => {
                reject(err)
            })
        })
    },
    updateStaffAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: '/staff/'+param.id, data: param, method: 'PUT'})
            .then(resp => {
                dispatch('getStaffListAction');
                resolve(resp)

            }).catch(err => {
                reject(err)
            })
        })
    },
    changeLevelAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: '/staff/'+param.id+'/level', data: param, method: 'POST'})
            .then(resp => {
                dispatch('getStaffListAction');
                resolve(resp)

            }).catch(err => {
                reject(err)
            })
        })
    },
    getRolesListAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({url: '/staff/roles', method: 'GET'})
            .then(resp => {
                commit('rolesListMutation', resp.data)
                resolve(resp)

            }).catch(err => {
                reject(err)
            })
        })
    },
    updateRolePermissionAction: ({commit, dispatch,state}, param) => {
        return new Promise((resolve, reject) => { 
            axios({
                url: '/staff/roles/'+param.roleId,
                method: 'POST',
                data: {
                    permissions:state.selectedPermission[param.roleName]
                }
            })
            .then(resp => {
                dispatch('getRolesListAction', resp.data)
                resolve(resp)

            }).catch(err => {
                reject(err)
            })
        })
    },
}

export default {
    namespaced: true,
    state: {
        staff: [],
        roles:[],
        permissions:[],
        userLevels:[],
        selectedPermission: {},
        persistedPermission: {}
    },
    getters: {
        allStaffGetter : state => state.staff,
        rolesGetter : state => state.roles,
        permissionsGetter : state => state.permissions,
        userLevelsGetter : state => state.userLevels,
        filterStaffByName: function filterStaffByName(state) {
        return function (name) {
          return state.staff.filter(function (staff) {
            return (name) ? staff.name.toLowerCase().indexOf(name.toLowerCase())!= -1 : true;
          });
        };
      },
      staffDetailsGetter: (state) => {
        return function (id) {
          let users = state.staff.filter(function (staff) {
                return staff.id == id;
              });
          return users.length > 0 ? users[0] : {};
        };
    }
    },
    actions,
    mutations
}