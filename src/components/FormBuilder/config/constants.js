var FORM_CONSTANTS = {};
var CONTROL_CONSTANTS = {};

FORM_CONSTANTS.SectionLayout = {
  collapse: "Collapse",
  //tab: "Tab",
  // inner: "Inner Parent",
};

FORM_CONSTANTS.Section = {
    name: "",
    label: "",
    clientKey: "",
    order: 0,
    rows: [],

    // config
    labelPosition: "left", // left or top

    // for dynamic
    isDynamic: false,
    minInstance: 1,
    maxInstance: 0, //0 for unlimited
    instances: [], // for save data in GUI to easily to retrieve @@
};

FORM_CONSTANTS.Row = {
    name: "",
    label: "",
    order: 0,
    controls: [],
};

FORM_CONSTANTS.Control = {
    type: "",
    name: "",
    fieldName: "",
    //label: "",
    order: 0,
    //defaultValue: "",
    //value: "",
    className: 'col-md-4',
    //readonly: false,

    // label style
    // labelBold: false,
    // labelItalic: false,
    // labelUnderline: false,

    // validation
    //required: false,

    // attr for text
    //isMultiLine: false,

    // // attr for number
    // isInteger: false,
    // decimalPlace: 0,

    // // attr for datePicker
    // isTodayValue: false,
    // dateFormat: "dd/mm/yy",

    // // attr for timePicker
    // isNowTimeValue: false,
    // timeFormat: "HH:mm", // enhancement later

    // // attr for select
    // isMultiple: false,
    // isAjax: false, // is ajax data source or not
    //dataOptions: [], // static data source
    // ajaxDataUrl: "", // ajax data source

    // attr for checkbox
    //isChecked: false
};

FORM_CONSTANTS.Type = {
    text: {
        label:"Text Input",
        icon: 'fa fa-edit'
    },
    textarea: {
        label:"Text Area",
        icon: 'fa fa-paragraph'
    },
    checkbox: {
        label:"Checkbox",
        icon: 'fa fa-check-square-o'
    },
    radio: {
        label:"Checkbox",
        icon: 'fa fa-dot-circle-o'
    },
    dropdown: {
        label:"Checkbox",
        icon: 'fa fa-list'
    },
    // number: {
    //     label:"Number Input",
    //     icon: 'fa fa-calculator'
    // },
    // datepicker: {
    //     label: "Date Picker",
    //     icon: 'fa fa-calendar-alt'
    // },
    // timepicker: {
    //     label:"Time Picker",
    //     icon: 'fa fa-clock'
    // },
    // select: {
    //     label: "Select Option",
    //     icon: 'fa fa-database'
    // },
    // checkbox: {
    //     label:"Checkbox",
    //     icon: 'fa fa-check'
    // },
};

FORM_CONSTANTS.WidthOptions = {
    "col-md-1": "Width 1 parts",
    "col-md-2": "Width 2 parts",
    "col-md-3": "Width 3 parts",
    "col-md-4": "Width 4 parts",
    "col-md-5": "Width 5 parts",
    "col-md-6": "Width 6 parts",
    "col-md-7": "Width 7 parts",
    "col-md-8": "Width 8 parts",
    "col-md-9": "Width 9 parts",
    "col-md-10": "Width 10 parts",
    "col-md-11": "Width 11 parts",
    "col-md-12": "Width 12 parts",
};

FORM_CONSTANTS.OptionDefault = {
    value: "",
    text: ""
};

CONTROL_CONSTANTS.DateFormat = {
    // rule: date picker format => moment format
    'dd/mm/yy': "D/M/YYYY",
    'dd-mm-yy': "D-M-YYYY",
    'mm/dd/yy': "M/D/YYYY",
    'mm-dd-yy': "M/D/YYYY",
    'yy/mm/dd': "YYYY/M/D",
    'yy-mm-dd': "YYYY-M-D",
};

CONTROL_CONSTANTS.TimeFormat = {
    'H:m': 'H:m',
    'HH:mm': 'HH:mm',
    'h:m p': "h:m A",
    'hh:mm p': "hh:mm A"
};

export {
    FORM_CONSTANTS,
    CONTROL_CONSTANTS
}
