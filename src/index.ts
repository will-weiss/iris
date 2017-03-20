import mustacheParser from './mustache-parser'
import interpreter from './interpreter'
import { compileToDOM, compileToString } from './compiler'
import beautify = require('js-beautify')


type Partials = {
  [name: string]: string
}

const doTheThing = (compiler: Function, postProcess: Function) => (template: string, partials: Partials = {}) => {
  const nodes: HoganParsedNode[] = mustacheParser(template)
  const irisNodes = interpreter(nodes)
  return postProcess(compiler(irisNodes))
}


export default doTheThing(compileToDOM, beautify)

export const irisToString = doTheThing(compileToString, (x: any) => x)
