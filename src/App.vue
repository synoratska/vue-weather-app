<template>
  <div class="main">
    <Modal v-if="modalOpen" v-on:close-modal="toggleModal" :APIkey="APIkey" />
    <Navigation
      v-on:add-city="toggleModal"
      v-on:edit-city="toggleEdit"
      :addCityActive="addCityActive"
      :isDay="isDay"
      :isNight="isNight"
    />

    <router-view
      :cities="cities"
      :edit="edit"
      :APIkey="APIkey"
      v-on:is-day="dayTime"
      v-on:is-night="nightTime"
      v-on:resetDays="resetDays"
    />
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import db from "./firebase/firebaseinit.js";
import Navigation from "./components/Navigation";
import Modal from "./components/Modal";

export default {
  name: "App",
  components: {
    Navigation,
    Modal,
  },

  data() {
    return {
      isDay: null,
      isNight: null,
      APIkey: "3dda9edd3ee57b2989f5ae3038ee7339",
      cities: [],
      modalOpen: null,
      edit: null,
      addCityActive: null,
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
          } else if (doc.type === "removed") {
            this.cities = this.cities.filter(
              (city) => city.city !== doc.doc.data().city
            );
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
    checkRoute() {
      if (this.$route.name === "AddCity") {
        this.addCityActive = true;
      } else {
        this.addCityActive = false;
      }
      console.log(this.addCityActive);
    },
    dayTime() {
      this.isDay = !this.isDay
    },
    nightTime() {
      this.isNight = !this.isNight
    },
    resetDays(){
      this.isDay = false,
      this.isNight = false
    }
  },
  watch: {
    $route() {
      this.checkRoute();
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
