let abcTune = []
export function sayHello() {
  console.log('Say Say Say Hello!')
}

export function getRandInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

export function abcSetter(i) {
  abcTune = i
}

export function abcGetter() {
  return abcTune
}