<template>
    <b-modal
        :keyboard="false"
        :backdrop="false"
        class="modal-right"
        v-model="show"
        :title="`Staff Note - ${user.name}`"
        ref="modal"
        :dialog-style="{width:'50%'}"
        :footer="false"
        :before-close="hide"
    >
     <table class="table table-borderedf">
         <tbody>
             <tr v-show="showCreateNote">
                 <td colspan="2">
                     <form>
                       <div class="form-group">
                         <textarea rows="10" class="form-control" placeholder="Add Note..." v-model="newNote.note">
                             </textarea>
                       </div>
                       <div class="pull-right">
                           <button type="submit" class="btn btn-primary btn-sm" @click.prevent="storeNote">SAVE</button>
                           <button type="submit" class="btn btn-default  btn-sm" @click.prevent="showCreateNote = !showCreateNote">CANCEL</button>
                       </div>
                     </form>
                 </td>
             </tr>
             <tr v-if="showEditNote">
                 <td colspan="2">
                     <form>
                       <div class="form-group">
                         <textarea rows="10" class="form-control" placeholder="Add Note..." v-model="editNote.note">
                             </textarea>
                       </div>
                       <div class="pull-right">
                           <button type="submit" class="btn btn-primary btn-sm" @click.prevent="updateNote">UPDATE</button>
                           <button type="submit" class="btn btn-default  btn-sm" @click.prevent="showEditNote = false;showCreateNote = false;">CANCEL</button>
                       </div>
                     </form>
                 </td>
             </tr>
             <tr v-show="!showCreateNote && !showEditNote">
                 <td colspan="2">
                     <button class="btn btn-sm btn-primary" @click="showCreateNote = !showCreateNote">Add Note</button>
                 </td>
             </tr>
             <tr v-for="(note,k) in notes">
                 <td>
                     <blockquote style="margin-bottom: 0px">
                       <p v-html="note.note.replace(/(?:\r\n|\r|\n)/g, '<br>')"></p>
                       <small>{{note.creator.name}} <i class="fa fa-clock-o"></i> <cite title="Source Title">{{ note.createdAt | moment("Do MMMM YYYY, h:mm:ss a") }}</cite></small>
                 </blockquote>
                 </td>
                 <td width="20px">
                     <a href="javascript:void(0)" @click="showEditNote = true;showCreateNote = false; editNote = note;"><i class="fa fa-edit"></i></a>
                     <br>
                     <a href="javascript:void(0)" @click="deleteNote(note)"><i class="fa fa-trash"></i></a>

                 </td>
             </tr>
             <tr v-show="notes.length == 0">
                 <td colspan="2">No Note(s) created.</td>
             </tr>
         </tbody>
     </table>  
    </b-modal>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Router from 'vue-router'
import rules from '@/validations/rules';
import note from '@/mixins/note'

const initialData = () => {
    return {
        buttonDisabled:false,
        note:''
    }
}


export default {
    name: 'NoteDialog',
    data:initialData,
    props: {
        show : {
            type: Boolean
        },
        user:{
            type:Object,
            default:() => {}
        }
    },
    mixins: [note],
    mounted() {
        this.notableType = 'user';
        this.notableId = this.user.id;
        this.getNotes()
    },
    components: {
    },
    methods: {
        ...mapActions({
            
            completeOrderAction: 'order/completeOrderAction',
        }),
        completeOrder() {
            let self = this;
            this.completeOrderAction({id:this.order.id,note:this.note}).then((resp)=>{
                self.$notify({
                    content: `Order has been completed.`,
                    duration: 5000
                });
                self.$emit('hide');
            }).catch(function(e){
                self.$notify({
                    type:'danger',
                    content: `Something went wrong. Please reload order.`,
                    duration: 5000
                });
            }).finally(function(res){
                self.buttonDisabled = false;
            });
            
        },
        hide() {
            this.$emit('hide')
        }
    },
    computed: {
    }
}
</script>