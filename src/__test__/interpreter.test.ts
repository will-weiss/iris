import { expect } from 'chai'
import interpreter from '../interpreter'


describe('interpreter', () => {

  it('interprets nodes correctly', () => {
    const hoganTokens: HoganParsedNode[] =
      [ { tag: '_t', text: new String('x') },
        { tag: '\n' },
        { tag: '_v', n: 'person.name', otag: '{{', ctag: '}}', i: 16 },
        { tag: '_t', text: new String('y') },
        { tag: '\n' },
        { tag: '#',
          n: 'person',
          otag: '{{',
          ctag: '}}',
          i: 33,
          end: 41,
          nodes: [ { tag: '_v', n: 'name', otag: '{{', ctag: '}}', i: 16 } ] },
        { tag: '_t', text: new String('z') } ]

    const interpreted = interpreter(hoganTokens)

    const expected: IrisNode[] = [
      {
        tag: 'linestart',
        linestart: true,
        newline: false,
        text: null,
        partial: null,
        variable: null,
        section: null,
        path: null,
      },
      {
        tag: 'text',
        linestart: false,
        newline: false,
        text: '"x"',
        partial: null,
        variable: null,
        section: null,
        path: null,
      },
      {
        tag: 'newline',
        linestart: false,
        newline: true,
        text: null,
        partial: null,
        variable: null,
        section: null,
        path: null,
      },
      {
        tag: 'linestart',
        linestart: true,
        newline: false,
        text: null,
        partial: null,
        variable: null,
        section: null,
        path: null,
      },
      {
        tag: 'variable',
        linestart: false,
        newline: false,
        text: null,
        partial: null,
        variable: {
          escaped: true
        },
        section: null,
        path: {
          keys: ['person', 'name']
        },
      },
      {
        tag: 'text',
        linestart: false,
        newline: false,
        text: '"y"',
        partial: null,
        variable: null,
        section: null,
        path: null,
      },
      {
        tag: 'newline',
        linestart: false,
        newline: true,
        text: null,
        partial: null,
        variable: null,
        section: null,
        path: null,
      },
      {
        tag: 'linestart',
        linestart: true,
        newline: false,
        text: null,
        partial: null,
        variable: null,
        section: null,
        path: null,
      },
      {
        tag: 'section',
        linestart: false,
        newline: false,
        text: null,
        partial: null,
        variable: null,
        section: {
          inverted: false,
          nodes: [
            {
              tag: 'linestart',
              linestart: true,
              newline: false,
              text: null,
              partial: null,
              variable: null,
              section: null,
              path: null,
            },
            {
              tag: 'variable',
              linestart: false,
              newline: false,
              text: null,
              partial: null,
              variable: {
                escaped: true
              },
              section: null,
              path: {
                keys: ['name']
              },
            },
          ]
        },
        path: {
          keys: ['person']
        },
      },
      {
        tag: 'text',
        linestart: false,
        newline: false,
        text: '"z"',
        partial: null,
        variable: null,
        section: null,
        path: null,
      },
    ]



    expect(interpreted).to.deep.equal(expected)
  })
})
