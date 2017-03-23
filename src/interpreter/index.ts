import * as createNode from './createNode'
import { map, compact, split, flatten } from '../generators'


const keys = (str: string) => str === '.' ? [] : str.split('.')


const fromHogan = (partialNames: Set<string>) => (node: HoganParsedNode): IrisNode | undefined => {
  switch (node.tag) {
    case '\n':
      return createNode.newline

    case '_t':
      return createNode.text(JSON.stringify('' + node.text))

    case '>':
      return createNode.partial(node.n, partialNames.has(node.n), node.indent || '')

    case '#': case '^':
      return createNode.section(keys(node.n), node.tag !== '#', interpreter(node.nodes, partialNames))

    case '&': case '{': case '_v':
      return createNode.variable(keys(node.n), node.tag === '_v')
  }
}


function* lines(hoganNodes: HoganParsedNode[], partialNames: Set<string>): IterableIterator<IrisNode> {
  const line: IrisNode[] = [createNode.linestart]

  for (const node of compact(map(hoganNodes, fromHogan(partialNames)))) {
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

export default function interpreter(hoganNodes: HoganParsedNode[], partialNames: Set<string>): IrisNode[] {
  return Array.from(lines(hoganNodes, partialNames))
}
