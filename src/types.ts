type HoganTokenText = { tag: '_t', text: string }
type HoganTokenComment = { tag: '!', n: string, otag: string, ctag: string, i: number }
type HoganTokenNewline = { tag: '\n', last: boolean }
type HoganTokenVariable = { tag: '_v', n: string, otag: string, ctag: string, i: number }
type HoganTokenBrace = { tag: '{', n: string, otag: string, ctag: string, i: number }
type HoganTokenAmpersand = { tag: '&', n: string, otag: string, ctag: string, i: number }
type HoganTokenSection = { tag: '#', n: string, otag: string, ctag: string, i: number, end: number, nodes: HoganToken[] }
type HoganTokenInverted = { tag: '^' }

type HoganToken =
  HoganTokenText |
  HoganTokenComment |
  HoganTokenNewline |
  HoganTokenVariable |
  HoganTokenBrace |
  HoganTokenAmpersand |
  HoganTokenSection |
  HoganTokenInverted
