import * as createNode from './createNode'
import { map, compact, split, flatten } from '../generators'

const keys = (str: string) => str === '.' ? [] : str.split('.')


function fromHogan(node: HoganParsedNode): IrisNode | IrisNewlineNode | undefined {
  switch (node.tag) {
    case '\n':
      return createNode.newline

    case '_t':
      return createNode.text(JSON.stringify('' + node.text))

    case '>':
      return createNode.partial(node.n, node.indent || '')

    case '#': case '^': case '$': case '<':
      return createNode.section(keys(node.n), node.tag !== '#', interpreter(node.nodes))

    case '&': case '{': case '_v': 
      return createNode.variable(keys(node.n), node.tag === '_v')
  }
}

function* lines(hoganNodes: HoganParsedNode[]): IterableIterator<IrisNode> {
  let line: IrisNode[] = []

  for (const node of compact(map(hoganNodes, fromHogan))) {
    if (node.tag !== 'newline') {
      line.push(node)
    } else {
      yield createNode.linestart
      yield * line
      yield createNode.text('"\\n"')
      line = []
    }
  }

  if (line.length) {
    yield createNode.linestart
    yield * line
  }
}

export default function interpreter(hoganNodes: HoganParsedNode[]): IrisNode[] {
  return Array.from(lines(hoganNodes))
}
