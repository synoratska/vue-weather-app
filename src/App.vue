<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import db from "./firebase/firebaseinit.js";

export default {
  name: "App",
  data() {
    return {
      APIkey: "3dda9edd3ee57b2989f5ae3038ee7339",
      city: "Kyiv",
      cities: [],
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
                `https://api.openweathermap.org/data/2.5/weather?q=${doc.doc.data().city}&units=imperial&APPID=${this.APIkey}`
              );
             const data = response.data
            firebaseDB.doc(doc.doc.id).update({
              currentWeather: data,
            }).then(() => this.cities.push(doc.doc.data()))
            .then(() => console.log(this.cities))
            } catch (err) {
              console.log(ee);
            }
          }
        });
      });
    },
    getCurrentWeather() {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=imperial&APPID=${this.APIkey}`
        )
        .then((res) => {
          console.log(res.data);
        });
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
</style>
