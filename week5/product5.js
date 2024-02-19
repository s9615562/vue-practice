import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js";
const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "s9615562";

const userModal = {
  props: ["tempProduct","addToCart"],
  data() {
    return {
      productModal: null,
      qty:1,
    };
  },
  template: "#userProductModal",
  methods: {
    open() {
      this.productModal.show();
    },
    close(){
        this.productModal.hide();
    }
  },
  watch:{
    tempProduct(){
        this.qty=1;
    }
  },
  mounted() {
    this.productModal = new bootstrap.Modal(this.$refs.modal);
  },
};

const app = createApp({
  data() {
    return {
      products: [],
      tempProduct: {},
      status:{
        addCartLoading:'',
        cartQtyLoading:''
      },
      carts:{},
      user:{
        email:'',
      }
    };
  },
  methods: {
    getproducts() {
      axios
        .get(`${apiUrl}/api/${apiPath}/products/all`)
        .then((res) => {
        //   console.log(res);
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    openModal(product) {
      this.tempProduct = product;
      this.$refs.userModal.open();
    },
    addToCart(product_id,qty=1) {
      const order = {
        product_id,
        qty,
      };
      this.status.addCartLoading = product_id;
      axios
        .post(`${apiUrl}/api/${apiPath}/cart`,{data:order})
        .then((res)=>{
            console.log(res)
            this.status.addCartLoading = '';
            this.getCart();
            this.$refs.userModal.close();
        })
    },
    changeCartQty(item,qty=1){
        const order = {
            product_id:item.product_id,
            qty,
          };
        //   console.log(order)
          this.status.cartQtyLoading = item.id;
          axios
            .put(`${apiUrl}/api/${apiPath}/cart/${item.id}`,{data:order})
            .then((res)=>{
                console.log(res)
                this.status.cartQtyLoading = "";
                this.getCart();
                // this.$refs.userModal.close();
            })
    },
    removeCarItem(id){
        // const order = {
        //     product_id:item.product_id,
        //     qty,
        //   };
        //   console.log(order)
          this.status.cartQtyLoading = id;
          axios
            .delete(`${apiUrl}/api/${apiPath}/cart/${id}`)
            .then((res)=>{
                console.log(res)
                this.status.cartQtyLoading = "";
                this.getCart();
                // this.$refs.userModal.close();
            })
    },
    getCart(){
        axios
        .get(`${apiUrl}/api/${apiPath}/cart`)
        .then((res)=>{
            console.log(res)
            this.carts=res.data.data;
            console.log(this.carts)
        })
    },
    onSubmit(){
      console.log(this)
    },
  },
  components: {
    userModal,
  },
  mounted() {
    this.getproducts();
    this.getCart();
  },
});
Object.keys(VeeValidateRules).forEach(rule => {
  if (rule !== 'default') {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});

// 讀取外部的資源
VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');

// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

// const app = Vue.createApp({
//   methods:{
//     onsubmit(){
//       console.log(this)
//     }
//   }
// })

app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);

app.mount("#app");
