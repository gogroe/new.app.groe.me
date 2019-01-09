<template>
  <div class="date_filter">
    <label>
      <input type="checkbox" v-model="option.show" class="checkbox">
      <span class="checkmark"></span>
      <p class="paragraph_label">{{ option.name}}</p>
      <!-- <input :type="option.filter" :name="option.name" :value="option.value">
      <span ref="value"></span> -->
    </label>
  </div>
</template>

<script>
// columns:[
//   {
//     no: 1,
//     placeholder: 'Image',
//     name: 'image',
//     show: true,
//     show2: false,
//     data: [],
//     onclick: false,
//     options: [
//       {
//       name: 'one',
//       filter: 'range',
//       value: 100,
//       show: true
//       },
//     ],
//   },
// ]
export default {
  name: "date_filter",
  props:{
    option:{
      type: Object,
      required: true
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
  display: inline-block;
  padding: 0 0 0 35px;
  }
  input{
  width: 90%;
  margin: 30px auto;
  }
}
</style>
