<template>
  <div class="filter_cell">
    <div class="option_item">
      <checkbox :active="active.column"
                v-model="active.column"
                class="checkbox"/>
      <span class="column_name" :class="{'active': active.filter}"
            @click="active.filter = !active.filter">
        {{column.name}}
        <set_x_y text="aaaaaaaaaaaaaa"/>
      </span>
      <i class="material-icons">drag_handle</i>
    </div>
    <div class="column_filter"
         v-if="active.filter">
      <inputs :obj="input"
              :request_data="[]"
              v-model="filter"/>
    </div>

  </div>
</template>

<script> //todo select filter ar not displayed in current filter
  import checkbox from '../../../components/checkbox'
  import set_x_y from '../../../components/bubble/set_x_and_y'
  import Inputs from "../../../components/inputs/index";

  export default {
    name: "filter_cell",
    components:{Inputs, checkbox, set_x_y},
    props:{
      column:{
        required: true
      }
    },
    data(){
      return{
        uneditables:{
          link: false,
          image:false
        },
        active: {
          filter: false,
          column: true,
          editable: true,
        },
        input:{
          label: '',
          name: '',
          value:'',
          select:'',
          placeholder: '',
          type: '',
          input_class:'create_input',
          label_class: 'create_input_label',
          error_class: 'input_error',
        },
        filter:{
          value: null,
          event:null
        },
      }
    },
    computed:{
      active_column(){
        return this.active.column
      }
    },
    watch:{
      active_column: function(boolean){
        this.$emit('input', {id: this.column.id, active: boolean})
      },
      filter: function (object) {
        if(object.event === 'keyup' || object.event === 'change'){

          let filter_obj = {
            table: this.column.request_group,
            value: object.value
          }

          if(this.column.type === 'select'){
            filter_obj.key =  this.generate_key(this.column.id)
          }
          else{
            filter_obj.key =  'search->' + this.generate_key(this.column.id)
          }

          this.$store.commit('update_users_crm_filter', filter_obj)
        }
      }
    },
    mounted(){
      this.set_editable()
      this.set_input()
    },
    methods:{
      set_editable(){
        if(this.column.type in this.uneditables){
          this.active.editable = false
        }
      },
      set_input(){
        this.input.label = this.column.name
        this.input.name = this.column.id
        this.input.value = null
        this.input.type = this.column.type

        if('select' in this.column){
          this.input.select = this.column.select
        }
        if(this.column.type === 'select'){
          this.input.placeholder = this.column.name + ' auswählen'
        }
        else {
          this.input.placeholder = this.column.name + ' durchsuchen'
        }
      },
      generate_key(string){
        if(typeof string === 'string'){
          return string.substr(string.indexOf('.') +1)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .filter_cell{
    padding: 11.5px 0;
    position: relative;
  }

  .option_item{
    position: relative;
    display: block;
  }

  .checkbox{
    display: inline-block;
    margin: 2.5px 0;
  }

  .column_name{
    cursor: pointer;
    display: inline-block;
    margin-left: 17px;
    line-height: 30px;
    vertical-align: top;
    color: #9d9d9d;

    &:hover, &.active{
      color: #3da0f5;
    }
  }

  .column_filter {
    width: 100%;
    padding: 10px 55px 10px 30px;
  }

  i{
    font-size: 30px;
    position: absolute;
    right: 64px;
    top:0;
    cursor: grab;
    width: 30px;
    vertical-align: top;
    color: #9d9d9d;
  }


</style>
