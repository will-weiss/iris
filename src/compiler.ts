const Hogan = require('hogan.js')
import beautify = require('js-beautify')
import { readFileSync } from 'fs'

const fnTemplate = readFileSync(__dirname + '/../templates/function.mustache', 'utf8')
const nodeTemplate = readFileSync(__dirname + '/../templates/node.mustache', 'utf8')

const partials = {
  function: Hogan.compile(fnTemplate),
  node: Hogan.compile(nodeTemplate),
}

export default function compiler(data: DataToCompile): string {
  return beautify(partials.function.render(data, partials))
}
