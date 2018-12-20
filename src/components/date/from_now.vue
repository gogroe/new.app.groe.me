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
        let week = moment.unix(timestamp).locale("de").startOf('week').fromNow()
        let day = moment.unix(timestamp).locale("de").startOf('day').fromNow()
        let hour = moment.unix(timestamp).locale("de").startOf('hour').fromNow()

        return week.search('Woche') !== -1
          ? week.replace('vor', '').replace(' Wochen', 'W').replace(' Woche', 'W').replace('einem', '1')
          : day.search('Tag') !== -1
            ? day.replace('vor', '').replace(' Tagen', 'T').replace(' Tag', 'T').replace('einem', '1')
            : hour.replace('vor', '').replace(' Stunden', 'S').replace(' Stunde', 'S').replace('einem', '1')
      }
    }
  }
</script>

<style lang="scss" scoped>

  .date_from_now span{
    color: #bbbbbb;
  }

</style>
