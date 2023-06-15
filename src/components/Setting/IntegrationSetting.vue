<template>
  <div class="container">
    <div class="file-selector">
      <div v-show="integrationSettings.googleDriveConnected">Google Drive Connected</div>
      <div v-show="! integrationSettings.googleDriveConnected">
      <button type="button" v-if="integrationSettings.googleDriveClientId"  class="btn btn-info" @click="driveIconClicked();"> <i class="fa fa-google"></i> Connect to Google Drive</button>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import {mapActions, mapGetters} from 'vuex'
import _ from 'lodash'
export default {
    name: 'IntegrationSetting',
    data() {
      return {
          // clientId: "197978810337-vqaeqefoeqlp7csinguuatg0u4huck1g.apps.googleusercontent.com",
          scope: "https://www.googleapis.com/auth/drive",
          oauthToken: null
      }
    },
    mounted() {
        this.getIntegrationSettingsAction();
        let gDrive = document.createElement("script");
        gDrive.setAttribute("type", "text/javascript");
        gDrive.setAttribute("src", "https://apis.google.com/js/api.js");
        document.head.appendChild(gDrive);
      },

    computed: {
        ...mapGetters({
            integrationSettings :'setting/integrationSettingsGetter'
        })
    },
    methods: {
        ...mapActions({
            getIntegrationSettingsAction:'setting/getIntegrationSettingsAction',
            updateSettingAction:'setting/updateSettingAction',
        }),
        async driveIconClicked() {
              console.log("Clicked");
              await gapi.load("auth2", () => {
                console.log("Auth2 Loaded");
                gapi.auth2.authorize(
                  {
                    client_id: this.integrationSettings.googleDriveClientId,
                    scope: this.scope,
                    immediate: false
                  },
                  this.handleAuthResult
                );
              });
              gapi.load("picker", () => {
                console.log("Picker Loaded");
              });
            },
        handleAuthResult(authResult) {
             console.log("Handle Auth result", authResult);
             if (authResult && !authResult.error) {
               this.oauthToken = authResult.access_token;
              console.log('token....', this.oauthToken)
              this.updateSettingAction({google_drive_access_token: authResult.access_token});
              this.getIntegrationSettingsAction();
             }
           }
    }
}
</script>