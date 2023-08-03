<template>
  <section class="main">
    <LocationResults />
    <MapDisplay />
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
};
</script>

<style scoped>
.main {
  width: 100%;
  padding: 2rem;

  display: flex;
}
</style>
