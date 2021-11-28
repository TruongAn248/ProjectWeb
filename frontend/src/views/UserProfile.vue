<template>
  <div v-if="currentUser" >
    <header class="jumbotron" >
      <h3>
        <strong>{{ currentUser.username }}</strong>
      </h3>
    </header>
    <div class="row">
      <div class="col-md-8">
        <p>
          <strong>Id:</strong>
          {{ currentUser.id }}
        </p>
        <p>
          <strong>E-mail:</strong>
          {{ currentUser.email }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Profile",
  computed: {
    ...mapGetters({
      currentUser: "loggedInUser",
    }),
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>
