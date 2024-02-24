import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.1/vue.esm-browser.min.js";

export default function createVueApp() {
  return createApp({
    data() {
      return {
        user: {
          username: "",
          password: "",
        },
        url: "https://ec-course-api.hexschool.io/",
      };
    },
    methods: {
      signin() {
        axios
          .post(`${this.url}v2/admin/signin`, this.user)
          .then((res) => {
            const { token, expired } = res.data;
            document.cookie = `practiceToken=${token}; Expires= ${new Date(
              expired
            )}`;
            console.log(res);
            console.log(document.cookie);
            window.location = "product4.html";
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
  }).mount("#app");
}
