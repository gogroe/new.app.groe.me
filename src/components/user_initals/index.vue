<template>
  <div>
    <div class="user_initials" :class="initials_class">
      <div class="initials_wrapper" :style="{ width: size + 'px', height: size + 'px', borderRadius: size + 'px', background: color(initials(name))}">
        <p :style="{fontSize: (size * 0.5) + 'px', lineHeight: (size * 0.5) + 'px', marginTop: 'calc(51% - ' + (size * 0.25) + 'px)'}">
          {{initials(name)}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "user_initials",
    props:{
      name:{
        required: true
      },
      size:{
        required: true
      },
      initials_class:{
        type: String,
        required: false
      }
    },
    data(){
      return{
        colors:{
          A: '#a88b8d',
          B: '#a8a18b',
          C: '#a2a890',
          D: '#91a892',
          F: '#85a0a8',
          G: '#6b79a8',
          H: '#5153a8',
          I: '#7385a8',
          J: '#8877a8',
          K: '#9c70a8',
          L: '#a8749c',
          M: '#a87587',
          N: '#a88085',
          O: '#a8987e',
          P: '#9fa881',
          Q: '#82a87e',
          R: '#78a896',
          S: '#4b7fa8',
          T: '#4465a8',
          U: '#5c58a8',
          V: '#6a4ea8',
          W: '#9253a8',
          X: '#a85494',
          Y: '#a8456a',
          Z: '#a85953',
        }
      }
    },
    methods:{
      initials(string){
        if(typeof string === 'string'){
          return string.charAt(0).toUpperCase();
        }
      },
      color(letter){
        if(letter in this.colors){
          return this.colors[letter]
        }
        else{
          return '#2c68a8'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .initials_wrapper{
    overflow: hidden;
    background: #2c68a8;

    p{
      text-align: center;
      color: #fff
    }
  }

</style>
