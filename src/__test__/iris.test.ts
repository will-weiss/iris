import { expect } from 'chai'
import jsdom = require('jsdom')
import vm = require('vm')
const Hogan = require('hogan.js')
import iris from '../index'


interface MustacheTestCase {
  name: string
  desc: string
  data: any
  expected: string
  template: string
  partials?: any
}

type TestSpec = (testCase: MustacheTestCase) => void


function testSpecGroup(specGroupName: string, runTest: TestSpec) {
  const specGroup = require(`../../spec/specs/${specGroupName}`)

  describe(specGroupName, () =>
    specGroup.tests.forEach((testCase: MustacheTestCase) =>
      it(`${testCase.name} - ${testCase.desc}`, () => runTest(testCase))))
}


function testSpecAgainstHogan({ template, data, partials, expected }: MustacheTestCase) {
  const rendered = Hogan.compile(template).render(data, partials)
  expect(rendered).to.equal(expected)
}


function testSpecAgainstIris({ template, data, partials, expected }: MustacheTestCase) {
  const templatizedFunction = iris(template)

  const { document } = jsdom.jsdom('<html><body></body></html>').defaultView

  const script = new vm.Script(`element = (${templatizedFunction})(data, partials)`)
  const context: any = { document, data, partials }

  script.runInNewContext(context)

  // The text is equal to the outerHTML for elements and data for text nodes
  const text = context.element.outerHTML || context.element.data

  expect(text).to.equal(expected)
}


function* specGroups(): IterableIterator<[string, TestSpec]> {
  yield ['comments', testSpecAgainstHogan]
  yield ['delimiters', testSpecAgainstHogan]
  yield ['interpolation', testSpecAgainstHogan]
  yield ['inverted', testSpecAgainstHogan]
  yield ['partials', testSpecAgainstHogan]
  yield ['sections', testSpecAgainstHogan]
  yield ['~lambdas', testSpecAgainstHogan]
}


describe('iris', () => {
  for (const [specGroupName, runTest] of specGroups()) {
    testSpecGroup(specGroupName, runTest)
  }
})
