<template>

<div class="form-group" :class="{'has-error': errors.has(errorSelector || name), 'vd-has-val': !!isEmpty, 'vd-empty-val': !isEmpty,'vd-float-label': floatLabel}">
    <label class="control-label" :class="labelCol" v-if="label != null">{{label}}: <span v-if="isRequired()" style="color:red;">*</span></label>
    <template v-if="controlCol" >
        <div :class="controlCol">
            <input 
                autocomplete="off"
                :type="iType" 
                :class="getInputClass()" 
                :readonly="readonly"
                :placeholder="placeholder"
                :data-vv-as="label ? label : 'this'"
                v-bind:value="value"
                :id="inputId"
                v-on:input="$emit('input', $event.target.value)"
                v-on:change="$emit('change', $event.target.value)"
                @focus="onFocusHandler"
                v-validate="rules" :name="name">
            <span class="help-block" v-show="helpText" v-html="helpText"></span>
            <span class="help-block" v-show="errors.has(errorSelector || name)">{{errors.first(errorSelector || name)}}</span>
        </div>
    </template>
    <template v-else>
        <input 
            autocomplete="off"
            :type="iType" 
            :class="getInputClass()"
            :readonly="readonly"
            :placeholder="placeholder ? placeholder : floatLabel ? label : ''"
            :data-vv-as="label ? label : 'this'"
            v-bind:value="value"
            :id="inputId"
            v-on:input="$emit('input', $event.target.value)"
            v-on:change="$emit('change', $event.target.value)"
            @focus="onFocusHandler"
            v-validate="rules" :name="name">
        <span class="help-block" v-show="helpText"></span>
        <span class="help-block" v-show="errors.has(errorSelector || name)">{{errors.first(errorSelector || name)}}</span>
    </template>
</div>

</template>
<script>
const initialData = () => {
  return {}
}
export default {
    name: 'VeeInput',
    inject: ['$validator'],
    mounted () {
        this.$el.value = this.value;
    },
    props: {
        value:{
            type:null,
            default:null
        },
        name:String,
        rules:{
            type:null,
            required:true
        },
        label:String,
        errorSelector:{
            type:String,
            default:null
        },
        inputId:{
            type:String,
            default:null
        },
        controlCol:{
            type:String,
            default:null
        },
        labelCol:{
            type:String,
            default:null
        },
        readonly:{
            type:Boolean,
            default:false
        },
        placeholder:{
            type:String,
            default:null
        },
        iType:{
            type:String,
            default:'text'
        },
        helpText:{
            type:String,
            default:null
        },
        inputClass:{
            type:[String,Array],
            default:''
        },
        floatLabel:{
            type:Boolean,
            default:false
        }
    },
    data:initialData,
    methods:{
        isRequired() {
            if (typeof this.rules == 'object') {
                return Object.keys(this.rules).indexOf('required') != -1;
            } else {
                return this.rules.indexOf('required') != -1;
            }
        },
        getInputClass() {
            return ['form-control'].concat(this.inputClass)
        },
        onFocusHandler(e) {
        }
    },
    computed: {
        isEmpty() {
            if (this.value === null) {
                return  true;
            }
            return !!(this.value+"").length;
        }
    }
}
</script>