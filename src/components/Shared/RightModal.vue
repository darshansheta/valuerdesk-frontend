<template>
  <section>
    <button type="button" @click="open=true">Launch Demo Modal</button>
    <modal class="right" :value="isShow" title="Modal 1" @hide="callback" ref="modal" :dialog-style="{width}" :backdrop="false">
      <slot></slot>
    </modal>
  </section>
</template>
<script>
 import Modal from './Modal'
 import CreateClient from '@/components/Client/Create'
  export default {
    components: {
        Modal,
        CreateClient
    },
    props: {
        width: {
            default: '900px'
        },
        isShow :{
            type:Boolean,
            default:false
        }
    },
    data () {
      return {
        open: false
      }
    },
    methods: {
      callback (msg) {
        //this.$notify(`Modal dismissed with msg '${msg}'.`)
      }
    },
    watch: {
        isShow: function(val) {
            this.open = val;
        }
    }
  }
</script>
<!-- modal-example.vue -->
<style type="text/css">
    
    /*************** LEFT_RIGHT MODEL START *****************/
    /*******************************
    * MODAL AS LEFT/RIGHT SIDEBAR
    * Add "left" or "right" in modal parent div, after class="modal".
    * Get free snippets on bootpen.com
    *******************************/
        .modal.left .modal-dialog,
        .modal.right .modal-dialog {
            position: fixed;
            margin: auto;
            /*width: 320px;*/
            height: 100%;
            -webkit-transform: translate3d(0%, 0, 0);
                -ms-transform: translate3d(0%, 0, 0);
                 -o-transform: translate3d(0%, 0, 0);
                    transform: translate3d(0%, 0, 0);
        }

        .modal.left .modal-content,
        .modal.right .modal-content {
            height: 100%;
            overflow-y: auto;
        }
        
        .modal.left .modal-body,
        .modal.right .modal-body {
            padding: 15px 15px 80px;
        }

    /*Left*/
        .modal.left.fade .modal-dialog{
            /*left: -320px;*/
            -webkit-transition: opacity 0.3s linear, left 0.3s ease-out;
               -moz-transition: opacity 0.3s linear, left 0.3s ease-out;
                 -o-transition: opacity 0.3s linear, left 0.3s ease-out;
                    transition: opacity 0.3s linear, left 0.3s ease-out;
        }
        
        .modal.left.fade.in .modal-dialog{
            left: 0;
        }
            
    /*Right*/
        .modal.right.fade .modal-dialog {
            right: -600px;
            -webkit-transition: opacity 0.3s linear, right 0.3s ease-out;
               -moz-transition: opacity 0.3s linear, right 0.3s ease-out;
                 -o-transition: opacity 0.3s linear, right 0.3s ease-out;
                    transition: opacity 0.3s linear, right 0.3s ease-out;
        }
        
        .modal.right.fade.in .modal-dialog {
            right: 0;
        }

    /* ----- MODAL STYLE ----- */
        .modal-content {
            border-radius: 0;
            border: none;
        }

        .modal-header {
            border-bottom-color: #EEEEEE;
            background-color: #FAFAFA;
        }
    /*************** LEFT_RIGHT MODEL END *****************/
</style>