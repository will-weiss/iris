type HoganToken =
  { tag: '_t', text: string } |
  { tag: '!', n: string, otag: string, ctag: string, i: number } |
  { tag: '\n', last: boolean }
