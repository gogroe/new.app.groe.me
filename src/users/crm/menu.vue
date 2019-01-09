<template>

<!-- MENU/////////////////////////////////////////////////////// -->
    <div  v-drag-and-drop:options="options" class="checkboxes">
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
      <label v-for="column in columns">
        <p>{{ column.placeholder }}</p>
        <input type="checkbox" v-model="column.show">
        <span class="checkmark"></span>
        <i class="material-icons">drag_handle</i>
      </label>
    </div>
<!-- /////////////////////////////////////////////////////////// -->

  </div>
</template>

<script>
import Add from "../../components/add/index";
  export default {
    name: "userCRM",
    components:{
      Add,
    },
    props:{
      columns:{
        image:{
          placeholder: 'Image',
          show: true
        },
        name_lastname:{
          placeholder: 'Name und Vorname',
          show: true
        },
        user_id:{
          placeholder: 'id',
          show: true
        },
        status:{
          placeholder: 'Status',
          show: true
        },
        status_details:{
          placeholder: 'Status Details',
          show: true
        },
        start:{
          placeholder: 'Onboarding',
          show: true
        },
        skype:{
          placeholder: 'Skype',
          show: true
        },
        phone:{
          placeholder: 'Telefon',
          show: true
        }
      }
    },
    data(){
      return {
        options: {
          dropzoneSelector: 'div',
          draggableSelector: 'label',
          // excludeOlderBrowsers: true,
          // showDropzoneAreas: true,
          // multipleDropzonesItemsDraggingEnabled: true,
          // onDrop(event) {},
          // onDragstart(event) {
          //   event.stop();
          // },
          // onDragend(event) {
          //   event.stop();
          // }
        },
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

.checkboxes{
  width: 15%;
  position: fixed;
  top:90px;
  right:0;
  border-left: 1px solid #e6e6e6;
  padding: 20px 0 0 15px;
  label{
    display: block;
    position: relative;
    padding: 0 0 20px 35px;
    margin-bottom: 12px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    p{
      padding-top: 5px;
      width: 70%;
    }
    i{
      margin: -18px 5% 0 0;
      width: 10%;
      float: right;
    }
    input{
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
      &:checked ~ .checkmark {
        background-color: #0237cf;
      }
      &:checked ~ .checkmark:after {
        display: block;
      }
    }
    span {
      position: absolute;
      top: 0;
      left: 0;
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
    }
    &:hover input ~ .checkmark {
      background-color: #ccc;
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
