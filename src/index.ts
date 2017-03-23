import parse from './parser'
import compile from './compiler'
import beautify = require('js-beautify')


export function irisToDOM(template: string, partials: PartialTemplateStrings = {}) {
  return `function (data) {
    return document.createElement('div')
      .appendChild(document.createElement('h3').appendChild(document.createTextNode('In the header!')).parentNode).parentNode
      .appendChild(document.createElement('button').appendChild(document.createTextNode('Click Me!')).parentNode).parentNode
  }`
}

export function irisToString(template: string, partials: PartialTemplateStrings = {}) {
  const data = parse(template, partials)
  return beautify(compile(data), { preserve_newlines: false })
}
