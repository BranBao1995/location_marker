<template>
  <div>
    <NavBar @current-location="currentLocation" @get-address="setAddress" />
    <MainContent />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import MainContent from "./components/MainContent.vue";

import { computed } from "vue";

export default {
  components: {
    NavBar,
    MainContent,
  },

  data() {
    return {
      // location: { lat: 0, lng: 0 },
      locations: [{ id: "0", center: { lat: 0, lng: 0 } }],
      center: { lat: 0, lng: 0 },
      key: process.env.VUE_APP_GOOGLE_MAP_API_KEY,
    };
  },

  provide() {
    return {
      // need to call computed() and wrap your data in it so that the child component injecting this will react to changes
      locations: computed(() => this.locations),
      center: computed(() => this.center),
      // location: computed(() => this.location),
      apiKey: computed(() => this.key),
    };
  },

  methods: {
    setAddress(address) {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.key}
`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          const latlng = data.results[0].geometry.location;
          const newLoc = {
            id: (latlng.lat + latlng.lng).toString(),
            center: { lat: latlng.lat, lng: latlng.lng },
          };

          const newCenter = { lat: latlng.lat, lng: latlng.lng };

          this.locations = [...this.locations, newLoc];
          this.center = newCenter;
          console.log("locations array: " + this.locations);
          console.log("map center: " + this.center);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    currentLocation(newLocation) {
      // this would not work, in order for Vue to know your data has been updated, especially when the data is an object
      // a change on the reference that this object points to needs to happen
      // simply setting the properties within the object to new values would not trigger the change
      // this.location.lat = newLocation.lat;
      // this.location.lng = newLocation.lng;

      const newLoc = {
        id: (newLocation.lat + newLocation.lng).toString(),
        center: { lat: newLocation.lat, lng: newLocation.lng },
      };

      const newCenter = { lat: newLocation.lat, lng: newLocation.lng };

      this.locations = [...this.locations, newLoc];
      this.center = newCenter;

      console.log("locations array: " + this.locations);
      console.log("map center: " + this.center);
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 10px;
  height: 100%;
}

body {
  min-height: 100%;
  line-height: 1;
  font-family: sans-serif;
}

input,
select,
option,
optgroup,
textarea,
button,
pre,
code {
  font-size: 100%;
  font-family: inherit;
}

ol,
ul {
  list-style: none;
}

a,
a:active,
a:visited {
  text-decoration: none;
}
</style>
