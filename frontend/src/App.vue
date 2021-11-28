<template>
  <div id="app">
    <nav class="shadow-lg navbar navbar-expand navbar-dark bg-dark">
      <a href="/" class="navbar-brand"><i class="fa fa-home"></i> Trang Chủ</a>

      
      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link"> Đăng ký </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link"> Đăng nhập </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
          <i class="fa fa-user-circle"></i>
          
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logout"> Đăng xuất </a>
        </li>
      </div>
    </nav>
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "App",
 
  computed: {
    ...mapGetters({
      currentUser: "loggedInUser",
    }),
  },
  methods: {
    ...mapMutations([
      "initAuthState", // map this.initAuthState() to this.$store.commit("initAuthState")
    ]),
  
    logout() {
      this.$store.commit("logout");
      this.$router.push("/login");
    },
  },
  mounted() {
    this.initAuthState();
  },
};
</script>

