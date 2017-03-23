const Hogan = require('hogan.js')
import * as createNode from './createNode'
import { map, compact } from '../generators'


function mustacheParser(template: string): HoganParsedNode[] {
  return Hogan.parse(Hogan.scan(template))
}

const keys = (str: string) => str === '.' ? [] : str.split('.')


const fromHogan = (ofPartial: boolean, partialNames: Set<string>) => (node: HoganParsedNode): IrisNonTemplateNode | undefined => {
  switch (node.tag) {
    case '\n':
      return createNode.newline

    case '_t':
      return createNode.text(JSON.stringify('' + node.text))

    case '>':
      return partialNames.has(node.n) ? createNode.partialRef(node.n, node.indent || '') : undefined

    case '#': case '^':
      return createNode.section(keys(node.n), node.tag !== '#', interpreter(node.nodes, ofPartial, partialNames))

    case '&': case '{': case '_v':
      return createNode.variable(keys(node.n), node.tag === '_v')
  }
}


function* lines(hoganNodes: HoganParsedNode[], ofPartial: boolean, partialNames: Set<string>): IterableIterator<IrisNonTemplateNode> {
  const line: IrisNonTemplateNode[] = []

  for (const node of compact(map(hoganNodes, fromHogan(ofPartial, partialNames)))) {
    line.push(node)

    if (node.newline) {
      if (ofPartial) yield createNode.linestart
      yield * line
      line.length = 0
    }
  }

  if (line.length) {
    if (ofPartial) yield createNode.linestart
    yield * line
  }
}

function interpreter(hoganNodes: HoganParsedNode[], ofPartial: boolean, partialNames: Set<string>): IrisNonTemplateNode[] {
  return Array.from(lines(hoganNodes, ofPartial, partialNames))
}


function parseTemplate(template: string, ofPartial: boolean, partialNames: Set<string>): IrisNonTemplateNode[] {
  return interpreter(mustacheParser(template), ofPartial, partialNames)
}


export default function parse(template: string, partials: PartialTemplateStrings = {}): RootTemplateData {
  const partialNames = new Set(Object.keys(partials))
  const nodes = parseTemplate(template, false, partialNames)

  const partialTemplates = Object.keys(partials).map(name => ({
    nodes: parseTemplate(partials[name], true, partialNames),
    partialTemplate: { name },
    rootTemplate: null,
  }))

  return { nodes, partialTemplate: null, rootTemplate: { partialTemplates } }
}

