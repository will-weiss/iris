function* interpretNodes(nodes: HoganParsedNode[]): IterableIterator<IrisNode> {
  let text: string = ''

  const nullTerminatedNodes: (HoganParsedNode | TerminatingNode)[] =
    (nodes as any).concat([{ tag: null }])

  for (const node of nullTerminatedNodes) {

    let yieldText: boolean = false
    let irisNode: IrisNode | undefined

    switch (node.tag) {

      case null: {
        yieldText = true
        break
      }

      case '!': {
        break
      }

      case '#': case '^': case '$': case '<': case '>': {
        yieldText = true
        irisNode = { tag: 'section', keys: node.n.split('.'), inverted: (node.tag !== '#'), children: Array.from(interpretNodes(node.nodes)) }
        break
      }

      case '&': case '{': case '_v': {
        yieldText = true
        irisNode = { tag: 'variable', keys: node.n.split('.'), escaped: (node.tag === '_v') }
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

    if (yieldText && text) {
      yield { tag: 'text', text: JSON.stringify(text) }
      text = ''
    }

    if (irisNode) {
      yield irisNode
    }
  }
}


export default function interpreter(nodes: HoganParsedNode[]): IrisNode[] {
  return Array.from(interpretNodes(nodes))
}
