<style scoped="">
.v-scroll {
    height:250px;
    max-height:250px;
    overflow-y:auto;
}
</style>
<template>
    <div class="row" style="margin-top: 10px;margin-bottom: 10px;">
        <div class="col-sm-4" v-for="(meta,k) in propertyMeta">
            <div class="panel panel-white v-scroll">
              <div class="panel-heading" style="background-color:#f5f5f5; "><b>{{k.replace('_',' ').toUpperCase()}}</b> <i class="fa fa-plus pull-right" style="cursor: pointer;"  @click="toggleCreateMetaDialog(k)"></i>  </div>
              <table class="table table-condensed">
                <tbody>
                    <tr v-for="(m,k) in meta" :class="{'danger' : !m.active}">
                        <td>{{m.name}}</td>
                        <td width="10%" style="max-width:10%;">
                            <i :class="{'fa' : 1, 'fa-eye' : !m.active, 'fa-eye-slash' : m.active}" @click.prevent="togglePropertyMetaAction({id:m.id})" style="cursor: pointer;"></i>
                        </td>
                    </tr>
                </tbody>
              </table>
            </div>
        </div>
        <create-property-meta v-if="showCreateMetaDialog" :show="showCreateMetaDialog" @hide="toggleCreateMetaDialog('')" :type="createMetaType" ></create-property-meta>
    </div>
</template>
<script type="text/javascript">
import { mapGetters, mapActions } from 'vuex';
import CreatePropertyMeta from './CreatePropertyMeta';
import draggable from 'vuedraggable';
export default {
    name: 'propertyMeta',
    data: () => {
        return {
            showCreateMetaDialog: false,
            createMetaType: ''
        }
    },
    props: {

    },
    components : {
        CreatePropertyMeta,
        draggable
    },
    mounted() {
        this.getPropertyMetaAction()
    },
    methods: {
        ...mapActions({
            getPropertyMetaAction: 'setting/getPropertyMetaAction',
            togglePropertyMetaAction: 'setting/togglePropertyMetaAction',
        }),
        toggleCreateMetaDialog: function (type) {
            this.createMetaType = type;
            this.showCreateMetaDialog = !this.showCreateMetaDialog
        },
        getClass(c1,active) {
            return [
                c1,
                active ? 'fa-eye-slash' : 'fa-eye'
            ]
        }
    },
    computed: {
        ...mapGetters({
            propertyMeta: 'setting/propertyMetaGetter'
        })
    }
}
</script>