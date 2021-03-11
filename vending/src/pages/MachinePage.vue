<template>
  <v-container>
    <h2 class="title">Select Machine to continue</h2>
    <div class="mb-10"></div>
    <v-row>
      <v-col cols="10">
        <v-row justify="start">
          <v-col sm="12" md="4" lg="3" v-for="s in slots" :key="s.id">
            <v-card :loading="loading" class="mx-auto my-0" max-width="374">
              <template slot="progress">
                <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
                ></v-progress-linear>
              </template>

              <v-img height="250" :src="s.product.image"></v-img>

              <v-card-title>{{ s.product.name }}</v-card-title>
              <v-card-text>
                <div class="price-area">
                  <div>
                    <h3>Price {{ s.product.price }} THB</h3>
                    <h3>Available {{ s.stock }}</h3>
                  </div>
                  <v-avatar
                    :color="
                      totalMoney >= s.product.price || s.stock === 0
                        ? 'green'
                        : 'red'
                    "
                    size="36"
                  >
                  </v-avatar>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="deep-purple lighten-2"
                  outlined
                  block
                  :disabled="s.product.price > totalMoney || s.stock === 0"
                  @click="choose(s)"
                >
                  Select
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="2">
        <h3>Total {{ totalMoney }} THB</h3>
        <h3>Insert Money</h3>
        <v-btn
          class="mb-2"
          v-for="m in moneyOptions"
          :key="m"
          color="primary"
          block
          outlined
          @click="insertMoney(m)"
          >{{ m }} THB</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import slotService from "../services/machine-slot.service";
import machineService from "../services/machine.service";
export default {
  data: () => ({
    products: [],
    moneyOptions: [1, 2, 5, 10, 20, 50, 100, 500, 1000],
    totalMoney: 0,
    slots: []
  }),
  computed: {
    vendingMachineId() {
      const {
        params: { id }
      } = this.$route;
      return id;
    }
  },
  methods: {
    async choose(slot) {
      try {
        await slotService.buy(slot.id);
        this.totalMoney -= slot.product.price;
        this.fetchSlots();
      } catch (error) {
        this.$swal.fire("Error", error.message, "error");
      }
    },
    insertMoney(m) {
      this.totalMoney += m;
    },
    async fetchSlots() {
      this.loading = true;
      const { vendingMachineId } = this;
      const slots = await slotService.list({
        filter: {
          where: { vendingMachineId },
          include: [{ relation: "product" }]
        }
      });
      console.log(slots, "slots..˘");
      this.slots = slots;
      this.loading = false;
    }
  },
  created() {
    this.fetchSlots();
  }
};
</script>

<style lang="scss">
.price-area {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  & > h3 {
    font-size: 20px;
  }
}
</style>
