import { expect } from 'chai'
import { jsdom } from 'jsdom'
import { Script } from 'vm'
import { irisToDOM, irisToString } from '../index'
const htmlparser = require('htmlparser')


describe('toDOM', () => {
  it('works', async () => {

    const template = `
      <div>
        <h3>{{text}}</h3>
        <button>
          Click Me!
        </button>
      </div>
    `

    const data = {
      text: 'In the header!'
    }

    // const templatizedFunction = (new Function(`return `))()
    const { document } = jsdom('<html><body></body></html>').defaultView
    const script = new Script(`document.body.appendChild((${irisToDOM(template)})(data))`)
    const context: any = { document, data }
    script.runInNewContext(context)

    expect(document.body.innerHTML.trim()).to.equal('<div><h3>In the header!</h3><button>Click Me!</button></div>')
  })

  it.skip('really works', async () => {

    const template = `
      <div>
        <h3>{{text}}</h3>
        <button onclick={{handleClick}}>
          Click Me!
        </button>
      </div>
    `

    const data = {
      text: 'In the header!',
      handleClick() {
        document.body.innerHTML = 'Replaced because of click!'
      }
    }

    const templatizedFunction = (new Function(`return ${irisToDOM(template)}`))()
    const { document } = jsdom('<html><body></body></html>').defaultView
    const script = new Script(`document.body.appendChild(templatizedFunction(data))`)
    const context: any = { document, data, templatizedFunction }
    script.runInNewContext(context)

    expect(document.body.innerHTML.trim()).to.equal('<div><h3>In the header!</h3><button>Click Me!</button></div>')
  })
})