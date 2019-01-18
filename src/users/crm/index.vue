<template>
  <div class="user_crm">
    <div class="table" @scroll="scrollFunction()" ref="table">
      <div class="table_head" ref="head">
        <span v-for="(column, i) in columns"
            :key="i"
            v-if="column.show"
            :class="column.name">
          <p>{{column.placeholder}}</p>
        </span>
      </div>

      <span v-for="(column, i) in columns"
          :key="i"
           v-if="column.show"
          :class="column.name">
        <cell
        v-for="cell, i in column.data"
        :key="i"
        :cell_obj="cell"/>
      </span>
    </div>

    <drag_filter :columns="columns" v-model="columns"/>
    <request :obj="request_users" v-model="request_users"/>
  </div>
</template>

<script>
  import Request from "../../components/functions/request";
  import Edit from "../../components/inputs/edit";
  import drag_filter from "./filters/index";
  import { mapGetters } from 'vuex'
  import Cell from "./cell";

  export default {
    name: "user_crm",
    components:{
      Cell,
      Request,
      Edit,
      drag_filter
    },
    data(){
      return {
        columns:[
          {
            no: 1,
            placeholder: 'Image',
            name: 'image',
            show: true,
            show2: false,
            data: [],
            onclick: false,
            options: [
              {
                name: 'one',
                filter: 'range',
                value: 0,
                show: false
              },
              {
                name: 'two',
                filter: 'text',
                value: '',
                show: false
              },
              {
                name: 'three',
                filter: 'range',
                value: 0,
                show: false
              }
            ],
          },
          {
            no: 2,
            placeholder: 'Name',
            name: 'name_lastname',
            show: true,
            show2: false,
            data: [],
            onclick: false,
            options: [
              {
                name: 'one',
                filter: 'text',
                value: '',
                show: false
              },
              {
                name: 'two',
                filter: 'text',
                value: '',
                show: false
              },
            ],
          },
          {
            no: 3,
            placeholder: 'id',
            name: '',
            show: true,
            show2: false,
            data: [],
            onclick: false,
            options: [
              {
                name: 'one',
                filter: 'range',
                value: '',
                show: false
              },
            ],
          },
          {
            no: 4,
            placeholder: 'Status',
            name: '',
            show: true,
            show2: false,
            data: [],
            onclick: false,
            options: [
            ],
          },
          {
            no: 5,
            placeholder: 'Status Details',
            name: '',
            show: true,
            show2: false,
            data: [],
            onclick: false,
            options: [
            ],
          },
          {
            no: 6,
            placeholder: 'Onboarding',
            name: '',
            show: true,
            show2: false,
            data: [],
            onclick: false,
            options: [
            ],
          },
          {
            no: 7,
            placeholder: 'Skype',
            name: '',
            show: true,
            show2: false,
            data: [],
            onclick: false,
            options: [
            ],
          },
          {
            no: 8,
            placeholder: 'Telefon',
            name: '',
            show: true,
            show2: false,
            data: [],
            onclick: false,
            options: [
            ],
          }
        ],

        menu_items:[
          { name: 'ALLE' },
          { name: 'EINGANG' },
        ],

        active:{
          menu: 0,
          create: false
        },

        request_users: {
          params: {
            user_id: null,
            user_conditions: null,
            user_columns: null,
            user_order: ''
          },
          // url: 'http://newbackend.groe.me/users/get_users',
          url: 'http://newbackend.groe.me/users/get_user_navigation',
          data: {},
          request: false
        }
      }
    },

    computed:{
      ...mapGetters([
        'users_filter',
      ]),
      request_users_data(){
        return this.request_users.data
      },
      request_sorting(){
        return this.columns.data
      }
    },

    watch:{
      request_users_data(obj){
        this.load_columns()
      },
      users_filter(obj){
        this.filter_users(obj)
      },
      request_sorting(obj){
        this.sorting(obj)
      }
    },

    mounted(){
      this.request_users.request = true
    },

    methods:{
      value_change: function(){

      },

      load_columns: function(){
        var i;
        for (i in this.request_users.data) {
          this.columns[0].data.push(this.request_users.data[i].image);
          this.columns[1].data.push(this.request_users.data[i].name + ' ' + this.request_users.data[i].lastname);
          this.columns[2].data.push(this.request_users.data[i].id);
          this.columns[3].data.push(this.request_users.data[i].status);
          this.columns[4].data.push(this.request_users.data[i].status_details);
          this.columns[5].data.push(this.request_users.data[i].name);//onboarding
          this.columns[6].data.push(this.request_users.data[i].name);//skype
          this.columns[7].data.push(this.request_users.data[i].name);//phone
        }
      },

      sorting: function(index){
      },

      onEnd: function(evt){
      },

      scrollFunction: function(){
        this.$refs.head.scrollLeft = this.$refs.table.scrollLeft
      },

      filter_users: function(obj){
        var a = this.users_filter
        console.log(a);
        switch (a){
          case 'age':
            return obj.name<a;
            break;
          case 'name':
            return obj.name.includes(a);
            break;
        }
      }
    },
  }
