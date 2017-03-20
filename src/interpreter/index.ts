import * as createNode from './createNode'
import { map, compact } from '../generators'

const keys = (str: string) => str === '.' ? [] : str.split('.')


function fromHogan(node: HoganParsedNode): IrisNode | string | undefined {
  switch (node.tag) {
    case '>':
      return createNode.partial(node.n)

    case '#': case '^': case '$': case '<':
      return createNode.section(keys(node.n), node.tag !== '#', interpreter(node.nodes))

    case '&': case '{': case '_v': 
      return createNode.variable(keys(node.n), node.tag === '_v')

    case '_t': 
      return '' + node.text

    case '\n': 
      return '\n'
  }
}

function* groupTexts<T>(values: Iterable<T | string>): IterableIterator<T | string> {
  let text: string = ''

  for (const value of values) {
    if (typeof value === 'string') {
      text += value
    } else {
      yield text
      yield value
      text = ''
    }
  }

  yield text
}

function interpretText(nodeOrText: IrisNode | string): IrisNode {
  return typeof nodeOrText === 'string'
    ? createNode.text(JSON.stringify(nodeOrText))
    : nodeOrText
}

export default function interpreter(hoganNodes: HoganParsedNode[]): IrisNode[] {
  const irisNodesAndGroupedTexts = compact(groupTexts(map(hoganNodes, fromHogan)))
  return Array.from(map(irisNodesAndGroupedTexts, interpretText))
}
