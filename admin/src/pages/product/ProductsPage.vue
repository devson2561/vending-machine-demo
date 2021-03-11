<template>
  <div>
    <v-container>
      <v-row justify="space-between">
        <h2 class="title">Products</h2>
        <v-btn color="primary" @click="addModalVisible = true"
          ><v-icon class="mr-1">mdi-plus</v-icon> Add</v-btn
        >
      </v-row>
      <div class="mb-5"></div>

      <v-data-table
        :headers="headers"
        :items="products"
        :items-per-page="20"
        class="elevation-1"
        :loading="loading"
      >
        <template v-slot:item.image="{ item }">
          <img :src="item.image" alt="" style="max-height: 100px;" />
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn color="primary" @click="showEdit(item)">Edit</v-btn>
        </template></v-data-table
      >
    </v-container>
    <add-product-modal
      :visible="addModalVisible"
      @close="addModalVisible = false"
      @success="fetchProducts"
    />
    <edit-product-modal
      :visible="editModalVisible"
      :product="activeProduct"
      @close="closeEdit"
      @success="fetchProducts"
    />
  </div>
</template>

<script>
import productService from "../../services/product.service";
import AddProductModal from "../../components/product/AddProductModal";
import EditProductModal from "../../components/product/EditProductModal";

export default {
  components: {
    EditProductModal,
    AddProductModal
  },
  data: () => ({
    addModalVisible: false,
    headers: [
      { text: "Image", value: "image" },
      { text: "Name", value: "name" },
      { text: "Price", value: "price" },
      { text: "Actions", value: "actions" }
    ],
    products: [],
    activeProduct: null,
    editModalVisible: false
  }),
  methods: {
    closeEdit() {
      this.activeProduct = null;
      this.editModalVisible = false;
    },
    showEdit(product) {
      this.activeProduct = product;
      this.editModalVisible = true;
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
