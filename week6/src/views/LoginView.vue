<template>
  <h1>This is Login page.</h1>
  <div class="container">
    <div class="row justify-content-center">
      <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
      <div class="col-8">
        <form id="form" class="form-signin">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="username"
              v-model="user.username"
              placeholder="name@example.com"
              required
              autofocus
            />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="user.password"
              placeholder="Password"
              required
            />
            <label for="password">Password</label>
          </div>
          <button
            class="btn btn-lg btn-primary w-100 mt-3"
            type="button"
            v-on:click="signin"
          >
            登入
          </button>
        </form>
      </div>
    </div>
    <p class="mt-5 mb-3 text-muted">&copy; 2021~∞ - 六角學院</p>
  </div>
</template>

<script>
import axios from 'axios';

// console.log(import.meta.env);
const { VITE_URL } = import.meta.env;
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signin() {
      axios
        .post(`${VITE_URL}v2/admin/signin`, this.user)
        .then((res) => {
          console.log(res);
          const { token, expired } = res.data;
          document.cookie = `practiceToken=${token}; Expires= ${new Date(
            expired,
          )}`;
          this.$router.push('/admin');
        })
        .catch(() => {
          alert('登入失敗');
        });
    },
  },
  //   }).mount("#app");
};
</script>
