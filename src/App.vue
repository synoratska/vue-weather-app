<template>
  <div class="main">
    <NavigationTab class="navigation" />
    <router-view />
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import db from "./firebase/firebaseinit.js";
import NavigationTab from './components/NavigationTab'

export default {
  name: "App",
  components: {
    NavigationTab,
  },
  data() {
    return {
      APIkey: "3dda9edd3ee57b2989f5ae3038ee7339",
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
  display: flex;
  justify-content: center;
}
.navigation {
  z-index: 99;
  position: fixed;
  max-width: 1024px;
  width: 100%;
  box-shadow: 0 4px 6px -1px rgb (0, 0, 0, 0.1), 0 2px 4px -1px rgb(0, 0, 0, 0.06);
  
}

.container {
  padding: 0 20px;
}
</style>
