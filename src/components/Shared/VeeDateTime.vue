<template>

<div class="form-group" :class="{'has-error': errors.has(errorSelector || name)}">
    <label class="control-label" :class="labelCol" v-if="label != null">{{label}} <span v-if="rules.indexOf('required') != -1" style="color:red;">*</span></label>
    <template v-if="controlCol" >
        <div :class="controlCol">
            <input 
                autocomplete="off"
                type="text" 
                class="form-control" 
                :readonly="readonly"
                v-bind:value="value"
                v-on:input="$emit('input', $event.target.value)"
                v-validate="rules" :name="name">
            <span class="help-block" v-show="errors.has(errorSelector || name)">{{errors.first(errorSelector || name)}}</span>
        </div>
    </template>
    <template v-else>
        <div class="input-group">
            <input 
            autocomplete="off"
            type="date" 
            class="form-control" 
            :readonly="readonly"
            v-bind:value="date"
            v-on:input="$emit('input', $event.target.value)"
            v-validate="rules" :name="name">
            <select class="form-control">
                <option>HH</option>
            </select>
            <select class="form-control">
                <option>MM</option>
            </select>
        </div>
        <span class="help-block" v-show="errors.has(errorSelector || name)">{{errors.first(errorSelector || name)}}</span>
    </template>
</div>

</template>
<script>
const initialData = () => {
  return {
    date:'',
    hh:'',
    mm:''
  }
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
    },
    data:initialData,
    computed: {
        value:{
            get(){

            },
            set(){
                
            }
        }
    }
}
</script>