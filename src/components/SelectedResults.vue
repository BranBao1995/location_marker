<template>
  <ul class="list">
    <p v-if="selectedResults.length === 0">No selections yet</p>
    <li
      v-else
      v-for="result in selectedResults"
      :key="result.id"
      :id="result.id"
      class="list-item"
    >
      <div class="list-item-info">
        <p>Name: {{ result.name }}</p>
        <p>Lat: {{ result.position.lat }}, Lng: {{ result.position.lng }}</p>
      </div>
      <div class="list-item-control">
        <font-awesome-icon
          :class="
            selectedLocationsIds.includes(result.id)
              ? 'list-item-icon-selected'
              : 'list-item-icon'
          "
          icon="square"
          @click="sendSelectedId(result.id)"
        />
      </div>
    </li>
  </ul>
  <div class="list-bottom">
    <div class="list-pagination">
      <ul v-if="totalSelectedPages !== 1" class="page-numbers">
        <li
          v-if="selectedViewPage - 5 >= 1"
          @click="goToPage(selectedViewPage - 5, 'selected')"
        >
          {{ selectedViewPage - 5 }}
        </li>
        <li
          v-if="selectedViewPage - 4 >= 1"
          @click="goToPage(selectedViewPage - 4, 'selected')"
        >
          {{ selectedViewPage - 4 }}
        </li>
        <li
          v-if="selectedViewPage - 3 >= 1"
          @click="goToPage(selectedViewPage - 3, 'selected')"
        >
          {{ selectedViewPage - 3 }}
        </li>
        <li
          v-if="selectedViewPage - 2 >= 1"
          @click="goToPage(selectedViewPage - 2, 'selected')"
        >
          {{ selectedViewPage - 2 }}
        </li>
        <li
          v-if="selectedViewPage - 1 >= 1"
          @click="goToPage(selectedViewPage - 1, 'selected')"
        >
          {{ selectedViewPage - 1 }}
        </li>
        <li class="page-selected">{{ selectedViewPage }}</li>
        <li
          v-if="selectedViewPage + 1 <= totalSelectedPages"
          @click="goToPage(selectedViewPage + 1, 'selected')"
        >
          {{ selectedViewPage + 1 }}
        </li>
        <li
          v-if="selectedViewPage + 2 <= totalSelectedPages"
          @click="goToPage(selectedViewPage + 2, 'selected')"
        >
          {{ selectedViewPage + 2 }}
        </li>
        <li
          v-if="selectedViewPage + 3 <= totalSelectedPages"
          @click="goToPage(selectedViewPage + 3, 'selected')"
        >
          {{ selectedViewPage + 3 }}
        </li>
        <li
          v-if="selectedViewPage + 4 <= totalSelectedPages"
          @click="goToPage(selectedViewPage + 4, 'selected')"
        >
          {{ selectedViewPage + 4 }}
        </li>
        <li
          v-if="selectedViewPage + 5 <= totalSelectedPages"
          @click="goToPage(selectedViewPage + 5, 'selected')"
        >
          {{ selectedViewPage + 5 }}
        </li>
      </ul>
    </div>
    <div class="pagination-buttons">
      <button
        v-if="totalSelectedPages !== 1"
        id="button-first"
        @click.prevent="goToPage(1, 'selected')"
      >
        First
      </button>
      <button
        v-if="totalSelectedPages !== 1"
        id="button-prev"
        type="button"
        @click="prevPage('selected')"
      >
        Prev.
      </button>
      <button
        v-if="totalSelectedPages !== 1"
        id="button-next"
        type="button"
        @click="nextPage('selected')"
      >
        Next
      </button>
      <button
        v-if="totalSelectedPages !== 1"
        id="button-last"
        @click.prevent="goToPage(totalSelectedPages, 'selected')"
      >
        Last
      </button>
    </div>
    <form
      v-if="totalSelectedPages !== 1"
      class="page-search"
      @submit.prevent="searchPage"
    >
      <input
        class="page-search-input"
        type="number"
        placeholder="Search for a page"
        v-model="targetPage"
      />
      <button id="button-page-search" type="submit">Go</button>
    </form>
    <p class="page-info">
      Page {{ selectedViewPage }} of {{ totalSelectedPages }}
    </p>
  </div>
</template>

<script>
export default {
  inject: [
    "selectedViewPage",
    "totalSelectedPages",
    "selectedLocationsIds",
    "selectedResults",
    "prevPage",
    "nextPage",
    "goToPage",
    "sendSelectedId",
  ],

  data() {
    return {
      targetPage: null,
      pageSelected: 1,
    };
  },

  methods: {
    searchPage() {
      if (this.targetPage >= 1 && this.targetPage <= this.totalSelectedPages) {
        this.goToPage(this.targetPage, "selected");
        this.targetPage = null;
      }
    },
  },
};
</script>

<style scoped></style>
