<template>
  <div class="howdy">
    <!--NAVIGATION//:style explanation: changes the background color of the progress bar with an if elif else statement-->
    <div class="controls" v-for="(nav, key, i) in regEntry" :key="i">
      <div @click="pos=i">
        <div :style="pos===i ? 'backgroundColor:#349cc6;' :
          nav.value!=='' ? 'backgroundColor: #97C4FF;' :
          pos>i && nav.notnull ? 'backgroundColor: #fcc;' : 'backgroundColor: #ddd;'"></div>
      </div>
    </div>
    <!--SLIDES-->
    <div  class="item" v-for="(slide, key2, i) in regEntry" :key2="i" v-if="pos === slide.id">
      <h1 v-if="pos === slide.id"><label :for="i"> {{slide.question}} </label></h1>
      <input v-if="slide.type==='text'||slide.type==='email' || slide.type==='number'" v-model="slide.value" @mouseover="active = true" @mouseleave="active = false"
             :type="slide.type" :placeholder="slide.placeholder" :id="i" @keyup.enter="pos++">
      <items slides="slides" i="i"/>
      <date-picker class="date-picker-style" format="dd.MM.yyyy" lang="de" v-if="slide.type === 'date'" v-model="slide.value" input-class="" :first-day-of-week="1" :type="slide.type"/><br/>
      <!--ERRORS//if stetement explanation: the if elif elif if in the <p> tags checks if isEmpty isNumber isE-mail or isLettersAndSpacesOnly-->
      <!-- <div>
        <div  v-show="active">
          <p>{{((key2==='name'||key2==='email'||key2==='l_form'||key2==='street')&&slide.value==='') ? key2+' has to be inputed':
            (key2==='phone'&&slide.value!==''&&isNaN(slide.value.replace(/ /g,''))) ? 'has to be a number':
            (key2==='email'&&!slide.value.includes('@')&&slide.value!=='') ? 'email format not correct':
            (key2 === 'name'&&!isNaN(slide.value)) ? 'has to be a number':''}}</p>
        </div>
      </div> -->
      <button class="blue-button" v-if="i !== 0" @click="pos--">zurück</button>
      <button class="blue-button" v-if="i+1 !== Object.keys(regEntry).length" @click="pos++">weiter</button>
      <hr>
      <button class="blue-button" id="sub"
              v-if="!(Object.values(regEntry).some(obj => (obj.value==='' && obj.notnull)))"
              @click="send">submit</button>
      <p v-else-if="slide.id===6" v-show="active">you are missing some important input</p>
    </div>
  </div>
</template>
<script>
import Items from './items'
  // import DatePicker from 'vue2-datepicker'
  export default {
    name: 'employee',
    components:{
      Items
    },
    data () {
      return {
        pos: 0,
        active: false,
        regEntry: {
          name:{
            id: 0,
            notnull: true,
            type: 'text',
            placeholder: 'name und vorname',
            question: 'Wie ist dein Name',
            value: ''
          },
          email:{
            id: 1,
            notnull: true,
            type: 'email',
            placeholder: 'email@groe.me',
            question: 'Wie ist deine Email',
            value: ''
          },
          phone:{
            id: 2,
            notnull: true,
            type: 'text',
            placeholder: '00111 222 333',
            question: "Wie ist deine Telefonnummer",
            value: ''
          },
          state:{
            id: 3,
            notnull: false,
            type: 'text',
            placeholder: 'Stadt, Land',
            question: ' Aus welchem Land kommst du?',
            value: ''
          },
          position:{
            id: 4,
            notnull: false,
            type: 'text',
            placeholder: 'IT / Call agent',
            question: 'Für Welche Position bewirbst du dich?',
            value: ''
          },
          source:{
            id: 5,
            notnull: false,
            type: 'text',
            placeholder: 'LinkedIn, Facebook...',
            question: 'Woher kennst du uns?',
            value: ''
          },
          start:{
            id: 6,
            notnull: false,
            type: 'text',
            placeholder: '01/01/2019',
            question: 'Wann kannst du Starten?',
            value: ''
          }
        },
    //     request: {
    //       params: {},
    //       url: 'http://api.groe/register/employee',
    //       data: {
    //         errors: []
    //       },
    //       request: false
    //     }
      }
    },
    // computed:{
    //   request_data () {
    //     return this.request.data
    //   }
    // },
    // watch: {
    //   request_data: function (data) {
    //     if(data.errors.length > 0 ){
    //
    //     }
    //   }
    // },
    // methods:{
    //   send(){
    //     this.request.params = {
    //       name : this.regEntry.name.value,
    //       email : this.regEntry.email.value,
    //       phone : this.regEntry.phone.value,
    //       state : this.regEntry.state.value,
    //       position : this.regEntry.position.value,
    //       source : this.regEntry.source.value,
    //       start : this.regEntry.start.value,
    //     };
    //     console.log(this.request);
    //     this.request.request = true
    //   }
    // }
  }
</script>
<style  lang="scss" scoped>
.howdy{
  text-align: center;
}
.controls{
  display: inline-block;
  text-align: center;
  height: 70px;
  width: 78px;
  padding: 48px 19px 0 19px;
  div{
    height: 20px;
    width: 40px;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    div{
      width: 30px;
      height: 2px;
      display: inline-block;
    }
  }
}
//input, buttons and alerts
.item{
  width: 100%;
  float: left;
  h1{
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    font-size: 4vw;
    color: #383838;
    margin: 96px;
  }
  input{
    text-align: center;
    //replace with    border-width: 0;
    border-width: 0 0 2px;
    border-color: #ccc;
    width: 498px;
    //delete this between
    font-size: 30px;
    color: #383838;
    background-color: transparent;
    ::-webkit-input-placeholder {
      color: #ccc !important;
      font-family: 'Roboto', sans-serif !important;
      font-size: 30px !important;
    }
  }
  p{
    font-family: 'Roboto', sans-serif;
    margin-top: 10px;
    font-weight: lighter;
    color: #fcc;
    font-size: 18px;
  }
  div{
    height: 58px;
    div{
      height: 20px;
      padding-top: 5px;
      p{
        font-family: 'Roboto', sans-serif;
        color: #fcc;
        font-size: 14px;
      }
    }
  }
  button{
    margin: 0 20px;
  }
  #sub{
    background-color: #00ff70;
  }
}

</style>
