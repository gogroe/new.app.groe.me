<template>
  <div class="crm_column">
    <div class="table_head">
      {{column_key}}
    </div>
    <div class="table_cells"
         v-for="(cell, i) in obj.cells"
         :key="i">
      <!--<edit v-if="cell.type === 'edit'"-->
            <!--:obj="cell.edit"/>-->
      <!--<img v-if="cell.type === 'image'"-->
           <!--src=""/>-->
      <!--<p v-if="cell.type === 'static'">-->
        <!--{{cell.static}}-->
      <!--</p>-->
      <!--<a v-if="cell.type === 'key_link'" @click="$router.push(cell.link)">-->
        <!--{{cell.key_link}}-->
      <!--</a>-->
      {{cell}}
    </div>
  </div>
</template>

<script>
  import Edit from "../../components/inputs/edit";

  export default {
    name: "crm_column",
    components: {Edit},
    props:{
      obj:{
        type: Object,
        required: true
      },
      column_key:{
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
