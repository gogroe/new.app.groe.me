<template>
  <div class="dragArea">
    <add name="Benutzer"
         :active="active.create"
         v-model="active.create"
         class="add_feed"/>

    <ul class="default_box account_menu">
      <li @click="active.menu = i"
          :class="{'active': active.menu === i}"
          v-for="(item, i) in menu_items"
          :key="i">{{item.name}}
      </li>
    </ul>

    <drag :columns="columns" v-model="columns"/>
  </div>
</template>

<script>
import Add from "../../../components/add/index";
import Drag from "./drag";
export default {
  name: "dragArea",
  components:{
    Add,
    Drag
  },
  props:{
    columns:{
      type: Array,
      required: true
    }
  },
  data(){
    return {
      menu_items:[
        { name: 'ALLE' },
        { name: 'EINGANG' },
      ],
      active:{
        menu: 0,
        create: false
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.dragArea{
  width: 15%;
  position: fixed;
  top:90px;
  right:0;
  border-left: 1px solid #e6e6e6;
  padding: 5% 1%;
  height: 100vh;
  .draggable{
    height: calc(100vh - 250px);
    overflow: auto;
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
            background-color: #0237cf;
          }

          &:checked ~ #checkmark {
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

      .dropdown {
        position: relative;
        top: 0px;
        display: block;

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

      .dropdown-content {
        margin-top: 20px;
        display: none;
        width: 100%;
        background-color: #f6f6f6;
        min-width: 160px;
        padding: 12px 16px;
      }

      .dropdown:hover .dropdown-content {
        display: block;
      }

      i{
        position: relative;
        top: 0px;
        cursor: grab;
        margin-right: 10%;
        width: 10%;
        float: right;
      }
    }
  }
  ul{
    position: relative;
    width: 100%;
    background: none;
    border: none;
    text-align: center;
    padding: 0;
    height: 64px;
    li{
      display: inline-block;
      cursor: pointer;
      padding: 22px 0 18px 0;
      margin: 0 20px;
      font-size: 14px;
      line-height: 18px;
      color: #ddd;
    }
  }
}

</style>
