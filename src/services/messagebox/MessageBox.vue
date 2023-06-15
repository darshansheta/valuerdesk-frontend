<template>
  <modal
    ref="modal"
    auto-focus
    v-model="show"
    :size="size"
    :title="title"
    :header="!!title"
    :backdrop="closeOnBackdropClick"
    :cancel-text="cancelText"
    :ok-text="okText"
    :class="customClass"
    :dialog-footer-style="{padding: '0px','border-top':'none'}"
    @hide="cb">
    <div v-if="html" v-html="content"></div>
    <p v-else>{{content}}</p>
    <div v-if="type===TYPES.PROMPT">
      <div class="form-group" :class="{'has-error':inputNotValid}">
        <input
          ref="input"
          :type="inputType"
          v-model="input"
          class="form-control"
          required
          data-action="auto-focus"
          @change="dirty=true"
          @keyup.enter="validate"/>
        <span class="help-block" v-show="inputNotValid">{{inputError}}</span>
      </div>
    </div>
    <template slot="footer" class="abc" v-if="type===TYPES.ALERT">
      <div class="btn-group special-flex">
          <btn :type="okType" @click="toggle(false,'ok')" class="btn-lg40" data-action="auto-focus">{{okBtnText}}</btn>
      </div>
    </template>
    <template slot="footer"  v-else>
        <div class="btn-group btn-group-justified">
            <div v-if="type===TYPES.CONFIRM" class="btn-group" role="group">
                <btn :type="okType" @click="toggle(false,'ok')" class="btn-lg40" data-action="auto-focus">
                    <template>{{okBtnText}}</template>
                </btn>
            </div>
            <div class="btn-group" v-else role="group">
                <btn :type="okType" @click="validate" class="btn-lg40">{{okBtnText}}</btn>
            </div>
            <div class="btn-group" role="group">
                <btn :type="cancelType" @click="toggle(false,'cancel')" class="btn-lg40">{{cancelBtnText}}</btn>
            </div>
        </div>
    </template>
  </modal>
</template>

<script>
  import {TYPES} from './constants'
  import Local from '@/mixins/localeMixin'
  import Modal from '@/components/Shared/Modal.vue'
  import Btn from '@/components/Shared/button/Btn'
  import {isExist} from '@/utils/objectUtils'

  export default {
    mixins: [Local],
    components: {Modal, Btn},
    props: {
      backdrop: null,
      title: String,
      content: String,
      html: {
        type: Boolean,
        default: false
      },
      okText: String,
      okType: {
        type: String,
        default: 'primary'
      },
      cancelText: String,
      cancelType: {
        type: String,
        default: 'default'
      },
      type: {
        type: Number,
        default: TYPES.ALERT
      },
      size: {
        type: String,
        default: 'sm'
      },
      cb: {
        type: Function,
        required: true
      },
      validator: {
        type: Function,
        default: () => null
      },
      customClass: null,
      defaultValue: String,
      inputType: {
        type: String,
        default: 'text'
      }
    },
    data () {
      return {
        TYPES,
        show: false,
        input: '',
        dirty: false
      }
    },
    mounted () {
      if (this.defaultValue) {
        this.input = this.defaultValue
      }
    },
    computed: {
      closeOnBackdropClick () {
        // use backdrop prop if exist
        // otherwise, only not available if render as alert
        return isExist(this.backdrop) ? Boolean(this.backdrop) : (this.type !== TYPES.ALERT)
      },
      inputError () {
        return this.validator(this.input)
      },
      inputNotValid () {
        return this.dirty && this.inputError
      },
      okBtnText () {
        return this.okText || this.t('uiv.modal.ok')
      },
      cancelBtnText () {
        return this.cancelText || this.t('uiv.modal.cancel')
      }
    },
    methods: {
      toggle (show, msg) {
        this.$refs.modal.toggle(show, msg)
      },
      validate () {
        this.dirty = true
        if (!isExist(this.inputError)) {
          this.toggle(false, {value: this.input})
        }
      }
    }
  }
</script>