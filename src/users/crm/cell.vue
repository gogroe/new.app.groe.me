<template>
  <div class="cell">
    <p v-if="show" @click="show=false">{{(cell_obj===null) ? cell_obj= ' a ' : cell_obj=cell_obj}}</p>
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
      },
      id:{
        type: Number,
        required: true
      },
      filter:{
        type: Array,
        required: false
      }
    },
    data(){
      return {
        show : true,
        key:{
          name: this.cell_obj,
          type: 'text'
        }
      }
    },
    mixins:[Fill_edit]
  }
</script>

<style lang="scss" scoped>

</style>
