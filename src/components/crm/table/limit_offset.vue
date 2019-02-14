<template>
  <div class="table_limit_offset">
    <div class="wrapper">
      <span class="from">{{from}}</span> bis
      <input v-model="cur"
             type="number"
             @blur="update_data()"
             @keyup.enter="update_data()"/>
      Gesamt {{total}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "table_limit_offset",
    props:{
      request_data:{
        required: true
      },

    },
    data(){
      return{
        from:0,
        cur: 0,
        total: 0
      }
    },
    watch:{
      request_data:{
        handler:function () {
          this.set_data()
        }
      }
    },
    mounted(){
      this.set_data()
    },
    methods:{
      set_data(){
        if('rows' in this.request_data && 'count' in this.request_data){
          this.cur = this.request_data.rows.length
          this.total = this.request_data.count
          this.from = this.cur > 100
            ? this.cur - 100
            : 1
        }
      },
      update_data(){
        let obj = {
          limit : this.cur
        }

        if(this.cur > 100){
          obj.offset = this.cur - 100
        }

        this.$store.commit('update_users_crm_limit_offset', obj)
        this.$store.commit('update_reload', {action: 'filter', section: 'users_crm'})
      }
    }
  }
</script>

<style lang="scss" scoped>

  .table_limit_offset{
    position: relative;
    color: gray;

    .wrapper{
      position: absolute;
      right: 17px;
      margin-top: 5px;
    }

    input{
      padding: 0 10px;
      margin-right: 64px;
      width: 50px;
      border-radius: 2px;
      background: #e5e5e5;
      text-align: center;
    }

    .from{
      display: inline-block;
      margin-right: 10px;
    }

  }

</style>
