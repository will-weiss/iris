// import { expect } from 'chai'
// import interpreter from '../interpreter'


// describe('interpreter', () => {

//   it('interprets nodes correctly', () => {
//     const hoganTokens: HoganParsedNode[] =
//       [ { tag: '_t', text: new String('x') },
//         { tag: '\n' },
//         { tag: '_v', n: 'person.name', otag: '{{', ctag: '}}', i: 16 },
//         { tag: '_t', text: new String('y') },
//         { tag: '\n' },
//         { tag: '#',
//           n: 'person',
//           otag: '{{',
//           ctag: '}}',
//           i: 33,
//           end: 41,
//           nodes: [ { tag: '_v', n: 'name', otag: '{{', ctag: '}}', i: 16 } ] },
//         { tag: '_t', text: new String('z') } ]

//     const interpreted = interpreter(hoganTokens)

//     expect(interpreted).to.deep.equal([
//       {
//         tag: 'text',
//         text: '"x\\n"'
//       },
//       {
//         tag: 'variable',
//         keys: ['person', 'name'],
//         escaped: true
//       },
//       {
//         tag: 'text',
//         text: '"y\\n"'
//       },
//       {
//         tag: 'section',
//         keys: ['person'],
//         inverted: false,
//         children: [
//           {
//             tag: 'variable',
//             keys: ['name'],
//             escaped: true
//           }
//         ]
//       },
//       {
//         tag: 'text',
//         text: '"z"'
//       },
//     ])
//   })
// })
