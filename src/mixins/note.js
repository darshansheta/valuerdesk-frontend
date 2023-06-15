import {mapGetters, mapActions} from 'vuex'
export default {
    data:() => {
        return {
            notableType:'',
            notableId:0,
            showCreateNote:false,
            showEditNote:false,
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
    methods: {
        ...mapActions({
            createNoteAction: 'common/createNoteAction',
            updateNoteAction: 'common/updateNoteAction',
            deleteNoteAction: 'common/deleteNoteAction',
            getNotesAction: 'common/getNotesAction'
        }),
        storeNote() {
            this.createNoteAction({
                notableId:this.notableId,
                notableType:this.notableType,
                note:this.newNote.note
            }).then( resp => {
                this.newNote.note = '';
                this.showCreateNote = false;
                this.getNotes();
            })
        },
        updateNote() {
            this.updateNoteAction({
                notableId:this.notableId,
                notableType:this.notableType,
                note:this.editNote.note,
                id:this.editNote.id
            }).then( resp => {
                this.editNote = {};
                this.showEditNote = false;
                this.getNotes();
            })
        },
        deleteNote(note) {
            let self = this;
            this.$confirm({
                title: 'Delete',
                content:"Are you sure, do you really want to delete this note?"
            }).then(() => {
                this.deleteNoteAction({id:note.id}).then(() => {
                    self.$notify('Note deleted succesffully.');
                })
            })
        },
        getNotes() {
            this.getNotesAction({notableId:this.notableId,notableType:this.notableType})
            .then((resp) => {
                this.notes = resp.data.data;
            })
        },
        // watch: { 
        //     notableId: {
        //     handler(newVal, oldVal) { // watch it
        //             console.log(newVal,'www')
        //           this.getNotes();
        //         },
        //         deep:true
        //     },
        // }
    }
}