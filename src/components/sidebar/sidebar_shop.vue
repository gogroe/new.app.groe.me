<template>
  <div>
    <ul>
      <li class="main_item"
          v-for="(main_item, mi_key, mi_i) in nav"
          :key="mi_i"
          v-if="check_project_id">
        <p @click="$router.push(main_item.route + '/' + main_item.id)">{{main_item.name}}</p>
        <!--<div class="sub_item"
             v-for="(sub_item, su_key, su_i) in main_item.projects">
        </div>-->
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default{
    name: "sidebar_shop",
    data(){
      return{

      }
    },
    computed:{
      ...mapGetters([
        'users_header'
      ])
    },
    methods:{

    }
  }
</script>

<style>

</style>
