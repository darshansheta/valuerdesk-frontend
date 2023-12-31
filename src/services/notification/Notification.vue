<template>
  <alert
    class="fade"
    :class="customClass"
    :style="styles"
    :type="type"
    :duration="duration"
    :dismissible="dismissible"
    @dismissed="onDismissed">
    <div class="media" style="margin: 0">
      <div class="media-left" v-if="icons">
        <span :class="icons" style="font-size: 1.5em"></span>
      </div>
      <div class="media-body">
        <div class="media-heading" v-if="title"><b>{{title}}</b></div>
        <div v-if="html" v-html="content"></div>
        <div v-else>{{content}}</div>
      </div>
    </div>
  </alert>
</template>

<script>
  import {addClass, removeClass} from '@/utils/domUtils'
  import {isString} from '@/utils/objectUtils'
  import Alert from '@/components/Shared/alert/Alert.vue'
  import {TYPES, PLACEMENTS} from './constants'

  const IN_CLASS = 'in'
  const ICON = 'glyphicon'
  const WIDTH = 300
  const TRANSITION_DURATION = 300

  export default {
    components: {Alert},
    props: {
      title: String,
      content: String,
      html: {
        type: Boolean,
        default: false
      },
      duration: {
        type: Number,
        default: 3000
      },
      dismissible: {
        type: Boolean,
        default: true
      },
      type: String,
      placement: String,
      icon: String,
      customClass: null,
      cb: {
        type: Function,
        required: true
      },
      queue: {
        type: Array,
        required: true
      },
      offsetY: {
        type: Number,
        default: 15
      },
      offsetX: {
        type: Number,
        default: 15
      },
      offset: {
        type: Number,
        default: 15
      }
    },
    data () {
      return {
        height: 0,
        top: 0,
        horizontal: this.placement === PLACEMENTS.TOP_LEFT || this.placement === PLACEMENTS.BOTTOM_LEFT ? 'left' : 'right',
        vertical: this.placement === PLACEMENTS.TOP_LEFT || this.placement === PLACEMENTS.TOP_RIGHT ? 'top' : 'bottom'
      }
    },
    created () {
      // get prev notifications total height in the queue
      this.top = this.getTotalHeightOfQueue(this.queue)
    },
    mounted () {
      const el = this.$el
      el.style[this.vertical] = this.top + 'px'
      this.$nextTick(() => {
        el.style[this.horizontal] = `-${WIDTH}px`
        this.height = el.offsetHeight
        el.style[this.horizontal] = `${this.offsetX}px`
        addClass(el, IN_CLASS)
      })
    },
    computed: {
      styles () {
        let queue = this.queue
        let thisIndex = queue.indexOf(this)
        return {
          position: 'fixed',
          [this.vertical]: `${this.getTotalHeightOfQueue(queue, thisIndex)}px`,
          width: `${WIDTH}px`,
          transition: `all ${TRANSITION_DURATION / 1000}s ease-in-out`
        }
      },
      icons () {
        if (isString(this.icon)) {
          return this.icon
        }
        switch (this.type) {
          case TYPES.INFO:
          case TYPES.WARNING:
            return `${ICON} ${ICON}-info-sign`
          case TYPES.SUCCESS:
            return `${ICON} ${ICON}-ok-sign`
          case TYPES.DANGER:
            return `${ICON} ${ICON}-remove-sign`
          default:
            return null
        }
      }
    },
    methods: {
      getTotalHeightOfQueue (queue, lastIndex = queue.length) {
        let totalHeight = this.offsetY
        for (let i = 0; i < lastIndex; i++) {
          totalHeight += queue[i].height + this.offset
        }
        return totalHeight
      },
      onDismissed () {
        removeClass(this.$el, IN_CLASS)
        setTimeout(this.cb, TRANSITION_DURATION)
      }
    }
  }
</script>
