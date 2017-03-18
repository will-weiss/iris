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


type TextIrisNode = {
  tag: 'text'
  text: string
}

type VariableIrisNode = {
  tag: 'variable'
  keys: string[]
  escaped: boolean
}

type SectionIrisNode = {
  tag: 'section'
  keys: string[]
  inverted: boolean
  children: IrisNode[]
}

type TerminatingNode = {
  tag: null
}


type IrisNode = TextIrisNode | VariableIrisNode | SectionIrisNode

type CompilableNode =
  { text: string, path: null, nodes: null } |
  { variable: { escaped: boolean }, path: { key: string }[], nodes: null } |
  { path: { key: string }[], nodes: CompilableNode[] }

type DataToCompile = {
  cursor: string
  context: string
  nodes: CompilableNode[]
}
