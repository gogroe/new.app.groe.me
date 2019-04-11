<template>
  <div v-if="is_create"
       class="add"
       @click="$store.commit('update_reload', { section: $route.name , action: !active }); $emit('input', !active)">
    <p>
      +
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    name: "add",
    props:{
      name:{
        required: true
      },
      active:{
        required: true
      },
      create:{
        required: false
      }
    },
    watch:{
      reload: function (object) {
        if(object.section === 'add_' + name){
          console.log(object)
          this.$emit('input', object.action)
          this.$store.commit('update_reload', {section: null, action:null})
        }
      }
    },
    computed: {
      ...mapGetters([
        'reload',
      ]),
      is_create(){
        if(this.create){
          return this.$$permission.is_perm('create')
        }
        else {
          return true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  .add{
    float: right;
    text-align: center;
    font-size: 30px;
    cursor: pointer;
    margin: 12.5px 25px;
    height: 41px;
    width: 41px;
    border-radius: 20.5px;
    background-color: #f1f3f4;
  }

  i{
    margin-left: 17px;
    vertical-align: -7px;
    font-weight: 700;
  }

  p{
    line-height: 41px;
    color: #3da0f5;
  }

  .inactive p{
    color: #bbbbbb;
  }

</style>
