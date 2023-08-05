<template>
  <section class="results">
    <ul class="list">
      <li
        class="list-item"
        v-for="result in results"
        :key="result.id"
        :id="result.id"
      >
        <p>Name: {{ result.name }}</p>
        <p>Lat: {{ result.center.lat }}, Lng: {{ result.center.lng }}</p>
      </li>
    </ul>
    <div class="list-control">
      <div class="list-pagination">
        <button id="button-prev" type="button" @click="prevPage()">
          Prev.
        </button>
        <button id="button-next" type="button" @click="nextPage()">Next</button>
      </div>
      <p class="page-info">{{ page }} / {{ totalPages }}</p>
    </div>
  </section>
</template>

<script>
export default {
  inject: ["results", "page", "totalPages", "prevPage", "nextPage"],
  emits: ["prev-page", "next-page"],

  data() {
    return {};
  },

  methods: {
    // prevPage() {
    //   console.log('Click the "prev" button');
    // },
    // nextPage() {
    //   console.log('Click the "next" button');
    // },
  },
};
</script>

<style scoped>
.results {
  width: 35%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.list {
  width: 100%;
  padding: 1rem;
  border: 1px solid black;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 1rem;
}

.list-item {
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
</style>
