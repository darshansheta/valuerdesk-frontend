<template>
    <div class="container-fluid" style="padding: 10px;">
        <div v-show="!showReportFormDialog">
        <div class="container" v-if="showFroalaEditor">
            <div class="row">
            <div class="col-md-12">
                <!-- <h3>Create Report</h3>
                <hr> -->
                <vee-input
                        dcontrol-col="col-sm-5"
                        label-col="col-sm-2"
                        label="Name"
                        v-model="report.name"
                        :rules="vvRules.name"
                        name="report.name"
                    />
                <vee-input
                        dcontrol-col="col-sm-5"
                        label-col="col-sm-2"
                        label="Google Doc ID"
                        v-model="report.googleDocumentId"
                        :rules="vvRules.name"
                        name="report.googleDocumentId"
                    />
                    <!-- <froala :contenteditable="!readOnly" :tag="'textarea'" :config="config" v-model="report.body"></froala> -->
                    <!-- <div class="form-group" style="margin-top: 10px;">
                        <label>Report*</label>
                        <input type="file" id="reportFile" ref="reportFile" class="form-control-file" name=""  @change="handleFileUploads">
                    </div> -->
                    <div class="form-group" style="margin-top: 10px;">
                    <button style="" class="btn btn-primary" @click="validateForm('report')">{{saveButtonText}}</button>
                    <!-- <button style="" v-show="readOnly" class="btn btn-primary" @click="editReport">Edit</button> -->
                    <button style=""  class="btn btn-default" @click="hideForm">CANCEL</button>
                    </div>
                    <hr>
            </div>
            </div>
        </div>
        <div class="row" >
            <div class="col-md-10">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search...." v-model="reportSearch">
                    <dropdown class="input-group-btn">
                        <btn class="btn btn-default"><span class="caret"></span></btn>
                        <template slot="dropdown">
                          <li><a role="button" href="javascript:void(0)" @click="getReportsListAction">Refresh Hard</a></li>
                          <!-- <li><a role="button">Another action</a></li>
                          <li><a role="button">Something else here</a></li>
                          <li role="separator" class="divider"></li>
                          <li><a role="button">Separated link</a></li> -->
                        </template>
                      </dropdown>
                </div>
            </div>
            <div class="col-md-2">
                <button type="button" class="btn btn-primary btn-block" @click="showCreate">New</button>
            </div>
        </div>
        <br>
        <div class="panel panel-default">
        <table class="table table-condensed">
            <thead>
                <tr>
                    <th>Name</th>
                    <th style="width:200px;">Author</th>
                    <th style="width:200px;">Created</th>
                    <th style="width:250px;text-align: right;">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(report, rk) in reports" >
                    <td style="vertical-align: middle;">
                        {{report.name}}
                    </td>
                    <td style="vertical-align: middle;">
                        {{report.creator}}
                    </td>
                    <td style="vertical-align: middle;">
                        {{report.createdAt | moment("YYYY-MM-DD, h:mm a") }}
                    </td>
                    <td style="min-width: 500px;">
                        <div class="btn-group pull-right" role="group" aria-label="...">
                          <button type="button" class="btn btn-default btn-sm" @click="syncReport(report.id)">Sync <i class="fa fa-refresh" :class="{'fa-spin': syncingReport == report.id}"></i></button>
                          <button type="button" class="btn btn-default btn-sm" @click="toggleReportElementsDialog(report)">Attributes <i class="fa fa-list"></i></button>
                          <button type="button" class="btn btn-default btn-sm" @click="toggleReportFormDialog(report)">Form <i class="fa fa-object-group"></i></button>
                          <button type="button" class="btn btn-default btn-sm" @click="viewReport(report.id)">Edit Name <i class="fa fa-pencil"></i></button>
                          <a v-show="report.googleDocumentId"  :href="`https://docs.google.com/document/d/${report.googleDocumentId}/edit`" class="btn btn-default btn-sm" target="_blank" @click="viewReport(report.id)">Edit Report <i class="fa fa-file-text-o"></i></a>
                          <button type="button" class="btn btn-default btn-sm" @click="confirmDelete(report.id)">Delete <i class="fa fa-trash"></i></button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>

        <manage-element v-if="showReportElementsDialog" :show="showReportElementsDialog" @hide="toggleReportElementsDialog" :report="report" :report-elements="reportElements"></manage-element>
        <manage-form v-if="showReportFormDialog" :show="showReportFormDialog" @hide="toggleReportFormDialog" :report="report" :report-form="[]"></manage-form>
        
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import VueFroala from 'vue-froala-wysiwyg';
import FormBuilder from '@/components/FormBuilder/FormBuilder';
import rules from '@/validations/rules';
import Dropdown from '@/components/Shared/Dropdown';
import Btn from '@/components/Shared/button/Btn';
import ManageElement from './ManageElement';
import ManageForm from './ManageForm';
import Container from './FormControl/Container';
import Tribute from "tributejs";
import VueSelect from '@/components/Shared/vue-select/components/Select.vue'
import 'tributejs/dist/tribute.css';

