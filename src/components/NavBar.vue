<template>
  <section class="navbar">
    <form class="search_form">
      <input
        class="search_input"
        type="text"
        placeholder="Search for a location"
      />
      <button class="search_button">Search</button>
      <button class="search_button">Current Location</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {};
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
