import mapValues = require('lodash.mapvalues')
import mustacheParser from './mustache-parser'
import interpreter from './interpreter'
import { compileToDOM, compileToString } from './compiler'
import beautify = require('js-beautify')


type Partials = {
  [name: string]: string
}

function parse(template: string): IrisNode[] {
  return interpreter(mustacheParser(template))
}


export function irisToDOM(template: string, partials: Partials = {}) {
  const nodes = parse(template)

  const parsedPartials = Object.keys(partials).map(name => ({
    nodes: parse(partials[name]),
    ofPartial: { name },
    partials: null,
  }))

  return beautify(compileToDOM({ nodes, ofPartial: null, partials: parsedPartials }), { preserve_newlines: false })
}


export function irisToString(template: string, partials: Partials = {}) {
  const nodes = parse(template)

  const parsedPartials = Object.keys(partials).map(name => ({
    nodes: parse(partials[name]),
    ofPartial: { name },
    partials: null,
  }))

  return beautify(compileToString({ nodes, ofPartial: null, partials: parsedPartials }), { preserve_newlines: false })
}
