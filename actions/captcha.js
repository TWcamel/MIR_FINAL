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
  tune2: ` X:1
T: Ayr Races
C:John Gow
R:Jig
Q:180
K:D
M:6/8
L:1/16
d4A2 A2F2A2|D2F2A2 A2F2D2|d4A2 A2F2D2|E2F2A2 B4A2|d4A2 A2F2A2|D2F2A2 A2F2D2|G2B2G2 F2A2F2|E2F2A2 B4A2|
d4A2 A2F2A2|D2F2A2 A2F2D2|d4A2 A2F2D2|E2F2A2 B4A2|d4A2 A2F2A2|D2F2A2 A2F2D2|G2B2G2 F2A2F2|E2F2A2 B4A2|
d4a2 a2f2d2|c4e2 e2c2A2|d4a2 a2f2d2|A2F2A2 B4A2|d4a2 a2f2d2|c4e2 e2c2A2|d4B2 A2F2D2|E2F2A2 B4c2|
d4a2 a2f2d2|c4e2 e2c2A2|d4a2 a2f2d2|A2F2A2 B4A2|d2f2a2 a2f2d2|c2d2e2 e2c2A2|B2c2d2 A2F2A2|D4D2 D4||
`
}


module.exports = {
  async handler(ctx, next) {
    let query = ctx.query
    if (query['cap']==='0'){
      query['cap'] = [`tune0`]
      query['ans'] = [`BAFA D2 FA`]
      query['abc'] = tuneArr[`tune${query['abc']}`]
    } else if (query['cap']==='1'){
      query['cap'] = [`tune1`]
      query['ans'] = [`AAAf2f`]
      query['abc'] = tuneArr[`tune${query['abc']}`]
    } else if (query['cap']==='2'){
      query['cap'] = [`tune2`]
      query['ans'] = [`d4A2 A2F2A2`]
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
