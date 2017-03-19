// import Hogan = require('hogan.js')
import mustacheParser from './mustache-parser'
import interpreter from './interpreter'
import compiler from './compiler'


function compilableNode(node: IrisNode): CompilableNode {
  switch (node.tag) {
    case 'text': {
      return { text: node.text, keys: null, nodes: null }
    }
    case 'variable': {
      return { variable: { escaped: node.escaped }, keys: node.keys, nodes: null }
    }
    case 'section': {
      return { keys: node.keys, nodes: node.children.map(compilableNode) }
    }
  }
}

export default function iris(template: string) {
  const nodes: HoganParsedNode[] = mustacheParser(template)

  const irisNodes = interpreter(nodes)

  const data: DataToCompile = {
    data: 'data',
    cursor: 'cursor',
    context: 'context',
    nodes: irisNodes.map(compilableNode),
  }

  return compiler(data)
}
