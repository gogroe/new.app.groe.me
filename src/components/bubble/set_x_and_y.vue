<template>
  <div class="set_x_y" ref="bubble">

  </div>
</template>

<script>
export default {
  name: 'set_x_y',
  props:{
    info_link:{
      type: String,
      required: false
    },
    text:{
      type: String,
      required: true
    },
    size:{
      type: Number,
      required: false,
      default: 200
    },
    data(){
      return{
        not_hover: null,
        hover: null
      }
    }
  },
  mounted(){
    this.$refs['bubble'].parentElement.onmouseover = this.is_hovering
    this.$refs['bubble'].parentElement.onmouseout = this.isnt_hovering
  },
  methods:{
    set_bubble: function(){
      this.$store.commit('update_bubble', {
        x: Math.trunc(this.$refs['bubble'].getBoundingClientRect().left),
        y: Math.trunc(this.$refs['bubble'].getBoundingClientRect().top),
        info_link: this.info_link,
        text: this.text,
        size: this.size,
        show: true
      })
    },
    remove_bubble: function(){
      this.$store.commit('update_bubble', {
        x: 0,
        y: 0,
        info_link: null,
        text: null,
        size: 200,
        show: false
      })
    },
    is_hovering(){
      clearTimeout(this.not_hover);
      this.hover = setTimeout(this.set_bubble, 1000)
    },
    isnt_hovering(){
      clearTimeout(this.hover);
      this.not_hover = setTimeout(this.remove_bubble, 1000)
    },
  }
}
</script>

<style scoped>
</style>
