<template>
  <div class="training-set">
    <h4>Your training set now is 'SMC'</h4>
    <!-- <button @click="getData()">Get Data</button> -->
    <b-button variant="outline-secondary" @click="dryRun()">Try Run</b-button>
  </div>
</template>

<script>
import { get, post } from "../utils/request";
export default {
  name: "trainingSet",
  methods: {
    async getData() {
      try {
        let resp = await get("/api/files/");
        console.log(resp.data);
      } catch (e) {
        alert("Cannot get data from data.txt, plz try again.");
      }
    },
    async dryRun() {
      try {
        await get("/api/run/");
        alert('Your are now running SMC data set, plz wait 10sec until traiing process finished')
      } catch (e) {
        alert("Cannot run python file, plz try again.");
      }
    }
  }
};
</script>

<style scoped lang="less">
.training-set {
  text-align: center;
  color: rgb(102, 101, 109);
}
</style>
