<template>
    <div class="container" style="padding: 10px;">
        <div class="row" v-if="showFroalaEditor">
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
                        :readonly="readOnly"
                    />
                    <froala :contenteditable="!readOnly" :tag="'textarea'" :config="config" v-model="report.body"></froala>
                    <div class="form-group" style="margin-top: 10px;">
                    <button style="" v-show="!readOnly" class="btn btn-primary" @click="validateForm('report')">{{saveButtonText}}</button>
                    <button style="" v-show="readOnly" class="btn btn-primary" @click="editReport">Edit</button>
                    <button style=""  class="btn btn-default" @click="hideForm">CANCEL</button>
                    </div>
                    <hr>
            </div>
        </div>
        <div class="row">
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
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th style="text-align: right;">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(report, rk) in reports" >
                    <td style="vertical-align: middle;">
                        {{report.name}}
                    </td>
                    <td>
                        <div class="btn-group pull-right" role="group" aria-label="...">
                          <button type="button" class="btn btn-default btn-sm" @click="toggleReportElementsDialog(report)"><i class="fa fa-list"></i></button>
                          <button type="button" class="btn btn-default btn-sm" @click="viewReport(report.id)"><i class="fa fa-pencil"></i></button>
                          <button type="button" class="btn btn-default btn-sm" @click="confirmDelete(report.id)"><i class="fa fa-trash"></i></button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>

        <manage-element v-if="showReportElementsDialog" :show="showReportElementsDialog" @hide="toggleReportElementsDialog" :report="report" :report-elements="reportElements"></manage-element>

    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import VueFroala from 'vue-froala-wysiwyg';
import rules from '@/validations/rules';
import Dropdown from '@/components/Shared/Dropdown';
import Btn from '@/components/Shared/button/Btn';
import ManageElement from './ManageElement';

// Define data source for At.JS.
    var datasource = ["Jacob", "Isabella", "Ethan", "Emma", "Michael", "Olivia" ];
 
    // Build data to be used in At.JS config.
    var names = $.map(datasource, function (value, i) {
      return {
        'id': i, 'name': value, 'email': value + "@email.com"
      };
    });
 
    // Define config for At.JS.
    var config = {
      at: "@",
      data: names,
      displayTpl: '<li>${name} <small>${email}</small></li>',
      limit: 200,
      insertTpl: "[${atwho-at}${name}]",
    }


const initialData = () => {
        return {
      config: {
        //toolbarSticky: false,
        zIndex: 2501,
        events: {
          'froalaEditor.initialized': function (e, editor) {
            console.log('initialized')
            editor.$el.atwho(config).on('inserted.atwho', function () {
        editor.$el.find('.atwho-inserted').removeAttr('contenteditable');
      });
 
        editor.events.on('keydown', function (e) {
          if (e.which == $.FroalaEditor.KEYCODE.ENTER && editor.$el.atwho('isSelecting')) {
            return false;
          }
        }, true);
          }
        },

        height: '500'
      },
      report: {
        name: '',
        body: ''
    },
    buttonDisabled:false,
    vvRules: rules('report'),
    showFroalaEditor: false,
    saveButtonText:'CREATE',
    readOnly:true,
    reportSearch:'',
    showReportElementsDialog:false,
    reportElements:[]
    }
    }


export default {
    name:'Report',
    data:initialData,
    components : {
        Dropdown,
        Btn,
        ManageElement
    },
  methods: {
      ...mapActions({
          getReportsListAction: 'report/getReportsListAction',
          createReportAction: 'report/createReportAction',
          getReportDetailsAction: 'report/getReportDetailsAction',
          updateReportAction: 'report/updateReportAction',
          deleteReportAction: 'report/deleteReportAction',
          getReportElementsAction: 'report/getReportElementsAction',
      }),
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
                    this.createReportAction(this.report).then((resp) => {
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
            let self = this
            this.getReportDetailsAction({id}).then(function(resp){
                self.showFroalaEditor = true;
                self.reportId = resp.data.data.id;
                self.report.name = resp.data.data.name;
                self.report.body = resp.data.data.body;
                self.reportElements = resp.data.elements
                self.readOnly = true;
                let Atconfig = resp.data.data.elements

                // Build data to be used in At.JS config.
                var names = $.map(resp.data.data.elements, function (value, i) {
                  return {
                    'id': value.placeholder, 'placeholder': value.placeholder, 'label': value.label
                  };
                });
                // Define config for At.JS.
                var config = {
                  at: "$",
                  data: names,
                  displayTpl: '<li>${placeholder} <small>${label}</small></li>',
                  limit: 200,
                  insertTpl: "{${placeholder}}",
                }

                self.config.events = {
                    'froalaEditor.initialized': function (e, editor) {
                        console.log('initialized')
                        editor.$el.atwho(config).on('inserted.atwho', function () {
                            editor.$el.find('.atwho-inserted').removeAttr('contenteditable');
                        });

                        editor.events.on('keydown', function (e) {
                            if (e.which == $.FroalaEditor.KEYCODE.ENTER && editor.$el.atwho('isSelecting')) {
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
                    self.reportElements = response.data
                    self.report = report
                } )
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
  },
  computed: {
    ...mapGetters({
        shownReport : 'report/reportDetailsGetter'
    }),
    reports() {
        return this.$store.getters['report/filterReportsByName'](this.reportSearch)
    }
  }

}
</script>