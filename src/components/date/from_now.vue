<template>
  <div class="date_from_now">
    <span>{{timestamp_to_date(timestamp)}}</span>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    name: "from_now",
    props:{
      timestamp:{
        required: true
      }
    },
    methods:{
      timestamp_to_date(timestamp){

        return moment.unix(timestamp).locale("de").startOf('day').fromNow()
          .replace('vor', '')
          .replace(' Jahren', 'J').replace(' Jahr', 'J').replace('einem', '1')
          .replace(' Monaten', 'M').replace(' Monat', 'M').replace('einem', '1')
          .replace(' Wochen', 'W').replace(' Woche', 'W').replace('einem', '1')
          .replace(' Tagen', 'T').replace(' Tag', 'T').replace('einem', '1')
          .replace(' Stunden', 'S').replace(' Stunde', 'S').replace('einer', '1')
          .replace(' Minuten', 'M').replace(' Minute', 'M').replace('einer', '1')
      }
    }
  }
</script>

<style lang="scss" scoped>

  .date_from_now span{
    color: #bbbbbb;
  }

</style>
