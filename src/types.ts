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

interface IrisAnyNode {
  linestart: boolean
  newline: boolean
  text: null | string
  partialRef: null | { name: string, indentation: string }
  variable: null | { escaped: boolean }
  section: null | { inverted: boolean }
  partialTemplate: null | { name: string }
  rootTemplate: null | { partialTemplates: IrisPartialTemplateNode[] }
  path: null | { keys: string[] }
  nodes: null | IrisNonTemplateNode[]
}

type IrisNewlineNode = IrisAnyNode & { tag: 'newline', newline: true }
type IrisLinestartNode = IrisAnyNode & { tag: 'linestart', linestart: true }
type IrisTextNode = IrisAnyNode & { tag: 'text', text: string }
type IrisPartialRefNode = IrisAnyNode & { tag: 'partialRef', partialRef: { name: string, indentation: string } }
type IrisVariableNode = IrisAnyNode & { tag: 'variable', variable: { escaped: boolean }, path: { keys: string[] } }
type IrisSectionNode = IrisAnyNode & { tag: 'section', section: { inverted: boolean }, path: { keys: string[] }, nodes: IrisNode[] }
type IrisPartialTemplateNode = IrisAnyNode & { tag: 'partialTemplate', partialTemplate: { name: string }, nodes: IrisNode[] }
type IrisRootTemplateNode = IrisAnyNode & { tag: 'rootTemplate', rootTemplate: { partialTemplates: IrisPartialTemplateNode[] }, nodes: IrisNonTemplateNode[] }

type IrisNonTemplateNode =
  IrisNewlineNode | IrisLinestartNode | IrisTextNode | IrisPartialRefNode | IrisVariableNode | IrisSectionNode

type IrisTemplateNode =
  IrisPartialTemplateNode | IrisRootTemplateNode

type IrisNode =
  IrisNonTemplateNode | IrisTemplateNode

type RootTemplateData = {
  nodes: IrisNode[]
  partialTemplate: null
  rootTemplate: {
    partialTemplates: PartialTemplateData[]
  }
}

type PartialTemplateData = {
  nodes: IrisNode[]
  partialTemplate: { name: string }
  rootTemplate: null
}

type TemplateData = RootTemplateData | PartialTemplateData

type TemplateString = string

interface PartialTemplateStrings {
  [name: string]: TemplateString
}