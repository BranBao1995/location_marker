<template>
  <section class="map_display">
    <GoogleMap
      id="map"
      api-key="AIzaSyBM9JvtK7P0KmJyYPxtZ5L6C52DheakpXQ"
      :center="newLocation"
      :zoom="15"
    >
      <Marker :options="{ position: newLocation }" />
    </GoogleMap>
  </section>
</template>

<script>
import { GoogleMap, Marker } from "vue3-google-map";

export default {
  components: { GoogleMap, Marker },
  inject: ["newLocation"],
  data() {
    return {};
  },

  mounted() {
    console.log("component is mounted!");
    console.log(this.newLocation.lat);
    console.log(this.newLocation.lng);
  },

  updated() {
    console.log("component is updated!");
    console.log(this.newLocation.lat);
    console.log(this.newLocation.lng);
  },
};
</script>

<style scoped>
.map_display {
  width: 70%;
}

#map {
  width: 100%;
  height: 40rem;
}
</style>
