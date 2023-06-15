<template>
    <div :style="myStyle" style="position: relative;">
        <div class="controlSidebar list-group" v-show="!isConfig">
            <a href="#" class="list-group-item active">
                Supported Controls
            </a>
            <div id="sidebarControls">
                <a href="javascript:void(0)" class="list-group-item list-group-item-action control-wrapper"
                   v-for="(obj, value) in controls" :data-control-type="value">
                    <i :class="obj.icon"></i> {{obj.label}}
                </a>
            </div>
        </div>
        <div class="settingSidebar card" v-if="isConfig">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-12">
                        <h4>{{label}} ({{controlInfo.type}})</h4>
                    </div>
                </div>
                <div class="row mb-2">
                    <div class="col-md-12">
                        <button class="btn btn-default" @click="applyEditSidebar">Apply</button>
                        <button class="btn btn-default" @click="closeEditSidebar">Close</button>
                    </div>
                </div>

                <base-config-component :control="controlInfo" :elements="elements"></base-config-component>

                <component v-if="configComponent != null"
                           :is="configComponent"
                           :control="controlInfo">
                </component>

                <!-- <base-style-component :control="controlInfo" :elements="elements"></base-style-component> -->
            </div>
        </div>
    </div>
</template>

<script>
    import {CONTROL_TYPES} from "@/components/FormBuilder/config/control_constant";
    import {eventBus, EventHandlerConstant} from '@/components/FormBuilder/template/handler/event_handler';
    import {ControlHandler} from '@/components/FormBuilder/template/handler/control_handler';
    
    import {Hooks} from '@/components/FormBuilder/template/components/hook_lists';
    import BaseConfigComponent from "./sidebar_items/BaseConfigComponent";
    import BaseStyleComponent from "./sidebar_items/BaseStyleComponent";

    export default {
        components: {BaseStyleComponent, BaseConfigComponent, },
        name: "sidebar-component",
        props: {
            elements: {
                type: Array,
                default: () => []
            },
            top: {
                type:Number,
                default:70
            }
        },
        data: () => ({
            controls: CONTROL_TYPES,
            isConfig: false,
            controlInfo: null,
            configComponent: null,
            scrollY: null,
            myStyle: {},
            originalTop: 0
        }),
        methods: {
            closeEditSidebar() {
                this.isConfig = false;
                this.controlInfo = null;
                ControlHandler.clearSelect();
            },
            applyEditSidebar() {
                if (this.controlInfo.name !== ControlHandler.getSelectedItem()) {
                    return;
                }

                // pre apply
                // this.controlInfo.decimalPlace = parseInt(this.controlInfo.decimalPlace);

                // before hook here
                let b4Run = Hooks.Sidebar.beforeApplyConfig.runSequence(this.controlInfo);
                if (b4Run === false) {
                    return;
                }
                // console.log(this.controlInfo,'controlInfo')
                eventBus.$emit(EventHandlerConstant.ON_APPLY_EDITOR_SIDEBAR, this.controlInfo);

                // after hook here
                Hooks.Sidebar.afterApplyConfig.run(this.controlInfo);
            }
        },
        created() {
            // catch event activate sidebar here
            eventBus.$on(EventHandlerConstant.ACTIVATE_EDITOR_SIDEBAR, controlInfo => {
                // before hook here
                let b4Run = Hooks.Sidebar.beforeOpenConfig.runSequence(controlInfo);
                if (b4Run === false) {
                    return;
                }

                // open config
                this.isConfig = true;
                this.controlInfo = controlInfo;
                this.configComponent = null;

                // retrieve config component
                if (_.accessStr(this.controls[controlInfo.type], 'source.config')){
                    this.configComponent = this.controls[controlInfo.type].source.config;
                }

                // after hook here
                Hooks.Sidebar.afterOpenConfig.run(this.controlInfo);
            });
        },
        mounted() {
            window.addEventListener('scroll', (event) => {
                  this.scrollY = Math.round(window.scrollY);
                  
                });
            this.originalTop = 1;//this.$el.getBoundingClientRect().top;
            // insert controls
            $(".list-group-item", $("#sidebarControls")).draggable({
                appendTo: 'body',
                containment: '',
                scroll: false,
                helper: 'clone',
                revert: true,
                zIndex: 9999,
                cancel: ".list-group-item-success",
                start: function(event, ui){
                    $(ui.helper).css('width', `${ $(event.target).width() }px`);
                }
            });

            $(this.$el).find('.controlSidebar').droppable({
                accept: ".controlItemWrapper",
                drop: function (event, ui){
                    // remove control
                    eventBus.$emit(EventHandlerConstant.REMOVE_CONTROL, ui);
                },
                over: function( event, ui ) {
                    ui.helper.css('border', '1px solid red');
                },
            });
        },
        computed:{
            label() {
                let ele = this.elements.filter(ele => {
                    return ele.placeholder == this.controlInfo.fieldName
                });
                if (ele.length) {
                    return ele[0].label;
                }
                return '';
            }
        },
          watch: {
            scrollY(newValue) {
              const rect = this.$el.getBoundingClientRect();
              const newTop = this.scrollY + +this.top - this.originalTop;
              if (newTop > 0) {
                this.$set(this.myStyle, 'top', `${newTop}px`);
              } else {
                this.$delete(this.myStyle, 'top');
              }
            }
          }
    }
</script>

<style scoped>

</style>
