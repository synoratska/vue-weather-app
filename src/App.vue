<template>
  <div class="main">
    <Modal v-if="modalOpen" v-on:close-modal="toggleModal" :APIkey="APIkey" />
    <NavigationTab v-on:add-city="toggleModal" v-on:edit-city="toggleEdit" />

    <router-view :cities="cities" :edit="edit" />
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
      edit: null,
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
      
          if (doc.type === "added" && !doc.doc.Nd) {
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
              console.log(err);
            }
          } else if (doc.type === "added" && doc.doc.Nd) {
            this.cities.push(doc.doc.data());
          } else if (doc.type === 'removed') {
            this.cities = this.cities.filter((city) => city.city !== doc.doc.data().city)
          }
        });
      });
    },
    toggleModal() {
      this.modalOpen = !this.modalOpen;
    },
     toggleEdit() {
      this.edit = !this.edit;
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
