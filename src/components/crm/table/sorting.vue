<template>
  <div class="table_sorting">
    <div class="name">
      <span :class="{'sortable': unsortables[generate_key(column.id)] !== false}">{{column.name}}</span>
      <i class="material-icons down" v-if="active === 'asc'">arrow_right_alt</i>
      <i class="material-icons up" v-if="active === 'desc'">arrow_right_alt</i>
    </div>
    <div class="options" v-if="unsortables[generate_key(column.id)] !== false">
      <p class="option" @click="set_sort('asc')">
        <i class="material-icons down">arrow_right_alt</i> <span>Aufsteigend</span>
      </p>
      <p  class="option" @click="set_sort('desc')">
        <i class="material-icons up">arrow_right_alt</i> <span>Absteigend</span>
      </p>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: "table_sorting",
    props:{
      column:{
        required: true
      }
    },
    data(){
      return{
        unsortables:{
          link: false,
          image: false
        },
        active: null,
        sortings:{}
      }
    },
    computed:{
      ...mapGetters([
        'users_crm_sorting'
      ])
    },
    watch:{
      users_crm_sorting: function (object) {
        if(object !== this.sortings){
          this.active = false
        }
      }
    },
    methods:{
      set_sort(type){
        let sort_obj = {}
        sort_obj[this.column.request_group] = {}
        sort_obj[this.column.request_group][type] = [this.generate_key(this.column.id)]

        this.$store.commit('update_users_crm_sorting', sort_obj)
        this.$store.commit('update_reload', {action: 'filter', section: 'users_crm'})
        this.sortings = sort_obj
        this.active = type
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

  .name{
    position: relative;

    span{
      line-height: 24px;
      vertical-align: top;

      &.sortable{
        cursor: pointer;
      }
    }
  }

  .table_sorting{
    .options{
      display: none;
      position: absolute;
      right: 0;
      padding: 17px;
      background: #fff;
      //border: 1px solid #3da0f5;
      border-radius: 2px;
      box-shadow: 0 3px 6px 0 rgba(0,0,0,.15);

      .option{
        cursor: pointer;

        &:hover{
          color:#3da0f5;
        }

        span{
          line-height: 24px;
          vertical-align: top;
        }
      }
    }

    &:hover{
      .options{
        display: inline;
      }
    }
  }

  .up{
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
  }

  .down{
    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    transform: rotate(-90deg);
  }

</style>
