import { expect } from 'chai'
import beautify = require('js-beautify')
import compiler from '../compiler'


describe('compiler', () => {

  it('compiles an AST to a templatized function', () => {
    const data = {
      data: 'data',
      cursor: 'cursor',
      context: 'context',
      nodes: [
        {
          text: '"text1"',
          keys: null,
          nodes: null,
        },
        {
          variable: {
            escaped: true,
          },
          keys: ['key1', 'key2'],
          nodes: null,
        },
        {
          keys: ['key3', 'key4'],
          nodes: [
            {
              text: '"text2"',
              keys: null,
              nodes: null,
            },
            {
              variable: {
                escaped: false,
              },
              keys: ['key5', 'key6'],
              nodes: null,
            },
            {
              variable: {
                escaped: false,
              },
              keys: ['key7', 'key8'],
              nodes: null,
            },
          ],
        }
      ]
    }

    expect(compiler(data)).to.equal(beautify(`
      function(data, partials) {
          var cursor;
          var context = data;
          var fragment = document.createDocumentFragment();

          fragment.appendChild(document.createTextNode("text1"));

          cursor = context;
          cursor = cursor && cursor["key1"];
          cursor = cursor && cursor["key2"];
          cursor = cursor == null ? "" : "" + cursor;
          cursor = cursor.replace("&", "&amp;").replace('"', "&quot;").replace("<", "&lt;").replace(">", "&gt;");
          fragment.appendChild(document.createTextNode(cursor));

          cursor = context;
          cursor = cursor && cursor["key3"];
          cursor = cursor && cursor["key4"];
          if (cursor) {
              (Array.isArray(cursor) ? cursor : [cursor]).forEach(function(data) {
                  var cursor;
                  var context = (typeof data === 'object' && data !== null && !Array.isArray(data)) ?
                      Object.assign(Object.create(this), data) :
                      this;

                  fragment.appendChild(document.createTextNode("text2"));

                  cursor = context;
                  cursor = cursor && cursor["key5"];
                  cursor = cursor && cursor["key6"];
                  cursor = cursor == null ? "" : "" + cursor;
                  fragment.appendChild(document.createTextNode(cursor));

                  cursor = context;
                  cursor = cursor && cursor["key7"];
                  cursor = cursor && cursor["key8"];
                  cursor = cursor == null ? "" : "" + cursor;
                  fragment.appendChild(document.createTextNode(cursor));

              }, context);
          }


          return fragment;
      }
    `))
  })
})
