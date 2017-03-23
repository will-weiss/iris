import * as createNode from './createNode'
import parseTemplate, { hoganNodesOf } from './parseTemplate'
import parseHTML from './parseHTML'


export default function parse(template: string, partials: PartialTemplateStrings = {}): IrisRootTemplateNode {
  const partialNames = new Set(Object.keys(partials))

  const partialTemplates = Object.keys(partials).map(name =>
    createNode.partialTemplate(name, parseTemplate(partials[name], true, partialNames)))

  return createNode.rootTemplate(partialTemplates, parseTemplate(template, false, partialNames))
}

function parseElements(node: IrisNode): IrisNode {
  switch (node.tag) {
    case 'rootTemplate': case 'partialTemplate': case 'section': {
      const nodes: IrisNode[] = node.nodes.map(parseElements)
      console.log(nodes)
      return node
    }
    default: {
      return node
    }
  }
}


export function formHTML(template: string): string {
  const hoganNodes = hoganNodesOf(template)

  let id = -1

  function* walk(hoganNodes: HoganParsedNode[]): IterableIterator<string> {
    for (const node of hoganNodes) {
      console.log(node)

      switch (node.tag) {
        case '\n': {
          yield '\n'
          break
        }

        case '_t': {
          yield '' + node.text
          break
        }

        case '#': case '^': {
          id++
          yield `<iris id="${id}">`
          yield * walk(node.nodes)
          yield `</iris>`
          break
        }

        case '>': case '&': case '{': case '_v': {
          id++
          yield `<iris id="${id}">`
          break
        }

        case '!': {
          break
        }

        default: {
          throw new Error(`Unrecognized tag: ${JSON.stringify(node)}`)
        }
      }
    }
  }

  return Array.from(walk(hoganNodes)).join('')
}


export function parseDOM(template: string, partials: PartialTemplateStrings = {}): IrisRootTemplateNode {
  const partialNames = new Set(Object.keys(partials))

  const partialTemplates = Object.keys(partials).map(name =>
    createNode.partialTemplate(name, parseTemplate(partials[name], true, partialNames)))

  const rootTemplate = createNode.rootTemplate(partialTemplates, parseTemplate(template, false, partialNames))

  return rootTemplate
}