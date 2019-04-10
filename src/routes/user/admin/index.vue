<template>
  <div class="admin">
    <sidebar :options="menu_items" v-model="active.menu"/>
    <div class="add_wrapper"></div>
    <div class="title">
      <p>Persönliche Daten</p>
      <p>Allgemeine Informationenwie Name und Foto bei groe</p>
    </div>
    <div class="default_box_two">
      <div class="content_admin">
        <admin_user :cload="cload_data('user')"/>
        <admin_contact :cload="cload_data('contact')"/>
        <admin_adress :cload="cload_data('adress')"/>
        <admin_bank :cload="cload_data('bank')"/>
        <admin_password v-if="$$permission.is_perm('create')"/>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
  import Sidebar from "../../../components/navbars/sidebar";
  import { mapGetters } from 'vuex'
  import Admin_user from "./users/index";
  import Admin_contact from "./contact";
  import Admin_adress from "./adress";
  import Admin_bank from "./bank";
  import Admin_password from "./password";
  import Request from "../../../components/functions/request";
  import loader from "../../../components/functions/loader";

  export default {
    name: "users_admin",
    components:{
      Request,
      Admin_password,
      Admin_bank,
      Admin_adress,
      Admin_contact,
      Admin_user,
      Sidebar
    },
    data(){
      return{
        menu_items:[
          {name: 'Nutzer'},
          {name: 'Knotakte'},
          {name: 'Adresse'},
          {name: 'Bank'},
          {name: 'Passwort'},
        ],
        cload:{
          url: 'https://newbackend.groe.me/user_admin/get_one',
          params:{
            user_id: null
          },
          data: {}
        },
        active:{
          menu: 'user'
        },
        navigation:[
          {
            name: 'Nutzer',
            route: 'user'
          }
        ],
      }
    },
    computed:{
      ...mapGetters([
        'reload',
      ])
    },
    watch:{
      reload: function (object) {
        if(object.action === 'reload' && object.section === 'users_admin'){
          this.cload.request = true
          this.$store.commit('update_reload', {action: 'reload', section: 'all'})
        }
      },
      active:{
        handler: function(obj){
          let y = 0
          var child=document.getElementsByClassName('content_admin')[0].childNodes;
          for (let i in this.menu_items) {
            if(this.menu_items[i].name === obj.menu){
              y=child[i*2].offsetTop
            }
          }
          window.scrollTo({
            top: y,
            left: 0,
            behavior: 'smooth'
          });
        }, deep: true
      }
    },
    created () {
      this.set_user_id(this.cload)
      this.set_request_url()
      this.get_cload()
    },
    methods:{
      set_request_url(){
        if(this.$$helper.edit.cut_route_name_prefix(this.$route.name) === 'user'){
          this.cload.url = 'https://newbackend.groe.me/user_admin/get_one'
        }
        else if(this.$$helper.edit.cut_route_name_prefix(this.$route.name) === 'users'){
          this.cload.url = 'https://newbackend.groe.me/users_admin/get_one'
        }
      },
      get_cload () {
        this.$$request.post.data(this.cload.url, this.cload.params)
          .then((response) => this.cload.data = response)
      },
      cload_data(type){
        return type in this.cload.data
          ?  this.cload.data[type]
          : {}
      },
    },
    mixins:[loader]
  }
</script>

<style lang="scss">
  .admin{
    .default_box_two{
      padding: 0;
      padding-bottom: 25px;

      ul{
        width: 100%;
        padding-top: 27px;
        float:left;

        li{
          margin-bottom: 27px;
          cursor: pointer;
          &.active{
            color: #3da0f5;
          }
        }
      }

      .content_admin{
        width: 100%;
        border: none;
        margin-bottom: 107px;
        float:left;

        &>div{
          border: 1px solid #dadada;
          margin-bottom: 41px;
          padding: 25px 0;
          border-radius: 5px;
        }

        .edit_section{
          padding-left: 36px;

          &:hover{
            cursor: pointer;
            background-color: #f8f8f8;


            border-top: 1px solid #dadada;
            border-bottom: 1px solid #dadada;

            & + .edit_section{
              .cinput{
                border-top: none !important;
              }
            }
            .cinput{
              border-top: none !important;
            }
          }

          .input_label{
            color:#838688;
          }
          .wrapper{
            padding-left: 0;
          }
        }

        .cinput{
          border-top: 1px solid #dadada;
          line-height: 66px;

          .input_wrapper{
            margin: 0 !important;
          }
        }

        .wrapper{
          margin: 0px;
          padding-left: 36px;

          .dropdown-toggle{
            width: 100%;
          }

          .input_label{
            width: 100px;
            color:#838688;
          }

          &:hover{
            cursor: pointer;
            background-color: #f8f8f8;
            border-top: 1px solid #dadada;
            border-bottom: 1px solid #dadada;

            & + .wrapper{
              .cinput{
                border-top: none !important;
              }
            }
            .cinput{
              border-top: none !important;
            }
          }
        }

        .input{
          padding-left: 0 5px;
        }
      }
    }

    .title{
      padding-bottom: 41px;
      text-align: center;

      p{
        color: #838688;
        font-size: 22px;

        &:last-child{
          font-size: 18px;
        }
      }
    }


    .edit_elements{
      .wrapper, .input {
        width: 100%;
      }

      .input_label{
        display: inline-block;
        cursor: text;
        line-height: 39px;
      }
      .input_wrapper{
        margin: 0;
        width: calc(100% - 117px - 27px)
      }
    }

    .section_name{
      padding: 0 36px;
      margin: 17px 0;
    }
    .section_wrapper{
      margin: 0;
    }

    .edit_section{
      .create{
        .container{
          border-top: 1px solid #dadada;
          color: #838688;
        }
      }
    }

    .edit_elements {
      &.create{
        .input_wrapper{
          padding-right: 41px;
        }
      }

      button{
        margin: 25px !important;
        background-color: #3da0f5;
        color: white;
        height: 42px;
        padding: 10px 41px;
      }
    }

    .user_contact, .user_adress, .user_bank{

      .section_wrapper{

        .edit_section:first-child{

          .container{
            border-top: none;
          }
        }
      }
    }

    .input_wrapper{
      ul{
        .highlight{
          margin-bottom: 27px !important;
        }
      }
    }
  }

</style>
