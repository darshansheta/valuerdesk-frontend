// GUI Control
// import GUICheckboxControl from './../gui/ui/controls/CheckboxControl';
// import GUIDatePickerControl from './../gui/ui/controls/DatePickerControl';
// import GUINumberControl from './../gui/ui/controls/NumberControl';
// import GUISelectControl from './../gui/ui/controls/SelectControl';
 import GUITextControl from './../gui/ui/controls/TextControl';
// import GUITimePickerControl from './../gui/ui/controls/TimePickerControl';
 import GUITextAreaControl from './../gui/ui/controls/TextAreaControl';


import GUI2TextControl from '@/components/FormBuilder/Gui2/Controls/TextControl';
import GUI2TextAreaControl from '@/components/FormBuilder/Gui2/Controls/TextAreaControl';
import GUI2CheckBoxControl from '@/components/FormBuilder/Gui2/Controls/CheckBoxControl';
import GUI2RadioControl from '@/components/FormBuilder/Gui2/Controls/RadioControl';
import GUI2DropDownControl from '@/components/FormBuilder/Gui2/Controls/DropDownControl';

// TEMPLATE Control
import TEMPLATETextControl from './../template/ui/common/controls/TextControl';
import TEMPLATETextAreaControl from './../template/ui/common/controls/TextAreaControl';
import TEMPLATECheckBoxControl from './../template/ui/common/controls/CheckBoxControl';
import TEMPLATERadioControl from './../template/ui/common/controls/RadioControl';
import TEMPLATEDropDownControl from './../template/ui/common/controls/DropDownControl';
// import TEMPLATENumberControl from './../template/ui/common/controls/NumberControl';
// import TEMPLATECheckboxControl from './../template/ui/common/controls/CheckboxControl';
// import TEMPLATEDatePickerControl from './../template/ui/common/controls/DatePickerControl';
// import TEMPLATETimePickerControl from './../template/ui/common/controls/TimePickerControl';
// import TEMPLATESelectControl from './../template/ui/common/controls/SelectControl';

// CONFIG CONTROL
// import SIDEBARDatePickerControl from './../template/ui/sidebar_items/DatePickerConfigComponent';
// import SIDEBARTimePickerControl from './../template/ui/sidebar_items/TimePickerConfigComponent';
// import SIDEBARSelectControl from './../template/ui/sidebar_items/SelectConfigComponent';
// import SIDEBARNumberControl from './../template/ui/sidebar_items/NumberConfigComponent';
import SIDEBARTextControl from './../template/ui/sidebar_items/TextConfigComponent';
import SIDEBARTextAreaControl from './../template/ui/sidebar_items/TextAreaConfigComponent';
import SIDEBARCheckBoxControl from './../template/ui/sidebar_items/CheckBoxConfigComponent';
import SIDEBARRadioControl from './../template/ui/sidebar_items/RadioConfigComponent';
import SIDEBARDropDownControl from './../template/ui/sidebar_items/DropDownConfigComponent';
// import SIDEBARCheckboxControl from './../template/ui/sidebar_items/CheckboxConfigComponent';

// Template Control
// special key for control:
// other_properties: {
//     x: "zzz",
//     c: "xxx",
//     ...
// },
// validation_func: function() {
//  // validation function here
// }
//

const faEdit = 'fa fa-edit';
const faCalculator = 'fa fa-calculator';
const faCalendarAlt = 'fa fa-calendar-alt';
const faClock = 'fa fa-clock';
const faCheck = 'fa fa-check';
const faDatabase = 'fa fa-database';
const faParagraph = 'fa fa-paragraph';
const faCheckBox = 'fa fa-check-square-o';
const faRadio = 'fa fa-dot-circle-o';
const faDropDown = 'fa fa-list';

const CONTROL_TYPES = {
    text: {
        label:"Text Input",
        icon: faEdit,
        source: {
            gui: GUITextControl,
            gui2: GUI2TextControl,
            template: TEMPLATETextControl,
            config: SIDEBARTextControl
        }
    },
    textarea: {
        label:"Text Area",
        icon: faParagraph,
        source: {
            gui: GUITextAreaControl,
            gui2: GUI2TextAreaControl,
            template: TEMPLATETextAreaControl,
            config: SIDEBARTextAreaControl
        }
    },
    checkbox: {
        label:"Checkbox",
        icon: faCheckBox,
        source: {
            gui: GUITextControl,
            gui2: GUI2CheckBoxControl,
            template: TEMPLATECheckBoxControl,
            config: SIDEBARCheckBoxControl
        }
    },
    radio: {
        label:"Radio",
        icon: faRadio,
        source: {
            gui: '',
            gui2: GUI2RadioControl,
            template: TEMPLATERadioControl,
            config: SIDEBARRadioControl
        }
    },
    dropdown: {
        label:"Drop Down",
        icon: faDropDown,
        source: {
            gui: '',
            gui2: GUI2DropDownControl,
            template: TEMPLATEDropDownControl,
            config: SIDEBARDropDownControl
        }
    },
    /*number: {
        label:"Number Input",
        icon: faCalculator,
        source: {
            gui: GUINumberControl,
            template: TEMPLATENumberControl,
            config: SIDEBARNumberControl
        }
    },
    datepicker: {
        label: "Date Picker",
        icon: faCalendarAlt,
        source: {
            gui: GUIDatePickerControl,
            template: TEMPLATEDatePickerControl,
            config: SIDEBARDatePickerControl,
        }
    },
    timepicker: {
        label:"Time Picker",
        icon: faClock,
        source: {
            gui: GUITimePickerControl,
            template: TEMPLATETimePickerControl,
            config: SIDEBARTimePickerControl,
        }
    },
    select: {
        label: "Select Option",
        icon: faDatabase,
        source: {
            gui: GUISelectControl,
            template: TEMPLATESelectControl,
            config: SIDEBARSelectControl
        }
    },
    checkbox: {
        label:"Checkbox",
        icon: faCheck,
        source: {
            gui: GUICheckboxControl,
            template: TEMPLATECheckboxControl,
            config: SIDEBARCheckboxControl
        }
    }*/
};

export {
    CONTROL_TYPES
}
