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

interface AnyIrisNode {
  text: null | string
  keys: null | string[]
  variable: null | { escaped: boolean }
  section: null | { inverted: boolean, nodes: IrisNode[] }
}

// type IrisNode =
//   (AnyIrisNode & { text: string }) |
//   (AnyIrisNode & { keys: string[], variable: { escaped: boolean } }) |
//   (AnyIrisNode & { keys: string[], section: { inverted: boolean, nodes: IrisNode[] } })


type IrisNode =
  { text: string } |
  { keys: string[], variable: { escaped: boolean } } |
  { keys: string[], section: { inverted: boolean, nodes: IrisNode[] } }

type DataToCompile = IrisNode[]
