<template>
  <div>
    <gmap-map
      :options="mapOptions"
      :center="center"
      :zoom="12"
      style="width:100%;  height: 300px;">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"/>
    </gmap-map>
  </div>
</template>

<script>
  import {gmapApi} from 'vue2-google-maps'

  export default {
    name: "map_location",
    props: {
      locations:{
        required:true
      }
    },
    data() {
      return {
        center: { lat: 52.519, lng: 13.406 },
        markers: [],
        mapOptions: {
          disableDefaultUI : true
        }
      };
    },
    computed: {
      google: gmapApi,
    },
    watch:{
      google: function () {
        for(let location_key in this.locations){
          let location = this.locations[location_key]
          this.search_location(location.street + ', ' + location.zip + ' ' + location.city)
        }
      }
    },
    methods: {
      search_location(location) {
        let position = {}

        let geocoder = new this.google.maps.Geocoder();
        geocoder.geocode({'address': location}, (results, status) => {
          if (status === 'OK') {
            position = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
            }

            if(position.lat !== this.center.lat && position.lng !== this.center.lng){
              this.markers.push({ 'position': position });
              this.center = position
            }
          }
        })
      }
    }
  };
</script>
