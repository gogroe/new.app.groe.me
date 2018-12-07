<template>
  <div>
    <label :for="obj.name" :class="obj.label_class">{{obj.label}}</label>
    <input v-if="obj.type === 'text'" @keyup="" :type="obj.type" :title="obj.name" :id="obj.name" :name="obj.name" :value="obj.value" :placeholder="obj.placeholder" :class="obj.input_class" v-model="cur_value"/>

  </div>
</template>

<script>
  export default {
    name: "input",
    props:{
      obj:{
        type: Object,
        required: true,
      }
    },
  }
</script>

<style scoped>

</style>
