const irisNodeProto = {
  linestart: false as false,
  newline: false as false,
  text: null, 
  partialRef: null,
  variable: null,
  section: null,
  element: null,
  partialTemplate: null,
  rootTemplate: null,
  path: null,
  nodes: null,
}

export const linestart: IrisLinestartNode = { ...irisNodeProto, tag: 'linestart', linestart: true }

export const newline: IrisNewlineNode = { ...irisNodeProto, tag: 'newline', newline: true }

export function text(text: string): IrisTextNode {
  return { ...irisNodeProto, tag: 'text', text }
}

export function partialRef(name: string, indentation: string): IrisPartialRefNode {
  return { ...irisNodeProto, tag: 'partialRef', partialRef: { name, indentation } }
}

export function variable(keys: string[], escaped: boolean): IrisVariableNode {
  return { ...irisNodeProto, tag: 'variable', path: { keys }, variable: { escaped } }
}

export function section(keys: string[], inverted: boolean, nodes: IrisNonTemplateNode[]): IrisSectionNode {
  return { ...irisNodeProto, tag: 'section', path: { keys }, section: { inverted }, nodes }
}

export function element(tagName: string, nodes: IrisNonTemplateNode[]): IrisElementNode {
  return { ...irisNodeProto, tag: 'element', element: { tagName }, nodes }
}

export function partialTemplate(name: string, nodes: IrisNonTemplateNode[]): IrisPartialTemplateNode {
  return { ...irisNodeProto, tag: 'partialTemplate', partialTemplate: { name }, nodes }
}

export function rootTemplate(partialTemplates: IrisPartialTemplateNode[], nodes: IrisNonTemplateNode[]): IrisRootTemplateNode {
  return { ...irisNodeProto, tag: 'rootTemplate', rootTemplate: { partialTemplates }, nodes }
}