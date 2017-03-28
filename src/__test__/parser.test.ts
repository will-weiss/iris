import { expect } from 'chai'
import { parseDOM, parseString, extractElementsFrom } from '../parser'
import * as createNode from '../parser/createNode'
import parseHTML from '../parser/parseHTML'


describe('parser', () => {
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

  describe('extractElementsFrom', () => {

    it('extracts elements from iris nodes with children', () => {

      const rootTemplate = createNode.rootTemplate({
        nodes: [
          createNode.text({ raw: 'Hello <a>' }),
          createNode.variable({ path: 'name' }),
          createNode.text({ raw: '</a> World' }),
        ]
      })

      const extracted = extractElementsFrom(rootTemplate)

      const expected = createNode.rootTemplate({
        nodes: [
          createNode.text({ raw: 'Hello ' }),
          createNode.element({
            tagName: 'a',
            nodes: [
              createNode.variable({ path: 'name' }),
            ]
          }),
          createNode.text({ raw: ' World' }),
        ]
      })

      expect(extracted).to.deep.equal(expected)
    })
  })
})
