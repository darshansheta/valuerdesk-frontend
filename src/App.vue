<template>
  <div>
  <div id="app" v-if="!$root.isLoggedIn || $root.gotResponse">
    <app-nav></app-nav>
    <div class="container-fluid">
        <keep-alive :exclude="['Order']">
      <router-view :key="$route.fullPath"></router-view>
      
  </keep-alive>
  <!-- <Order v-show="isOrderTabActive"></Order> -->
    </div>
  </div>
  <div class="overlay" v-show="isLoading">
    <spinner v-show="isLoading"></spinner>
  </div>
  </div>
</template>

<script>
import AppNav from '@/components/AppNav'
import Order from '@/components/Order/Order';
import Spinner from '@/components/Shared/Spinner'
import * as VueGoogleMaps from 'vue2-google-maps'
import { mapGetters, mapActions } from 'vuex'
import Vue from 'vue'
export default {
  name: 'App',
  components:{
    AppNav,
    Spinner,
    Order
  },
  created() {
  },
  methods: {
    setGoogleMap() {
        Vue.use(VueGoogleMaps, {
          load: {
            region: 'IN',
            key: this.$root.settings.googleMapToken,
            libraries: 'places', // This is required if you use the Autocomplete plugin
            // OR: libraries: 'places,drawing'
            // OR: libraries: 'places,drawing,visualization'
            // (as you require)

            //// If you want to set the version, you can do so:
            // v: '3.26',
          },

          //// If you intend to programmatically custom event listener code
          //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
          //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
          //// you might need to turn this on.
          // autobindAllEvents: false,

          //// If you want to manually install components, e.g.
          //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
          //// Vue.component('GmapMarker', GmapMarker)
          //// then disable the following:
          // installComponents: true,
        })
    }
  },
  computed: {
    ...mapGetters({
        isOrderTabActive:'order/isActiveTabGetter'
    })
  },
  watch: {
    '$root.settings.googleMapToken' :function(newVal, oldVal) {
        this.setGoogleMap()
    },
    $route: function() {
       // console.log(this.$store.state.order.activeTab)
        //console.log(this.$store.commit('order/showOrder'))
        // Check if given route is true, if it is then hide Nav. 
        //console.log(this.$route.path)
        // if (this.$route.name === "orders") {
        //     if (this.$route.params.id) {
        //         this.$store.commit('order/showOrder',{id: this.$route.params.id})
        //     }
        // } else  {
        //   this.$store.commit('order/hideOrder')
        // }
      }
  }
}
</script>

<style>
</style>
