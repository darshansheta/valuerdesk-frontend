<template>
    <div>
        <div class="row">
            <div class="col-sm-2 col-xs-6">
                <div class="form-group">
                    <label for="">Display DAs</label>
                    <select 
                        class="form-control"
                        v-model="fieldFormatter"
                        v-on:change.prevent="setAtField(fieldFormatter)"
                        >
                        <option value="cp">Value</option>
                        <option value="per">Percentage</option>
                        <option value="diff">Diffrence</option>
                    </select>
                  </div>
            </div>
            <div class="col-sm-2 col-xs-6">
                <div class="form-group">
                    <label for="">Symbol</label>
                    <input type="text" 
                        class="form-control"
                        v-model="filters.symbol"
                        >
                </div>
                
            </div>
            <div class="col-sm-2 col-xs-6">
                <div class="form-group">
                    <label for="">Min Volume</label>
                    <input type="number" step="0.5" min="0" 
                        class="form-control"
                        v-model="filters.volume"
                        >
                </div>
                
            </div>
            <div class="col-sm-2 col-xs-6">
                <div class="form-group">
                    <label for="">Doji</label>
                    <div class="input-group">
                      <input type="number" class="form-control" step="0.5" min="0" v-model="filters.mindoji">
                      <span class="input-group-addon" id="basic-addon1"></span>
                      <input type="number" class="form-control" step="0.5" max="100" v-model="filters.maxdoji">
                    </div>  
                </div>
            </div>
            <div class="col-sm-2 col-xs-6">
                <div class="form-group">
                    <label for="">Min Volatility</label>
                    <input type="number" step="0.5" min="0" 
                        class="form-control"
                        v-model="filters.volatility"
                        >
                </div>
            </div>
        </div>
        <div id="company-table-wrapper">
            <my-table 
            v-bind:fields="fields" 
            v-bind:data="companies"
            v-bind:displayIndex="false"
            v-bind:responsive="true"
            v-on:change="getPageCompanies"
            >

        </my-table>
    </div>
</div>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
import MyTable from '@/components/Shared/MyTable'
import CssConfig from '@/components/Shared/VuetableCssConfig.js'

export default {
    name: 'List',
    data: () => {
        let fields = [{
                name: 'id',
                title:'#',
                sortField: 'id',
                visible:false
            }, {
                name: 'name',
                sortField: 'name',
                title: 'Name',
                visible: false
            }, {
                name: 'symbol',
                sortField: 'symbol',
                title: 'Symbol',
                dataClass:'fixed-column',
                titleClass:'fixed-column',
            }, {
                name: 'lot',
                sortField: 'lot',
                title: 'Lot size',
                visible:false
            }, {
                name: 'margin',
                sortField: 'margin',
                title: 'Margin',
                visible:false
            }, ];



        return {
            //fields,
            css: CssConfig,
            fieldFormatter: 'cp',
            filters: {
                symbol:'',
                indices:[],
                volume:0,
                volatility:1.5,
                mindoji:0,
                maxdoji:100
            },
            showDD:false
        }
    },
    created() {
        this.setFilters();
        // if (!this.companies.data.length) {
        //     this.getCompanies({
        //         page: 1, // static values for a shorter example
        //         perPage: 10,
        //         filters: {},
        //         sort: {}
        //     });
        // }


        // let kx = Object.keys(this.days);
        // if(this.days)
        // for (var ix in kx ) {
        //     if(ix != 0) {
        //         let ff = {
        //             name: "stocks."+kx[ix],
        //             //name: "",
        //             sortField: "stocks."+kx[ix]+".cp",
        //             title: this.days[kx[ix]].at.substring(5, 10),
        //             titleClass:'ta',
        //             callback: function(at) {
        //                 let diff =  parseFloat(at.cp) - parseFloat(at.pcp);
        //                 let cls = (diff > 0) ? 'label-primary whitec' : (diff < 0) ? 'label-danger whitec' : '';
        //                 let clr = (diff > 0) ? 'blue' : (diff < 0) ? 'red' : '';
        //                 let pre = (diff*100/parseFloat(at.pcp)).toFixed(2);
        //                 let css = (Math.abs(pre/100)*10)*2;
        //                 //return '<span class="'+cls+' pull-right" style="opacity: '+css+'; width:100%;">'+at.cp+'</span>';

        //                 return `
        //                      <div style="position:relative;">
        //                         <div class="${cls} pull-right" style="opacity: ${css}; width:100%;position:absolute; top:0; left:0;right:0;bottom:0;"></div>
        //                         <div id="div2" style="position:relative; top:0; left:0;text-align: right;padding-right: 3px;">${at.cp}</div>
        //                     </div>
        //                 `;

        //             }
        //         };
        //         this.fields.push(ff);
        //     }
        // }
    },
    props: {
      dfieldFormatter: {
          type: String,
          default: 'cp'
      }
    },
    computed: mapGetters({
        companies: 'getCompanies',
        days: 'getDays',
        fields: 'getFields',
    }),
    methods: {
        ...mapActions({
            'getCompanies': 'ALL_COMPANY',
            'setTableParams': 'SET_PARAMS'
        }),
        getPageCompanies: function(aa) {
            this.setTableParams(aa)
        },
        setAtField:function(tt) {
             this.setTableParams({atField:tt})
        },
        setFilters:function() {
            this.setTableParams({filters:{
                symbol:this.filters.symbol,
                indices:this.filters.indices,
                volume:this.filters.volume,
                volatility:this.filters.volatility,
                mindoji:this.filters.mindoji,
                maxdoji:this.filters.maxdoji,
            }});
        },
        toggleIndexDD:function(){
            this.showDD = !this.showDD;
            console.log(this.showDD)
        }
        // ,
        // onChangePage(page) {
        //     this.getCompanies({
        //         page: page, // static values for a shorter example
        //         perPage: 25,
        //         filters: {},
        //         sort: {}
        //     });
        // },

    },
    components: {
        MyTable
    },
    watch: {
        filters: {
            handler:function(nVal,oVal){
                this.setFilters();
                
            },
            deep:true
        }
    }
}
</script>
<style scoped>
.whitec {
    color: #fff;
    text-align: right;
}
.ta {
    text-align: right;
}
#company-table-wrapper .fixed-column-temp {
position:absolute;
background: white;
width:110px;
overflow: hide;
padding-right: 112px;
}
#company-table-wrapper .table-temp {
margin-left: 112px;
}



.table > thead:first-child > tr:first-child > th:first-child {
    position: absolute;
    display: inline-block;
    background-color: white;
    width:110px;
    z-index:100;
    overflow: hide;
}

.table > tbody > tr > td:first-child {
    position: absolute;
    display: inline-block;
    background-color: white;
    width:110px;
    z-index:100;
}

.table > thead:first-child > tr:first-child > th:nth-child(2) {
    padding-left: 110px;
}

.table > tbody > tr > td:nth-child(2) {
    padding-left: 115px !important;
}

.nw  {
    white-space: nowrap;
}

</style>