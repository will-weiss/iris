import * as createNode from './createNode'
import parseTemplate, { hoganNodesOf } from './parseTemplate'
import parseHTML from './parseHTML'


function htmlOf(node: IrisNode, index: number): string {
  switch (node.tag) {
    case 'text':
      return JSON.parse(node.text)

    case 'variable':
      const { variable: { escaped }, path: { keys } } = node
      const path = keys.length ? keys.join('.') : '.'
      const escapedHTML = `{{${path}}}`
      return escaped ? escapedHTML : `{${escapedHTML}}`

    default:
      return `<!–– iris: ${index} -->`
  }
}

function* walk(originalNodes: IrisNode[], htmlNodes: HTMLNode[]): IterableIterator<IrisNode> {
  for (const htmlNode of htmlNodes) {
    switch (htmlNode.type) {
      case 'text': {
        yield * parseTemplate(htmlNode.raw, false, new Set())
        break
      }
      case 'tag': {
        const { attribs, children } = htmlNode
        const attributes = attribs ? Object.keys(attribs).map(name => ({ name, value: attribs[name] })) : []
        const nodes = Array.from(walk(originalNodes, htmlNode.children!))
        yield createNode.element(htmlNode.name, attributes, nodes)
        break
      }
      case 'directive': {
        const match = htmlNode.data.match(/iris: (\d+)/)
        if (match) {
          const id = Number(match[1])
          yield originalNodes[id]
        }
      }
    }
  }
}

function extractElementsFrom(node: IrisNode): IrisNode {
  if (node.nodes == null) return node
  const originalNodes: IrisNode[] = node.nodes.map(extractElementsFrom)
  const html: string = originalNodes.reduce((html, node, index) => html + htmlOf(node, index), '')
  const parsedHTML = parseHTML(html)
  const nodes = Array.from(walk(originalNodes, parsedHTML))
  return { ...node, nodes } as any
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