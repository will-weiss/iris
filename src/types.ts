type Falsy = false | 0 | '' | null | undefined

type HoganParsedNodes = {
  '#': { tag: '#', n: string, otag: string, ctag: string, i: number, end: number, nodes: HoganParsedNode[] }
  '^': { tag: '^', n: string, otag: string, ctag: string, i: number, end: number, nodes: HoganParsedNode[] }
  '$': { tag: '$', n: string, otag: string, ctag: string, i: number, end: number, nodes: HoganParsedNode[] }
  '<': { tag: '<', n: string, otag: string, ctag: string, i: number, end: number, nodes: HoganParsedNode[] }
  '>': { tag: '>', n: string, otag: string, ctag: string, i: number, end: number, nodes: HoganParsedNode[] }
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
  tag: null | 'text' | 'partial' | 'variable' | 'section'
  text: null | string
  partial: null | string
  keys: null | string[]
  variable: null | { escaped: boolean }
  section: null | { inverted: boolean, nodes: IrisNode[] }
}

type IrisTextNode = IrisAnyNode & { tag: 'text', text: string }
type IrisPartialNode = IrisAnyNode & { tag: 'partial', partial: string }
type IrisVariableNode = IrisAnyNode & { tag: 'variable', variable: { escaped: boolean } }
type IrisSectionNode = IrisAnyNode & { tag: 'section', section: { inverted: boolean, nodes: IrisNode[] } }

type IrisNode =
  IrisTextNode |
  IrisPartialNode |
  IrisVariableNode |
  IrisSectionNode

type DataToCompile = IrisNode[]
