<template>
  <div class="home">
    <h2 class="title">Test</h2>
    <div class="mb-5"></div>
    <v-btn @click="logout">Logout</v-btn>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from "vuex";

export default {
  name: "Home",
  methods: {
    ...mapActions("auth", ["logoutAsync"]),
    logout() {
      this.logoutAsync();
      this.$router.push("/auth/login");
    }
  }
};
</script>
