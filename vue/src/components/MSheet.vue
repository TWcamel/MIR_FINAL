<template>
  <b-container>
    <b-row cols="1">
      <b-col id="MusicSheetPage">
        <h1>This is full CAPTCHA's demo</h1>
        <div class="output" style="background-color:rgb(23,162,184,0.1);">
          <p class="instructions" style="background-color:rgb(23,162,184,0.5); color:#000"><b><em>Output</em></b></p>
          <div class="abcelem">
            <i>Pitch: {{ pitches }}</i>
            <br />
            <i>Duration: {{ elem.duration }}</i>
            <br />
            <i>Start Char: {{ elem.startChar }}</i>
            <br />
            <i>End Char: {{ elem.endChar }}</i>
            <br />
            <i>Key: {{ rootM }}</i>
            <br />
          </div>
        </div>
        <p class="instructions" style="background-color:rgb(23,162,184,0.5); color:#000">
          <strong>
            <em>
              Click around on the various parts of the sheet music and see what the
              resultant output is.
            </em>
          </strong>
        </p>
      </b-col>
    </b-row>
    <b-row cols="1">
      <b-col>
        <div id="paper">{{ tune }}</div>
      </b-col>
    </b-row>
  </b-container>
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
      pitches: {},
      rootM: {},
      tune: `${abcGetter()}`
    };
  },
  methods: {
    listener(abcElem, classes) {
      const elem = Object.assign({}, abcElem);
      delete elem.abselem;
      this.elem = elem;
      if (elem.pitches !== undefined) this.pitches = elem.pitches[0];
      if (elem.root !== undefined) this.rootM = elem.root;
    }
  }
};
</script>

