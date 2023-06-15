<template>
    <form>
      <div class="form-group">
        <label for="">Name</label>
        <input type="text" v-model="user.name" class="form-control" id="" placeholder="">
      </div>
      <div class="form-group">
        <label for="">Username</label>
        <input type="text" v-model="user.username" class="form-control" id="" placeholder="">
      </div>
      <div class="form-group">
        <label for="">Email</label>
        <input type="text" v-model="user.email" class="form-control" id="" placeholder="">
      </div>
      <div class="form-group">
        <label for="">City</label>
        <input type="text" v-model="user.address.city" class="form-control" id="" placeholder="">
      </div>
      <div class="form-group">
        <label for="">Zip</label>
        <input type="text" v-model="user.address.zipcode" class="form-control" id="" placeholder="">
      </div>
      <div class="form-group">
        <label for="">Company</label>
        <input type="text" v-model="user.company.name" class="form-control" id="" placeholder="">
      </div>
      <button type="submit" v-on:click.prevent="onFormSave(user)" class="btn btn-default">Submit</button>
    </form>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import uuid from 'uuid'
import Router from 'vue-router'

const initialData = () => {
  return {
            //default:function () {
                user: {
                    name:'',
                    username:'',
                    email:'',
                    address:{
                        city:'',
                        zipcode:''
                    },
                    company:{
                        name:''
                    }
                }
            //}   
        }
}

//console.log(initialData);

export default {
    name: 'Create',
    data:initialData,
    methods: {
    ...mapActions([
      'saveUser',
      'deleteUser'
    ]),
    onFormSave (user) {
       
      this.saveUser(user)

      this.resetUserInForm()
    },
    onRemoveClicked (userId) {
      this.deleteUser(userId)

      if (userId === this.user.id) {
        this.resetUserInForm()
      }
    },
    resetUserInForm() {
        this.user = initialData().user
         this.$router.push('/user');
    }
    }
}    
</script>