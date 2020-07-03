<template>
  <b-container>
    <b-row cols="1">
      <b-col>
        <h1>UserInfo</h1>
        <h3>User Name:</h3>
        <p>{{ userName }}</p>
        <h3>CAPTCHA:</h3>
        <p>{{ captcha }}</p>
      </b-col>
    </b-row>
    <b-button id="btn_headBar" pill variant="info" @click.prevent="logout">Logout</b-button>
  </b-container>
</template>
<script>
export default {
  methods: {
    async logout() {
      localStorage.removeItem("token");
      this.$router.push("login");
      // this.$data.remove('servece_token')
    }
  },
  data() {
    return {
      userName: localStorage.getItem("userName"),
      captcha: localStorage.getItem("captcha")
    };
  }
};
</script>
