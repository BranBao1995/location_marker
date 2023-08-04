<template>
  <section class="map_display">
    <GoogleMap id="map" :api-key="apiKey" :center="center" :zoom="15">
      <Marker
        v-for="location in locations"
        :key="location.id"
        :id="location.id"
        :options="{ position: location.center }"
      />
    </GoogleMap>
  </section>
</template>

<script>
import { GoogleMap, Marker } from "vue3-google-map";

export default {
  components: { GoogleMap, Marker },
  inject: ["locations", "center", "apiKey"],
  data() {
    return {};
  },

  mounted() {
    console.log("component is mounted!");
    console.log(this.locations);
    console.log(this.center);
  },

  updated() {
    console.log("component is updated!");
    console.log(this.locations);
    console.log(this.center);
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
