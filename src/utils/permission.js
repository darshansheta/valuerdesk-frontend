import store from '@/vuex/store'

/**
 * @param {mix} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function hasPermission(value) {
    if (!store.state.auth.token) {
        return false;
    }
    if (store.state.auth.user.type_id == 1) {
        return true;
    }
    if (store.state.auth.user.level_id == 1) {
        return true;
    }
    if (
        store.state.auth.permissions.filter((p) => {
            return p.name == value;
        }).length > 0
    ) {
        return true;
    }
    return false;
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const permissionRoles = value

    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })

    if (!hasPermission) {
      return false
    }
    return true
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`)
    return false
  }
}

export function hasRole(role) {
    if (!store.state.auth.token) {
        return false;
    }
    if (store.state.auth.user.type_id == 1) {
        return true;
    }
    if (store.state.auth.user.level_id == 1) {
        return true;
    }

    return store.state.auth.roles.indexOf(role) != -1
}