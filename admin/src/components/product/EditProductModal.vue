<template>
  <v-dialog
    v-model="visible"
    max-width="600px"
    persistent
    transition="dialog-bottom-transition"
  >
    <form @submit.prevent="onSubmit" v-if="product">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Edit Product {{ product.name }}
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              label="Product Name"
              v-model="form.name"
              required
              outlined
              dense
              class="mb-5"
            />
            <v-text-field
              label="Price (THB)"
              v-model="form.price"
              outlined
              dense
              class="mb-5"
            />

            <v-text-field
              label="Product Image URL"
              v-model="form.image"
              outlined
              dense
              class="mb-5"
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
    },
    product: {
      type: Object
    }
  },
  watch: {
    product: function(product) {
      this.form = product;
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
        const { id, price, image, name } = this.form;
        await productService.update(id, { price, image, name });
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
