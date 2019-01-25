<template>
  <div class="filter_cell">
    <div class="option_item">
      <checkbox :active="display"
                v-model="display"
                class="checkbox"/>
      <span v-if="edit"
            class="paragraph_label"
            @click="display_dropdown = !display_dropdown">{{ name}}</span>
      <span v-if="!edit"
            class="paragraph_label">{{ name}}</span>
      <i class="material-icons">drag_handle</i>
    </div>
    <div class="dropdown-content"
         v-if="display_dropdown">
      <text_filter  v-if=" type === 'text'"
                    :table=" request_group"
                    :name=" name"
                    :id="id"/>
      <range_filter v-if=" type === 'range'"
                    :table=" request_group"
                    :name=" name"/>
      <select_filter v-if=" type === 'select'"
                    :table=" request_group"
                    :name=" name"
                    :options="edit"/>
      <!-- <date_filter v-if=" type === 'date'" :table=" request_group" :name=" name"/> -->
    </div>
  </div>
</template>

<script>
import text_filter from './filter_types/text'
import checkbox from '../../../components/checkbox'
import select_filter from './filter_types/select'
import range_filter from './filter_types/range'

export default {
  name: "filter_cell",
  components:{
    text_filter,
    select_filter,
    range_filter,
    checkbox
  },

  props:{
    id:{
      type: String,
      required: true
    },
    name:{
      type: String,
      required: true
    },
    type:{
      type: String,
      required: true
    },
    request_group:{
      type: String,
      required: true
    },
    edit:{
      type: Boolean,
      required: true
    }
  },

  data(){
    return{
      display_dropdown: false,
      display: true
    }
  },
  watch:{
    display: function(boolean){
      this.$emit('input', {id: this.id, active: boolean})
    }
  }
}
</script>

<style lang="scss" scoped>
.option_item{
  position: relative;
  display: block;

  .checkbox{
    display: inline-block;
  }
  .paragraph_label{
    cursor: pointer;
    display: inline-block;
    margin-left: 17px;
    line-height: 25px;
    vertical-align: top;
  }
  .dropdown-content {
    margin-top: 20px;
    width: 100%;
    border-top: 1px solid  #e6e6e6;
    border-bottom: 1px solid  #e6e6e6;
    min-width: 160px;
    padding: 12px 16px;
  }
  i{
    font-size: 30px;
    position: absolute;
    right: 0;
    top:0;
    cursor: grab;
    width: 15%;
    vertical-align: top;
  }
}


.filter_cell{
  margin: 16px 0;
  position: relative;
}
</style>
