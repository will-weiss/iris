const Hogan = require('hogan.js')

const seen = new Set()


function variableText(token: HoganTokenVariable | HoganTokenAmpersand | HoganTokenBrace): string {
  const keys = token.n.split('.').map(key => JSON.stringify(key))

  const { expr } = keys.reduce((current, key) => {
    const cursor = `${current.cursor}[${key}]`
    const expr = `${current.expr} && ${cursor}`
    return { cursor, expr }
  }, { cursor: 'data', expr: 'data' })

  return `((${expr}) == null ? "" : (${expr}))`
}

function sectionText(token: HoganTokenSection): string {
  return ''
}

function invertedSectionText(token: HoganTokenInverted): string {
  return ''
}

function* texts(tokens: HoganToken[]): IterableIterator<string> {
  for (const token of tokens) {
    switch (token.tag) {
      case '_t': {
        yield JSON.stringify(String(token.text))
        break
      }
      case '\n': {
        yield JSON.stringify("\n")
        break
      }
      case '_v': {
        yield variableText(token)
        break
      }
      case '&': {
        yield variableText(token)
        break
      }
      case '{': {
        yield variableText(token)
        break
      }
      case '#': {
        yield sectionText(token)
        break
      }
      case '^': {
        yield invertedSectionText(token)
        break
      }
    }
  }
}

function templateBody(tokens: HoganToken[]): string {
  return `
    return document.createTextNode("" + ${Array.from(texts(tokens)).join(' + ')});
  `
}


export default function iris(template: string) {
  const tokens: HoganToken[] = Hogan.parse(Hogan.scan(template))

  return `
    function(data, partials) {
      ${templateBody(tokens)}
    }
  `
}
