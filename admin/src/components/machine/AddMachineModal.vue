<template>
  <v-dialog
    v-model="visible"
    max-width="900px"
    persistent
    transition="dialog-bottom-transition"
  >
    <form @submit.prevent="onSubmit">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Add Machine
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-text-field
              label="Machine Name"
              v-model="form.name"
              required
              outlined
              dense
            />

            <div class="mb-5"></div>
            <GmapMap
              :center="center"
              :zoom="18"
              map-style-id="roadmap"
              :options="mapOptions"
              style="width: 100%; height: 400px;"
              ref="mapRef"
            >
              <GmapMarker
                :position="marker.position"
                :clickable="true"
                :draggable="true"
                @drag="handleMarkerDrag"
              />
            </GmapMap>
            <div class="mb-10"></div>
            <v-row justify="space-between" style="padding: 0 10px;">
              <h2 class="title">Machine Slot</h2>
              <v-btn color="primary" @click="addSlot" small
                ><v-icon class="mr-1">mdi-plus</v-icon> Add Slot</v-btn
              >
            </v-row>
            <div class="mb-5"></div>
            <v-row
              v-for="(slot, i) in slots"
              :key="i"
              style="margin: 0;"
              align="center"
            >
              <v-col :cols="1">
                {{ i + 1 }}
              </v-col>
              <v-col :cols="4">
                <v-select
                  v-model="slot.productId"
                  :items="products"
                  label="Product"
                  required
                  outlined
                  dense
                  item-text="name"
                  item-value="id"
                ></v-select>
              </v-col>
              <v-col :cols="3">
                <v-text-field
                  label="Capacity"
                  v-model="slot.capacity"
                  required
                  outlined
                  dense
                  type="number"
                />
              </v-col>
              <v-col :cols="3">
                <v-text-field
                  label="Stock"
                  v-model="slot.stock"
                  required
                  outlined
                  dense
                  type="number"
                />
              </v-col>
              <v-btn color="error" outlined icon @click="remove(slot.id)">
                <v-icon>mdi-delete</v-icon></v-btn
              >
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red" text @click="close">
            Close
          </v-btn>

          <v-btn color="green darken-1" type="submit" text>
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>

<script>
import productService from "@/services/product.service";
import machineService from "@/services/machine.service";
import machineSlotService from "@/services/machine-slot.service";

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    form: {
      location: { lat: 13.736717, lng: 100.523186 }
    },
    mapOptions: {
      disableDefaultUI: true
    },
    marker: { position: { lat: 13.736717, lng: 100.523186 } },
    center: { lat: 13.736717, lng: 100.523186 },
    products: [],
    slots: []
  }),
  methods: {
    remove(id) {
      this.slots = this.slots.filter((s) => s.id !== id);
    },
    addSlot() {
      this.slots.push({
        id: Date.now(),
        isNewSlot: true
      });
    },
    handleMarkerDrag(e) {
      const { latLng } = e;
      const lat = latLng.lat();
      const lng = latLng.lng();
      this.form = {
        ...this.form,
        location: { lat, lng }
      };
    },
    close() {
      this.form = {};
      this.$emit("close");
    },
    async onSubmit() {
      try {
        this.loading = true;
        const { form, slots } = this;

        const res = await machineService.create(form);
        const { id: vendingMachineId } = res;
        await Promise.all(
          slots.map(async (s) => {
            await machineSlotService.create({
              productId: s.productId,
              capacity: s.capacity ? +s.capacity : 0,
              stock: s.stock ? +s.stock : 0,
              vendingMachineId
            });
          })
        );
        this.loading = false;
        this.$emit("success");
        this.$emit("close");
      } catch (error) {
        this.loading = false;
      }
    },
    async fetchProducts() {
      this.loading = true;
      const products = await productService.list();
      this.products = products;
      this.loading = false;
    }
  },
  created() {
    this.fetchProducts();
  }
};
</script>
