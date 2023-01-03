<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      APIkey: "3dda9edd3ee57b2989f5ae3038ee7339",
      city: "Kyiv",
    };
  },
  created() {
    this.getCurrentWeather();
  },
  methods: {
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
