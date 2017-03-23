import { expect } from 'chai'
import { jsdom } from 'jsdom'
import { Script } from 'vm'
import beautify = require('js-beautify')
import parse, { parseDOM, formHTML } from '../parser'
import parseHTML from '../parser/parseHTML'
import parseTemplate from '../parser/parseTemplate'
import { toDOM } from '../compiler'
import { irisToDOM, irisToString } from '../index'


describe.only('toDOM', () => {

  const nodes = {
    "linestart": false,
    "newline": false,
    "text": null,
    "partialRef": null,
    "variable": null,
    "section": null,
    "partialTemplate": null,
    "element": null,
    "rootTemplate": {
      "partialTemplates": []
    },
    "path": null,
    "nodes": [
      {
        "linestart": false,
        "newline": false,
        "text": null,
        "partialRef": null,
        "variable": null,
        "section": null,
        "partialTemplate": null,
        "element": {
          "tagName": "ul"
        },
        "rootTemplate": null,
        "path": null,
        "nodes": [
          {
            "linestart": false,
            "newline": false,
            "text": null,
            "partialRef": null,
            "variable": null,
            "section": {
              "inverted": false
            },
            "partialTemplate": null,
            "element": null,
            "rootTemplate": null,
            "path": {
              "keys": [
                "items"
              ]
            },
            "nodes": [
              {
                "linestart": false,
                "newline": false,
                "text": "\"          <li>\"",
                "partialRef": null,
                "variable": null,
                "section": null,
                "partialTemplate": null,
                "element": null,
                "rootTemplate": null,
                "path": null,
                "nodes": null,
                "tag": "text"
              },
              {
                "linestart": false,
                "newline": true,
                "text": null,
                "partialRef": null,
                "variable": null,
                "section": null,
                "partialTemplate": null,
                "element": null,
                "rootTemplate": null,
                "path": null,
                "nodes": null,
                "tag": "newline"
              },
              {
                "linestart": false,
                "newline": false,
                "text": "\"            <h3 class=\"",
                "partialRef": null,
                "variable": null,
                "section": null,
                "partialTemplate": null,
                "element": null,
                "rootTemplate": null,
                "path": null,
                "nodes": null,
                "tag": "text"
              },
              {
                "linestart": false,
                "newline": false,
                "text": null,
                "partialRef": null,
                "variable": {
                  "escaped": true
                },
                "section": null,
                "partialTemplate": null,
                "element": null,
                "rootTemplate": null,
                "path": {
                  "keys": [
                    "class"
                  ]
                },
                "nodes": null,
                "tag": "variable"
              },
              {
                "linestart": false,
                "newline": false,
                "text": "\">\"",
                "partialRef": null,
                "variable": null,
                "section": null,
                "partialTemplate": null,
                "element": null,
                "rootTemplate": null,
                "path": null,
                "nodes": null,
                "tag": "text"
              },
              {
                "linestart": false,
                "newline": false,
                "text": null,
                "partialRef": null,
                "variable": {
                  "escaped": true
                },
                "section": null,
                "partialTemplate": null,
                "element": null,
                "rootTemplate": null,
                "path": {
                  "keys": [
                    "text"
                  ]
                },
                "nodes": null,
                "tag": "variable"
              },
              {
                "linestart": false,
                "newline": false,
                "text": "\"</h3>\"",
                "partialRef": null,
                "variable": null,
                "section": null,
                "partialTemplate": null,
                "element": null,
                "rootTemplate": null,
                "path": null,
                "nodes": null,
                "tag": "text"
              },
              {
                "linestart": false,
                "newline": true,
                "text": null,
                "partialRef": null,
                "variable": null,
                "section": null,
                "partialTemplate": null,
                "element": null,
                "rootTemplate": null,
                "path": null,
                "nodes": null,
                "tag": "newline"
              },
              {
                "linestart": false,
                "newline": false,
                "text": "\"            <button>Click Me!</button>\"",
                "partialRef": null,
                "variable": null,
                "section": null,
                "partialTemplate": null,
                "element": null,
                "rootTemplate": null,
                "path": null,
                "nodes": null,
                "tag": "text"
              },
              {
                "linestart": false,
                "newline": true,
                "text": null,
                "partialRef": null,
                "variable": null,
                "section": null,
                "partialTemplate": null,
                "element": null,
                "rootTemplate": null,
                "path": null,
                "nodes": null,
                "tag": "newline"
              },
              {
                "linestart": false,
                "newline": false,
                "text": "\"          </li>\"",
                "partialRef": null,
                "variable": null,
                "section": null,
                "partialTemplate": null,
                "element": null,
                "rootTemplate": null,
                "path": null,
                "nodes": null,
                "tag": "text"
              },
              {
                "linestart": false,
                "newline": true,
                "text": null,
                "partialRef": null,
                "variable": null,
                "section": null,
                "partialTemplate": null,
                "element": null,
                "rootTemplate": null,
                "path": null,
                "nodes": null,
                "tag": "newline"
              }
            ],
            "tag": "section"
          }
        ],
        "tag": "element"
      }
    ],
    "tag": "rootTemplate"
  }

  it('works', async () => {
    const template =
      `<ul>{{#items}}<li><h3>{{text}}</h3><button>Click Me!</button></li>{{/items}}</ul>`

    const expected =
      `<ul><iris id="0"><li><h3><iris id="1"></h3><button>Click Me!</button></li></iris></ul>`

    expect(formHTML(template)).to.equal(expected)

    // console.log(parseHTML(template)[0])
    // console.log(parseTemplate(template, false, new Set()))


    // console.log(`
    //   var template = ${beautify(toDOM(nodes as any), { preserve_newlines: false })};
    //   var data = { items: [{ text: 'Hello', 'class': 'Whatevs' }] };
    //   document.body.appendChild(template(data));
    // `)

    // console.log(parseHTML('12345 <'))
    // console.log(handler.dom[1].children[1])
    // console.log(handler.dom[1].children[3])

    // const data = {
    //   text: 'In the header!'
    // }

    // const templatizedFunction = (new Function(`return `))()
    // const { document } = jsdom('<html><body></body></html>').defaultView
    // const script = new Script(`document.body.appendChild((${irisToDOM(template)})(data))`)
    // const context: any = { document, data }
    // script.runInNewContext(context)

    // expect(document.body.innerHTML.trim()).to.equal('<div><h3>In the header!</h3><button>Click Me!</button></div>')
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