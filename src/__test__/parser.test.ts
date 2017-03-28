import { expect } from 'chai'
import { parseDOM, parseString } from '../parser'
import parseHTML from '../parser/parseHTML'


describe.skip('parser', () => {
  // it('works', () => {
  //   const template =
  //     `<ul>{{#items}}<li><h3 color={{color}}>{{text}}</h3><button>Click Me!</button></li>{{/items}}</ul>`

  //   const parsed = parseDOM(template)

  //   expect(parsed).to.have.property('tag', 'rootTemplate')
  //   expect(parsed).to.have.property('nodes').that.has.length(1)
  //   expect(parsed.nodes[0]).to.have.property('tag', 'element')
  // })

  it('handles weirdo partials', () => {
    const template = `  {{>partial}}\n>`
    const parsed = parseDOM(template, { partial: '>\n>' })
    expect(parsed.nodes).to.have.length(2)
  })
})
