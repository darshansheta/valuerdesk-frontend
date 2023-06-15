<style scoped>
    .main-nav-bg {
        width: 251px;
        position: absolute;
        float: left;
        border-right: 1px solid #dddddd;
        /*background: #f4f4f4;*/
        display: block;
        z-index: -1;
        top: 0;
        bottom: 0;
    }
    .main-nav {
    width: 250px;
    position: absolute;
    left: 0;
    top: 51px;
}
.content {
    margin-left: 251px;
    /*background: #fbfbfb;*/
    min-width: 276px;
}
</style>
<template>
    <div style="padding-top: 15px; ">
        <div class="row">
            <div class="main-nav-bg"></div>
            <div class="main-nav">
                <div class="list-group">
                    <a href="#" class="list-group-item active" @click.prevent="selectTab" relatedTab="info" >
                       <i class="fa fa-building"></i>  Organization Information
                    </a>
                    <a href="#" class="list-group-item" @click.prevent="selectTab" relatedTab="attribute" ><i class="fa fa-cubes"></i> Report Attributes</a>
                    <!-- <a href="#" class="list-group-item" @click.prevent="selectTab" relatedTab="integration" ><i class="fa fa-bookmark"></i> Integrations</a> -->
                    <a href="#" class="list-group-item" @click.prevent="selectTab" relatedTab="general" ><i class="fa fa-cogs"></i> General Settings</a>
                    <a href="#" class="list-group-item" @click.prevent="selectTab" relatedTab="propertyMeta" ><i class="fa fa-bars"></i> Property Metdata</a>
                    <a href="#" class="list-group-item" @click.prevent="selectTab" relatedTab="placeHolders" ><i class="fa fa-tags"></i> System placeHolders</a>
                </div>
            </div>
            <section class="content">
                <div class="container-fluid bg-white">
                    <!-- <div class="row"> -->
                        <div v-if="currentTab == 'info'">
                            <company-setting></company-setting>
                        </div>
                        <div v-if="currentTab == 'attribute'">
                            <report-attribute></report-attribute>
                        </div>
                        <!-- <div v-if="currentTab == 'integration'">
                            <integration-setting></integration-setting>
                        </div> -->
                        <div v-if="currentTab == 'general'">
                            <general-settings></general-settings>
                        </div>
                        <div v-if="currentTab == 'propertyMeta'">
                            <property-meta></property-meta>
                        </div>
                        <div v-if="currentTab == 'placeHolders'">
                            <placeholder></placeholder>
                        </div>
                    <!-- </div> -->
                </div>
            </section>
            
                
            
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Dropdown from '@/components/Shared/Dropdown';
import Btn from '@/components/Shared/button/Btn';
import ReportAttribute from './ReportAttribute';
import CompanySetting from './CompanySetting';
import GeneralSettings from './GeneralSettings';
import propertyMeta from './propertyMeta';
import Placeholder from './Placeholder';
import IntegrationSetting from './IntegrationSetting';
export default{
    name: 'Setting',
    created() {
        
    },
    mounted() {
        if (this.currentTab == '') {
            this.currentTab = 'info';
        }
    },
    data: function() {
        return {
            staffSearch: '',
            showCreateDialog:false,
            currentTab:'info'
        }
    },
    props: {
    },
    components: {
        Dropdown,
        Btn,
        ReportAttribute,
        CompanySetting,
        GeneralSettings,
        propertyMeta,
        IntegrationSetting,
        Placeholder
    },
    methods: {
        ...mapActions({
            getStaffDetailsAction: 'staff/getStaffDetailsAction',
            getStaffListAction: 'staff/getStaffListAction',
        }),
        toggleCreateDialog() {
            this.showCreateDialog = !this.showCreateDialog;
        },
        selectTab(event){
            this.currentTab = event.target.getAttribute('relatedtab');
        }
    },
    computed: {
        ...mapGetters({
            staff: 'staff/staffDetailsGetter',
            allStaff: 'staff/allStaffGetter'
        })
    },
    watch:{
        currentTab:function(newVal,oldVal){
            let elems = this.$el.querySelectorAll(".list-group-item");
            [].forEach.call(elems, function(el) {
                el.className = el.className.replace(/\bactive\b/, "");
            });

            let tabSelector = this.$el.querySelector(`a[relatedtab='${newVal}']`);
            tabSelector.className += " active";
        }
    }
}
</script>