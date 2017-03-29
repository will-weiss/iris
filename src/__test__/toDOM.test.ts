import { expect } from 'chai'
import { jsdom } from 'jsdom'
import { Script } from 'vm'
import { irisToDOM } from '../index'


interface ToDOMTestCase {
  description: string
  template: string
  data: any
  validateDocument(document: Document): void
}

const testCases: ToDOMTestCase[] = [
  {
    description: 'allows event handlers to be attached',
    template: `<h3>Hello {{name}}!</h3><button onclick={{handleClick}}>Click Me!</button>`,
    data: {
      name: 'Jimbo',
      handleClick() {
        this.innerHTML = 'Clicked!'
      }
    },
    validateDocument(document) {
      expect(document.body).to.have.property('innerHTML', `<h3>Hello Jimbo!</h3><button>Click Me!</button>`)
      document.querySelector('button')!.click()
      expect(document.body).to.have.property('innerHTML', `<h3>Hello Jimbo!</h3><button>Clicked!</button>`)
    },
  },
  {
    description: 'does not coerce attributes that are not enquoted in the template',
    template: `<input type="number" value={{value}}>`,
    data: {
      value: 5
    },
    validateDocument(document) {
      expect(document.querySelector('input')!.getAttribute('value')).to.equal(5)
    },
  },
  {
    description: 'converts attributes that are enquoted in the template to strings',
    template: `<input value="{{value}}">`,
    data: {
      value: 5
    },
    validateDocument(document) {
      expect(document.querySelector('input')!.getAttribute('value')).to.equal("5")
    },
  },
  {
    description: 'handles attributes defined in sections that should be rendered',
    template: `<p {{#hide}}style="display: none;"{{/hide}}>Should be hidden!</p>`,
    data: {
      hide: true
    },
    validateDocument(document) {
      expect(document.body).to.have.property('innerHTML', `<p style="display: none;">Should be hidden!</p>`)
    },
  },
  {
    description: 'handles attributes defined in sections that should not be rendered',
    template: `<p {{#hide}}style="display: none;"{{/hide}}>Should be displayed!</p>`,
    data: {
      hide: false
    },
    validateDocument(document) {
      expect(document.body).to.have.property('innerHTML', `<p>Should be displayed!</p>`)
    },
  },
  {
    description: 'handles variable attributes defined in sections that should be rendered',
    template: `<p {{#attrs}}{{.}}{{/attrs}}>Should have dynamic attrs!</p>`,
    data: {
      attrs: ['selected', 'disabled']
    },
    validateDocument(document) {
      expect(document.body).to.have.property('innerHTML', `<p selected disabled>Should have dynamic attrs!</p>`)
    },
  },
  {
    description: 'handles variable attributes defined in sections that should be rendered',
    template: `<p {{#attrs}}{{.}}{{/attrs}}>Should not have dynamic attrs!</p>`,
    data: {
      attrs: null
    },
    validateDocument(document) {
      expect(document.body).to.have.property('innerHTML', `<p>Should not have dynamic attrs!</p>`)
    },
  },
]


function runToDOMTest({ description, template, data, validateDocument }: ToDOMTestCase) {
  it(description, () => {
    const { document } = jsdom('<html><body></body></html>').defaultView

    const scriptCode = `document.body.appendChild((${irisToDOM(template)})(data))`
    const script = new Script(scriptCode)
    const context: any = { document, data }

    script.runInNewContext(context)

    validateDocument(document)
  })
}


describe('toDOM', () => testCases.forEach(runToDOMTest))
