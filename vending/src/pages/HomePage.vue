<template>
  <v-container>
    <h2 class="title">Select Machine to continue</h2>
    <div class="mb-10"></div>
    <v-row justify="start">
      <v-col cols="4" v-for="m in machines" :key="m.id">
        <v-card
          :loading="loading"
          class="mx-auto my-0"
          max-width="374"
          :to="`/machines/${m.id}`"
        >
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img
            height="250"
            src="https://lh3.googleusercontent.com/proxy/F9-OsOfLpZwyHapHp2Z7jsY1DrdeKl19LwofOQdaBy9o91A-b7ZVkm4OxAwFh8eoxvYslGa_J3YhQnGK_512jOuTbccHt-_eLdA_gutwayVvpzVB3nK7p0mNG9k4uqGWTkYUhkwZgvV9ztsPi7Hj19gljjnq6Rjm97IP5l_P1QDa2FqqlZZ6uMyncciNNNg1V-Vsx_SzkDYV_NGgRf__63hq0aOigHqSqkRZCoAWftdsoh3KXudUOI76KjsKgsL46FqOczOi"
          ></v-img>

          <v-card-title>{{ m.name }}</v-card-title>

          <!-- <v-card-actions>
            <v-btn color="deep-purple lighten-2" text @click="reserve">
              Reserve
            </v-btn>
          </v-card-actions> -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import machineService from "../services/machine.service";
export default {
  data: () => ({
    machines: []
  }),
  methods: {
    async fetchMachines() {
      this.loading = true;
      const machines = await machineService.list();
      this.machines = machines;
      this.loading = false;
    }
  },
  created() {
    this.fetchMachines();
    console.log(process.env);
  }
};
</script>
