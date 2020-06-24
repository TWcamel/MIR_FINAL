<template>
  <div id="homePage">
    <h1>This is full capcha's Demo</h1>
    <div class="output">
      Output
      <div class="tune-number">
        Tune Number: <i>{{ tuneNumber }}</i>
      </div>
      <div class="classes">
        Classes: <i>{{ classes }}</i>
      </div>
      <div class="abcelem">
        Struct returned from callback:<br /><i>{{ elem }}</i>
      </div>
    </div>
    <p class="instructions">
      Click around on the various parts of the sheet music and see what the
      resultant output is.
    </p>
    <div id="paper"></div>
  </div>
</template>

<script>
import abcjs from 'abcjs'
let tuneArr = {
  tune1: `
			X: 1
T: Cooley's
M: 4/4
K: C
|:D2|"Em"EB{c}BA B2 EB|~B2 AB dBAG|\
	"D"FDAD BDAD|FDAD dAFD|
"Em"EBBA B2 EB|B2 AB defg|\
	"D"afe^c dBAF|"Em"DEFD E2:|
|:gf|"Em"eB B2 efge|eB B2 gedB|\
	"D"A2 FA DAFA|A2 FA defg|
"Em"eB B2 eBgB|eB B2 defg|\
	"D"afe^c dBAF|"Em"DEFD E2:|
`
}

export default {
	mounted:  function () {
			abcjs.renderAbc("paper", this.tune, { add_classes: true, clickListener: this.listener });
		},
  data() {
    return {
			elem: {},
			tuneNumber: "",
			classes: [],
			tune: tuneArr.tune1
			}
		},
		methods: {
			listener(abcElem, tuneNumber, classes) {
				// remove the abselem member because it is circular.
				const elem = Object.assign({}, abcElem);
				delete elem.abselem;
				this.elem = elem;
				this.tuneNumber = tuneNumber;
				this.classes = classes
				// console.log(elem)
			},
		}
}

</script>

<style></style>
