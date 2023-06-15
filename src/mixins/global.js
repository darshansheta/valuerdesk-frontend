import {mapGetters, mapActions} from 'vuex'
import hasPermission,{ hasRole } from '@/utils/permission';
export default {
    data:() => {
        return {
            dataLoading:false
        }
    },
    methods: {
        ...mapActions({
            setRequestStatusAction: 'common/setRequestStatusAction',
            getOrderDetailsAction: 'order/getOrderDetailsAction',
        }),
        loadOrder: function (id) {
            if (this.$router.currentRoute.name != 'orders') {
                this.$router.push('orders');
            } 
            this.getOrderDetailsAction({id});
        },
        hasPermission: (p) => {
            return hasPermission(p)
        },
        hasRole: (p) => {
            return hasRole(p)
        },
        setRequestStatus(status) {
            this.setRequestStatusAction({status});
        },
        requestLoading() {
            this.setRequestStatus('loading');
        },
        loaded() {
            this.setRequestStatus('loaded');
        },
        numberWithCommas(x) {
            if (!x) {
                return x;
            }
            var parts = x.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return parts.join(".");
        },
        numberToWords(num) {
            var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
            var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

                if ((num = num.toString()).length > 9) return 'overflow';
                let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
                if (!n) return; var str = '';
                str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
                str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
                str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
                str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
                str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
                return str;  
        },
        numberOnly: function(evt) {
          evt = (evt) ? evt : window.event;
          var charCode = (evt.which) ? evt.which : evt.keyCode;
          if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
            evt.preventDefault();;
          } else {
            return true;
          }
        }
    },
    computed: {
        ...mapGetters({
            requestStatus: 'common/requestStatusGetters'
        }),
        isLoading() {
            return this.requestStatus == 'loading'
        },
        isLoaded() {
            return this.requestStatus == 'loaded';
        },
        isFormChanged() {
          if (!this.vFields) {
              return false;
          }
          return Object.keys(this.vFields).some(key => this.vFields[key].changed);
        },
        isFormDirty() {
          if (!this.vFields) {
              return false;
          }
          return Object.keys(this.vFields).some(key => this.vFields[key].dirty);
        },
        isScopeFormDirty() {
          if (!this.vFields['$scopeName']) {
              return false;
          }
          return Object.keys(this.vFields['$scopeName']).some(key => this.vFields['$scopeName'][key].dirty);
        }
    }
    
}