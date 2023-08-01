<template>
  <section class="main">
    <location-results></location-results>
    <map-display></map-display>
  </section>
</template>

<script>
import LocationResults from "./LocationResults.vue";
import MapDisplay from "./MapDisplay.vue";

export default {
  components: {
    LocationResults,
    MapDisplay,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.main {
  width: 100%;
  padding: 2rem;

  display: flex;
}
</style>
