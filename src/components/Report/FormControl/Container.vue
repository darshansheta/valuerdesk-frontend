<template>
    <div class="container">
       <template v-for="(ele,k) in reportForm">
           <component :is="ele.component" :ele="ele" :eleIndex="k" :parentEle="{children:reportForm}" :rootEle="true"></component>
       </template>
    </div>
</template>
<script>
import Col from './Col';
import Row from './Row';

const initialData = () => {
    return {
        
    }
}


export default {
    name: 'Container',
    data:initialData,
    props: {
        show : {
            type: Boolean
        },
        reportForm:{
            type:[String,Array],
            default:() => []
        }
    },
    created() {
        
    },
    mounted() {
        
    },
    components: {
        Row,
        Col
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