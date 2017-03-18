const Hogan = require('hogan.js')


export default function iris(template: string) {

  const tokens: HoganToken[] = Hogan.parse(Hogan.scan(template))

  const text = tokens.reduce((text, token) => {
    switch (token.tag) {
      case '_t': {
        return text + String(token.text)
      }
      case '\n': {
        return text + '\n'
      }
      case '!': {
        return text
      }
      default: {
        return text
      }
    }
  }, '')

  return `
    function(data, partials) {
      return document.createTextNode(${JSON.stringify(text)})
    }
  `
}
