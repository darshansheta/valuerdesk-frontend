export default {
    methods:{
        convertArea(val,from,to, response = 'N/A') {
            if (val === null) {
                return response;
            }
            if (_.isEmpty(val+'')) {
                return response;
            }

            if (from == to) {
                return val;
            }

            let toVal = parseFloat(val);

            if (from == 'm') {
                switch (to) {
                    case 'ft':
                        toVal = Math.round((parseFloat(val) * 10.764)*100)/100;
                        break;
                    case 'yd':
                        toVal = Math.round((parseFloat(val) * 1.1960)*100)/100;
                        break;
                }
            }

            if (from == 'ft') {
                switch (to) {
                    case 'm':
                        toVal = Math.round((parseFloat(val) * 0.0929)*100)/100;
                        break;
                    case 'yd':
                        toVal = Math.round((parseFloat(val) * 0.111)*100)/100;
                        break;
                }
            }

            if (from == 'yd') {
                switch (to) {
                    case 'm':
                        toVal = Math.round((parseFloat(val) * 0.836)*100)/100;
                        break;
                    case 'ft':
                        toVal = Math.round((parseFloat(val) * 9)*100)/100;
                        break;
                }
            }

            return parseFloat(toVal).toFixed(2);
        }
    }
}