<template>
  <div class="weekly-forecast">
    <div class="container">
      <div class="daily" v-for="(day, idx) in filteredList" :key="idx">
        <DailyForecast :day="day" />
      </div>
    </div>
  </div>
</template>

<script>
import DailyForecast from "../components/DailyForecast";

export default {
  name: "WeeklyForecast",
  components: {
    DailyForecast,
  },
  props: ["forecast"],
  created() {
    console.log(this.forecast);
  },
  computed: {
    filteredList() {
      return this.forecast.daily.slice(1, 8);
    },
  },
};
</script>

<style lang="scss" scoped>
.weekly-forecast {
  padding: 30px 0;
  border-bottom: 1px solid #ffffffb4;

  .daily {
    margin-bottom: 24px;
  }

  .daily:last-child {
    margin-bottom: 0;
  }
}
</style>
