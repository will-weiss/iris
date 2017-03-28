const Hogan = require('hogan.js')
import escape = require('lodash.escape')
import unescape = require('lodash.unescape')
import { expect } from 'chai'
import { jsdom } from 'jsdom'
import { Script } from 'vm'
import { irisToDOM, irisToString } from '../index'


interface MustacheTestCase {
  name: string
  desc: string
  data: any
  template: string
  expected: string
  partials?: any
}

type TestSpec = (testCase: MustacheTestCase) => void


function testSpecGroup(specGroupName: string, runTest: TestSpec) {
  const specGroupTests = require(`../../spec/specs/${specGroupName}`).tests as MustacheTestCase[]

  describe(specGroupName, () =>
    specGroupTests.forEach(testCase =>
      it(testCase.name, () => runTest(testCase))))
}

function testSpecAgainstHogan({ desc, data, template, expected, partials }: MustacheTestCase) {
  const rendered = Hogan.compile(template).render(data, partials)
  expect(rendered).to.equal(expected, desc)
}


function testSpecAgainstIrisToDOM({ name, desc, data, template, expected, partials }: MustacheTestCase) {

  const { document } = jsdom('<html><body></body></html>').defaultView
  const script = new Script(`element = (${irisToDOM(template, partials)})(data)`)
  const context: any = { document, data }
  script.runInNewContext(context)

  // The text is equal to the outerHTML for elements and data for text nodes
  const text = context.element.outerHTML || context.element.data || context.element.textContent

  if (name === 'Sections') {
    console.log(template)
    console.log(data)
    console.log(JSON.stringify(expected))
    console.log(irisToDOM(template, partials))
    console.log(JSON.stringify(text))
  }

  expect(text).to.equal(expected, desc)
}

function testSpecAgainstIrisToString({ desc, data, template, expected, partials }: MustacheTestCase) {

  const templatizedFunction = (new Function(`return ${irisToString(template, partials)}`))()
  const result = templatizedFunction(data)
  expect(result).to.equal(expected, desc)
}


function* specGroups(): IterableIterator<[string, TestSpec]> {

  yield ['comments', testSpecAgainstIrisToString]
  yield ['interpolation', testSpecAgainstIrisToString]
  yield ['sections', testSpecAgainstIrisToString]
  yield ['inverted', testSpecAgainstIrisToString]
  yield ['partials', testSpecAgainstIrisToString]
  yield ['delimiters', testSpecAgainstIrisToString]

  // yield ['comments', testSpecAgainstIrisToDOM]
  // yield ['interpolation', testSpecAgainstIrisToDOM]
  // yield ['sections', testSpecAgainstIrisToDOM]
  // yield ['inverted', testSpecAgainstIrisToDOM]
  // yield ['partials', testSpecAgainstIrisToDOM]
  // yield ['delimiters', testSpecAgainstIrisToDOM]
}


describe('iris', () => {
  for (const [specGroupName, runTest] of specGroups()) {
    testSpecGroup(specGroupName, runTest)
  }
})
