// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import './registerServiceWorker'
import './plugins/bootstrap';
import './app.css';
import './css/bootstrap-float-label.css';

//import router from './router'
import store from './vuex/store'

//import './events/client';

import { router } from './plugins/vue-route';


// Require Froala Editor js file.
import 'froala-editor/js/froala_editor.pkgd.min';

// Require Froala Editor css files.
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import 'froala-editor/css/froala_style.min.css';
//var moment = require('moment-timezone');

//moment.tz.setDefault("America/New_York");
//console.log(moment.tz.guess())
//console.log(moment.tz(new Date,'Asia/Calcutta').format())

import VueFroala from 'vue-froala-wysiwyg'
Vue.use(VueFroala)
Vue.config.productionTip = false;
import { mapGetters, mapActions } from 'vuex';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created() {
        //if (this.$store.getters.isLoggedIn) {
        if (this.isLoggedIn && !this.gotResponse && this.authStatus != 'loading') {
            // first check authentifcation status before application mount
            this.checkAuthAction();
        }
    },
    mounted() {
        this.pollDashboard();
    },
    props:{
        googleMapToken: {
            type:String,
            default:''
        }
    },
    methods:{
        ...mapActions({
            updateRefreshableQueuesAction:'dashboard/updateRefreshableQueuesAction',
            filterQueueAction:'dashboard/filterQueueAction',
            resetRefreshableQueuesAction:'dashboard/resetRefreshableQueuesAction',
            checkAuthAction:'checkAuthAction',
        }),
        pollDashboard() {
            this.polling = setInterval(() => {
                if(
                    this.refreshableQueues.length && 
                    this.refreshableQueues.indexOf(this.activeQueue) != -1 &&
                    this.gotResponse &&
                    this.isLoggedIn && 
                    this.$route.name == 'dashboard'
                    ) {
                    this.resetRefreshableQueuesAction()
                    this.filterQueueAction({
                        queue:this.activeQueue,
                        data: {}
                    });
                }
            }, 30000)
        },
        notifyError(msg){
            this.$notify({
                type:'danger',
                content: (msg) ? msg : `Something went wrong. Please reload order.`,
                duration: 3000
            });
        },
        notify(msg){
            this.$notify({
                content: (msg) ? msg : `Something went wrong. Please reload order.`,
                duration: 3000
            });
        }
    },
   computed: {
      ...mapGetters({
            activeQueue: 'dashboard/activeQueueGetter',
            queueKeys: 'dashboard/queueKeysGetter',
            refreshableQueues: 'dashboard/refreshableQueuesGetter',
            gotResponse: 'gotResponseGetter',
            authStatus: 'authStatus',
            isLoggedIn:'isLoggedIn',
            settings:'settingsGetter',
        })
   }
})
