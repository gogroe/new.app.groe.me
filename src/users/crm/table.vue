<template>
  <div class="table">
    picic
    <span v-for="(column, i) in columns"
        :key="i">
      <div v-if="column.show" v-for="cell in column.data">
        <p @click="column.onclick">{{cell}}</p>
      </div>
    </span>
  </div>
</template>

<script>
  export default {
    name: "table",
    components:{
    },
    data(){
      return {
        columns:{
          image:{
            placeholder: 'Image',
            show: true,
            data: [],
            onclick: ''
          },
          name_lastname:{
            placeholder: 'Name und Vorname',
            show: true,
            data: [],
            onclick: ''
          },
          user_id:{
            placeholder: 'id',
            show: true,
            data: [],
            onclick: ''
          },
          status:{
            placeholder: 'Status',
            show: true,
            data: [],
            onclick: ''
          },
          status_details:{
            placeholder: 'Status Details',
            show: true,
            data: [],
            onclick: ''
          },
          start:{
            placeholder: 'Onboarding',
            show: true,
            data: [],
            onclick: ''
          },
          skype:{
            placeholder: 'Skype',
            show: true,
            data: [],
            onclick: ''
          },
          phone:{
            placeholder: 'Telefon',
            show: true,
            data: [],
            onclick: ''
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

::-webkit-scrollbar {
  width: 5px;
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

.table{
  background-color: white;
  outline: 20px solid white;
  margin: 90px 30px;
  width: 70%;
  overflow: auto;
  white-space: nowrap;
  span{
    width: 25%;
    display: inline-block;
    div{
      width: 100%;
      float: none;
      padding: 10px;
      display: block;
      text-align: center;
      border-bottom: 1px solid lightgray;
      margin: 10px;
      p{
        display: block;
      }
    }
  }
  span:first-child{
    div{
      p{
        cursor: pointer;
        font-weight: bold;
        color: lightblue;
      }
    }
  }
}

</style>
