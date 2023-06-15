<style>
    .pac-container {
        z-index: 1055 !important;
    }
</style>
<template>
    <b-modal
        :keyboard="false"
        :backdrop="false"
        class="modal-bottom"
        v-model="show"
        title="Property Map"
        ref="modal"
        :dialog-style="{height:'95%'}"
        :footer="false"
        :header="false"
        :before-close="hide"
        :append-to-body="true"
    >
    <div class="row">
        <div class="col-sm-9">
            <!-- <div class="input-group">

                <GmapAutocomplete @place_changed="setPlace" class="form-control">
                </GmapAutocomplete>

                <span class="input-group-btn">
                    <button class="btn btn-default" @click="hide"> <i class="fa fa-times"></i> </button>
                    <button class="btn btn-default" @click="usePlace">Add</button>

                    <button class="btn btn-default" type="button" @click="findMe">Set current location view</button>
                    <button class="btn btn-default" v-if="current.lat && current.lng" type="button" @click="markCurrentLocation"> <i class="fa fa-map-marker"></i> Mark current location</button>
                    <button class="btn btn-default" @click="captureMap"> <i class="fa fa-camera"></i> Capture Map</button>
                </span>
            </div>
            <br> -->
            <img src="" style="display: none;" id="imgMap">
      <GmapMap
        ref="mapRef"
        :center="{lat:10, lng:10}"
        :zoom="15"
        map-type-id="terrain"
        style="width: 100%;height: 600px; margin-bottom: 10px;"
      >
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
          @dragend="markerDrag"
        />
      </GmapMap>
      
      <div v-if="output">
        <br>
      <br>
      <br>
      <img :src="output" class="thumbnail" width="100%" height="100%">
      
      </div>
    </div>
    <div class="col-sm-3">
        <div class="input-group">
              <!-- <input type="text" class="form-control" placeholder="Search for..."> -->
              <GmapAutocomplete @place_changed="setPlace" class="form-control gmap-autosearch-zindex">
                    </GmapAutocomplete>

              <span class="input-group-btn">
                <button class="btn btn-default" @click="usePlace"> <i class="fa fa-search"></i> Add</button>
              </span>
            </div>
            <div class="btn-group btn-group-justified" role="group" aria-label="...">
              <div class="btn-group" role="group">
                <button class="btn btn-default" type="button" @click="findMe">Set current  view</button>
              </div>
              <div class="btn-group" role="group" v-if="current.lat && current.lng">
                <button class="btn btn-default"  type="button" @click="markCurrentLocation"> <i class="fa fa-map-marker"></i> Mark current location</button>
              </div>
              
            </div>

                <button class="btn btn-default btn-block" @click="captureMap"> <i class="fa fa-camera"></i> Capture Map</button>

                <br>

                <button class="btn btn-default pull-right" @click="hide"> <i class="fa fa-times"></i> </button>
              
            
    </div>
</div>
    </b-modal>
</template>
<script>
import {gmapApi} from 'vue2-google-maps'
import html2CanvasMixin from '@/mixins/html2CanvasMixin.js';
export default{
    name:'GoogleMap',
    mixins:[html2CanvasMixin],
    created(){

    },
    data:function(){
        return {
            markers:[],
            current: {
                lat:false,
                lng:false
            },
            place: null,
            output: null
        };
    },
    props:{
        show : {
            type: Boolean
        },
        order:{
            type: Object,
            default: () => {}
        }
    },
    methods: {
        findMe() {
            let self = this;
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((position) => {
                console.log(position)
                self.showLoginForm = true;
                self.$refs.mapRef.$mapPromise.then((map) => {
                      map.panTo({lat: position.coords.latitude, lng: position.coords.longitude})
                      self.current.lat = position.coords.latitude;
                      self.current.lng = position.coords.longitude;
                    })
              }, () => {
                console.error('Error: The Geolocation service failed. Please allow location service.')
              });
            } else {
              console.error("Geolocation is not supported by this browser.");
            }
        },
        markCurrentLocation() {
            this.markers = [{
                position: {
                    lat:this.current.lat,
                    lng:this.current.lng
                }
            }];
        },
        setPlace(place) {
          this.place = place;
          let self = this;
          this.$refs.mapRef.$mapPromise.then((map) => {
                map.panTo({lat: place.geometry.location.lat(), lng: place.geometry.location.lng()})
                //self.current.lat = place.geometry.location.lat();
                //self.current.lng = place.geometry.location.lng();
              })
        },
        usePlace(place) {
          if (this.place) {
            this.markers = [{
              position: {
                lat: this.place.geometry.location.lat(),
                lng: this.place.geometry.location.lng(),
              }
            }];
            this.place = null;
          }
        },
        markerDrag(obj) {
            this.markers = [{
              position: {
                lat: obj.latLng.lat(),
                lng: obj.latLng.lng(),
              }
            }];
        },
        hide() {
            this.$emit('hide')
        },
        async captureMap() {
            console.log(this.$refs.mapRef)
            this.$refs.mapRef.$el.scrollTop = 0;
          const el =  this.$refs.mapRef.$el; //window.document.getElementsByClassName('vue-map-container')[0];//
          //const el =  this.$refs.mapRef.$el; //window.document.getElementsByClassName('vue-map-container')[0];//
          // add option type to get the image version
          // if not provided the promise will return 
          // the canvas.
          const options = {
            useCORS: true,
            allowTaint: true,
           // height:600,
            onpreloaded: (ele) => {
                console.log(ele)
            },
            //imageTimeout:2000,
            onclone: (ele) => {
                console.log(ele)
            },
            type: 'dataURL',
            ignoreElements: (node) => {
               // if (node.nodeName == 'IFRAME')
               //     console.log(node,node.nodeName)
                return node.nodeName === 'IFRAME';
              }
          }
          this.output = await this.$html2canvas(el, options);
        },
        exportMap() {
                const mapOptions = this.$refs.mapRef.$mapObject
                //URL of Google Static Maps.
                var staticMapUrl = "https://maps.googleapis.com/maps/api/staticmap?key="+this.$root.settings.googleMapToken;
         
                //Set the Google Map Center.
                staticMapUrl += "&scale=2&center=" + mapOptions.center.lat() + "," + mapOptions.center.lng();
         
                //Set the Google Map Size.
                staticMapUrl += "&size=1100x600";
         
                //Set the Google Map Zoom.
                staticMapUrl += "&zoom=" + mapOptions.zoom;
         
                //Set the Google Map Type.
                staticMapUrl += "&maptype=" + mapOptions.mapTypeId;
         
                //Loop and add Markers.
                for (var i = 0; i < this.markers.length; i++) {
                    staticMapUrl += "&markers=color:red|" + this.markers[i].lat + "," + this.markers[i].lng;
                }
         
                //Display the Image of Google Map.
                var imgMap = document.getElementById("imgMap");
                imgMap.src = staticMapUrl;
                imgMap.style.display = "block";
            }
            
    },
    computed: {
        google: gmapApi
      }
}
</script>