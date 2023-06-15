<template>
    
    <b-modal
            :keyboard="false"
            :backdrop="false"
            class=""
            v-model="show"
            :title="`Creat Property Meta ( ${type} )`"
            ref="modal"
            :before-close="hide"
        >
            <form 
                class="form-horizontal"
                @submit.prevent="validateForm('meta')"
                autocomplete="off"
            >
                <vee-input
                    label="Meta"
                    v-model="meta.name" 
                    :rules="`required|max:200`"
                    name="meta"
                />

                <div class="form-group">
                    <div class="col-sm-offset-3 col-sm-9">
                        <button type="submit" :disabled="buttonDisabled" v-on:click.prevent="validateForm('meta')" class="btn btn-primary ">SUBMIT</button>
                        <button type="button" class="btn btn-default" @click="hide">CANCEL</button>
                    </div>
                </div>
            </form>
            
            <div slot="footer"> 
                
            </div>
        </b-modal>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Dropdown from '@/components/Shared/Dropdown';
import Btn from '@/components/Shared/button/Btn';
const data = () => {
        return {
            meta:{
                name: ''
            },
            buttonDisabled:false
        }
    }
export default{
    name: 'CreatePropertyMeta',
    mounted() {
        
    },
    data: data,
    props: {
        show : {
            type: Boolean
        },
        type: {
            type:String
        }
    },
    components: {
        Dropdown,
        Btn
    },
    methods: {
        ...mapActions({
            createPropertyMetaAction:'setting/createPropertyMetaAction',
        }),
        validateForm(scope) {
            let self = this;
            this.$validator.validate().then((result) => {
                if (result) {
                    this.buttonDisabled = true;
                    this.createPropertyMetaAction({name:this.meta.name,type:this.type}).then((resp) => {
                        
                        
                        self.hide();
                    }).catch(function(e){
                        console.log(e)
                    }).finally(function(res){
                        self.buttonDisabled = false;
                    });

                }
            });
        },
        hide() {
            this.$emit('hide')
        }
    },
    computed: {
        ...mapGetters({
            
        })
    }
}
</script>