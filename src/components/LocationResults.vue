<template>
  <section class="results">
    <div class="view-menu">
      <button
        id="button-component"
        :class="activeComponent === 'all-results' ? 'button_selected' : ''"
        type="button"
        @click.prevent="switchComponent('all-results')"
      >
        All
      </button>
      <button
        id="button-component"
        :class="activeComponent === 'selected-results' ? 'button_selected' : ''"
        type="button"
        @click.prevent="switchComponent('selected-results')"
      >
        Selected
      </button>
    </div>
    <button
      v-if="selectedLocations.length !== 0"
      id="button-delete"
      type="button"
      @click.prevent="deleteLocations()"
    >
      Delete Selected
    </button>
    <component :is="activeComponent"></component>
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

  inject: ["selectedLocations", "deleteLocations"],

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

.view-menu {
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}

.view-menu button {
  width: 20%;
  height: 3rem;

  background: none;
  border: 1px solid grey;
  border-radius: 0;

  cursor: pointer;
  transition: 0.2s all;
}

.view-menu button:hover {
  background: rgb(173, 172, 172);
}

.view-menu .button_selected {
  background: rgb(173, 172, 172);
}

#button-delete {
  width: 30%;
  height: 3rem;

  font-size: 1.5rem;
  background: none;
  border: none;
  border-bottom: 1px solid grey;

  cursor: pointer;
  transition: 0.2s all;
}

#button-delete:hover {
  color: red;
  border-bottom: 1px solid red;
}

.list {
  width: 100%;
  padding: 2rem;
  border: 1px solid rgb(135, 134, 134);
  border-radius: 10px;
  font-size: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 1rem;
}

.list-item {
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-item-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  row-gap: 1rem;
}

.list-item-control {
  display: flex;
}

.list-item-icon {
  font-size: 2rem;
  color: rgb(212, 211, 211);
  cursor: pointer;
  transition: 0.2s all;
}

.list-item-icon:hover {
  color: red;
}

.list-item-icon-selected {
  font-size: 2rem;
  color: red;
  cursor: pointer;
}

.list-bottom {
  width: 100%;
  font-size: 1.5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 2rem;
}

.list-pagination {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 1rem;
}

.page-numbers {
  width: 30%;

  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 1rem;
}

.page-numbers li {
  text-decoration: underline;
  cursor: pointer;
}

li.page-selected {
  color: red;
  text-decoration: none;
}

.pagination-buttons {
  width: 100%;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.pagination-buttons button {
  padding: 0.6rem;
  width: 15%;
  height: auto;
  font-size: 1.2rem;

  background: none;
  border: 1px solid grey;
  border-radius: 5px;
  cursor: pointer;

  transition: 0.2s all;
}

.pagination-buttons button:hover {
  background: rgb(173, 172, 172);
}

.page-search {
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}

.page-search input {
  width: 30%;
  height: 3rem;
  padding: 1rem;

  font-size: 1rem;
  border: 1px solid grey;
}

.page-search button {
  width: 10%;
  height: 3rem;

  background: none;
  border: 1px solid grey;
  border-radius: 0;

  cursor: pointer;
  transition: 0.2s all;
}

.page-search button:hover {
  background: rgb(173, 172, 172);
}
</style>
