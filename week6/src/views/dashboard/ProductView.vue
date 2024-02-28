<template>
  <h1>This is DashBoard Product page.</h1>
<<<<<<< HEAD
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-primary" v-on:click="openmodal('new')">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" v-bind:key="item.id">
          <td width="150">{{ item.category }}</td>
          <td width="150">{{ item.title }}</td>
          <td width="120">
            {{ item.origin_price }}
          </td>
          <td width="120">
            {{ item.price }}
          </td>
          <td width="150">
            <span v-if="tempproduct.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                v-on:click="openmodal('edit', item)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                v-on:click="openmodal('delete', item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <PaginationComponent
      :pagination="pagination"
      :getproducts="getproducts"
    ></PaginationComponent>
  </div>
  <!-- Modal -->
  <productmodal
    :tempproduct="tempproduct"
    :update-product="updateProduct"
    :isNew="isNew"
    ref="pmodal"
  ></productmodal>

  <delproductmodal
    :update-product="updateProduct"
    ref="dpmodal"
  ></delproductmodal>
</template>

<script>
import axios from 'axios';
// import PaginationComponent from '../../../../../../../../components/paginationComponent.vue';
import PaginationComponent from '../../components/PaginationComponent.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  props: ['pagination', 'getproducts'],
  data() {
    return {
      products: [],
      pagination: {},
      tempproduct: {
        imagesUrl: [],
      },
      isNew: false,
      delmyModel: null,
    };
  },
  methods: {
    check() {
      // 取出token
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)practiceToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      axios.defaults.headers.common.Authorization = token;
      // console.log('token',token)

      axios
        .post(`${VITE_URL}api/user/check`)
        .then(() => {
          this.getproducts();
        })
        .catch((err) => {
          alert(err.data.message);
          window.location = 'signin4.html';
        });
    },
    getproducts(page = 1) {
      // 參數預設值
      axios
        .get(`${VITE_URL}api/${VITE_PATH}/admin/products?page=${page}`)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    openmodal(status, item) {
      if (status === 'new') {
        // this.myModel.show();
        this.$refs.pmodal.openmodal();
        this.tempproduct = { imgsUrl: [] };
        this.isNew = true;
      } else if (status === 'edit') {
        // this.myModel.show();
        this.$refs.pmodal.openmodal();
        this.tempproduct = { ...item };
        this.isNew = false;
      } else if (status === 'delete') {
        // this.delmyModel.show();
        this.$refs.dpmodal.openmodal();
        this.tempproduct = { ...item };
        this.isNew = 'delete';
      }
    },
    updateProduct() {
      let apiUrl = `${VITE_URL}api/${VITE_PATH}/admin/product`;
      let method = 'post';

      if (!this.isNew) {
        apiUrl = `${VITE_URL}api/${VITE_PATH}/admin/product/${this.tempproduct.id}`;
        method = 'put';
      } else if (this.isNew === 'delete') {
        apiUrl = `${VITE_URL}api/${VITE_PATH}/admin/product/${this.tempproduct.id}`;
        method = 'delete';
      }
      axios[method](apiUrl, { data: this.tempproduct })
        .then(() => {
          if (this.isNew || !this.isNew) {
            this.$refs.pmodal.closemodal();
          }
          if (this.isNew === 'delete') {
            this.$refs.dpmodal.closemodal();
          }
          this.getproducts();
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
  },
  components: {
    PaginationComponent,
    productmodal,
    delproductmodal,
  },
  mounted() {
    this.check();
  },
};
</script>
=======
</template>
>>>>>>> d79d8da07321306dc9b69eaec5980c83fc553445
