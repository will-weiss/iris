import { expect } from 'chai'
import { parseDOM, parseString, extractElementsFrom } from '../parser'
import * as createNode from '../parser/createNode'
import parseHTML from '../parser/parseHTML'


describe('parser', () => {

  it('handles weirdo partials', () => {
    const template = `  {{>partial}}\n>`
    const parsed = parseDOM(template, { partial: '>\n>' })
    expect(parsed.children).to.have.length(2)
  })

  describe('extractElementsFrom', () => {

    it('extracts elements from iris nodes with children', () => {

      const rootTemplate = createNode.rootTemplate({
        children: [
          createNode.variable({ path: 'foo' }),
          createNode.text({ raw: 'Hello <a>' }),
          createNode.variable({ path: 'name' }),
          createNode.text({ raw: '</a> World' }),
        ]
      })

      const extracted = extractElementsFrom(rootTemplate)

      const expected = createNode.rootTemplate({
        children: [
          createNode.variable({ path: 'foo' }),
          createNode.text({ raw: 'Hello ' }),
          createNode.element({
            tagName: 'a',
            children: [
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
