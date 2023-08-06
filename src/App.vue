<template>
  <div>
    <NavBar @current-location="currentLocation" @get-address="setAddress" />
    <MainContent />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import MainContent from "./components/MainContent.vue";

import { computed } from "vue";

export default {
  components: {
    NavBar,
    MainContent,
  },

  data() {
    return {
      locations: [
        { id: "0", name: "Initial Location", center: { lat: 0, lng: 0 } },
      ],
      center: { lat: 0, lng: 0 },
      allViewPage: 1,
      selectedViewPage: 1,
      selectedLocationsIds: [],
      selectedLocations: [],
      key: process.env.VUE_APP_GOOGLE_MAP_API_KEY,
    };
  },

  provide() {
    return {
      // need to call computed() and wrap your data in it so that the child component injecting this will react to changes
      locations: computed(() => this.locations),
      // selectedLocations: computed(() => this.selectedLocations),
      center: computed(() => this.center),
      allViewPage: computed(() => this.allViewPage),
      selectedViewPage: computed(() => this.selectedViewPage),
      results: computed(() =>
        this.locations.slice(this.allViewPage * 5 - 5, this.allViewPage * 5)
      ),
      selectedResults: computed(() =>
        this.selectedLocations.slice(
          this.selectedViewPage * 5 - 5,
          this.selectedViewPage * 5
        )
      ),
      selectedLocationsIds: computed(() => this.selectedLocationsIds),

      totalPages: computed(() => Math.ceil(this.locations.length / 5)),
      totalSelectedPages: computed(() =>
        Math.ceil(this.selectedLocations.length / 5)
      ),
      prevPage: this.previous,
      nextPage: this.next,
      goToPage: this.goTo,
      sendSelectedId: this.addSelectedLocationId,
      apiKey: computed(() => this.key),
    };
  },

  methods: {
    setAddress(address) {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.key}
`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          const latlng = data.results[0].geometry.location;
          const checkId = (latlng.lat + latlng.lng).toFixed(4).toString();
          const newLoc = {
            id: checkId,
            name: data.results[0].formatted_address,
            center: { lat: latlng.lat, lng: latlng.lng },
          };
          const newCenter = { lat: latlng.lat, lng: latlng.lng };

          // need to check if this location already exists in the array
          const locationExists = this.locations.find(
            (location) => location.id === checkId
          );

          if (!locationExists) {
            // if the location doesn't exists, add it to the array
            this.locations = [...this.locations, newLoc];
            this.center = newCenter;
          } else {
            // otherwise just update the center
            this.center = newCenter;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    currentLocation(newLocation) {
      // this would not work, in order for Vue to know your data has been updated, especially when the data is an object
      // a change on the reference that this object points to needs to happen
      // simply setting the properties within the object to new values would not trigger the change
      // this.location.lat = newLocation.lat;
      // this.location.lng = newLocation.lng;

      const checkId = (newLocation.lat + newLocation.lng).toFixed(4).toString();

      const newCenter = { lat: newLocation.lat, lng: newLocation.lng };

      const locationExists = this.locations.find(
        (location) => location.id === checkId
      );

      if (!locationExists) {
        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${newLocation.lat},${newLocation.lng}&key=${this.key}`
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
          })
          .then((data) => {
            const newLoc = {
              id: checkId,
              name: data.results[0].formatted_address,
              center: { lat: newLocation.lat, lng: newLocation.lng },
            };
            this.locations = [...this.locations, newLoc];
            this.center = newCenter;
          });
      } else {
        this.center = newCenter;
      }
    },

    previous(view) {
      if (view === "all") {
        if (this.allViewPage !== 1) {
          this.allViewPage = this.allViewPage - 1;
        } else {
          this.selectedViewPage = this.selectedViewPage - 1;
        }
      }
    },

    next(view) {
      if (view === "all") {
        if (this.allViewPage < Math.ceil(this.locations.length / 5)) {
          this.allViewPage = this.allViewPage + 1;
        }
      } else {
        this.selectedViewPage = this.selectedViewPage + 1;
      }
    },

    goTo(page, view) {
      if (view === "all") {
        this.allViewPage = page;
      } else {
        this.selectedViewPage = page;
      }
    },

    addSelectedLocationId(locationId) {
      if (this.selectedLocationsIds.includes(locationId)) {
        const index = this.selectedLocationsIds.findIndex(
          (id) => id === locationId
        );
        this.selectedLocationsIds.splice(index, 1);
        this.selectedLocations = this.locations.filter((location) => {
          return this.selectedLocationsIds.includes(location.id);
        });
      } else {
        this.selectedLocationsIds.push(locationId);
        this.selectedLocations = this.locations.filter((location) => {
          return this.selectedLocationsIds.includes(location.id);
        });
      }
      // console.log("location Ids that are selected.");
      // console.log(this.selectedLocationsIds);
      // console.log("locations that are selected");
      // console.log(this.selectedLocations);
    },
  },

  mounted() {
    for (let i = 0; i < 100; i++) {
      this.locations.push({
        id: Math.random(),
        name: "address" + Math.random().toFixed(6).toString(),
        center: { lat: Math.random() * 101, lng: Math.random() * 101 },
      });
    }
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 10px;
  height: 100%;
}

body {
  min-height: 100%;
  line-height: 1;
  font-family: sans-serif;
}

input,
select,
option,
optgroup,
textarea,
button,
pre,
code {
  font-size: 100%;
  font-family: inherit;
}

ol,
ul {
  list-style: none;
}

a,
a:active,
a:visited {
  text-decoration: none;
}
</style>
