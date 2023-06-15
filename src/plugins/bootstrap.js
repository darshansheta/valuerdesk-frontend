import Vue from 'vue'
import _ from "underscore"
import VeeValidate,{Validator} from 'vee-validate';
import Tab from '@/components/Shared/Tab';
import Tabs from '@/components/Shared/Tabs';
import BModal from '@/components/Shared/Modal';
import VeeInput from '@/components/Shared/VeeInput';
import VeeSelect from '@/components/Shared/VeeSelect';
import Notification from '@/services/notification/notification.js';
import MessageBox from '@/services/messagebox/messageBox';
import vSelect from 'vue-select'

import Row from '@/components/Report/FormControl/Row';
import Col from '@/components/Report/FormControl/Col';

import '@/plugins/axios';
//import '@/plugins/jquery.atwho';
//import '@/plugins/jquery.atwho.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'vue-select/dist/vue-select.css';
import states from '@/utils/states';
import statuses from '@/utils/statuses';
import '@/filters/filters';
import hasPermission,{ hasRole } from '@/utils/permission';
import globalMixin from '@/mixins/global';
import PrettyCheckbox from 'pretty-checkbox-vue';
import 'pretty-checkbox/dist/pretty-checkbox.css';

Vue.use(PrettyCheckbox);

import ToggleButton from 'vue-js-toggle-button'

Vue.use(ToggleButton)

Vue.use(require('vue-moment'));
Vue.component('tab',Tab);
Vue.component('tabs',Tabs);
Vue.component('BModal',BModal);
Vue.component('VeeInput',VeeInput);
Vue.component('VeeSelect',VeeSelect);

Vue.component('Row',Row);
Vue.component('Col',Col);
Vue.component('v-select', vSelect);
// import the component
 import Treeselect from '@riophae/vue-treeselect'
 // import the styles
 import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  Vue.component('treeselect', Treeselect)

Validator.extend('alpha_num_underscore', {
  getMessage: field => 'only alphabets, numberic and underscore allowed.',
  validate: value => {
    return value.search(/^[a-zA-Z0-9_]+$/) == -1 ? false : true;
  }
});

const isUnique = (value) => {
  return axios({url:'/username', params:{ username: value },method:'GET'}).then((response) => {
    // Notice that we return an object containing both a valid property and a data property.
    return {
      valid: response.data.valid,
      data: {
        message: response.data.message
      }
    };
  });
};

// The messages getter may also accept a third parameter that includes the data we returned earlier.
Validator.extend('username_unique', {
  validate: isUnique,
  getMessage: (field, params, data) => {
    return data.message;
  }
});

const isUniquePlaceholder = (value,{ id }) => {
  return axios({url:'/placeholder', data:{ placeholder: value,id },method:'POST'}).then((response) => {
    // Notice that we return an object containing both a valid property and a data property.
    return {
      valid: response.data.valid,
      data: {
        message: response.data.message
      }
    };
  });
};

// The messages getter may also accept a third parameter that includes the data we returned earlier.
Validator.extend('placeholder_unique', {
  validate: isUniquePlaceholder,
  getMessage: (field, params, data) => {
    return data.message;
  }
},{ paramNames :['id'] });

Vue.use(VeeValidate,{fieldsBagName:'vFields'});

Vue.prototype.$states = states;
Vue.prototype.$statuses = statuses;

Object.keys(MessageBox).forEach(key => {
    Vue.prototype['$'+key] = MessageBox[key];
});

Vue.prototype.$tz = function() {
    var offset = new Date().getTimezoneOffset();
    var date = new Date(null);-(offset)*3600/60
    date.setSeconds(-(offset)*3600/60); // specify value for SECONDS here
    return ((offset > 0) ? '-':'+') +  date.toISOString().substr(11, 5);
    
}();

Object.defineProperty(Vue.prototype, '$_', { value: _ });

Vue.prototype.$notify = Notification.notify;

Vue.mixin(globalMixin)

// 2020-01-10 fix for formbuilder=================================================================
window._  = _;
import underscoreDeepExtend from 'underscore-deep-extend';
_.mixin({deepExtend: underscoreDeepExtend(_)});

/**
 * Clone DEEP data
 * @param data
 * @returns {any}
 */
_.cloneDeep = function (data) {
    return JSON.parse(JSON.stringify(data));
};

/**
 * Check if we can access path from an object
 * @param o Object
 * @param s Path
 * @returns {*}
 */
_.accessStr = function (o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (_.isNull(o) || _.isUndefined(o)) {
            return;
        }
        if (k in o) {
            if (!_.has(o, k)) {
                return;
            }
            o = o[k];
        } else {
            return;
        }
    }
    return o;
};

/**
 * Generate a true UNIQUE ID (check dom too)
 * @param prefix
 * @returns {*}
 */
_.domUniqueID = function (prefix) {
    var id = prefix + _.random(0, 999999);
    if ($('#' + id).length > 0) {
        return _.domUniqueID(prefix);
    }

    return id;
};
//=================================================================