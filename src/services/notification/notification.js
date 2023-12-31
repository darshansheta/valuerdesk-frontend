import {removeFromDom} from '@/utils/domUtils'
import {spliceIfExist} from '@/utils/arrayUtils'
import {isFunction, isExist, isString, isPromiseSupported} from '@/utils/objectUtils'
import Notification from './Notification.vue'
import {PLACEMENTS} from './constants'
import Vue from 'vue'

const queues = {
  [PLACEMENTS.TOP_LEFT]: [],
  [PLACEMENTS.TOP_RIGHT]: [],
  [PLACEMENTS.BOTTOM_LEFT]: [],
  [PLACEMENTS.BOTTOM_RIGHT]: []
}

const destroy = (queue, instance) => {
  // console.log('destroyNotification')
  removeFromDom(instance.$el)
  instance.$destroy()
  spliceIfExist(queue, instance)
}

const init = (options, cb, resolve = null, reject = null) => {
  const placement = options.placement
  const queue = queues[placement]
  // check if placement is valid
  if (!isExist(queue)) {
    return
  }
  let instance = new Vue({
    extends: Notification,
    propsData: {
      queue,
      placement,
      ...options,
      cb (msg) {
        destroy(queue, instance)
        if (isFunction(cb)) {
          cb(msg)
        } else if (resolve && reject) {
          resolve(msg)
        }
      }
    }
  })
  instance.$mount()
  document.body.appendChild(instance.$el)
  queue.push(instance)
}

const notify = (options = {}, cb) => {
  // simplify usage: pass string as option.content
  if (isString(options)) {
    options = {
      content: options
    }
  }
  // set default placement as top-right
  if (!isExist(options.placement)) {
    options.placement = PLACEMENTS.TOP_RIGHT
  }
  if (isPromiseSupported()) {
    return new Promise((resolve, reject) => {
      init(options, cb, resolve, reject)
    })
  } else {
    init(options, cb)
  }
}

export default {notify}
