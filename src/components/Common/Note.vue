<template>
<div>
    <table class="table table-bordered">
        <tbody>
            <tr v-show="showCreate">
                <td colspan="2">
                    <form>
                      <div class="form-group">
                        <textarea class="form-control" placeholder="Add Note..." v-model="newNote.note">
                            </textarea>
                      </div>
                      <div class="pull-right">
                          <button type="submit" class="btn btn-primary btn-sm" @click.prevent="storeNote">SAVE</button>
                          <button type="submit" class="btn btn-default  btn-sm" @click.prevent="showCreate = !showCreate">CANCEL</button>
                      </div>
                    </form>
                </td>
            </tr>
            <tr v-show="!showCreate">
                <td colspan="2">
                    <button class="btn btn-sm btn-primary" @click="showCreate = !showCreate">Add Note</button>
                </td>
            </tr>
            <tr v-for="(note,k) in notes">
                <td>
                    <blockquote style="margin-bottom: 0px">
                      <p><pre>{{note.note}}</pre></p>
                      <small>{{note.creator.name}} <i class="fa fa-clock-o"></i> <cite title="Source Title">{{ note.createdAt | moment("Do MMMM YYYY, h:mm:ss a") }}</cite></small>
                </blockquote>
                </td>
                <td width="20px">
                    <a href="javascript:void(0)" @click=""><i class="fa fa-edit"></i></a>
                    <br>
                    <a href="javascript:void(0)" @click=""><i class="fa fa-trash"></i></a>

                </td>
            </tr>
            <tr v-show="notes.length == 0">
                <td colspan="2">No Note(s) created.</td>
            </tr>
        </tbody>
    </table>
</div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    name:'Note',
    data:() => {
        return {
            showCreate:false,
            showEdit:false,
            newNote: {
                note: ''
            },
            editNote: {
                note:'',
                id:0
            },
            notes:[]
        }
    },
    props: {
        notableType:String,
        notableId:Number
    },
    mounted() {
        this.getNotes();
    },
    methods: {
        ...mapActions({
            createNoteAction: 'common/createNoteAction',
            getNotesAction: 'common/getNotesAction'
        }),
        storeNote() {
            this.createNoteAction({
                notableId:this.notableId,
                notableType:this.notableType,
                note:this.newNote.note
            }).then( resp => {
                this.newNote.note = '';
                this.showCreate = false;
                this.getNotes();
            })
        },
        getNotes() {
            this.getNotesAction({notableId:this.notableId,notableType:this.notableType})
            .then((resp) => {
                this.notes = resp.data.data;
            })
        },
    },
    watch: { 
        notableId: {
        handler(newVal, oldVal) { // watch it
              this.getNotes();
            },
            deep:true
        },
    }
}
</script>