import * as createNode from './createNode'
import parseTemplate, { hoganNodesOf } from './parseTemplate'
import parseHTML from './parseHTML'





function extractElementsFrom(node: IrisNode): IrisNode {
  if (node.nodes == null) return node

  const originalNodes = node.nodes.map(extractElementsFrom)

  const html: string = originalNodes.map((node, i) => {
    switch (node.tag) {
      case 'text':     return JSON.parse(node.text)
      case 'variable': return node.path.keys.join('.')
      default:         return `<!–– iris: ${i} -->`
    }
  }).join('')

  const parsedHTML = parseHTML(html)

  function* walk(htmlNodes: HTMLNode[]): IterableIterator<any> {
    for (const htmlNode of htmlNodes) {
      switch (htmlNode.type) {
        case 'text': {
          yield createNode.text(JSON.stringify(htmlNode.data))
          break
        }
        case 'tag': {
          console.log('THERE!')
          console.log(htmlNode)
          yield createNode.element(htmlNode.name, htmlNode.attribs, Array.from(walk(htmlNode.children!)))
          break
        }
        case 'directive': {
          console.log(htmlNode)
          const match = htmlNode.data.match(/iris: (\d+)/)
          if (match) {
            const id = Number(match[1])
            yield originalNodes[id]
          }
        }
      }
    }
  }

  return { ...node, nodes: Array.from(walk(parsedHTML)) } as any
}



export function parseDOM(template: string, partials: PartialTemplateStrings = {}): IrisRootTemplateNode {
  const rootTemplate = parseString(template, partials)
  return extractElementsFrom(rootTemplate) as any
}

export function parseString(template: string, partials: PartialTemplateStrings = {}): IrisRootTemplateNode {
  const partialNames = new Set(Object.keys(partials))

  const partialTemplates = Object.keys(partials).map(name =>
    createNode.partialTemplate(name, parseTemplate(partials[name], true, partialNames)))

  return createNode.rootTemplate(partialTemplates, parseTemplate(template, false, partialNames))
}