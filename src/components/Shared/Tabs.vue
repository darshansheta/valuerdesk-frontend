<template>
  <section>
    <ul :class="navClasses" role="tablist">
      <template v-for="(tab, index) in groupedTabs">
        <dropdown v-if="tab.tabs" role="presentation" tag="li" :class="getTabClasses(tab)">
          <a class="dropdown-toggle" role="tab" href="#" @click.prevent>{{tab.group}} <span class="caret"></span></a>
          <template slot="dropdown">
            <li v-for="subTab in tab.tabs" :class="getTabClasses(subTab,true)">
              <a href="#" @click.prevent="select(tabs.indexOf(subTab))">{{subTab.title}}</a>
            </li>
          </template>
        </dropdown>
        <li v-else role="presentation" :class="getTabClasses(tab)">
          <a role="tab" href="#" @click.prevent="select(tabs.indexOf(tab))">
            <span v-if="tab.htmlTitle" v-html="tab.title"></span>
            <template v-else>{{tab.title}}</template>
          </a>
        </li>
      </template>
      <li class="pull-right" v-if="!justified && $slots['nav-right']">
        <slot name="nav-right"/>
      </li>
    </ul>
    <div class="tab-content">
      <slot/>
    </div>
  </section>
</template>

<script>
  import Dropdown from './Dropdown.vue'
  import {isNumber, isFunction, isExist} from '../../utils/objectUtils'

  const BEFORE_CHANGE_EVENT = 'before-change'

  export default {
    components: {Dropdown},
    props: {
      value: {
        type: Number,
        validator: v => v >= 0
      },
      transitionDuration: {
        type: Number,
        default: 150
      },
      justified: Boolean,
      pills: Boolean,
      stacked: Boolean
    },
    data () {
      return {
        tabs: [],
        activeIndex: 0 // Make v-model not required
      }
    },
    watch: {
      value: {
        immediate: true,
        handler (value) {
          if (isNumber(value)) {
            this.activeIndex = value
            this.selectCurrent()
          }
        }
      },
      tabs (tabs) {
        tabs.forEach((tab, index) => {
          tab.transition = this.transitionDuration
          if (index === this.activeIndex) {
            tab.show()
          }
        })
        this.selectCurrent()
      }
    },
    computed: {
      navClasses () {
        return {
          nav: true,
          'nav-justified': this.justified,
          'nav-tabs': !this.pills,
          'nav-pills': this.pills,
          'nav-stacked': this.stacked && this.pills
        }
      },
      groupedTabs () {
        let tabs = []
        let hash = {}
        this.tabs.forEach(tab => {
          if (tab.group) {
            if (hash.hasOwnProperty(tab.group)) {
              tabs[hash[tab.group]].tabs.push(tab)
            } else {
              tabs.push({
                tabs: [tab],
                group: tab.group
              })
              hash[tab.group] = tabs.length - 1
            }
            if (tab.active) {
              tabs[hash[tab.group]].active = true
            }
            if (tab.pullRight) {
              tabs[hash[tab.group]].pullRight = true
            }
          } else {
            tabs.push(tab)
          }
        })
        return tabs
      }
    },
    methods: {
      getTabClasses (tab, isSubTab = false) {
        let defaultClasses = {
          active: tab.active,
          disabled: tab.disabled,
          'pull-right': tab.pullRight && !isSubTab
        }

        // return with new classes added to tab
        return Object.assign(defaultClasses, tab['tabClasses'])
      },
      selectCurrent () {
        let found = false
        this.tabs.forEach((tab, index) => {
          if (index === this.activeIndex) {
            found = !tab.active
            tab.active = true
          } else {
            tab.active = false
          }
        })
        if (found) {
          this.$emit('change', this.activeIndex)
        }
      },
      selectValidate (index) {
        if (isFunction(this.$listeners[BEFORE_CHANGE_EVENT])) {
          this.$emit(BEFORE_CHANGE_EVENT, this.activeIndex, index, (result) => {
            if (!isExist(result)) {
              this.$select(index)
            }
          })
        } else {
          this.$select(index)
        }
      },
      select (index) {
        if (!this.tabs[index].disabled && index !== this.activeIndex) {
          this.selectValidate(index)
        }
      },
      $select (index) {
        if (isNumber(this.value)) {
          this.$emit('input', index)
        } else {
          this.activeIndex = index
          this.selectCurrent()
        }
      }
    }
  }
</script>
