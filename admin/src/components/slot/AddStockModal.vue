<template>
  <v-dialog
    v-model="visible"
    max-width="400px"
    persistent
    transition="dialog-bottom-transition"
  >
    <form @submit.prevent="onSubmit" v-if="activeSlot">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Edit Stock
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              label="Number of stock"
              v-model="form.stock"
              required
              outlined
              dense
              :max="activeSlot.capacity"
              type="number"
            />
            <div class="mb-5"></div>
            <v-btn color="primary" block @click="fillMax">Max</v-btn>
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
import slotService from "../../services/machine-slot.service";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    activeSlot: {
      type: Object
    }
  },
  data: () => ({
    form: {}
  }),

  methods: {
    async onSubmit() {
      const { stock } = this.form;
      const { id } = this.activeSlot;
      await slotService.update(id, { stock: +stock });
      this.$emit("close");
      this.$emit("success");
    },
    fillMax() {
      const { capacity } = this.activeSlot;
      this.form = {
        ...this.form,
        stock: capacity
      };
    },
    close() {
      this.form = {};
      this.$emit("close");
    }
  }
};
</script>
