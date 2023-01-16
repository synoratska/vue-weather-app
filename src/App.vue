<template>
  <div class="main">
    <Modal v-if="modalOpen" v-on:close-modal="toggleModal" :APIkey="APIkey" />
    <NavigationTab v-on:add-city="toggleModal" />

    <router-view :cities="cities" />
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import db from "./firebase/firebaseinit.js";
import NavigationTab from "./components/NavigationTab";
import Modal from "./components/Modal";

export default {
  name: "App",
  components: {
    NavigationTab,
    Modal,
  },

  data() {
    return {
      APIkey: "3dda9edd3ee57b2989f5ae3038ee7339",
      cities: [],
      modalOpen: null,
    };
  },
  created() {
    this.getCityWeather();
  },
  methods: {
    getCityWeather() {
      let firebaseDB = db.collection("cities");

      firebaseDB.onSnapshot((snap) => {
        snap.docChanges().forEach(async (doc) => {
          if (doc.type === "added") {
            try {
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${
                  doc.doc.data().city
                }&units=metric&APPID=${this.APIkey}`
              );
              const data = response.data;
              firebaseDB
                .doc(doc.doc.id)
                .update({
                  currentWeather: data,
                })
                .then(() => this.cities.push(doc.doc.data()));
            } catch (err) {
              console.log(ee);
            }
          }
        });
      });
    },
    toggleModal() {
      this.modalOpen = !this.modalOpen
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.main {
  height: 100vh;
  max-width: 1024px;
  margin: 0 auto;
}

.container {
  padding: 0 20px;
}
</style>
