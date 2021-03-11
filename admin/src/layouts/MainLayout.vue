<template>
  <v-app>
    <v-app-bar color="primary" dark fixed dense>
      <v-spacer></v-spacer>
    </v-app-bar>

    <!-- desktop-drawer -->
    <v-navigation-drawer
      class="d-none d-md-flex main-drawer"
      v-model="drawer"
      :permanent="true"
      bottom
      absolute
    >
      <v-list dense nav class="py-0">
        <v-list-item v-for="(m, index) in menu" :key="index" :to="m.path">
          <v-list-item-title>{{ m.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="red" @click="logout">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main>
      <div class="app-page">
        <router-view></router-view>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    drawer: true,
    menu: [
      { title: "Vending Machines", path: "/vending-machines" },
      { title: "Products", path: "/products" }
    ]
  }),
  methods: {
    ...mapActions("auth", ["logoutAsync"]),
    logout() {
      this.logoutAsync();
      this.$router.push("/auth/login");
    }
  }
};
</script>

<style lang="scss">
.main-drawer {
  padding-top: 60px;
}
</style>
