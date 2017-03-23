const Hogan = require('hogan.js')
import * as createNode from './createNode'
import { map, compact, split, flatten } from '../generators'


function mustacheParser(template: string): HoganParsedNode[] {
  return Hogan.parse(Hogan.scan(template))
}

const keys = (str: string) => str === '.' ? [] : str.split('.')


const fromHogan = (ofPartial: boolean, partialNames: Set<string>) => (node: HoganParsedNode): IrisNode | undefined => {
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


function* lines(hoganNodes: HoganParsedNode[], ofPartial: boolean, partialNames: Set<string>): IterableIterator<IrisNode> {
  const line: IrisNode[] = []

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

function interpreter(hoganNodes: HoganParsedNode[], ofPartial: boolean, partialNames: Set<string>): IrisNode[] {
  return Array.from(lines(hoganNodes, ofPartial, partialNames))
}


function parseTemplate(template: string, ofPartial: boolean, partialNames: Set<string>): IrisNode[] {
  return interpreter(mustacheParser(template), ofPartial, partialNames)
}


export default function parse(template: string, partials: PartialTemplateStrings = {}): RootTemplateData {
  const partialNames = new Set(Object.keys(partials))
  const nodes = parseTemplate(template, false, partialNames)

  const parsedPartials = Object.keys(partials).map(name => ({
    nodes: parseTemplate(partials[name], true, partialNames),
    ofPartial: { name },
    partials: null,
  }))

  return { nodes, ofPartial: null, partials: parsedPartials }
}

