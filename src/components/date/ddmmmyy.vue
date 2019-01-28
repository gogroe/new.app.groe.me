<template>
  <span class="ddmmyy">
    <span :style="{ color: color}">{{timestamp_to_date(timestamp)}}</span>
  </span>
</template>

<script>
  import moment from 'moment'

  export default {
    name: "ddmmmyy",
    props:{
      timestamp:{
        required: true
      },
      color:{
        required: false
      },
    },
    methods:{
      timestamp_to_date(timestamp){
        return moment.unix(timestamp).locale("de").format("DD. MMM YY")
      }
    }
  }
</script>

<style lang="scss" scoped>

  .ddmmyy span{
    color: #bbbbbb;
  }

</style>
