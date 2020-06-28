<template>
  <b-container>
    <b-row cols="1">
      <b-col class="index mb-4">
        <h4 class="mb-2">{{ message }}</h4>
        <b-button
          variant="outline-primary" pill
          @click="getNewMessage()"
          class="mb-4"
        >Get Training Result</b-button>
        <training-set></training-set>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import trainingSet from "../components/tnSet.vue";

export default {
  name: "Index",
  components: {
    trainingSet
  },
  computed: mapState({
    message: state => state.chMsg.message
  }),
  methods: mapActions("chMsg", ["getNewMessage"]),
  created() {
    this.$store.dispatch("chMsg/initMessage");
  }
};
</script>

<style scoped lang="less">
h2 {
  font-weight: normal;
}
.wrapper {
  .author {
    text-align: center;
  }
}
</style>
