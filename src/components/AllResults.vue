<template>
  <ul class="list">
    <li
      class="list-item"
      v-for="result in results"
      :key="result.id"
      :id="result.id"
    >
      <div class="list-item-info">
        <p>Name: {{ result.name }}</p>
        <p>Lat: {{ result.center.lat }}, Lng: {{ result.center.lng }}</p>
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
  <div class="list-control">
    <div class="list-pagination">
      <button
        v-if="totalPages !== 1"
        id="button-first"
        @click.prevent="goToPage(1, 'all')"
      >
        First
      </button>
      <button
        v-if="totalPages !== 1"
        id="button-prev"
        type="button"
        @click="prevPage('all')"
      >
        Prev.
      </button>
      <ul v-if="totalPages !== 1" class="page-list">
        <li
          v-if="allViewPage - 5 >= 1"
          @click="goToPage(allViewPage - 5, 'all')"
        >
          {{ allViewPage - 5 }}
        </li>
        <li
          v-if="allViewPage - 4 >= 1"
          @click="goToPage(allViewPage - 4, 'all')"
        >
          {{ allViewPage - 4 }}
        </li>
        <li
          v-if="allViewPage - 3 >= 1"
          @click="goToPage(allViewPage - 3, 'all')"
        >
          {{ allViewPage - 3 }}
        </li>
        <li
          v-if="allViewPage - 2 >= 1"
          @click="goToPage(allViewPage - 2, 'all')"
        >
          {{ allViewPage - 2 }}
        </li>
        <li
          v-if="allViewPage - 1 >= 1"
          @click="goToPage(allViewPage - 1, 'all')"
        >
          {{ allViewPage - 1 }}
        </li>
        <li class="page-selected">{{ allViewPage }}</li>
        <li
          v-if="allViewPage + 1 <= totalPages"
          @click="goToPage(allViewPage + 1, 'all')"
        >
          {{ allViewPage + 1 }}
        </li>
        <li
          v-if="allViewPage + 2 <= totalPages"
          @click="goToPage(allViewPage + 2, 'all')"
        >
          {{ allViewPage + 2 }}
        </li>
        <li
          v-if="allViewPage + 3 <= totalPages"
          @click="goToPage(allViewPage + 3, 'all')"
        >
          {{ allViewPage + 3 }}
        </li>
        <li
          v-if="allViewPage + 4 <= totalPages"
          @click="goToPage(allViewPage + 4, 'all')"
        >
          {{ allViewPage + 4 }}
        </li>
        <li
          v-if="allViewPage + 5 <= totalPages"
          @click="goToPage(allViewPage + 5, 'all')"
        >
          {{ allViewPage + 5 }}
        </li>
      </ul>
      <button
        v-if="totalPages !== 1"
        id="button-next"
        type="button"
        @click="nextPage('all')"
      >
        Next
      </button>
      <button
        v-if="totalPages !== 1"
        id="button-last"
        @click.prevent="goToPage(totalPages, 'all')"
      >
        Last
      </button>
    </div>
    <form
      v-if="totalPages !== 1"
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
    <p class="page-info">Page {{ allViewPage }} of {{ totalPages }}</p>
  </div>
</template>

<script>
export default {
  inject: [
    "results",
    "allViewPage",
    "totalPages",
    "selectedLocationsIds",
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
      if (this.targetPage >= 1 && this.targetPage <= this.totalPages) {
        this.goToPage(this.targetPage, "all");
        this.targetPage = null;
      }
    },
  },

  mounted() {
    console.log(this.results);
  },
};
</script>

<style scoped></style>
