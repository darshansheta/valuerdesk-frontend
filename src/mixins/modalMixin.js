export default {
    props: {
        show : {
            type: Boolean
        }
    },
    methods: {
        hide() {
            this.$emit('hide')
        }
    }
    
}