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
        {
          id: Math.random(),
          name: "address" + Math.random().toFixed(6).toString(),
          center: { lat: Math.random() * 101, lng: Math.random() * 101 },
        },
        {
          id: Math.random(),
          name: "address" + Math.random().toFixed(6).toString(),
          center: { lat: Math.random() * 101, lng: Math.random() * 101 },
        },

        {
          id: Math.random(),
          name: "address" + Math.random().toFixed(6).toString(),
          center: { lat: Math.random() * 101, lng: Math.random() * 101 },
        },
        {
          id: Math.random(),
          name: "address" + Math.random().toFixed(6).toString(),
          center: { lat: Math.random() * 101, lng: Math.random() * 101 },
        },
        {
          id: Math.random(),
          name: "address" + Math.random().toFixed(6).toString(),
          center: { lat: Math.random() * 101, lng: Math.random() * 101 },
        },
        {
          id: Math.random(),
          name: "address" + Math.random().toFixed(6).toString(),
          center: { lat: Math.random() * 101, lng: Math.random() * 101 },
        },
        {
          id: Math.random(),
          name: "address" + Math.random().toFixed(6).toString(),
          center: { lat: Math.random() * 101, lng: Math.random() * 101 },
        },
        {
          id: Math.random(),
          name: "address" + Math.random().toFixed(6).toString(),
          center: { lat: Math.random() * 101, lng: Math.random() * 101 },
        },
        {
          id: Math.random(),
          name: "address" + Math.random().toFixed(6).toString(),
          center: { lat: Math.random() * 101, lng: Math.random() * 101 },
        },
        {
          id: Math.random(),
          name: "address" + Math.random().toFixed(6).toString(),
          center: { lat: Math.random() * 101, lng: Math.random() * 101 },
        },
        {
          id: Math.random(),
          name: "address" + Math.random().toFixed(6).toString(),
          center: { lat: Math.random() * 101, lng: Math.random() * 101 },
        },
        {
          id: Math.random(),
          name: "address" + Math.random().toFixed(6).toString(),
          center: { lat: Math.random() * 101, lng: Math.random() * 101 },
        },
        {
          id: Math.random(),
          name: "address" + Math.random().toFixed(6).toString(),
          center: { lat: Math.random() * 101, lng: Math.random() * 101 },
        },
        {
          id: Math.random(),
          name: "address" + Math.random().toFixed(6).toString(),
          center: { lat: Math.random() * 101, lng: Math.random() * 101 },
        },
        {
          id: Math.random(),
          name: "address" + Math.random().toFixed(6).toString(),
          center: { lat: Math.random() * 101, lng: Math.random() * 101 },
        },
        {
          id: Math.random(),
          name: "address" + Math.random().toFixed(6).toString(),
          center: { lat: Math.random() * 101, lng: Math.random() * 101 },
        },
        {
          id: Math.random(),
          name: "address" + Math.random().toFixed(6).toString(),
          center: { lat: Math.random() * 101, lng: Math.random() * 101 },
        },
        {
          id: Math.random(),
          name: "address" + Math.random().toFixed(6).toString(),
          center: { lat: Math.random() * 101, lng: Math.random() * 101 },
        },
        {
          id: Math.random(),
          name: "address" + Math.random().toFixed(6).toString(),
          center: { lat: Math.random() * 101, lng: Math.random() * 101 },
        },
        {
          id: Math.random(),
          name: "address" + Math.random().toFixed(6).toString(),
          center: { lat: Math.random() * 101, lng: Math.random() * 101 },
        },
        {
          id: Math.random(),
          name: "address" + Math.random().toFixed(6).toString(),
          center: { lat: Math.random() * 101, lng: Math.random() * 101 },
        },
        {
          id: Math.random(),
          name: "address" + Math.random().toFixed(6).toString(),
          center: { lat: Math.random() * 101, lng: Math.random() * 101 },
        },
      ],
      center: { lat: 0, lng: 0 },
      page: 1,
      key: process.env.VUE_APP_GOOGLE_MAP_API_KEY,
    };
  },

  provide() {
    return {
      // need to call computed() and wrap your data in it so that the child component injecting this will react to changes
      locations: computed(() => this.locations),
      center: computed(() => this.center),
      page: computed(() => this.page),
      results: computed(() =>
        this.locations.slice(this.page * 5 - 5, this.page * 5)
      ),
      totalPages: computed(() => Math.ceil(this.locations.length / 5)),
      prevPage: this.previous,
      nextPage: this.next,
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
          console.log(data);
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
          console.log("new locations array:");
          console.log(this.locations);
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
            // console.log(data);
            const newLoc = {
              id: checkId,
              name: data.results[0].formatted_address,
              center: { lat: newLocation.lat, lng: newLocation.lng },
            };
            this.locations = [...this.locations, newLoc];
            this.center = newCenter;
            console.log("new locations array:");
            console.log(this.locations);
          });
      } else {
        this.center = newCenter;
        console.log("new locations array:");
        console.log(this.locations);
      }
    },

    previous() {
      if (this.page !== 1) {
        this.page = this.page - 1;
        console.log(this.page);
      }
    },

    next() {
      if (this.page < Math.ceil(this.locations.length / 5)) {
        this.page = this.page + 1;
        console.log(this.page);
      }
    },
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
