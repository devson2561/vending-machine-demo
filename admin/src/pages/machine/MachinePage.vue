<template>
  <div>
    <v-container>
      <v-row v-if="machine">
        <v-col :cols="6">
          <p>
            Name: <b>{{ machine.name }}</b>
          </p>
          <p>
            Location:
            <b>{{ machine.location.lat }} , {{ machine.location.lng }}</b>
          </p>
          <p>
            Slots:
            <b>{{ slots.length }} </b>
          </p>
        </v-col>
        <v-col :cols="6">
          <GmapMap
            :center="machine.location"
            :zoom="18"
            map-style-id="roadmap"
            :options="mapOptions"
            style="width: 100%; height: 400px;"
            ref="mapRef"
            v-if="machine.location"
          >
            <GmapMarker :position="machine.location" />
          </GmapMap>
        </v-col>
      </v-row>
      <div class="mb-5"></div>
      <v-row justify="space-between">
        <h2 class="title">Slots</h2>
      </v-row>
      <div class="mb-5"></div>

      <v-data-table
        :headers="headers"
        :items="slots"
        :items-per-page="10"
        class="elevation-1"
        :loading="loading"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn small color="primary" @click="showAddStock(item)"
            >Edit Stock
          </v-btn>
        </template>
      </v-data-table>
    </v-container>
    <add-stock-modal
      :visible="addStockVisible"
      :activeSlot="activeSlot"
      @close="closeAddStock"
      @success="fetchSlots"
    />
  </div>
</template>

<script>
import machineService from "@/services/machine.service";
import machineSlotService from "@/services/machine-slot.service";
import AddStockModal from "../../components/slot/AddStockModal";

export default {
  components: {
    AddStockModal
  },
  data: () => ({
    addStockVisible: false,
    addModalVisible: false,
    headers: [
      { text: "Product", value: "product.name" },
      { text: "Capacity", value: "capacity" },
      { text: "Stock", value: "stock" },
      { text: "Actions", value: "actions" }
    ],
    machine: null,
    mapOptions: {
      disableDefaultUI: true
    },
    marker: { position: { lat: 13.736717, lng: 100.523186 } },
    center: { lat: 13.736717, lng: 100.523186 },
    slots: [],
    machines: [],
    activeSlot: null
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
    closeAddStock() {
      this.addStockVisible = false;
      this.activeSlot = null;
    },
    showAddStock(slot) {
      this.addStockVisible = true;
      this.activeSlot = slot;
    },
    async fetchMachine() {
      this.loading = true;
      const machine = await machineService.get(this.vendingMachineId);
      this.machine = machine;
      this.loading = false;
    },
    async fetchSlots() {
      this.loading = true;
      const { vendingMachineId } = this;
      const slots = await machineSlotService.list({
        filter: {
          where: { vendingMachineId },
          include: [{ relation: "product" }]
        }
      });
      this.slots = slots;
      this.loading = false;
    }
  },
  created() {
    this.fetchMachine();
    this.fetchSlots();
  }
};
</script>
