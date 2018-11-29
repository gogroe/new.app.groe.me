<template>
  <div>
    <p>head</p>
    <carousel/>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import carousel from '@/carousel'
    export default {
      name: "u_head",
      components:{
        carousel
      },
        computed:{
          ...mapGetters([
            'users_header'
          ])
        }
      }
</script>

<style>

</style>
