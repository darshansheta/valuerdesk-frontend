<style scoped>
.panel-heading {
    padding: 7px 15px;
}
</style>
<template>
    <div>
        <br>
        <div class="panel panel-white" v-for="notification in notifications">
          <!-- <div class="panel-heading">
            <b style="color: #656565;">{{notification.creatorName}}</b> {{notification.alias}} order.
            <small class="pull-right" style="color:#777;"> <i class="fa fa-clock-o"></i> {{ notification.createdAt | moment("Do MMMM YYYY, h:mm:ss a") }}</small>
          </div> -->
          <div class="panel-body" v-html="notification.comment">
          </div>
            <table class="table table-bordered table-condensed" v-if="notification.group == 'update' && notification.alias == 'updated' && notification.data.changes != undefined">
                <thead>
                    <tr>
                        <th style="width:20%">Field</th>
                        <th>Old</th>
                        <th>New</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="change in notification.data.changes">
                        <td> <b>{{change.label}}</b></td>
                        <template v-if="change.message != undefined">
                            <td colspan="2">{{change.message}}</td>
                        </template>
                        <template v-else>
                        <td>{{change.old}}</td>
                        <td>{{change.new}}</td>
                        </template>
                    </tr>
                </tbody>
            </table>
          <div  class="panel-footer footer-white" v-if="notification.note">
              <b style="color: #656565;">Note:</b> <span v-html="notification.note"></span>
          </div>
          <div class="panel-footer" style="padding: 7px 15px;">
              <b style="color: #656565;">{{notification.creatorName}}</b> {{notification.alias}} order.
            <small class="pull-right" style="color:#777;">{{ notification.createdAt | moment("Do MMMM YYYY, h:mm:ss a") }} <i class="fa fa-clock-o"></i></small>
          </div>
        </div>
    </div>
</template>
<script>
export default{
    name:'Notification',
    data:function(){
        return {
            abc:0
        };
    },
    props:{ 
        order:{
            type: Object,
            default: function(){
                {}
            }
        },
        notifications: Array,
        default: function() {
            []
        }
    }
}
</script>