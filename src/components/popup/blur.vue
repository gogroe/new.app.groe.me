<template>
  <div id="popup">
    <div  id="inner_popup">
      <slot>
      </slot>
    </div>
    <div class="close_popup" @click="active.edit_upload = false; active.upload = false"><i class="material-icons">close</i> schließen</div>
  </div>
</template>

<script>
export default {
  name: 'popup',
  props:{
    active:{
      type: Boolean,
      required: true
    }
  },
  watch:{
    active:{
       handler(obj){
         let app = document.getElementById('app')
         let popup = document.getElementById('inner_popup')
         if(obj){
           let div = document.createElement("div")
           div.className = "unblured"
           document.body.insertBefore(div, app);
           div.innerHTML = document.getElementById('popup').innerHTML
           div.getElementsByTagName('button')[div.getElementsByTagName('button').length-1].addEventListener('click', function(){
             for (let i in div.getElementsByTagName('input')) {
               if(div.getElementsByTagName('input')[i].value !== undefined){
                 popup.getElementsByTagName('input')[i].defaultValue = div.getElementsByTagName('input')[i].value
               }
             }
             popup.getElementsByTagName('button')[popup.getElementsByTagName('button').length-1].click();
             this.hide
           })
           app.className = 'blured'
           app.addEventListener("click", this.hide);
           document.getElementsByClassName('close_popup')[0].addEventListener("click", this.hide);
         }
         else if(document.getElementsByClassName('unblured').length !== 0){
           document.getElementsByClassName('unblured')[0].parentNode.removeChild(document.getElementsByClassName('unblured')[0])
           app.className = ''
           app.removeEventListener("click", this.hide);
         }
       },deep: true
    },
  },
  methods:{
    hide(){
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="scss" scoped>
  #popup{
    display: none;
  }
</style>
