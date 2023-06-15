export default {
    props: {
    },
    data() {
        return {
            
        };
    },
    methods: {
        
    },
    computed : {
        controlLabel() {
            return this.control.label || this.control.type+' label'
        }
    }
}