const initialData = () => {
        return {
      config: {
        // toolbarSticky: false,
        // zIndex: 2501,
        events: {},
        documentReady: true,
        // toolbarButtons: ['undo', 'redo' , '|', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'outdent', 'indent', 'clearFormatting', 'insertTable','table' , 'html'],
        toolbarButtons: ["fullscreen","undo","redo","getPDF","print","|","bold","italic","underline","color","clearFormatting","|","alignLeft","alignCenter","alignRight","alignJustify","|","formatOL","formatUL","indent","outdent","-","paragraphFormat","|","fontFamily","|","fontSize","|","insertLink","insertImage","quote",'insertTable', 'html']
        // height: '500'
      },
      report: {
        name: '',
        body: '',
        googleDocumentId: null,
        reportFile: null
    },
    buttonDisabled:false,
    vvRules: rules('report'),
    showFroalaEditor: false,
    saveButtonText:'CREATE',
    readOnly:true,
    reportSearch:'',
    showReportElementsDialog:false,
    showReportFormDialog:false,
    reportElements:[],
    testFrom:{},
    selected:'',
    syncingReport: false,
    }
    }


export default {
    name:'Report',
    data:initialData,
    mounted() {
        this.getAllPlaceholdersAction();
    },
    components : {
        Dropdown,
        Btn,
        ManageElement,
        ManageForm,
        Container,
        FormBuilder,
        VueSelect,
    },
  methods: {
      ...mapActions({
          getReportsListAction: 'report/getReportsListAction',
          createReportAction: 'report/createReportAction',
          getReportDetailsAction: 'report/getReportDetailsAction',
          updateReportAction: 'report/updateReportAction',
          deleteReportAction: 'report/deleteReportAction',
          syncReportAction: 'report/syncReportAction',
          getReportElementsAction: 'report/getReportElementsAction',
          getAllPlaceholdersAction: 'common/getAllPlaceholdersAction',
      }),
    handleFileUploads(){
            console.log(this.$refs.reportFile, this.$refs.reportFile.files)
          this.report.reportFile = this.$refs.reportFile.files;
        },
      showCreate() {
        this.showFroalaEditor = true;
        this.reportId = 0;
        this.saveButtonText = 'CREATE';
        this.readOnly = false;
      },
      hideForm() {
        this.showFroalaEditor = false;
      },
      validateForm(scope) {
          let self = this;
          this.$validator.validate().then((result) => {
              if (result) {
                  //this['report/createReportAction'](this.report).then((resp) => { //this will also work
                  this.buttonDisabled = true;
                if (this.reportId == 0) {

                    /*
                      Initialize the form data
                    */
                    let formData = new FormData();

                    /*
                      Iteate over any file sent over appending the files
                      to the form data.
                    */
                    if (this.report.reportFile != null && this.report.reportFile.length == 1) {
                        formData.append('reportFile', this.report.reportFile[0]);
                    } else {

                    }

                    
                    formData.append('name', this.report.name);
                    formData.append('googleDocumentId', this.report.googleDocumentId);
                    formData.append('body', this.report.body);

                    this.createReportAction(formData).then((resp) => {
                        Object.assign(this.$data, initialData())
                        this.errors.clear();
                    }).catch(function(e){
                        console.log(e)
                    }).finally(function(res){
                        self.buttonDisabled = false;
                        self.showFroalaEditor = false;
                        self.reportId = 0;
                        self.readOnly = true;
                    });
                } else {
                    this.updateReportAction({id:this.reportId,...this.report}).then((resp) => {
                        Object.assign(this.$data, initialData())
                        this.errors.clear();
                    }).catch(function(e){
                        console.log(e)
                    }).finally(function(res){
                        self.buttonDisabled = false;
                        self.showFroalaEditor = false;
                        self.reportId = 0;
                        self.readOnly = true;
                    });
                  

              }
                }
          });
      },
      viewReport(id) {
            let self = this;
            this.saveButtonText = 'UPDATE';
            this.getReportDetailsAction({id, body:1}).then(function(resp){
                self.showFroalaEditor = true;
                self.reportId = resp.data.data.id;
                self.report.name = resp.data.data.name;
                self.report.body = resp.data.data.body;
                self.reportElements = resp.data.elements
                self.readOnly = true;

                // Build data to be used in At.JS config.
                let elementPlaceholders = resp.data.data.elements.map(function (value, i) {
                  return {
                    'key': value.placeholder, 'placeholder': value.placeholder, 'label': value.label
                  };
                });

                // Build data to be used in At.JS config.
                let placeholders = self.placeholders.map(function (value, i) {
                  return {
                    'key': value.placeholder, 'placeholder': value.placeholder, 'label': ''
                  };
                });

                placeholders = [...elementPlaceholders, ...placeholders];
                // Define config for At.JS.
                var config = {
                  at: "$",
                  data: placeholders,
                  displayTpl: '<li>${placeholder} <small>${label}</small></li>',
                  limit: 200,
                  insertTpl: "{${placeholder}}",
                }

                let tribute = new Tribute({
                      values:placeholders,
                      selectTemplate: function(item) {
                        return '<span class="fr-deletable fr-tribute">{' + item.original.placeholder + '}</span>';
                      },
                      menuItemTemplate: function (item) {
                          return `${item.original.placeholder} <small>${item.original.label}</small>`;
                        }
                    })

                self.config.events = {
                    'froalaEditor.initialized': function (e, editor) {
                        tribute.attach(editor.el)

                        editor.events.on('keydown', function (e) {
                            if (e.which == $.FroalaEditor.KEYCODE.ENTER && tribute.isActive) {
                                return false;
                            }
                        }, true);
                    }
                }
            })
      },
      toggleReportElementsDialog(report) {
            let self = this
            if (this.showReportElementsDialog) {
                this.showReportElementsDialog = false;
                Object.assign(this.$data, initialData())
            } else {
                this.getReportElementsAction({id:report.id}).then(( response )=>{
                    self.showReportElementsDialog = true;
                    self.reportElements = response.data;
                    self.report = report
                } )
            }
      },
      toggleReportFormDialog(r) {
            /*this.getReportDetailsAction({id}).then(function(resp){
                self.showFroalaEditor = true;
                self.reportId = resp.data.data.id;
                self.report.name = resp.data.data.name;
                self.report.body = resp.data.data.body;
                self.reportElements = resp.data.elements
                self.readOnly = true;
            });*/

            let self = this
            if (this.showReportFormDialog) {
                this.showReportFormDialog = false;
                Object.assign(this.$data, initialData())
            } else {

                this.getReportDetailsAction({id:r.id, form:1}).then(function(resp){
                    self.showFroalaEditor = false;
                    self.reportId = resp.data.data.id;
                    self.report.id = resp.data.data.id;
                    self.report.name = resp.data.data.name;
                    self.report.form = resp.data.data.form;
                    self.readOnly = true;
                    self.showReportFormDialog = true;
                });
            }
      },
      editReport() {
        this.saveButtonText = 'UPDATE';
        this.showFroalaEditor = true;
        this.readOnly = false;
      },
      hide() {
          this.$emit('hide')
      },
    confirmDelete(id) {
        let self = this
        this.$confirm({
                  title: 'Delete',
                  content: 'Are you really want to delete this report?'
                }).then(() => {
                    this.deleteReportAction({id}).then(() => {
                        if (self.reportId == id) {
                            self.reportId = 0;
                            self.showFroalaEditor = false;
                        }
                    })
                }).catch(() => {
                });
    },
    syncReport(id) {
        this.syncingReport = id;
        this.syncReportAction({id}).then(() => {
            this.syncingReport = false;
        })
    }
  },
  computed: {
    ...mapGetters({
        shownReport : 'report/reportDetailsGetter',
        placeholders : 'common/placeholdersGetters'
    }),
    reports() {
        return this.$store.getters['report/filterReportsByName'](this.reportSearch)
    }
  }

}
</script>