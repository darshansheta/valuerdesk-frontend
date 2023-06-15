import Vue from 'vue'
import _ from "lodash"


Vue.filter('dateTime', function (value, format) {
  format = (format) ? format : 'long';
  let resp = '';
  /*

    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

        var offset = date.getTimezoneOffset() / 60;
        var hours = date.getHours();

        newDate.setHours(hours - offset);

        return newDate;  

  */
  if (!value) return 'N/A';
  var date  = new Date(value);
  switch(format) {
    case 'long':
        resp = date.getFullYear()+"-"
              + ('0' + (date.getMonth()+1)).slice(-2)+'-'
              + ('0' + date.getDate()).slice(-2)+' '
              + ('0' + date.getHours()).slice(-2)+':'
              + ('0' + date.getMinutes()).slice(-2)+':'
              + ('0' + date.getSeconds()).slice(-2)
              ;
      break;
    case 'short':
        resp = date.getFullYear()+"-"
                  + ('0' + (date.getMonth()+1)).slice(-2)+'-'
                  + ('0' + date.getDate()).slice(-2);
      break;
    case 'readable':
        resp = date.getFullYear()+"-"
                  + ('0' + (date.getMonth()+1)).slice(-2)+'-'
                  + ('0' + date.getDate()).slice(-2);
      break;
    case 'object':
        resp = date;
      break;
    default:
      // code block
  }
  return resp;
})

Vue.filter('statusLabel', function (value) {
  
  var status = {
    1:{type: 'draft',label:'NEW'},
    2:{type: 'warning',label:'ASSIGNED'},
    3:{type: 'scheduled',label:'SCHEDULED'},
    4:{type: 'info',label:'SUBMITTED'},
    5:{type: 'success',label:'COMPLETED'},
    6:{type: 'danger',label:'ON HOLD'},
    7:{type: 'cancelled',label:'CANCELLED'},
  };

  return `<span class="label label-status label-${status[value].type}">${status[value].label}</span>`;

})