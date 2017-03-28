const Hogan = require('hogan.js')
import * as createNode from './createNode'


export default function parseTemplate(template: string, ofPartial: boolean, partialNames: Set<string>): IrisNonTemplateNode[] {
  const hoganNodes = hoganNodesOf(template)
  return irisNodesOf(hoganNodes, ofPartial, partialNames)
}

export function hoganNodesOf(template: string): HoganParsedNode[] {
  return Hogan.parse(Hogan.scan(template))
}

function irisNodesOf(hoganNodes: HoganParsedNode[], ofPartial: boolean, partialNames: Set<string>): IrisNonTemplateNode[] {
  return Array.from(linesOf(hoganNodes, ofPartial, partialNames))
}

function* linesOf(hoganNodes: HoganParsedNode[], ofPartial: boolean, partialNames: Set<string>): IterableIterator<IrisNonTemplateNode> {
  const line: IrisNonTemplateNode[] = []

  for (const hoganNode of hoganNodes) {
    const irisNode = irisNodeOf(hoganNode, ofPartial, partialNames)
    if (!irisNode) continue

    line.push(irisNode)

    if (irisNode.newline) {
      if (ofPartial) yield createNode.linestart
      yield * line
      line.length = 0
    }
  }

  if (line.length) {
    if (ofPartial) yield createNode.linestart
    yield * line
  }
}

function irisNodeOf(node: HoganParsedNode, ofPartial: boolean, partialNames: Set<string>): IrisNonTemplateNode | Falsy {
  switch (node.tag) {
    case '\n': {
      return createNode.newline
    }

    case '_t': {
      return createNode.text({
        raw: '' + node.text
      })
    }

    case '>': {
      return partialNames.has(node.n) && createNode.partialRef({
        name: node.n,
        indentation: node.indent
      })
    }

    case '#': case '^': {
      return createNode.section({
        path: node.n,
        inverted: node.tag !== '#',
        children: irisNodesOf(node.nodes, ofPartial, partialNames)
      })
    }

    case '&': case '{': case '_v':
      return createNode.variable({
        path: node.n,
        unescaped: node.tag !== '_v',
      })
  }
}
