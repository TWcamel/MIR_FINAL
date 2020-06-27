<template>
  <div class="mb-4">
    <b-button variant="outline-info" to="/">Music Sheet</b-button>
    <b-button variant="outline-info" to="/MusicSheet">Train Model</b-button>
    <b-button variant="outline-info" href="http://localhost:8400/">Analyzer</b-button>
    <b-button variant="outline-info" to="/userInfo">User Info</b-button>
    <b-button variant="outline-info" @click.prevent="logout">Logout</b-button>
  </div>
</template>
<script>
export default {
  methods: {
    async logout() {
      localStorage.removeItem("token");
      this.$router.push("login");
      // this.$data.remove('servece_token')
    }
  }
};
</script>