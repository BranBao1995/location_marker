<template>
  <section class="navbar">
    <form @submit.prevent="getAddress" class="search_form">
      <input
        class="search_input"
        type="text"
        placeholder="Search for a location"
        v-model="address"
      />
      <button type="button" id="search_button" @click.prevent="getAddress">
        Search
      </button>
      <button
        type="button"
        id="current_button"
        @click.prevent="currentLocation"
      >
        Current Location
      </button>
    </form>
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
      // console.log("getAddress is called!");
      this.$emit("get-address", this.address);
      this.address = "";
    },

    currentLocation() {
      // console.log("currentLocation is called!");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log(location);
          this.$emit("current-location", location);
        },
        (error) => {
          console.log(error.message);
        }
      );
      this.address = "";
    },
  },
};
</script>

<style scoped>
.navbar {
  width: 100%;
  padding: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;
}

.search_form {
  width: 60%;
  font-size: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;
}

.search_input {
  width: 70%;
  height: 4rem;
  padding: 1rem;
  border: 1px solid rgb(69, 69, 69);
}

.search_form button {
  width: 15%;
  height: 4rem;
  padding: 1rem;

  font-size: 1.3rem;
  background: none;
  border: 1px solid rgb(69, 69, 69);

  cursor: pointer;
}

.search_form button:hover {
  background: rgb(173, 172, 172);
}
</style>
