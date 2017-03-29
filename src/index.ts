import { parseString, parseDOM } from './parser'
import { toString, toDOM } from './compiler'
import beautify = require('js-beautify')


export function irisToDOM(template: string, partials: PartialTemplateStrings = {}) {
  const data = parseDOM(template, partials)
  return beautify(toDOM(data), { preserve_newlines: false })
}

export function irisToString(template: string, partials: PartialTemplateStrings = {}) {
  const data = parseString(template, partials)
  return beautify(toString(data), { preserve_newlines: false })
}
