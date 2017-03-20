const keys = (str: string) => str === '.' ? [] : str.split('.')

const textTag = (text: string) =>
  ({ text: JSON.stringify(text) })


function* irisNodes(nodes: HoganParsedNode[]): IterableIterator<IrisNode> {
  let text: string = ''

  for (const node of nodes) {
    switch (node.tag) {
      case '#': case '^': case '$': case '<': case '>': {

        if (text) {
          yield textTag(text)
          text = ''
        }

        yield {
          keys: keys(node.n),
          section: {
            inverted: (node.tag !== '#'),
            nodes: interpreter(node.nodes)
          }
        }
        break
      }

      case '&': case '{': case '_v': {
        if (text) {
          yield textTag(text)
          text = ''
        }

        yield {
          keys: keys(node.n),
          variable: { escaped: (node.tag === '_v') },
        }
        break
      }

      case '_t': {
        text += node.text
        break
      }

      case '\n': {
        text += '\n'
        break
      }
    }
  }

  if (text) {
    yield textTag(text)
  }
}


export default function interpreter(nodes: HoganParsedNode[]): IrisNode[] {
  return Array.from(irisNodes(nodes))
}
