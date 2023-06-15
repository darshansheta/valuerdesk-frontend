import { get as objGet, forEach, isFunction, isString, isArray, debounce, uniqueId, uniq as arrayUniq,isEmpty } from "lodash";

export default {
    props: ['control', 'labelPosition','sectionName','model'],
    inject: ['$validator'],
    data() {
        return {
            
        };
    },

    computed: {
        value: {
            cache: false,
            get() {
                return objGet(this.model, this.sectionName+'.'+this.control.fieldName);
            },

            set(newValue) {
                let oldValue = this.value;
                this.updateModelValue(newValue, oldValue);
                this.$emit("model-updated", newValue, `${this.sectionName}.${this.control.fieldName}`);
            }
        },
        vRules() {
            let rules = [];
            if (this.control.required) {
                rules.push('required');
            }
            return rules.join('|');
        }
    },

    methods: {
        onInput($event) {
            let value = $event.target.value;
            this.value = value;
        },
        updateModelValue(newValue, oldValue) {
            let val = this.model;    
            this.setModelValueByPath(`${this.sectionName}.${this.control.fieldName}`,newValue);
                
        },
        setModelValueByPath(path, value) {
            //this.$emit('change',path,value) <== old way to update object by emiting event on parent
            // convert array indexes to properties
            let s = path.replace(/\[(\w+)\]/g, ".$1");

            // strip a leading dot
            s = s.replace(/^\./, "");

            let o = this.model;
            const a = s.split(".");
            let i = 0;
            const n = a.length;
            while (i < n) {
                let k = a[i];
                if (i < n - 1)
                    if (o[k] !== undefined) {
                        // Found parent property. Step in
                        o = o[k];
                    } else {
                        // Create missing property (new level)
                        this.$root.$set(o, k, {});
                        o = o[k];
                    }
                else {
                    // Set final property value
                    this.$root.$set(o, k, value);
                    return;
                }

                ++i;
            }
        },
        getControlWrapperClass() {
            let classes = ["form-group", this.control.className];
            if (this.errors.has(this.control.name)) {
                classes.push('has-error');
            }
            return classes;
        }
    },
    mounted() {
        if ( this.value === undefined && !isEmpty(this.control.defaultValue) ) {
            this.value = this.control.defaultValue;
        }
    }
};
