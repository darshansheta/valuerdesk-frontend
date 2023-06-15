<template>
    <div>
        <h3>Orders</h3> 
        <table class="table table-striped">
            <tbody>
                <tr>
                    <td>
                        Default Due date period to consider
                    </td>
                    <td>
                        
                        <select class="form-control" v-model="settings.dueDatePeriod">
                            <option v-for="(day,k) in [1,2,3,4,5]" :value="day" >{{day}} Days</option>
                        </select>
                       
                    </td>
                    <td class="text-right">
                        <button class="btn btn-default" @click.prevent="updateSetting('due_date_period',settings.dueDatePeriod)">UPDATE</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        Google Doc API Refresh token
                    </td>
                    <td>
                        
                        <input type="text" class="form-control" v-model="settings.googleDriveRefreshToken">
                       
                    </td>
                    <td class="text-right">
                        <button class="btn btn-default" @click.prevent="updateSetting('google_drive_refresh_token',settings.googleDriveRefreshToken)">UPDATE</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name:'GeneralSettings',
    data: function() {
        return {
            settings : {
                dueDatePeriod:'',
                googleDriveRefreshToken:'',
            }
        }
    },
    props: {

    },
    mounted(){
        this.getGeneralSettingsAction();
    },
    methods:{
        ...mapActions({
            getGeneralSettingsAction:'setting/getGeneralSettingsAction',
            updateSettingAction:'setting/updateSettingAction',
        }),
        updateSetting(setting,value) {
            this.updateSettingAction({[setting]:value});
        }
    },
    computed: {
        ...mapGetters({
            generalSettings :'setting/generalSettingsGetter'
        })
    },
    watch: {
        generalSettings: {
            handler: function(newVal, oldVal) {
                if (newVal.due_date_period != undefined) {
                    this.settings.dueDatePeriod = newVal.due_date_period;
                }
                if (newVal.google_drive_refresh_token != undefined) {
                    this.settings.googleDriveRefreshToken = newVal.google_drive_refresh_token;
                }
                //this.setValue();
            }
        }
    }
}
</script>