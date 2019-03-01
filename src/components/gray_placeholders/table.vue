<template>
  <table class="placeholders_table">
    <tr v-for="index in Math.trunc((placeholder_size-64)/54)" :key="index">
      <td v-for="(inner_index , i) in line"
          :key2="index"
          :style="{width: inner_index + '%'}">
        <div class="placeholder" v-if="i % 2 === 0"/>
      </td>
    </tr>
  </table>
</template>

<script>
import placeholders from './index'
export default {
  name: 'placeholders_table',
  components: {placeholders},
  //when loaded use @loaded="" in parent html tag to toggle
  props:{
    request_get_data:{
      required: true
    },
    column:{
      type: Number,
      default: 0,
      required: false
    },
    placeholder_size:{
      type: Number,
      default: 700,
      required: false
    }
  },
  data(){
    return{
      rows: 0,
      line:[4, 4, 33, 4, 54]
    }
  },
  mounted(){
   console.log(this.$parent.$refs.container.clientHeight);
  }
}
</script>

<style lang="scss" scoped>
table{
  border-collapse: separate;
  border-spacing: 4% 0;
  width: 100%;

  tr{
    height: 54px;
    width: 100%;

    td{

      .placeholder{
        background-color: #eee;
        height: 10px;
        width: 100%;
      }
    }
  }
}
</style>
