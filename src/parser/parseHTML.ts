const htmlparser = require('htmlparser')


export default function parseHTML(html: string): HTMLNode[] {
  const handler = new htmlparser.DefaultHandler()
  const parser = new htmlparser.Parser(handler)
  parser.parseComplete(html)
  return handler.dom
}
