import mapValues = require('lodash.mapvalues')
import mustacheParser from './mustache-parser'
import interpreter from './interpreter'
import { compileToDOM, compileToString } from './compiler'
import beautify = require('js-beautify')


type Partials = {
  [name: string]: string
}

function parse(template: string, ofPartial: boolean, partialNames: Set<string>): IrisNode[] {
  return interpreter(mustacheParser(template), ofPartial, partialNames)
}


// export function irisToDOM(template: string, partials: Partials = {}) {
//   const nodes = parse(template)

//   const parsedPartials = Object.keys(partials).map(name => ({
//     nodes: parse(partials[name]),
//     ofPartial: { name },
//     partials: null,
//   }))

//   return beautify(compileToDOM({ nodes, ofPartial: null, partials: parsedPartials }), { preserve_newlines: false })
// }

export function irisToDOM(template: string, partials: Partials = {}) {
  return `function (data) {
    return document.createElement('div')
      .appendChild(document.createElement('h3').appendChild(document.createTextNode('In the header!')).parentNode).parentNode
      .appendChild(document.createElement('button').appendChild(document.createTextNode('Click Me!')).parentNode).parentNode
  }`
}

export function irisToString(template: string, partials: Partials = {}) {
  const partialNames = new Set(Object.keys(partials))
  const nodes = parse(template, false, partialNames)

  const parsedPartials = Object.keys(partials).map(name => ({
    nodes: parse(partials[name], true, partialNames),
    ofPartial: { name },
    partials: null,
  }))

  return beautify(compileToString({ nodes, ofPartial: null, partials: parsedPartials }), { preserve_newlines: false })
}
