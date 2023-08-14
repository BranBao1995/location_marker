<template>
  <section class="map_display">
    <div id="map"></div>
  </section>
</template>

<script>
export default {
  inject: ["loader", "locations", "position", "apiKey"],

  data() {
    return {
      map: null,
    };
  },

  watch: {
    locations() {
      this.loadMap();
      this.addMarker();
    },
  },

  methods: {
    loadMap() {
      this.loader
        .importLibrary("maps")
        .then(({ Map }) => {
          this.map = new Map(document.getElementById("map"), {
            zoom: 4,
            center: this.position,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },

    addMarker() {
      this.loader
        .importLibrary("marker")
        .then(({ Marker }) => {
          this.locations.map((location) => {
            new Marker({
              map: this.map,
              position: location.position,
            });
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  mounted() {
    this.loadMap();
    this.addMarker();
  },
};
</script>

<style scoped>
.map_display {
  width: 60%;
}

#map {
  width: 100%;
  height: 80vh;
}
</style>
