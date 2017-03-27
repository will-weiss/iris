import { expect } from 'chai'
import { parseDOM } from '../parser'
import parseHTML from '../parser/parseHTML'


describe.only('parser', () => {
  it('works', () => {
    const template =
      `<ul>{{#items}}<li><h3 color={{color}}>{{text}}</h3><button>Click Me!</button></li>{{/items}}</ul>`


    console.log(parseHTML(template))
    console.log(JSON.stringify(parseHTML(template), null, 2))
    const parsed = parseDOM(template)

    expect(parsed).to.have.property('tag', 'rootTemplate')
    expect(parsed).to.have.property('nodes').that.has.length(1)
    expect(parsed.nodes[0]).to.have.property('tag', 'element')
    console.log(JSON.stringify(parsed, null, 2))
  })
})
