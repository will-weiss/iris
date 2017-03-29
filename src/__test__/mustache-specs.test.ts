import { expect } from 'chai'
import { jsdom } from 'jsdom'
import { Script } from 'vm'
import { irisToDOM, irisToString } from '../index'


interface MustacheTestCase { name: string, desc: string, data: any, template: string, expected: string, partials?: any }

type TestSpec = (testCase: MustacheTestCase) => void


function testSpecGroup(specGroupName: string, runTest: TestSpec) {
  const specGroupTests = require(`../../spec/specs/${specGroupName}`).tests as MustacheTestCase[]

  describe(specGroupName, () =>
    specGroupTests.forEach(testCase =>
      it(testCase.name, () => runTest(testCase))))
}


function testSpecAgainstIrisToString({ desc, data, template, expected, partials }: MustacheTestCase) {
  const templatizedFunction = (new Function(`return ${irisToString(template, partials)}`))()
  const result = templatizedFunction(data)
  expect(result).to.equal(expected, desc)
}


function testSpecAgainstIrisToDOM({ name, desc, data, template, expected, partials }: MustacheTestCase) {
  const { document } = jsdom('<html><body></body></html>').defaultView
  const scriptCode = `element = (${irisToDOM(template, partials)})(data)`
  const script = new Script(scriptCode)
  const context: any = { document, data }
  script.runInNewContext(context)

  // The text is equal to the outerHTML for elements and data for text nodes
  const text = context.element.outerHTML || context.element.data || context.element.textContent
  expect(text).to.equal(expected, desc)
}


function runSuite(runTest: TestSpec) {
  testSpecGroup('comments', runTest)
  testSpecGroup('interpolation', runTest)
  testSpecGroup('sections', runTest)
  testSpecGroup('inverted', runTest)
  testSpecGroup('partials', runTest)
  testSpecGroup('delimiters', runTest)
}


describe('mustache specs', () => {
  describe('toString', () => runSuite(testSpecAgainstIrisToString))
  describe('toDOM', () => runSuite(testSpecAgainstIrisToDOM))
})
