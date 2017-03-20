import mustacheParser from './mustache-parser'
import interpreter from './interpreter'
import compiler, { compileToString } from './compiler'


type Partials = {
  [name: string]: string
}


export default function iris(template: string, partials: Partials = {}) {
  const nodes: HoganParsedNode[] = mustacheParser(template)
  const irisNodes = interpreter(nodes)
  return compiler(irisNodes)
}

export function irisToString(template: string, partials: Partials = {}) {
  const nodes: HoganParsedNode[] = mustacheParser(template)
  const irisNodes = interpreter(nodes)
  return compileToString(irisNodes)
}
