<template>
  <div>
    <header v-if="addCityActive" class="container add-city">
      <nav>
        <span>Add City</span>
        <div class="right">
          <i @click="editCities" ref="editCities" class="far fa-edit"></i>
          <i @click="reloadApp" class="fas fa-sync"></i>
          <i @click="addCity" class="fas fa-plus"></i>
        </div>
      </nav>
    </header>
    <header v-else class="container" :class="{ day: isDay, night: isNight }">
      <nav>
        <router-link class="router-link" :to="{ name: 'AddCity' }">
          <i class="fas fa-plus"></i>
        </router-link>
        <span>
          {{ new Date().toLocaleString("en-us", { weekday: "short" }) }},
          {{ new Date().toLocaleString("en-us", { month: "short" }) }},
          {{ new Date().toLocaleString("en-us", { day: "2-digit" }) }}
        </span>
        <span>&deg; C</span>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: "NavigationTab",
  props: ["addCityActive", "isDay", "isNight"],
  methods: {
    addCity() {
      this.$emit("add-city");
    },
    reloadApp() {
      location.reload();
    },
    editCities() {
      this.$refs.editCities.classList.toggle("edit-active");
      this.$emit("edit-city");
    },
  },
};
</script>

<style lang="scss" scoped>
.add-city {
  background-color: #313640;
  box-shadow: 2px 5px 7px -2px rgb (0, 0, 0, 0.1),
    2px 3px 4px -2px rgba(250, 197, 5, 0.891)
}

header {
  z-index: 99;
  position: fixed;
  max-width: 1024px;
  width: 100%;
}
nav {
  display: flex;
  color: #fff;
  padding: 30px 0;
  justify-content: space-between;
}

.edit-active {
  color: #900c0c;
}

.router-link {
  color: #fff;
}

.add-city {
  background-color: #313640;
}

.right {
  i:nth-child(2),
  i:nth-child(3) {
    margin-left: 16px;
  }

  i {
    font-size: 20px;
  }
}

span {
  font-weight: 600;
  font-size: 18px;
}
</style>
