<style scoped>
.item {
  cursor: pointer;
}
.bold {
  font-weight: bold;
}
ul {
    margin: 0;
    padding: 0;
    list-style:none;
}
ul {
  margin-left:0.4em;
  position: relative;
}
ul:before {
    content: "";
    display: block;
    width: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    border-left: 1px solid black;
}
li {
    position: relative;
    padding-left: 1em;
    display: list-item;
}
li:before {
    content:"";
    display:block;
    width:10px;
    height:0;
    border-top:1px solid;
    margin-top:-4px;
    position:absolute;
    top:1em;
    left:0
}
li:last-child:before {
    background:#fff;
    height:auto;
    top:1em;
    bottom:0
}
</style> 
<template>
    <ul>
    <li v-for="(item,k) in items" >
        <input :disabled="!hasRole('admin')" type="checkbox" :value="item.name" v-model="selectedPermission" @change.prevent="updatePermission(item,$event)" style="float:left;margin-right: 5px;">
        <div
          :class="{bold: item.children}"
          @click="isOpen = !isOpen"
          
          >
          {{ item.label }}
          <span v-if="item.children"> <i class="fa" :class="{ 'fa-plus' : !isOpen, 'fa-times' : isOpen }"></i></span>
        </div>
          <role-tree
            v-show="isOpen" v-if="item.children"
            class="item"
            :key="k"
            :permissions="item.children"
            :role="role"
            @updateParentPermission="updateParentPermission(item,$event)"
          ></role-tree>
      </li>
  </ul>
</template>
<script>
export default {
    name:'RoleTree',
    props: {
    permissions: Array,
    role: Object
  },
  data: function () {
    return {
        items: [],
      isOpen: true
    }
  },
  mounted() {
    this.items = [...this.permissions];
  },
  computed: {
    selectedPermission: {
        get() {
            return this.$store.state.staff.selectedPermission[this.role.name]
        },
        set(val) {
        }
    }
  },
  methods: {
    toggle: function (item) {
      if (item.children) {
        item.isOpen = !item.isOpen
      }
    },
      updatePermission(item,e) {
        this.$store.commit('staff/updatePermission',{
                role:this.role.name,
                permission:e.target.value,
                checked: e.target.checked
            });
        if (e.target.checked == false && item.children) {
            this.updateChildrenPermission(item.children);
        }
        if (e.target.checked == true) {
            this.$emit('updateParentPermission',{checked:e.target.checked})
        } else {
            if (this.items.length) {
                console.log(this.items.filter((item) => {
                    return this.selectedPermission.indexOf(item.name) !== -1;
                }));
                if (this.items.filter((item) => {
                    return this.selectedPermission.indexOf(item.name) !== -1;
                }).length == 0) {
                    this.$emit('updateParentPermission',{checked:e.target.checked})
                }
            }
        }
      },
      updateChildrenPermission(children) {
        children.forEach((child) => {
            this.$store.commit('staff/updatePermission',{
                role:this.role.name,
                permission:child.name,
                checked:false
            });
            if (child.children) {
                this.updateChildrenPermission(child.children)
            }
        })
      },
      updateParentPermission(item,event) {
            this.$store.commit('staff/updatePermission',{
                    role:this.role.name,
                    permission:item.name,
                    checked: event.checked
                });
            if (event.checked) {
                this.$emit('updateParentPermission',{checked:event.checked})
            } else {
                if (this.items.filter((item) => {
                        return this.selectedPermission.indexOf(item.name) !== -1;
                    }).length == 0) {
                    this.$emit('updateParentPermission',{checked:event.checked})
                }
            }
      }
  }
}
</script>