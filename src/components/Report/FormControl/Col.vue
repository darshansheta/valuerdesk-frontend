<template>
    <div :class="classes" :style="style">
        <template v-if="'children' in ele && ele.children.length > 0">
            <template v-for="(child,k) in ele.children">
                <component :is="child.component" :ele="child" :eleIndex="k" :parentEle="ele"></component>
            </template>
        </template>
    </div>
</template>
<script>

const initialData = () => {
    return {
        
    }
}
import Row from './Row';

export default {
    name: 'Col',
    data:initialData,
    props: {
        show : {
            type: Boolean
        },
        ele : {
            type: Object,
            default: () => {}
        },
        parentEle : {
            type: Object,
            default: () => []
        },
        parentRootEle : {
            type: Boolean,
            default: false
        },
        eleIndex : {
            type: Number,
            default: 0
        },
        eleClass:{
            type:[String,Array],
            default:() => []
        }
    },
    created() {
        
    },
    mounted() {
        
    },
    methods: {
        hide() {
            
        }
    },
    computed: {
        classes: {
            get() {
                let c = [];
                if ('className' in this.ele) {
                    c.push(...this.ele.className)
                }

                if (this.eleIndex != 0) {
                    c.push('border-left')
                }
                if (!this.parentRootEle && (this.eleIndex + 1) != this.parentEle.children.length) {
                    c.push('border-right')
                }

                return c;
            }
        },
        style: {
            get() {
                return {
                    minHeight:'100px',
                };
            }
        }
    }
}
</script>