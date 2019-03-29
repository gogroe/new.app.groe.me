<template>
  <div>
    <cinput
      type="select_indicator"
      name="Indikator"
      :cvalue="null"
      clist="user_status"
      placeholder="Auswählen"
      v-model="indicator"/>
    <cinput
      type="select_dependent"
      name="Dependent"
      :cvalue="null"
      clist="user_status$details"
      placeholder="Auswählen"
      v-model="dependent"/>
    <cinput
      type="status"
      name="Status"
      :cvalue="null"
      clist="user_status"
      placeholder="Auswählen"
      v-model="dependent"/>
  </div>
</template>

<script>


  import Cinput from "../../components/input/index";
  import Status from "../../components/status/index";
  export default {
    name: "projects",
    components: {Status, Cinput},
    data () {
      return {
        standard: null,
        indicator: null,
        dependent: null
      }
    }
  }
</script>
