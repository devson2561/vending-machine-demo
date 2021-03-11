<template>
  <div class="page-container">
    <v-container bg fill-height grid-list-md text-xs-center>
      <v-layout row wrap align-center>
        <v-flex>
          <div>
            <h4 class="page-title">Sign In</h4>
            <div class="mb-5"></div>

            <form @submit.prevent="login">
              <v-text-field
                label="Username"
                v-model="form.username"
                required
                outlined
                dense
                rounded
              />
              <v-text-field
                id="password"
                label="Password"
                type="password"
                v-model="form.password"
                required
                outlined
                dense
                rounded
              />

              <v-btn type="submit" block rounded color="primary">Sign In</v-btn>
            </form>
          </div>
        </v-flex>
      </v-layout>
    </v-container>

    <v-dialog v-model="loading" persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Loading...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import store from "store";
import authService from "../../services/auth.service";

export default {
  data: () => ({
    form: {
      username: "admin",
      password: "password"
    },
    loading: false
  }),
  computed: {
    ...mapState("auth", ["accessToken"])
  },
  methods: {
    ...mapActions("auth", ["loginAsync"]),

    async login() {
      try {
        this.loading = true;
        const { username, password } = this.form;
        await this.loginAsync({ username, password });
        console.log(this.accessToken, "this..");
        this.$router.push("/");
        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.log(error, "error");
      }
    }
  }
};
</script>

<style lang="scss">
.page-container {
  width: 100%;
  min-height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  & > div {
    padding: 20px 10%;
    text-align: center;
    // max-width: 720px;
    margin: 0 auto;
  }
}

.page-title {
  font-size: 32px;
}
</style>
