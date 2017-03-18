// import Hogan = require('hogan.js')
import mustacheParser from './mustache-parser'
import interpreter from './interpreter'
import compiler from './compiler'


function compilableNode(node: IrisNode): CompilableNode {
  switch (node.tag) {
    case 'text': {
      return { text: node.text, path: null, nodes: null }
    }
    case 'variable': {
      return { variable: { escaped: node.escaped }, path: node.keys.map(key => ({ key })), nodes: null }
    }
    case 'section': {
      return { path: node.keys.map(key => ({ key })), nodes: node.children.map(compilableNode) }
    }
  }
}

export default function iris(template: string) {
  const nodes: HoganParsedNode[] = mustacheParser(template)
  const irisNodes = interpreter(nodes)

  const data: DataToCompile = {
    cursor: 'cursor',
    context: 'context',
    nodes: irisNodes.map(compilableNode),
  }
  return compiler(data)
}
