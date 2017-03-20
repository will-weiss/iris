import mustacheParser from './mustache-parser'
import interpreter from './interpreter'
import compiler from './compiler'


export default function iris(template: string) {
  const nodes: HoganParsedNode[] = mustacheParser(template)
  const irisNodes = interpreter(nodes)
  return compiler(irisNodes)
}
