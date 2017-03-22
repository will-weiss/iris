import * as createNode from './createNode'
import { map, compact, split, flatten } from '../generators'

const keys = (str: string) => str === '.' ? [] : str.split('.')


function fromHogan(node: HoganParsedNode): IrisNode | undefined {
  switch (node.tag) {
    case '\n':
      return createNode.newline

    case '_t':
      return createNode.text(JSON.stringify('' + node.text))

    case '>':
      return createNode.partial(node.n, node.indent || '')

    case '#': case '^':
      return createNode.section(keys(node.n), node.tag !== '#', interpreter(node.nodes))

    case '&': case '{': case '_v':
      return createNode.variable(keys(node.n), node.tag === '_v')
  }
}


function* lines(hoganNodes: HoganParsedNode[]): IterableIterator<IrisNode> {
  const line: IrisNode[] = [createNode.linestart]

  for (const node of compact(map(hoganNodes, fromHogan))) {
    line.push(node)

    if (node.newline) {
      yield * line
      line.length = 1
    }
  }

  if (line.length > 1) {
    yield * line
  }
}

export default function interpreter(hoganNodes: HoganParsedNode[]): IrisNode[] {
  return Array.from(lines(hoganNodes))
}
