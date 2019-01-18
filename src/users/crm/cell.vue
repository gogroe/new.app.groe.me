<template>
  <div class="cell">
    <p v-if="show" @click="show=false">{{(cell_content===null) ? cell_content= ' a ' : cell_content=cell_content}}</p>
    <input v-if="!show" @keyup.enter="show=true" type="text" name="" value="" class="edit_field" :style="">
    <!-- <edit :url:"" :label="" :name="" :value="" :select="" :placeholder="" :type="" :input_class="" :label_class="" :required_params="" :error_class=""/> -->
  </div>
</template>
<script>
import Edit from "../../components/inputs/edit";
import Fill_edit from '../../components/inputs/fill_edit'
  export default {
    name: "cell",
    components:{
      Edit
    },
    props: {
      cell_obj:{
        type: String,
        required: false
      }
    },
    data(){
      return {
        show : true,
        cell_content : ''
      }
    },
    mounted(){
      this.cell_content = this.cell_obj;
    },
    mixins:[Fill_edit]
  }
</script>

<style lang="scss" scoped>

</style>
