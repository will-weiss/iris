import parse from './parser'
import { compileToDOM, compileToString } from './compiler'
import beautify = require('js-beautify')


type Partials = {
  [name: string]: string
}

export function irisToDOM(template: string, partials: Partials = {}) {
  return `function (data) {
    return document.createElement('div')
      .appendChild(document.createElement('h3').appendChild(document.createTextNode('In the header!')).parentNode).parentNode
      .appendChild(document.createElement('button').appendChild(document.createTextNode('Click Me!')).parentNode).parentNode
  }`
}

export function irisToString(template: string, partials: Partials = {}) {
  const data = parse(template, partials)
  return beautify(compileToString(data), { preserve_newlines: false })
}
