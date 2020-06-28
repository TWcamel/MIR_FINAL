<template>
  <b-container id="headBar">
    <b-row cols="4">
      <b-col>
        <b-button id="btn_headBar" block variant="outline-info" to="/">Music Sheet</b-button>
      </b-col>
      <b-col>
        <b-button id="btn_headBar" block variant="outline-info" to="/TrainModel">Train Model</b-button>
      </b-col>
      <b-col>
        <b-button
          id="btn_headBar"
          block
          variant="outline-info"
          href="https://TWcamel.github.io/tmp-audio_vs"
        >Analyzer</b-button>
      </b-col>
      <b-col>
        <b-button id="btn_headBar" block variant="outline-info" to="/userInfo">User Info</b-button>
      </b-col>
      <!-- <b-col>
        <b-button id="btn_headBar" block variant="outline-info" @click.prevent="logout">Logout</b-button>
      </b-col> -->
    </b-row>
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
  }
};
</script>

<style scoped>
#headBar {
  margin-top: 2em;
  margin-bottom: 4em;
}
#btn_headBar {
  display: inline-table;
}
</style>