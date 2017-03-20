const Hogan = require('hogan.js')
import escape = require('lodash.escape')
import unescape = require('lodash.unescape')
import { expect } from 'chai'
import { jsdom } from 'jsdom'
import { Script } from 'vm'
import iris from '../index'


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
  const specGroupTests = require(`../../spec/specs/${specGroupName}`).tests.map(parseTestCase) as MustacheTestCase[]

  describe(specGroupName, () =>
    specGroupTests.forEach(testCase =>
      it(testCase.name, () => runTest(testCase))))
}


function parseTestCase(testCase: MustacheTestCase): MustacheTestCase {
  const { data } = testCase
  if (!data.lambda) return testCase
  const func = (new Function ('return ' + data.lambda.js)())
  const lambda = function() { return func }
  return { ...testCase, data: { ...data, lambda } }
}


function testSpecAgainstHogan({ desc, data, template, expected, partials }: MustacheTestCase) {
  const rendered = Hogan.compile(template).render(data, partials)
  expect(rendered).to.equal(expected, desc)
}


function testSpecAgainstIris({ desc, data, template, expected, partials }: MustacheTestCase) {
  const templatizedFunction = iris(template)

  const { document } = jsdom('<html><body></body></html>').defaultView

  const script = new Script(`element = (${templatizedFunction})(data, partials)`)
  const context: any = { document, data, partials }

  script.runInNewContext(context)

  // The text is equal to the outerHTML for elements and data for text nodes
  const text = context.element.outerHTML || context.element.data || context.element.textContent

  expect(text).to.equal(expected, desc)
}


function* specGroups(): IterableIterator<[string, TestSpec]> {
  yield ['comments', testSpecAgainstIris]
  yield ['interpolation', testSpecAgainstIris]
  yield ['sections', testSpecAgainstIris]
  yield ['inverted', testSpecAgainstIris]
  yield ['delimiters', testSpecAgainstIris]
  // yield ['partials', testSpecAgainstHogan]
  // yield ['~lambdas', testSpecAgainstHogan]
}


describe('iris', () => {
  for (const [specGroupName, runTest] of specGroups()) {
    testSpecGroup(specGroupName, runTest)
  }
})
