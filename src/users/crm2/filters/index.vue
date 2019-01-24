<template>
  <div class="crm_filter">
    <filter_head/>
    <filter_body :columns="columns" :params="params" :array="sort_array"/>
  </div>
</template>

<script>
import filter_head from "./filter_head";
import filter_body from "./filter_body";
export default {
  name: "crm_filter",
  components:{
    filter_head,
    filter_body
  },
  props:{
    columns:{
      type: Object,
      required: true
    },
    params:{
      type: Object,
      required: true
    }
  },
  data(){
    return {
      sort_array:[]
    }
  },
  mounted(){
    this.load_array()
  },
  methods:{
    load_array: function(){
      // this.sort_array.push(Object.keys(this.columns))
      let i = 0
      for(i in this.columns){
        this.sort_array.push(this.columns[i].name)
      }
    }
  },
  watch:{
    // sort_array: function(){
    //   let tmp_obj = {}
    //   let i = 0
    //   let j = 0
    //   for(i in this.sort_array){
    //     for(j in this.columns){
    //       if(this.sort_array[i] === this.columns[j].name){
    //         console.log(Object.keys(this.columns)[i]);
    //         tmp_obj[Object.keys(this.columns)[j]] = this.columns[j]
    //         console.log(tmp_obj);
    //         break
    //       }
    //     }
    //   }
    //   this.columns = tmp_obj;
    //   console.log(this.sort_array);
    //   console.log(this.columns);
    // }
  }
}
</script>

<style lang="scss" scoped>
  .crm_filter{
    position: relative;
    width: 450px;
    height: calc(100%);
  }

  .filter_head{
    width: 100%;
    height: 64px;
    background: #fff;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
  }

  .filter_body{
    width: 100%;
    height: calc(100% - 64px);
    background: #fff;
  }
</style>
