import { expect } from 'chai'
import { jsdom } from 'jsdom'
import { Script } from 'vm'
import { irisToDOM } from '../index'




describe.only('toDOM', () => {
  it('works', () => {
    const { document } = jsdom('<html><body></body></html>').defaultView

    const template = `<h3>Hello {{name}}!</h3><button onclick={{handleClick}}>Click Me!</button>`

    const data = {
      name: 'Jimbo',
      handleClick() {
        this.innerHTML = 'Clicked!'
      }
    }

    const scriptCode = `document.body.appendChild((${irisToDOM(template)})(data))`
    const script = new Script(scriptCode)
    const context: any = { document, data }

    script.runInNewContext(context)

    expect(document.body).to.have.property('innerHTML', `<h3>Hello Jimbo!</h3><button>Click Me!</button>`)

    document.querySelector('button')!.click()

    expect(document.body).to.have.property('innerHTML', `<h3>Hello Jimbo!</h3><button>Clicked!</button>`)
  })
})
