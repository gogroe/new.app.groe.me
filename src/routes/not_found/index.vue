<template>
  <div class="not_found">
    <img src="../../../static/layout/404-permalink.png"/>
    <!-- <notify_pane/> -->
    <bubble text="fuck my life, srsly somebody kill me please! somebody kill me PLEASEEEEE! ON MY KNEES, PRETTY PRETTY PLEASE, KIIIIIIILL MEEEEEEE!! I WANT TO DIE! PUT A BULLET IN MY HEEEE-EEEE-EEEEEEEEEE-EEEAD!!!!!" info_link="a"/>
  </div>
</template>

<script>
import Notify_pane from '../notification'
import bubble from '../../components/bubble'
export default {
  name: 'not_found',
  components: {Notify_pane, bubble},

  mounted(){
    this.$store.commit('update_notification', {})
  }
}
</script>

<style lang="scss" scoped>
img{
  margin-top: 100px;
  width: 90%;
  opacity: 0.3;
}
</style>
