<template>
  <div class="grid">
    <div class="city-link" v-for="(city, idx) in cities" :key="idx">
      <CurrentCity :city="city" :edit="edit" />
    </div>
  </div>
</template>

<script>
import CurrentCity from "../components/CurrentCity";

export default {
  name: "AddCity",
  props: ["cities", "edit"],
  created() {
    console.log(this.cities);
  },
  components: {
    CurrentCity,
  },
};
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  padding-top: 80px;
  width: 100%;
  min-height: 100vh;
  background-color: #343a43;
  grid-auto-rows: 250px;
  @media (min-width: 400px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
