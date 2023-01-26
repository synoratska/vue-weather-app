<template>
  <div class="hourly-weather">
    <div class="container">
      <div class="hourly-temp" v-for="(time, ind) in filteredList" :key="ind">
        <HourlyTemp :time="time" />
      </div>
    </div>
  </div>
</template>

<script>
import HourlyTemp from "../components/HourlyTemp.vue";
export default {
  name: "HourlyWeather",
  components: {
    HourlyTemp,
  },
  props: ["forecast"],

  created() {
    console.log(this.forecast);
  },
  computed: {
    filteredList() {
      return this.forecast.hourly.slice(0, 24);
    },
  },
};
</script>

<style lang="scss" scoped>
.hourly-weather {
  padding: 30px 0;
  border-bottom: 1px solid #ffffffb4;

  .container {
    display: flex;
    max-width: 100vw;
    overflow: scroll;
    padding: 0;
    margin: 0 20px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
