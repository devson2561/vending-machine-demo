<template>
  <v-dialog
    v-model="visible"
    max-width="600px"
    persistent
    transition="dialog-bottom-transition"
  >
    <form @submit.prevent="onSubmit">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Add Product
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              label="Product Name"
              v-model="form.name"
              required
              outlined
              dense
            />
            <v-text-field
              label="Product Image URL"
              v-model="form.image"
              outlined
              dense
            />
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
import productService from "../../services/product.service";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    form: {}
  }),
  methods: {
    close() {
      this.form = {};
      this.$emit("close");
    },
    async onSubmit() {
      try {
        this.loading = true;
        await productService.create(this.form);
        this.loading = false;
        this.$emit("success");
        this.$emit("close");
      } catch (error) {
        this.loading = false;
      }
    }
  }
};
</script>
