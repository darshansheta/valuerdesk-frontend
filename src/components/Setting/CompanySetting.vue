<template>
    <div class="row">
        <div class="col-sm-12">
            <form class="form-horizontal">
              <div class="form-group">
                <label for="" class="col-sm-2 control-label">Company Name</label>
                <div class="col-sm-5">
                  <input v-model="company.name" type="text" class="form-control input-sm" placeholder="Company Name">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">Address</label>
                <div class="col-sm-9">
                  <input v-model="company.address" type="text" class="form-control input-sm" placeholder="Address">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label"></label>
                <div class="col-sm-3">
                  <input v-model="company.city" type="text" class="form-control input-sm" placeholder="City">
                </div>
                <div class="col-sm-3">
                  <input v-model="company.state" type="text" class="form-control input-sm" placeholder="State">
                </div>
                <div class="col-sm-3">
                  <input v-model="company.pincode" type="text" class="form-control input-sm" placeholder="Pincode">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">Contacts</label>
                <div class="col-sm-3">
                  <input v-model="company.phone" type="text" class="form-control input-sm" placeholder="Phone">
                </div>
                <div class="col-sm-3">
                  <input v-model="company.email" type="text" class="form-control input-sm" placeholder="Email">
                </div>
                <div class="col-sm-3">
                  <input v-model="company.website" type="text" class="form-control input-sm" placeholder="Website">
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                  <button type="button" class="btn btn-primary" @click.prevent="saveChange">SAVE</button>
                </div>
              </div>
              <div class="form-group">
                <label for="" class="col-sm-2 control-label">Logo</label>
                <div class="col-sm-5 bg-white border">
                  <vue-dropzone
                      ref="myVueDropzone"
                      v-on:vdropzone-thumbnail="thumbnail"
                      :include-styling="false"
                      id="customdropzone"
                      :options="dropzoneOptions"
                      :useCustomSlot="true"
                      @vdropzone-success="getOrgDetailsAction"
                  >
                        <div class="dz-message" v-show="!company.logo">Drag and drop to upload Image</div>
                      <!-- <h3 class="dropzone-custom-title">Drag and drop to upload content!</h3>
                      <small>..or click to select a file from your computer</small> -->
                  </vue-dropzone>
                </div>
              </div>

              <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                  <button type="button" class="btn btn-primary" @click.prevent="doUpload">UPDATE</button>
                  <button type="button" class="btn btn-default" @click.prevent="resetLogo">RESET</button>
                </div>
              </div>
              
            </form>
        </div> 
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Dropdown from '@/components/Shared/Dropdown';
import Btn from '@/components/Shared/button/Btn';
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import axios from 'axios';
const tpl = `<div class="dz-preview dz-file-preview">
                    <div class="dz-image">
                        <div data-dz-thumbnail-bg></div>
                        <center><img  data-dz-thumbnail-bg-img width="250" /></center>
                    </div>
                    <div class="dz-details">
                        <!-- <div class="dz-size"><span data-dz-size></span></div> -->
                        <div class="dz-filename"><span data-dz-name></span></div>
                    </div>
                    <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
                    <div class="dz-error-message"><span data-dz-errormessage></span></div>
                    <div class="dz-success-mark"><i class="fa fa-check"></i></div>
                    <div class="dz-error-mark"><i class="fa fa-close"></i></div>
                </div>
            `;
const data = () => {
        return {
            buttonDisabled :false,
            dropzoneOptions: {
                url: '/api/settings/organization/logo',
                thumbnailWidth: 150,
                uploadMultiple:false,
                capture:'camera',
                maxFilesize: 0.8,
                paramName: 'logo',
                previewTemplate: tpl,
                headers: {...axios.defaults.headers.common},
                dictDefaultMessage: '<i class=\'fa fa-cloud-upload\'></i>UPLOAD HERE',
                acceptedFiles:'image/png',
                autoProcessQueue:false
            },
            company: {
                name           : '',
                address        : '',
                city           : '',
                state          : '',
                pincode        : '',
                phone          : '',
                email          : '',
                website        : '',
                logo           : ''
            }
        }
    }
