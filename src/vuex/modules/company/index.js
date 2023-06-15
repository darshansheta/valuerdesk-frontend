import mutations from './mutations'
import actions from './actions'
import _ from 'lodash'

const initalFields = [{
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
            
const otherFields = [{
                name: 'op',
                sortField: 'op',
                title: 'Open',
                dataClass:'ta nw',
                titleClass:'ta nw'
            },{
                name: 'hp',
                sortField: 'hp',
                title: 'High',
                dataClass:'ta nw',
                titleClass:'ta nw'
            },{
                name: 'lp',
                sortField: 'lp',
                title: 'Low',
                dataClass:'ta nw',
                titleClass:'ta nw'
            },{
                name: 'q_val',
                sortField: 'q_val',
                title: 'Volume',
                dataClass:'ta nw',
                titleClass:'ta nw',
                callback: function(val) {
                    return val.toFixed(2);
                }
            },{
                name: 'd_volt',
                sortField: 'd_volt',
                title: 'S.D.',
                dataClass:'ta nw',
                titleClass:'ta nw',
                callback: function(val) {
                    return val.toFixed(2);
                }
            },{
                name: 'doji',
                sortField: 'doji',
                title: 'Doji.',
                dataClass:'ta nw',
                titleClass:'ta nw',
                callback: function(val) {
                    return val.toFixed(2);
                }
            },{
                name: '',
                sortField: 'a5p',
                title: 'SMA 5',
                dataClass:'ta nw',
                titleClass:'ta nw',
                callback: function(row) {
                    if (row.sma5 === null) {
                        return '';
                    }if (row.a5p === null) {
                        row.a5p = 0;
                    }
                    let cls = (row.a5p > 0) ? 'label-primary whitec' : (row.a5p < 0) ? 'label-danger whitec' : '';
                    let css = (Math.abs(row.a5p/100)*10)*2;

                    return `
                         <div style="position:relative;">
                            <div class="${cls} pull-right" style="opacity: ${css}; width:100%;position:absolute; top:0; left:0;right:0;bottom:0;"></div>
                            <div id="div2" style="position:relative; top:0; left:0;text-align: right;padding-right: 3px;">${row.sma5} - [${row.a5p}%]</div>
                        </div>
                    `;
                }
            },{
                name: '',
                sortField: 'a10p',
                title: 'SMA 10',
                dataClass:'ta nw',
                titleClass:'ta nw',
                callback: function(row) {
                    if (row.sma10 === null) {
                        return '';
                    }if (row.a10p === null) {
                        row.a10p = 0;
                    }
                    let cls = (row.a10p > 0) ? 'label-primary whitec' : (row.a10p < 0) ? 'label-danger whitec' : '';
                    let css = (Math.abs(row.a10p/100)*10)*2;

                    return `
                         <div style="position:relative;">
                            <div class="${cls} pull-right" style="opacity: ${css}; width:100%;position:absolute; top:0; left:0;right:0;bottom:0;"></div>
                            <div id="div2" style="position:relative; top:0; left:0;text-align: right;padding-right: 3px;">${row.sma10} - [${row.a10p}%]</div>
                        </div>
                    `;
                }
            },{
                name: '',
                sortField: 'a20p',
                title: 'SMA 20',
                dataClass:'ta nw',
                titleClass:'ta nw',
                callback: function(row) {
                    if (row.sma20 === null) {
                        return '';
                    }if (row.a20p === null) {
                        row.a20p = 0;
                    }
                    let cls = (row.a20p > 0) ? 'label-primary whitec' : (row.a20p < 0) ? 'label-danger whitec' : '';
                    let css = (Math.abs(row.a20p/100)*10)*2;

                    return `
                         <div style="position:relative;">
                            <div class="${cls} pull-right" style="opacity: ${css}; width:100%;position:absolute; top:0; left:0;right:0;bottom:0;"></div>
                            <div id="div2" style="position:relative; top:0; left:0;text-align: right;padding-right: 3px;">${row.sma20} - [${row.a20p}%]</div>
                        </div>
                    `;
                }
            },{
                name: '',
                sortField: 'a30p',
                title: 'SMA 30',
                dataClass:'ta nw',
                titleClass:'ta nw',
                callback: function(row) {
                    if (row.sma30 === null) {
                        return '';
                    }if (row.a30p === null) {
                        row.a30p = 0;
                    }
                    let cls = (row.a30p > 0) ? 'label-primary whitec' : (row.a30p < 0) ? 'label-danger whitec' : '';
                    let css = (Math.abs(row.a30p/100)*10)*2;

                    return `
                         <div style="position:relative;">
                            <div class="${cls} pull-right" style="opacity: ${css}; width:100%;position:absolute; top:0; left:0;right:0;bottom:0;"></div>
                            <div id="div2" style="position:relative; top:0; left:0;text-align: right;padding-right: 3px;">${row.sma30} - [${row.a30p}%]</div>
                        </div>
                    `;
                }
            },{
                name: '',
                sortField: 'a40p',
                title: 'SMA 40',
                dataClass:'ta nw',
                titleClass:'ta nw',
                callback: function(row) {
                    if (row.sma40 === null) {
                        return '';
                    }if (row.a40p === null) {
                        row.a40p = 0;
                    }
                    let cls = (row.a40p > 0) ? 'label-primary whitec' : (row.a40p < 0) ? 'label-danger whitec' : '';
                    let css = (Math.abs(row.a40p/100)*10)*2;

                    return `
                         <div style="position:relative;">
                            <div class="${cls} pull-right" style="opacity: ${css}; width:100%;position:absolute; top:0; left:0;right:0;bottom:0;"></div>
                            <div id="div2" style="position:relative; top:0; left:0;text-align: right;padding-right: 3px;">${row.sma40} - [${row.a40p}%]</div>
                        </div>
                    `;
                }
            },{
                name: '',
                sortField: 'a50p',
                title: 'SMA 50',
                dataClass:'ta nw',
                titleClass:'ta nw',
                callback: function(row) {
                    if (row.sma50 === null) {
                        return '';
                    }if (row.a50p === null) {
                        row.a50p = 0;
                    }
                    let cls = (row.a50p > 0) ? 'label-primary whitec' : (row.a50p < 0) ? 'label-danger whitec' : '';
                    let css = (Math.abs(row.a50p/100)*10)*2;

                    return `
                         <div style="position:relative;">
                            <div class="${cls} pull-right" style="opacity: ${css}; width:100%;position:absolute; top:0; left:0;right:0;bottom:0;"></div>
                            <div id="div2" style="position:relative; top:0; left:0;text-align: right;padding-right: 3px;">${row.sma50} - [${row.a50p}%]</div>
                        </div>
                    `;
                }
            },{
                name: '',
                sortField: 'a100p',
                title: 'SMA 100',
                dataClass:'ta nw',
                titleClass:'ta nw',
                callback: function(row) {
                    if (row.sma100 === null) {
                        return '';
                    }if (row.a100p === null) {
                        row.a100p = 0;
                    }
                    let cls = (row.a100p > 0) ? 'label-primary whitec' : (row.a100p < 0) ? 'label-danger whitec' : '';
                    let css = (Math.abs(row.a100p/100)*10)*2;

                    return `
                         <div style="position:relative;">
                            <div class="${cls} pull-right" style="opacity: ${css}; width:100%;position:absolute; top:0; left:0;right:0;bottom:0;"></div>
                            <div id="div2" style="position:relative; top:0; left:0;text-align: right;padding-right: 3px;">${row.sma100} - [${row.a100p}%]</div>
                        </div>
                    `;
                }
            },{
                name: '',
                sortField: 'a200p',
                title: 'SMA 200',
                dataClass:'ta nw',
                titleClass:'ta nw',
                callback: function(row) {
                    if (row.sma200 === null) {
                        return '';
                    }if (row.a200p === null) {
                        row.a200p = 0;
                    }
                    let cls = (row.a200p > 0) ? 'label-primary whitec' : (row.a200p < 0) ? 'label-danger whitec' : '';
                    let css = (Math.abs(row.a200p/100)*10)*2;

                    return `
                         <div style="position:relative;">
                            <div class="${cls} pull-right" style="opacity: ${css}; width:100%;position:absolute; top:0; left:0;right:0;bottom:0;"></div>
                            <div id="div2" style="position:relative; top:0; left:0;text-align: right;padding-right: 3px;">${row.sma200} - [${row.a200p}%]</div>
                        </div>
                    `;
                }
            }
            ];


export default {
    state: {
        companies: [],
        params:{},
        days:{},
        fields:initalFields
    },
    getters: {
        getCompanies : state => {
            let companies = state.companies;
            let params = state.params;
            let filters = function(){
                return state.params.filters
            }();
            //if (state.params.filters != undefined)
            //filters = JSON.parse(state.params.filters);
            if (filters != undefined) {
                console.log(filters.mindoji);
            }
            companies = _.filter(companies, function(o) {

                if (filters != undefined) {
                    if(filters.symbol != undefined && filters.symbol.trim() != '' && o.symbol.toLowerCase().indexOf(filters.symbol.toLowerCase()) == -1) {
                        return false;
                    }
                    if(filters.indices.length && o.indices.filter(function(obj) { return filters.indices.indexOf(obj) != -1; }).length == 0)
                    {
                        return false;
                    }
                    if(filters.volume!= "" && o.q_val < parseFloat(filters.volume))
                    {
                        return false;
                    }
                    if(filters.volatility!= "" && o.d_volt < parseFloat(filters.volatility))
                    {
                        return false;
                    }
                    if(filters.mindoji!= "" && o.doji < parseFloat(filters.mindoji))
                    {
                        return false;
                    }
                    if(filters.maxdoji!= "" && o.doji > parseFloat(filters.maxdoji))
                    {
                        return false;
                    }
                }

                return true;
            });
            //console.log(state.params.filters)
            var page = state.params.page || 1,
            per_page = 25,
            offset = (page - 1) * per_page;
            if (state.params.sort && state.params.sort.sortBy) {
                companies = _.orderBy(companies, state.params.sort.sortBy, state.params.sort.sortOrder);
            }
            var paginatedItems = companies.slice((page-1) * per_page, (page) * per_page);
            return {
                page: page,
                current_page: page,
                per_page: per_page,
                total: companies.length,
                last_page: Math.ceil(companies.length / per_page),
                to: Math.ceil(companies.length / per_page),
                data: paginatedItems
            };
        },
        getDays : state => state.days,
        getFields: state => {
            const atField = state.params.atField || 'cp';
                    let kx = Object.keys(state.days);
                    let fields = [];
                            if(state.days)
                            for (var ix in kx ) {
                                if(ix != 0) {
                                    let ff = {
                                        name: "stocks."+kx[ix],
                                        //name: "",
                                        sortField: "stocks."+kx[ix]+"."+atField,
                                        title: state.days[kx[ix]].at.substring(5, 10),
                                        titleClass:'ta nw',
                                        callback: function(at) {
                                            //let diff =  parseFloat(at.cp) - parseFloat(at.pcp);
                                            if (at === null) {
                                                return '';
                                            }if (at.diff === null) {
                                                at.diff = 0;
                                            }
                                            let cls = (at.diff > 0) ? 'label-primary whitec' : (at.diff < 0) ? 'label-danger whitec' : '';
                                            //let clr = (diff > 0) ? 'blue' : (diff < 0) ? 'red' : '';
                                            //let pre = (diff*100/parseFloat(at.pcp)).toFixed(2);
                                            let css = (Math.abs(at.per/100)*10)*2;
                                            //return '<span class="'+cls+' pull-right" style="opacity: '+css+'; width:100%;">'+at.cp+'</span>';

                                            return `
                                                 <div style="position:relative;">
                                                    <div class="${cls} pull-right" style="opacity: ${css}; width:100%;position:absolute; top:0; left:0;right:0;bottom:0;"></div>
                                                    <div id="div2" style="position:relative; top:0; left:0;text-align: right;padding-right: 3px;">${at[atField]}</div>
                                                </div>
                                            `;

                                        }
                                    };
                                    fields.push(ff);
                                }
                            }
                    return [...state.fields, ...fields, ...otherFields];
        }
    },
    actions,
    mutations
}