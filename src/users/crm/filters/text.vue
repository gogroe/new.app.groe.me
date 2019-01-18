<template>
  <div class="text_filter">
    <label>
      <p class="paragraph_label">aaaaaaa</p>
      <input type="text" :name="" v-model="value" @keyup.enter="update_filter(table, value_key, value)">
    </label>
  </div>
</template>
<script>
export default {
  name: "text",
  props:{
    table:{
      type: String,
      required: true
    },
    value_key:{
      type: String,
      required: true
    }
  },
  data(){
    return{
      value: null
    }
  },
  methods:{
    update_filter(table, value_key, value){
      const update_object = {
        table : table,
        value_key : 'search->' + value_key,
        value : value
      }
      this.$store.commit('update_users_filter', update_object)
    }
  }
}
</script>

<style lang="scss" scoped>
.checkbox_container{
  display: block;
  position: relative;
  margin-bottom: 12px;
  padding-top: 13px;
  label{

    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    .checkmark{
    z-index: 2;
    }
    .checkbox{
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
      &:checked ~ .checkmark {
        background-color: #4f7dff;
    }
      &:checked ~ .checkmark:after {
        display: block;
      }
    }
    span {
      position: absolute;
      top: 10px;
      left: 10px;
      height: 22px;
      width: 22px;
      background-color: #eee;
      &:after {
        content: "";
        position: absolute;
        display: none;
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    } //redesigned checkbox
    &:hover input ~ .checkmark {
      background-color: #ccc;
    }
  }
  .paragraph_label{
  cursor: pointer;
  padding: 0 0 0 35px;
  display: inline-block;
  }
  input{
  width: 90%;
  margin: 30px auto;
  }
}
</style>
