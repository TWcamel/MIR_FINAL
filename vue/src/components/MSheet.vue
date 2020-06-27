<template>
  <div id="MusicSheetPage">
    <h1>This is full capcha's Demo</h1>
    <div class="output">
      Output
      <div class="tune-number">
        Tune Number:
        <i>{{ tuneNumber }}</i>
      </div>
      <div class="classes">
        Classes:
        <i>{{ classes }}</i>
      </div>
      <div class="abcelem">
        Struct returned from callback:
        <br />
        <i>{{ elem }}</i>
      </div>
    </div>
    <p class="instructions">
      Click around on the various parts of the sheet music and see what the
      resultant output is.
    </p>
    <div id="paper">{{ tune }}</div>
  </div>
</template>

<script>
import abcjs from "abcjs";
import { abcSetter, abcGetter } from "../utils/utils";
export default {
  mounted: function() {
    abcjs.renderAbc("paper", this.tune, {
      add_classes: true,
      clickListener: this.listener
    });
  },
  data() {
    return {
      elem: {},
      tuneNumber: "",
      classes: [],
      tune: `${abcGetter()}`
    };
  },
  methods: {
    listener(abcElem, tuneNumber, classes) {
      // remove the abselem member because it is circular.
      const elem = Object.assign({}, abcElem);
      delete elem.abselem;
      this.elem = elem;
      this.tuneNumber = tuneNumber;
      this.classes = classes;
      // console.log(elem)
      // console.log(abcGetter());
    }
  }
};
</script>

<style></style>