</script>

<style lang="scss" scoped>

  ::-webkit-scrollbar {
    height: 10px;
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  .user_crm{
    width: 90%;
    display: inline-block;
    position: absolute;
    right: 16%;

  }

  .table{
    background-color: white;
    outline: 15px solid white;
    width: calc(100% - 200px);
    float: right;
    height: calc(100% - 192px);
    overflow: auto;
    margin: 128px 64px 20px;
    white-space: nowrap;
    // box-shadow: 0px 0px 40px 20px red inset;
    .table_head{
      outline: 15px solid white;
      background: white;
      position: absolute;
      top: 84px;
      /*left: calc(16%-15px);*/
      height: 34px;
      width: calc(100% - 200px);
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      border-bottom: 2px solid lightgray;
      span{
        width: calc(100vw / 8);
        text-align: center;
        padding-bottom: 20px;
        display: inline-block;
        p{
          font-size: 15px;
        }
      }
      .image{
        cursor: pointer;
        width: 10%;
      }
    }
    span{
      text-align: center;
      width: calc(100vw / 8);
      display: inline-block;
      .edit_field{
        display: none;
      }
      div{
        width: 100%;
        height: 45px;
        float: none;
        padding: 15px 0;
        display: block;
        text-align: center;
        border-bottom: 1px solid lightgray;
        p{
          display: inline;
        }
      }
      div:hover ~ .edit_field{
        display: block;
      }
    }
    .name_lastname{
        cursor: pointer;
        font-weight: bold;
        color: #294dd2;
    }
    .image{
        cursor: pointer;
        width: 10%;
    }
  }

  //
  // .dragArea{
  //   width: 15%;
  //   position: fixed;
  //   top:90px;
  //   right:0;
  //   border-left: 1px solid #e6e6e6;
  //   padding: 20px 0 0 15px;
  //   .draggable{
  //     height: calc(100vh - 250px);
  //     overflow: auto;
  //     .checkbox_container{
  //     display: block;
  //     position: relative;
  //     margin-bottom: 12px;
  //     padding-top: 13px;
  //
  //     label{
  //       cursor: pointer;
  //       -webkit-user-select: none;
  //       -moz-user-select: none;
  //       -ms-user-select: none;
  //       user-select: none;
  //       .checkmark{
  //         z-index: 2;
  //       }
  //       .checkbox{
  //         position: absolute;
  //         opacity: 0;
  //         cursor: pointer;
  //         height: 0;
  //         width: 0;
  //
  //         &:checked ~ .checkmark {
  //           background-color: #0237cf;
  //         }
  //
  //         &:checked ~ #checkmark {
  //           background-color: #4f7dff;
  //         }
  //
  //         &:checked ~ .checkmark:after {
  //           display: block;
  //         }
  //       }
  //
  //       span {
  //         position: absolute;
  //         top: 10px;
  //         left: 10px;
  //         height: 22px;
  //         width: 22px;
  //         background-color: #eee;
  //         &:after {
  //           content: "";
  //           position: absolute;
  //           display: none;
  //           left: 9px;
  //           top: 5px;
  //           width: 5px;
  //           height: 10px;
  //           border: solid white;
  //           border-width: 0 3px 3px 0;
  //           -webkit-transform: rotate(45deg);
  //           -ms-transform: rotate(45deg);
  //           transform: rotate(45deg);
  //         }
  //       } //redesigned checkbox
  //
  //       &:hover input ~ .checkmark {
  //         background-color: #ccc;
  //       }
  //     }
  //
  //     .dropdown {
  //       position: relative;
  //       display: inline-block;
  //
  //     }
  //
  //     .paragraph_label{
  //       cursor: pointer;
  //       display: inline-block;
  //       padding: 0 0 0 35px;
  //     }
  //
  //     input{
  //       width: 90%;
  //       margin: 30px auto;
  //     }
  //
  //     .dropdown-content {
  //       margin-top: 20px;
  //       display: none;
  //       width: 100%;
  //       background-color: #f6f6f6;
  //       min-width: 160px;
  //       // box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  //       padding: 12px 16px;
  //     }
  //
  //     .dropdown:hover .dropdown-content {
  //       display: block;
  //     }
  //
  //     i{
  //       position: relative;
  //       top: 0px;
  //       cursor: grab;
  //       margin-right: 10%;
  //       width: 10%;
  //       float: right;
  //     }
  //   }
  //   }
  //   ul{
  //     position: relative;
  //     width: 100%;
  //     background: none;
  //     border: none;
  //     text-align: center;
  //     padding: 0;
  //     height: 64px;
  //     li{
  //       display: inline-block;
  //       cursor: pointer;
  //       padding: 22px 0 18px 0;
  //       margin: 0 20px;
  //       font-size: 14px;
  //       line-height: 18px;
  //       color: #ddd;
  //     }
  //   }
  // }

</style>
