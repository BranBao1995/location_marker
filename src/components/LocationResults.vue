<template>
  <section class="results">
    <component :is="activeComponent"></component>
    <button
      v-if="activeComponent === 'all-results'"
      id="button-component"
      type="button"
      @click.prevent="switchComponent('selected-results')"
    >
      View Selected
    </button>
    <button
      v-else
      id="button-component"
      type="button"
      @click.prevent="switchComponent('all-results')"
    >
      View All
    </button>
  </section>
</template>

<script>
import AllResults from "./AllResults.vue";
import SelectedResults from "./SelectedResults.vue";
export default {
  components: {
    AllResults,
    SelectedResults,
  },

  data() {
    return {
      activeComponent: "all-results",
    };
  },

  methods: {
    switchComponent(component) {
      this.activeComponent = component;
    },
  },
};
</script>

<style>
.results {
  width: 35%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 2rem;
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
  justify-content: space-between;
  align-items: center;
}

.list-item-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.list-item-control {
  display: flex;
}

.list-item-icon {
  color: white;
  border: 1px solid red;
  cursor: pointer;
}
.list-item-icon-selected {
  color: red;
  cursor: pointer;
}

.list-control {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 1rem;
}

.list-pagination {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 1rem;
}

.page-list {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 1rem;
}

.page-list li {
  text-decoration: underline;
  cursor: pointer;
}

li.page-selected {
  color: red;
  text-decoration: none;
}
</style>
