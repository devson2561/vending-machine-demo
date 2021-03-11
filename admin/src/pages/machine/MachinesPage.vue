<template>
  <div>
    <v-container>
      <v-row justify="space-between">
        <h2 class="title">Machines</h2>
        <v-btn color="primary" @click="addModalVisible = true"
          ><v-icon class="mr-1">mdi-plus</v-icon> Add</v-btn
        >
      </v-row>
      <div class="mb-5"></div>

      <v-data-table
        :headers="headers"
        :items="machines"
        :items-per-page="20"
        class="elevation-1"
        :loading="loading"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn small color="primary" :to="`/vending-machines/${item.id}`"
            >View</v-btn
          >
        </template>
      </v-data-table>
    </v-container>
    <add-machine-modal
      :visible="addModalVisible"
      @close="addModalVisible = false"
      @success="fetchMachines"
    />
  </div>
</template>

<script>
import machineService from "../../services/machine.service";
import AddMachineModal from "../../components/machine/AddMachineModal";
export default {
  components: {
    AddMachineModal
  },
  data: () => ({
    addModalVisible: false,
    headers: [
      { text: "Name", value: "name" },
      { text: "Name", value: "name" },
      { text: "Actions", value: "actions" }
    ],
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
  }
};
</script>