export default{
    name: 'CompanySetting',
    created() {
        
    },
    mounted() {
        //this.dropzoneOptions.headers = axios.defaults.headers.common;
        //this.dropzoneOptions.previewTemplate = this.template();
        this.getOrgDetailsAction().then((resp) => {
            this.company = {...this.organization};
            if (this.organization.logo){
                var file = { size: -1, name: "Logo", type: "image/png" };
                var url = this.$root.settings.awsUrl+'/'+this.organization.logo;
                this.$refs.myVueDropzone.manuallyAddFile(file, url);
            }
        })
    },
    data: data,
    props: {
    },
    components: {
        Dropdown,
        Btn,
        vueDropzone:vue2Dropzone
    },
    methods: {
        ...mapActions({
            getOrgDetailsAction:'setting/getOrgDetailsAction',
            saveOrgDetailsAction:'setting/saveOrgDetailsAction',
        }),
        validateForm(scope) {
            
        },
        saveChange() {
            this.saveOrgDetailsAction({company:this.company});
        },
        template: function () {
            return `<div class="dz-preview dz-file-preview">
                    <div class="dz-image">
                        <div data-dz-thumbnail-bg></div>
                        <center><img  data-dz-thumbnail-bg-img width="250" /></center>
                    </div>
                    <div class="dz-details">
                        <!-- <div class="dz-size"><span data-dz-size></span></div> -->
                        <div class="dz-filename"><span data-dz-name></span></div>
                    </div>
                    <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
                    <div class="dz-error-message"><span data-dz-errormessage></span></div>
                    <div class="dz-success-mark"><i class="fa fa-check"></i></div>
                    <div class="dz-error-mark"><i class="fa fa-close"></i></div>
                </div>
            `;
          },
          thumbnail: function(file, dataUrl) {
            console.log(123)
                  var j, len, ref, thumbnailElement;
                  if (file.previewElement) {
                      file.previewElement.classList.remove("dz-file-preview");
                      ref = file.previewElement.querySelectorAll("[data-dz-thumbnail-bg-img]");
                      for (j = 0, len = ref.length; j < len; j++) {
                          thumbnailElement = ref[j];
                          thumbnailElement.alt = file.name;
                          //thumbnailElement.style.backgroundImage = 'url("' + dataUrl + '")';
                          thumbnailElement.src = dataUrl;
                      }
                      return setTimeout(((function(_this) {
                          return function() {
                              return file.previewElement.classList.add("dz-image-preview");
                          };
                      })(this)), 1);
                  }
                },
        resetLogo: function (){
            if (confirm("Do you really want to remove Logo?")) {
                this.saveOrgDetailsAction({company:{
                    logo:''
                }}).then((resp) => {
                    this.$refs.myVueDropzone.removeAllFiles();
                });    
            }
        },
        doUpload: function (){
            this.$refs.myVueDropzone.processQueue();
        }
    },
    computed: {
        ...mapGetters({
            attributes: 'setting/attributesGetter',
            organization: 'setting/organizationGetter'
        })
    }
}
</script>

    <style >
      #customdropzone {
        background-color: #f5f5f5;
        font-family: 'Arial', sans-serif;
        letter-spacing: 0.2px;
        color: #777;
        transition: background-color .2s linear;
        height: auto;
        min-height: 300px;
        width: auto;
        padding: 10px;
      }

      #customdropzone .dz-preview {
        width: 100%;
        display: inline-block
      }
     #customdropzone .dz-preview .dz-image {
        width: auto;
        height: auto;
        margin-left: 10px;
        margin-bottom: 10px;
      }
      #customdropzone .dz-preview .dz-image > div {
        width: inherit;
        height: inherit;
        border-radius: 50%;
        background-size: contain;
      }
      #customdropzone .dz-preview .dz-image > img {
        width: 300px;
        /*width: 100%;*/
      }

       #customdropzone .dz-preview .dz-details {
        color: white;
        transition: opacity .2s linear;
        text-align: center;
      }
      #customdropzone .dz-success-mark, .dz-error-mark, .dz-remove {
        display: none;
      }
    </style>
