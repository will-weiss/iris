const Hogan = require('hogan.js')
import beautify = require('js-beautify')
import { readFileSync } from 'fs'

const fnTemplate = readFileSync(__dirname + '/../templates/function.mustache', 'utf8')
const nodeTemplate = readFileSync(__dirname + '/../templates/node.mustache', 'utf8')

const partials = {
  function: Hogan.compile(fnTemplate),
  node: Hogan.compile(nodeTemplate),
}

export default function compiler(nodes: DataToCompile): string {
  const data = {
    nodes,
    initialResultExpr: 'document.createDocumentFragment()',
    addToResultLeft: 'result.appendChild(document.createTextNode(',
    addToResultRight: '))',
  }
  return beautify(partials.function.render(data, partials))
}

export function compileToString(nodes: DataToCompile): string {
  const data = {
    nodes,
    initialResultExpr: '""',
    addToResultLeft: 'result +=',
    addToResultRight: ''
  }
  return partials.function.render(data, partials)
}
