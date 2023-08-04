<template>
  <section class="navbar">
    <form class="search_form">
      <input
        class="search_input"
        type="text"
        placeholder="Search for a location"
        v-model="address"
      />
      <button type="button" class="search_button" @click.prevent="getAddress">
        Search
      </button>
    </form>
    <button
      type="button"
      class="search_button"
      @click.prevent="currentLocation"
    >
      Current Location
    </button>
  </section>
</template>

<script>
export default {
  emits: ["current-location", "get-address"],

  data() {
    return {
      address: "",
    };
  },

  methods: {
    getAddress() {
      this.$emit("get-address", this.address);
    },

    currentLocation() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.$emit("current-location", location);
        },
        (error) => {
          console.log(error.message);
        }
      );
    },
  },
};
</script>

<style scoped>
.navbar {
  width: 100%;
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search_form {
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search_input {
  width: 80%;
  height: 3rem;
}

.search_button {
  width: 20%;
  height: 3rem;
}
</style>
