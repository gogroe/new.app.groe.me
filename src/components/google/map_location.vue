<template>
  <div>
    <!--<div>-->
      <!--<label>-->
        <!--<gmap-autocomplete-->
          <!--@place_changed="setPlace">-->
        <!--</gmap-autocomplete>-->
        <!--<button @click="addMarker">Add</button>-->
      <!--</label>-->
      <!--<br/>-->
    <!--</div>-->
    <br>
    <gmap-map
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
  export default {
    name: "map_location",
    props: {
      locations:{
        required:true
      }
    },
    data() {
      return {
        // default to Montreal to keep it simple
        // change this to whatever makes sense
        center: { lat: 45.508, lng: -73.587 },
        markers: [],
        places: [],
        currentPlace: null,
      };
    },
    mounted() {
      this.geolocate();
    },
    methods: {
      // receives a place object via the autocomplete component
      setPlace(place) {
        this.currentPlace = place;
      },
      addMarker() {
        if (this.currentPlace) {
          const marker = {
            lat: this.currentPlace.geometry.location.lat(),
            lng: this.currentPlace.geometry.location.lng()
          };
          this.markers.push({ position: marker });
          this.places.push(this.currentPlace);
          this.center = marker;
          this.currentPlace = null;
        }
      },
      geolocate: function() {
        // let geocoder = new google.maps.Geocoder();
        // geocoder.geocode({'address': this.locations}, (results, status) => {
        //   if (status === 'OK') {
        //     this.center = {
        //       lat: results[0].geometry.location.lat(),
        //       lng: results[0].geometry.location.lng()
        //     }
        //   }
        //   else {
        //     console.log(status);
        //     return null
        //   }
        // });

        navigator.geolocation.getCurrentPosition(position => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        });
      }
    }
  };
</script>
