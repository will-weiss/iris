import * as createNode from './createNode'
import { map, compact, split, flatten } from '../generators'

const keys = (str: string) => str === '.' ? [] : str.split('.')


function fromHogan(node: HoganParsedNode): IrisNode | undefined {
  console.log(node)

  switch (node.tag) {
    case '\n':
      return createNode.text('"\\n"')

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


// export function* lines(hoganNodes: HoganParsedNode[]): IterableIterator<IrisNode[]> {
//   let currentLine: IrisNode[] = []

//   for (const node of compact(map(hoganNodes, fromHogan))) {
//     if (node.tag === 'newline') {
//       currentLine.push(createNode.text('"\\n"'))
//       yield currentLine
//       currentLine = []
//     } else {
//       currentLine.push(node)
//     }
//   }

//   yield currentLine
// }

export default function interpreter(hoganNodes: HoganParsedNode[]): IrisNode[] {
  return Array.from(compact(map(hoganNodes, fromHogan)))
}
