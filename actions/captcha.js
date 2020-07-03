let tuneArr = {
  tune0: `X:10
T:The Boyne Hunt
C:Miss Stirling
N:The Perthshire Hunt
B:Joyce, P. W.; "Old Irish Folk Music and Songs"
D:"Cooley", track 8
M:4/4
R:reel
K:D
BAFA D2 FA|D2 FA BE E2|BAFA D3 F|ABde fedB|
BAFA D2 FA|D2 FA BE E2|BAFA DEFG|ABde fd d2 ||
{f}a3 f a2 af|gfga be e2|{f}a3 f gedB|ABde fd D2|
faaf a2 af|gfga beeg|fgfe dedB|1 ABde fedB :|2 ABfe fd d2 |]
`,
  tune1: `X:26
T:B026-  The Beggar Boy
S:via BBBM, from 'Dancing Master', 1651 
Q:1/4=120
L:1/4
M:6/4
K:Aphrygian
AAAf2f|ec2d2c|AF2G2G|A2BcA2:|\
AAAf2f|ec2d2c|Ac2ede|fA2G3|\
Acce3/2 d/2 c|dfg/2f/2efd|\
cAFG2G|A2BcA2|]|
`,
  tune2: `X: 5
T: The Boyne Hunt
R: reel
M: 4/4
L: 1/8
K: Dmaj
A2FA DAFA|DAFA BGEG|A2FA DAFA|A2de fedB|
A2FA DAFA|DAFA BGEG|A2FA DAFA|A2de fed2||
faaf aaaf|ggga bgeg|faaf aaaf|dcde fdd2|
faaf aaaf|ggga bgeg|fffe dcdB|ABde fedB||
`
}

module.exports = {
  async handler(ctx, next) {
    let query = ctx.query
    if (query['cap'] === '0') {
      query['cap'] = [`tune0`]
      query['ans'] = [`BAFA`]
      query['abc'] = tuneArr[`tune${query['abc']}`]
    } else if (query['cap'] === '1') {
      query['cap'] = [`tune1`]
      query['ans'] = [`AAAf`]
      query['abc'] = tuneArr[`tune${query['abc']}`]
    } else if (query['cap'] === '2') {
      query['cap'] = [`tune2`]
      query['ans'] = [`A2FA`]
      query['abc'] = tuneArr[`tune${query['abc']}`]
    }
    ctx.body = {
      usr: 'qq',
      pwd: 'ww',
      tune: query['cap'],
      ans: query['ans'],
      abc: query['abc']
    }
  }
}
