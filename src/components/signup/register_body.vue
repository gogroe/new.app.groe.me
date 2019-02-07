<template>
  <div class="howdy">

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
      <date-picker class="date-picker-style" format="dd.MM.yyyy" lang="de" v-if="slide.type === 'date'" v-model="slide.value" input-class="" :first-day-of-week="1" :type="slide.type"/><br/>
      <!--ERRORS//if stetement explanation: the if elif elif if in the <p> tags checks if isEmpty isNumber isE-mail or isLettersAndSpacesOnly-->
      <div>
        <div  v-show="active">
          <p>{{(slide.value==='') ? key2+' has to be inputed':
            (key2==='phone'&&slide.value!==''&&isNaN(slide.value.replace(/ /g,''))) ? 'has to be a number':
            (key2==='email'&&!slide.value.includes('@')&&slide.value!=='') ? 'email format not correct':
            (key2 === 'name'&&!isNaN(slide.value)) ? 'has to be a number':''}}</p>
        </div>
      </div>
      <!--buttons-->
      <button class="blue-button" v-if="key2 !== 'name'" @click="pos--">zurück</button>
      <button class="blue-button" v-if="key2 !== 'email'" @click="pos++">weiter</button>
      <button class="blue-button" id="sub"
              v-if="(regEntry.name.value!=='' && regEntry.email.value!=='' && regEntry.l_form.value!=='' && regEntry.street.value!=='')"
              @click="send">submit</button>
      <p v-else-if="slide.id===7" v-show="active">you are missing some important input</p>
    </div>
    <f_request :obj="request" v-model="request"/>
  </div>
</template>
<script>
  export default {
    name: 'customer',
    data () {
      return {
        pos: 0,
        active: false,
      }
    }
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
    font-size: 24vw;
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
