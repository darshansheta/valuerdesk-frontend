<template>
    <div class="card card-default" style="margin-bottom: 5px;">
        <div class="card-body card-4-8">
            <div class="card-left">
                <p>
                    <router-link tag="a" :to="'/orders/'+order.id">
                      <strong>#{{order.fileNumber}}</strong>
                    </router-link>
                </p>
                <p> <span v-html="$options.filters.statusLabel(order.statusId)"></span> {{order.property.borrowerFirstName}} {{order.property.borrowerLastName}}
                                    </p>
            </div>
            <div class="text-right card-right">
                <h4 class="contrast price">{{order.property.district}},{{order.property.pincode}}</h4>
                <p>
                    <span>{{order.createdAt | dateTime('short')}}</span>
                    <i class="fa fa-clock-o"></i>
                </p>
            </div>
            <div class="clearfix"></div>
        </div>
    </div>
</template>
<script>
export default{
    name:'Card',
    data:function(){
        return {
            abc:0
        };
    },
    props:{
        order:{
            type: Object,
            default: function(){
                return {
                    fileNumber: '',
                    address: '',
                    district: '',
                    createdAt: '',
                    property: {
                        address:'',
                        landmark:'',
                        locality:'',
                        pincode:'',
                        subdistrict:'',
                        district:'',
                        state:'',
                        borrowerFirstName:'',
                        borrowerLastName:'',
                        borrowerMiddleName:'',
                    }
                }
            }
        }
    }
}
</script>