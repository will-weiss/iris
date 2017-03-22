type Falsy = false | 0 | '' | null | undefined

type HoganParsedNodes = {
  '#': { tag: '#', n: string, otag: string, ctag: string, i: number, end: number, nodes: HoganParsedNode[] }
  '^': { tag: '^', n: string, otag: string, ctag: string, i: number, end: number, nodes: HoganParsedNode[] }
  '$': { tag: '$', n: string, otag: string, ctag: string, i: number, end: number, nodes: HoganParsedNode[] }
  '<': { tag: '<', n: string, otag: string, ctag: string, i: number, end: number, nodes: HoganParsedNode[] }
  '>': { tag: '>', n: string, otag: string, ctag: string, i: number, end: number, nodes: HoganParsedNode[], indent: string }
  '_v': { tag: '_v', n: string, otag: string, ctag: string, i: number }
  '{': { tag: '{', n: string, otag: string, ctag: string, i: number }
  '&': { tag: '&', n: string, otag: string, ctag: string, i: number }
  '_t': { tag: '_t', text: String }
  '\n': { tag: '\n' }
  '!': { tag: '!', n: string, otag: string, ctag: string, i: number }
}

type HoganParsedNonCommentNode =
  HoganParsedNodes['#'] |
  HoganParsedNodes['^'] |
  HoganParsedNodes['$'] |
  HoganParsedNodes['<'] |
  HoganParsedNodes['>'] |
  HoganParsedNodes['_v'] |
  HoganParsedNodes['{'] |
  HoganParsedNodes['&'] |
  HoganParsedNodes['_t'] |
  HoganParsedNodes['\n']

type HoganParsedNode = HoganParsedNonCommentNode | HoganParsedNodes['!']

interface IrisAnyNode {
  linestart: boolean
  newline: boolean
  text: null | string
  partial: null | { name: string, indentation: string }
  variable: null | { escaped: boolean }
  section: null | { inverted: boolean, nodes: IrisNode[] }
  path: null | { keys: string[] }
}

type IrisNewlineNode = IrisAnyNode & { tag: 'newline'}
type IrisLinestartNode = IrisAnyNode & { tag: 'linestart', linestart: true }
type IrisTextNode = IrisAnyNode & { tag: 'text', text: string }
type IrisPartialNode = IrisAnyNode & { tag: 'partial', partial: { name: string, indentation: string } }
type IrisVariableNode = IrisAnyNode & { tag: 'variable', variable: { escaped: boolean }, path: { keys: string[] } }
type IrisSectionNode = IrisAnyNode & { tag: 'section', section: { inverted: boolean, nodes: IrisNode[] }, path: { keys: string[] } }

type IrisNode =
  IrisNewlineNode |
  IrisLinestartNode |
  IrisTextNode |
  IrisPartialNode |
  IrisVariableNode |
  IrisSectionNode

type IrisCompilerOpts = {
  initialResultExpr: string
  addToResultLeft: string
  addToResultRight: string
}
