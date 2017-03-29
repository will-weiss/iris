import * as createNode from './createNode'
import parseTemplate, { hoganNodesOf } from './parseTemplate'
import parseHTML from './parseHTML'


function htmlOf(node: IrisNode, index: number): string {
  switch (node.tag) {
    case 'text':
      return node.text.raw

    case 'variable':
      return `@@@iris-${index}@@@`

    default:
      return `<!–– iris: ${index} -->`
  }
}

function* walk(originalChildren: IrisNode[], htmlNodes: HTMLNode[] = []): IterableIterator<IrisNode> {
  for (const htmlNode of htmlNodes) {
    switch (htmlNode.type) {
      case 'text': {
        for (const text of htmlNode.raw.split('@@@')) {
          if (!text) continue
          const match = text.match(/^iris-(\d+)$/)
          yield match
            ? originalChildren[Number(match[1])]
            : createNode.text({ raw: text })
        }

        break
      }
      case 'tag': {
        const { name: tagName, attribs } = htmlNode
        const children = Array.from(walk(originalChildren, htmlNode.children!))
        const attributes = attribs
          ? Object.keys(attribs).map(name => {
              const value = attribs[name]
              const match = value.match(/^@@@iris-(\d+)@@@$/)
              if (!match) return ({ name, static: { value: JSON.stringify(value) } })
              const id = Number(match[1])
              const variableNode = originalChildren[id] as IrisVariableNode
              return ({ name, path: variableNode.path })
            })
          : []
        yield createNode.element({ tagName, attributes, children })
        break
      }
      case 'directive': {
        const match = htmlNode.data.match(/iris: (\d+)/)
        if (match) {
          const id = Number(match[1])
          yield originalChildren[id]
        }
      }
    }
  }
}

export function extractElementsFrom(node: IrisNode): IrisNode {
  if (node.children == null) return node

  const originalChildren: IrisNode[] = node.children.map(extractElementsFrom)

  const html: string = originalChildren.reduce((html, node, index) => html + htmlOf(node, index), '')

  const parsedHTML = parseHTML(html)

  const children = Array.from(walk(originalChildren, parsedHTML))

  // Yuck
  if (children.length < originalChildren.length && html.slice(0, 1) === '>') {
    children.unshift(createNode.text({ raw: '>' }))
  }

  if (children.length < originalChildren.length && html.slice(-2) === '>>') {
    children.push(createNode.text({ raw: '>' }))
  }

  return { ...node, children } as any
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
      children: parseTemplate(partials[name], true, partialNames)
    }))

  const children = parseTemplate(template, false, partialNames)

  return createNode.rootTemplate({ partialTemplates, children })
}