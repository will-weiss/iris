import * as createNode from './createNode'
import parseTemplate, { hoganNodesOf } from './parseTemplate'
import parseHTML from './parseHTML'


function htmlOf(node: IrisNode, index: number): string {
  switch (node.tag) {
    case 'text':
      return node.text.raw

    case 'variable':
      const { variable: { unescaped }, path: { keys } } = node
      const path = keys.length ? keys.join('.') : '.'
      const escapedHTML = `{{${path}}}`
      return unescaped ? `{${escapedHTML}}` : escapedHTML

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
        const { name: tagName, attribs, children } = htmlNode
        const attributes = attribs ? Object.keys(attribs).map(name => ({ name, value: attribs[name] })) : []
        const nodes = Array.from(walk(originalNodes, htmlNode.children!))
        yield createNode.element({ tagName, attributes, nodes })
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

export function extractElementsFrom(node: IrisNode): IrisNode {
  if (node.nodes == null) return node
  const originalNodes: IrisNode[] = node.nodes.map(extractElementsFrom)
  const html: string = originalNodes.reduce((html, node, index) => html + htmlOf(node, index), '')
  const parsedHTML = parseHTML(html)
  const nodes = Array.from(walk(originalNodes, parsedHTML))

  // Yuck
  if (nodes.length < originalNodes.length && html.slice(0, 1) === '>') {
    nodes.unshift(createNode.text({ raw: '">"' }))
  }

  if (nodes.length < originalNodes.length && html.slice(-2) === '>>') {
    nodes.push(createNode.text({ raw: '">"' }))
  }

  return { ...node, nodes } as any
}



export function parseDOM(template: string, partials: PartialTemplateStrings = {}): IrisRootTemplateNode {
  const rootTemplate = parseString(template, partials)
  return extractElementsFrom(rootTemplate) as any
}

export function parseString(template: string, partials: PartialTemplateStrings = {}): IrisRootTemplateNode {
  const partialNames = new Set(Object.keys(partials))

  const partialTemplates = Object.keys(partials).map(name =>
    createNode.partialTemplate({
      name,
      nodes: parseTemplate(partials[name], true, partialNames)
    }))

  const nodes = parseTemplate(template, false, partialNames)

  return createNode.rootTemplate({ partialTemplates, nodes })
}