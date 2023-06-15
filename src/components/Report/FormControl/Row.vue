<template>
    <div :class="classes" :style="style">
        <h4 class="border-bottom">eleIndex</h4>
        <template v-if="typeof ele.children != undefined">
            <template v-for="(child,k) in ele.children">
                <component :is="child.component" :ele="child" :eleIndex="k" :parentEle="ele" :parentRootEle="rootEle"></component>
            </template>
        </template>
    </div>
</template>
<script>
import Col from './Col';

const initialData = () => {
    return {
        
    }
}


export default {
    name: 'Row',
    data:initialData,
    props: {
        show : {
            type: Boolean
        },
        rootEle : {
            type: Boolean,
            default: false
        },
        ele : {
            type: Object,
            default: () => {}
        },
        parentEle : {
            type: Object,
            default: () => []
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
                let c = ['row'];
                if ('className' in this.ele) {
                    c.push(...this.ele.className)
                }
                if (this.rootEle) {
                    c.push('border-top','border-left','border-right')
                }
                if (this.rootEle && (this.eleIndex + 1) == this.parentEle.children.length) {
                    c.push('border-bottom')
                }

                return c;
            }
        },
        style: {
            get() {
                return {
                    minHeight:'100px'
                };
            }
        }
    }
}
</script>