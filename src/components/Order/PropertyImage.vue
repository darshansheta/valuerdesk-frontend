<template>
    <div>
        <h4 class="semi-bold">Property Images</h4>
        <div class="row">
              <div class="col-xs-4 col-md-2" v-for="image in images">
                <div class="input-group">
                    <select class="form-control input-sm" @change="updatePropertyType(image,$event.target.value)">
                        <option value="">Select Type</option>
                        <option :value="image.type" v-if="image.type" selected>Property {{image.type.toUpperCase()+' View'}}</option>
                        <option v-for="(iType,k) in imageTypes" :value="iType.val">{{iType.label}}</option>
                    </select>
                    <span class="input-group-btn">
                        <button class="btn btn-danger btn-sm" @click="confirmPropertyImageDelete(image)"><i class="fa fa-times"></i></button>
                    </span>
                </div>
                <a target="_blank" :href="`${$root.settings.vdsUrl}/${image.uri}`" class="thumbnail">
                  <img :src="`${$root.settings.vdsUrl}/${image.thumbnailUri}`" :alt="image.name">
                  
                </a>
              </div>
              <div v-if="images.length === 0">
                  No image(s).
              </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <vue-dropzone
                    v-if="uploadAllowed > 0"
                    ref="myVueDropzone"
                    id="dropzone"
                    :options="dropzoneOptions"
                    :useCustomSlot="true"
                    v-on:vdropzone-success-multiple="getOrderImagesAction({id:order.id})"
                >
                    <h3 class="dropzone-custom-title">Drag and drop to upload content!</h3>
                    <small>..or click to select a file from your computer</small>
                </vue-dropzone>
            </div>
        </div>

        <!-- <div class="row mt-3">
            <div class="col-md-12">
                <button class="btn btn-primary pull-right" type="button" @click="toggleGoogleMapDialog"> <i class="fa fa-map"></i> Show Map </button>
                <div class="col-md-12">
                    <google-map v-if="showGoogleMapDialog" :show="showGoogleMapDialog" @hide="toggleGoogleMapDialog" :order="order"></google-map>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script type="text/javascript">
import { mapGetters, mapActions } from 'vuex'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import GoogleMap from './GoogleMap'
export default {
    name: 'PropertyImage',
    created(){
        //this.dropzoneOptions.url = '/api/orders/'+this.order.id+'/documents/upload-property-images'
        //this.dropzoneOptions.url = '/api/orders/'+this.order.id+'/property/'+this.order.property.id+'/upload'

        this.getOrderImagesAction({id:this.order.id});
    },
    data: () =>{
        return {
            showGoogleMapDialog:false
        }
    },
    props:{
        order:{
            type: Object,
            default: () => {}
        }
    },
    components: {
        vueDropzone:vue2Dropzone,
        GoogleMap
    },
    methods: {
        ...mapActions({
            getOrderImagesAction: 'order/getOrderImagesAction',
            updatePropertyTypeAction: 'order/updatePropertyTypeAction',
            deleteOrderImageAction: 'order/deleteOrderImageAction',
        }),
        updatePropertyType(image,val){
            this.updatePropertyTypeAction({id:this.order.id,propertyImageId:image.id,type:val})
            .then((response) => {
                this.$notify('Property Image Type updated successfully.')
            })
        },
        confirmPropertyImageDelete(image) {
            if (confirm("Are you really want to delete this image?")) {
                this.deleteOrderImageAction({id:this.order.id,propertyImageId:image.id})
                .then((response) => {
                    this.$notify('Property Image delete successfully.')
                })
            }
        },
        toggleGoogleMapDialog() {
            this.showGoogleMapDialog = !this.showGoogleMapDialog;
        }
    },
    computed: {
        ...mapGetters({
            reportElements: 'order/reportElementsGetter',
            reportData: 'order/reportDataGetter',
            images: 'order/imagesGetter',
            reportBody: 'order/reportBodyGetter',
            uploadAllowed: 'order/uploadAllowedGetter',
        }),
        imageTypes() {
            let allTypes = [
                {val:'front', label:'Front View'},
                {val:'street', label:'Street View'},
                {val:'inner', label:'Inner View'},
                {val:'kitchen', label:'Kitchen View'},
                {val:'1', label:'Property View 1'},
                {val:'2', label:'Property View 2'},
                {val:'3', label:'Property View 3'},
                {val:'4', label:'Property View 4'},
                {val:'5', label:'Property View 5'},
                {val:'6', label:'Property View 6'},
            ]
            let usedTypes = this.images.map((img) => {
                return img.type;
            });

            return allTypes.filter((type) => {
                return usedTypes.indexOf(type.val) < 0;
            })
        },
        dropzoneOptions() {
            return  {
                url: '/api/orders/'+this.order.id+'/documents/upload-property-images',
                thumbnailWidth: 150,
                uploadMultiple:true,
                capture:'camera',
                maxFiles: this.uploadAllowed,
                maxFilesize: 10,
                timeout:60000,
                paramName: 'images',
                headers: {...axios.defaults.headers.common},
                dictDefaultMessage: '<i class=\'fa fa-cloud-upload\'></i>UPLOAD HERE',
                acceptedFiles:'image/*'
            }
        }
    }
}
</script>