// src/vuex/modules/users/actions.js
import uuid from 'uuid'
import {
  DELETE_USER,
  CREATE_USER,
  UPDATE_USER
} from './mutationTypes'

export function saveUser ({ commit, state }, user) {
  //console.log(axios.defaults.headers.common);
  const index = state.all.findIndex((p) => p.id === user.id)

  // update user if it exists or create it if it doesn't
  if (index !== -1) {
    commit(UPDATE_USER, user)
  } else {
    user.id =  Math.round(Math.random()*100)
    commit(CREATE_USER, user)
  }
}

export function deleteUser ({ commit }, userId) {
  commit(DELETE_USER, userId)
}