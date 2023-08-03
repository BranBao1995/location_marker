<template>
  <div>
    <NavBar @get-location="setLocation" />
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
      location: { lat: 0, lng: 0 },
    };
  },

  provide() {
    return {
      // need to call computed() and wrap your data in it so that the child component injecting this will react to changes
      newLocation: computed(() => this.location),
    };
  },

  methods: {
    setLocation(newLocation) {
      // this would not work, in order for Vue to know your data has been updated, especially when the data is an object
      // a change on the reference that this object points to needs to happen
      // simply setting the properties within the object to new values would not trigger the change
      // this.location.lat = newLocation.lat;
      // this.location.lng = newLocation.lng;

      const newLoc = { lat: newLocation.lat, lng: newLocation.lng };
      this.location = newLoc;
      console.log(this.location.lat);
      console.log(this.location.lng);
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
