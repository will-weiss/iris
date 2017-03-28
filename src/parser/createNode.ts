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

export function text(raw: string): IrisTextNode {
  return { ...irisNodeProto, tag: 'text', text: { raw, formatted: JSON.stringify(raw) } }
}

export function partialRef(name: string, indentation: string): IrisPartialRefNode {
  return { ...irisNodeProto, tag: 'partialRef', partialRef: { name, indentation } }
}

export function variable(keys: string[], escaped: boolean): IrisVariableNode {
  return { ...irisNodeProto, tag: 'variable', path: { keys }, variable: { escaped } }
}

export function section(keys: string[], inverted: boolean, nodes: IrisNode[]): IrisSectionNode {
  return { ...irisNodeProto, tag: 'section', path: { keys }, section: { inverted }, nodes }
}

export function element(tagName: string, attribs: any[], nodes: IrisNode[]): IrisElementNode {
  return { ...irisNodeProto, tag: 'element', element: { tagName, attribs }, nodes }
}

export function partialTemplate(name: string, nodes: IrisNode[]): IrisPartialTemplateNode {
  return { ...irisNodeProto, tag: 'partialTemplate', partialTemplate: { name }, nodes }
}

export function rootTemplate(partialTemplates: IrisPartialTemplateNode[], nodes: IrisNode[]): IrisRootTemplateNode {
  return { ...irisNodeProto, tag: 'rootTemplate', rootTemplate: { partialTemplates }, nodes }
}