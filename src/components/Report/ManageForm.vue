<template>
    <!-- <b-modal
        :keyboard="false"
        :backdrop="false"
        classd="modal-right"
        v-model="show"
        :title="`Report Form - ${report.name}`"
        ref="modal"
        :dialog-style="{width:'90%'}"
        :footer="false"
        :before-close="hide"
    > -->
       <div>
        <h4>{{`Report Form - ${report.name}`}}</h4>
           <form-builder type="template" v-model="form" :elements="reportElements" ></form-builder>
           <hr>
           <button class="btn btn-primary" @click.stop.prevent="updateReportForm">SAVE</button> 
           <button class="btn" @click.stop.prevent="hide">CANCEL</button>
       </div>
    <!-- </b-modal> -->
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Router from 'vue-router'
import rules from '@/validations/rules';
import Row from './FormControl/Row';
import Col from './FormControl/Col';
import draggable from 'vuedraggable';
import FormBuilder from '@/components/FormBuilder/FormBuilder';

const initialData = () => {
    return {
        buttonDisabled:false,
        reportElements:[],
        form:{}
    }
}


export default {
    name: 'ManageForm',
    data:initialData,
    props: {
        show : {
            type: Boolean
        },
        reportForm : {
            type: Array,
            default: () => []
        },
        report:{
            type:Object,
            default:() => {}
        }
    },
    created() {
        this.form = this.report.form
        if(Array.isArray(this.report.form)) {
            this.form = {};
        }
    },
    mounted() {
        let self = this;
        this.getReportElementsAction({id:this.report.id}).then(resp => {
            self.reportElements = resp.data;
        })
    },
    components: {
        draggable,
        Row,
        Col,
        FormBuilder,
    },
    methods: {
        ...mapActions({
            updateReportElementsAction: 'report/updateReportElementsAction',
            getReportAttributesAction:'setting/getReportAttributesAction',
            getReportElementsAction: 'report/getReportElementsAction',
            updateReportFormAction: 'report/updateReportFormAction',
        }),
        hide() {
            this.$emit('hide')
        },
        updateReportForm() {
            this.updateReportFormAction({id:this.report.id, form:this.form})
        }
    },
    computed: {
        ...mapGetters({
            elements: 'setting/attributesGetter'
        })
    }
}
</script>