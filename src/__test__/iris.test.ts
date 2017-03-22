// const Hogan = require('hogan.js')
// import escape = require('lodash.escape')
// import unescape = require('lodash.unescape')
// import { expect } from 'chai'
// import { jsdom } from 'jsdom'
// import { Script } from 'vm'
// import { irisToString } from '../index'


// interface MustacheTestCase {
//   name: string
//   desc: string
//   data: any
//   template: string
//   expected: string
//   partials?: any
// }

// type TestSpec = (testCase: MustacheTestCase) => void


// function testSpecGroup(specGroupName: string, runTest: TestSpec) {
//   const specGroupTests = require(`../../spec/specs/${specGroupName}`).tests as MustacheTestCase[]

//   describe(specGroupName, () =>
//     specGroupTests.forEach(testCase =>
//       it(testCase.name, () => runTest(testCase))))
// }

// function testSpecAgainstHogan({ desc, data, template, expected, partials }: MustacheTestCase) {
//   const rendered = Hogan.compile(template).render(data, partials)
//   expect(rendered).to.equal(expected, desc)
// }


// // function testSpecAgainstIris({ desc, data, template, expected, partials }: MustacheTestCase) {
// //   const templatizedFunction = iris(template, partials)

// //   const { document } = jsdom('<html><body></body></html>').defaultView

// //   const script = new Script(`element = (${templatizedFunction})(data)`)
// //   const context: any = { document, data }

// //   script.runInNewContext(context)

// //   // The text is equal to the outerHTML for elements and data for text nodes
// //   const text = context.element.outerHTML || context.element.data || context.element.textContent

// //   expect(text).to.equal(expected, desc)
// // }

// function testSpecAgainstIrisToString({ desc, data, template, expected, partials }: MustacheTestCase) {
//   const templatizedFunction = irisToString(template, partials)
//   console.log(templatizedFunction)
//   const script = new Script(`result = (${templatizedFunction})(data)`)
//   const context: any = { data }
//   script.runInNewContext(context)
//   expect(context.result).to.equal(expected, desc)
// }


// function* specGroups(): IterableIterator<[string, TestSpec]> {
//   yield ['comments', testSpecAgainstIrisToString]
//   yield ['interpolation', testSpecAgainstIrisToString]
//   yield ['sections', testSpecAgainstIrisToString]
//   yield ['inverted', testSpecAgainstIrisToString]
//   yield ['partials', testSpecAgainstIrisToString]
//   yield ['delimiters', testSpecAgainstIrisToString]
// }


// describe('iris', () => {
//   for (const [specGroupName, runTest] of specGroups()) {
//     testSpecGroup(specGroupName, runTest)
//   }
// })
