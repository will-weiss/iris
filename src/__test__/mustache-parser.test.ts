import { expect } from 'chai'
import mustacheParser from '../mustache-parser'


describe('mustache-parser', () => {
  it('leverages Hogan to return an array of parsed tokens from a given template', () => {
    const tokens = mustacheParser('{{#hello}}world{{/hello}}')

    expect(tokens).to.deep.equal([{
      tag: "#",
      n: "hello",
      i: 10,
      end: 15,
      otag: "{{",
      ctag: "}}",
      nodes: [
        { tag: "_t", text: new String("world") },
      ],
    }])
  })
})
