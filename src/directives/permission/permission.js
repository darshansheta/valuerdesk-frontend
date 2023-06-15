import store from '@/vuex/store';
import checkPermission from '@/utils/permission';
export default {
  inserted(el, binding, vnode) {
    const { value } = binding

    if (value) {
        store.watch(state => {
            if (!checkPermission(value)) {
              el.parentNode && el.parentNode.removeChild(el)
            console.info('dont have permission',value)
            } else {
              console.info('has permission',value)
            }
            console.log('sw',state.auth.permissions)
            return state.auth.permissions
        },auth => {
            if (!checkPermission(value)) {
              el.parentNode && el.parentNode.removeChild(el)
            console.info('dont have permission',value)
            } else {
              console.info('has permission',value)
            }
        },{deep:true})
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }


    // const roles = store.getters && store.getters.roles

    // if (value && value instanceof Array && value.length > 0) {
    //   const permissionRoles = value

    //   const hasPermission = roles.some(role => {
    //     return permissionRoles.includes(role)
    //   })

    //   if (!hasPermission) {
    //     el.parentNode && el.parentNode.removeChild(el)
    //   }
    // } else {
    //   throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    // }



  },

  update(el, binding, vnode) {
    const { value } = binding

    if (value) {
        store.watch(state => {
            console.log('u-sw',state.auth.permissions)
            return state.auth.permissions
        },auth => {
            if (!checkPermission(value)) {
              el.parentNode && el.parentNode.removeChild(el)
            console.info('dont have permission',value)
            } else {
              console.info('has permission',value)
            }
        },{deep:true})

    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }

  }
}