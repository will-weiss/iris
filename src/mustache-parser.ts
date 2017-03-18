const Hogan = require('hogan.js')


export default function mustacheParser(template: string): HoganParsedNode[] {
  return Hogan.parse(Hogan.scan(template))
}
