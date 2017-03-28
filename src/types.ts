type Falsy = false | 0 | '' | null | undefined

interface HoganNode<Tag> { tag: Tag }
interface TaggedHoganNode<Tag> extends HoganNode<Tag> { n: string, otag: string, ctag: string, i: number }

type HoganNodeNewline  = HoganNode<'\n'>
type HoganNodeText     = HoganNode<'_t'> & { text: String }
type HoganNodeComment  = TaggedHoganNode<'!'>
type HoganNodeVariable = TaggedHoganNode<'&' | '{' | '_v'>
type HoganNodePartial  = TaggedHoganNode<'>'> & { indent: string }
type HoganNodeSection  = TaggedHoganNode<'#' | '^'> & { end: number, nodes: HoganParsedNode[] }

type HoganParsedNode =
  HoganNodeNewline | HoganNodeText | HoganNodeComment | HoganNodeVariable | HoganNodePartial | HoganNodeSection

type HTMLNode =
  { type: 'directive', raw: string, data: string } |
  { type: 'text', raw: string, data: string } |
  { type: 'tag', raw: string, data: string, name: string, children?: HTMLNode[], attribs?: { [name: string]: string } }

interface IrisAnyNode {
  linestart: false
  newline: false
  text: null
  partialRef: null
  variable: null
  section: null
  element: null
  partialTemplate: null
  rootTemplate: null
  path: null
  nodes: null
}

type IrisNewlineNode = {
  tag: 'newline'
  linestart: false
  newline: true
  text: null
  partialRef: null
  variable: null
  section: null
  element: null
  partialTemplate: null
  rootTemplate: null
  path: null
  nodes: null
}

type IrisLinestartNode = {
  tag: 'linestart'
  linestart: true
  newline: false
  text: null
  partialRef: null
  variable: null
  section: null
  element: null
  partialTemplate: null
  rootTemplate: null
  path: null
  nodes: null
}

type IrisTextNode = { 
  tag: 'text'
  linestart: false
  newline: false
  text: { raw: string, formatted: string }
  partialRef: null
  variable: null
  section: null
  element: null
  partialTemplate: null
  rootTemplate: null
  path: null
  nodes: null
}

type IrisPartialRefNode = { 
  tag: 'partialRef'
  linestart: false
  newline: false
  text: null
  partialRef: { name: string, indentation: string }
  variable: null
  section: null
  element: null
  partialTemplate: null
  rootTemplate: null
  path: null
  nodes: null
}

type IrisVariableNode = {
  tag: 'variable'
  linestart: false
  newline: false
  text: null
  partialRef: null
  variable: { unescaped: boolean }
  section: null
  element: null
  partialTemplate: null
  rootTemplate: null
  path: { raw: string, keys: string[] }
  nodes: null
}

type IrisSectionNode = { 
  tag: 'section'
  linestart: false
  newline: false
  text: null
  partialRef: null
  variable: null
  section: { inverted: boolean }
  element: null
  partialTemplate: null
  rootTemplate: null
  path: { raw: string, keys: string[] }
  nodes: IrisNode[]
}

type IrisElementNode = { 
  tag: 'element'
  linestart: false
  newline: false
  text: null
  partialRef: null
  variable: null
  section: null
  element: { tagName: string, attributes: any[] }
  partialTemplate: null
  rootTemplate: null
  path: null
  nodes: IrisNode[]
}

type IrisPartialTemplateNode = { 
  tag: 'partialTemplate'
  linestart: false
  newline: false
  text: null
  partialRef: null
  variable: null
  section: null
  element: null
  partialTemplate: { name: string }
  rootTemplate: null
  path: null
  nodes: IrisNode[]
}

type IrisRootTemplateNode = { 
  tag: 'rootTemplate'
  linestart: false
  newline: false
  text: null
  partialRef: null
  variable: null
  section: null
  element: null
  partialTemplate: null
  rootTemplate: { partialTemplates: IrisPartialTemplateNode[] }
  path: null
  nodes: IrisNode[]
}

type IrisNonTemplateNode =
  IrisNewlineNode | IrisLinestartNode | IrisTextNode | IrisPartialRefNode | IrisVariableNode | IrisSectionNode

type IrisTemplateNode =
  IrisPartialTemplateNode | IrisRootTemplateNode

type IrisNode =
  IrisNonTemplateNode | IrisTemplateNode | IrisElementNode

type TemplateString = string

interface PartialTemplateStrings {
  [name: string]: TemplateString
}