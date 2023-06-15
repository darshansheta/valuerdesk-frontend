<template>

<div class="form-group" :class="{'has-error': errors.has(errorSelector || name), 'vd-has-val': !!isEmpty, 'vd-empty-val-': !isEmpty,'vd-float-label': floatLabel}">
    <label class="control-label" :class="labelCol" v-if="label != null">{{label}}: <span v-if="rules.indexOf('required') != -1" style="color:red;">*</span></label>
    <template v-if="controlCol" >
        <div :class="controlCol">
            <select 
                autocomplete="off"
                :class="getInputClass()" 
                :readonly="readonly"
                v-bind:value="value"
                :data-vv-as="label ? label : 'this'"
                v-on:input="$emit('input', $event.target.value)"
                v-on:change="$emit('change', $event.target.value)"
                v-validate="rules" :name="name">
                <slot></slot>
            </select>
            <span class="help-block" v-show="errors.has(errorSelector || name)">{{errors.first(errorSelector || name)}}</span>
        </div>
    </template>
    <template v-else>
        <select 
            :title="floatLabel ? label : ''"
            autocomplete="off"
            :class="getInputClass()" 
            :readonly="readonly"
            v-bind:value="value"
            :data-vv-as="label ? label : 'this'"
            v-on:input="$emit('input', $event.target.value)"
            v-on:change="$emit('change', $event.target.value)"
            v-validate="rules" :name="name">
            <slot></slot>
        </select>
        <span class="help-block" v-show="errors.has(errorSelector || name)">{{errors.first(errorSelector || name)}}</span>
    </template>
</div>

</template>
<script>
const initialData = () => {
  return {}
}
export default {
    name: 'VeeSelect',
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
    methods: {
        getInputClass() {
            return ['form-control'].concat(this.inputClass)
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