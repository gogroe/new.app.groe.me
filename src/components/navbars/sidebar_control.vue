<template>
  <div class="control">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'control',
  props:{
    options:{
      type: Array,
      required: true,
    }
  },
  data(){
    return{

    }
  },
  computed:{
    ...mapGetters([
      'get_sidebar'
    ]),
  },
  watch: {
    get_sidebar: {
       handler(val){
         for(let a in val){
           if (val[a].active){
             this.$emit('input', val[a].name)
           }
         }
       },
       deep: true
    }
  },
  mounted(){
    this.$store.commit('update_sidebar', this.options)
  },
  destroyed(){
    this.$store.commit('update_sidebar', {})
  }
}
</script>

<style lang="scss">

</style>
