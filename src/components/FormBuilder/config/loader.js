import underscoreDeepExtend from 'underscore-deep-extend';
import moment from 'moment';

// load jquery
if (!window.$) {
    let $ = require('jquery');
    window.$ = $;
    window.jQuery = $;
    window.jquery = $;
}

// load jquery ui
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';

// load timepicker
//require('./../assets/js/jquery.timepicker.min');
//require('./../assets/css/jquery.timepicker.min.css');
require('./../assets/css/v-form.css');

// load bootstrap
require('popper.js');
require('bootstrap');
// import 'bootstrap/dist/css/bootstrap.min.css';
// require('scriptjs');

// load font-awesome

// load underscore
 window._ = require('underscore'); // override // 2021-01-09 deepExtend fix
require('./helper_function');
_.mixin({deepExtend: underscoreDeepExtend(_)});

// // load moment
if (!window.moment) {
    window.moment = moment;
}

// toaster
// require('./../assets/js/jquery.noty.packaged');

// validateJS
//require('./../assets/js/validate.min.js');
