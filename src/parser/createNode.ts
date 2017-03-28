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


function keys(path: string) {
  return path === '.' ? [] : path.split('.')
}

export const linestart: IrisLinestartNode = { ...irisNodeProto, tag: 'linestart', linestart: true }

export const newline: IrisNewlineNode = { ...irisNodeProto, tag: 'newline', newline: true }

export function text({ raw }: { raw: string }): IrisTextNode {
  return { ...irisNodeProto, tag: 'text', text: { raw, formatted: JSON.stringify(raw) } }
}

export function partialRef({ name, indentation = '' }: { name: string, indentation?: string }): IrisPartialRefNode {
  return { ...irisNodeProto, tag: 'partialRef', partialRef: { name, indentation } }
}

export function variable({ path, unescaped = false }: { path: string, unescaped?: boolean }): IrisVariableNode {
  return { ...irisNodeProto, tag: 'variable', path: { raw: path, keys: keys(path) }, variable: { unescaped } }
}

export function section({ path, nodes = [], inverted = false }: { path: string, nodes?: IrisNode[], inverted?: boolean }): IrisSectionNode {
  return { ...irisNodeProto, tag: 'section', path: { raw: path, keys: keys(path) }, section: { inverted }, nodes }
}

export function element({ tagName, nodes = [], attributes = [] }: { tagName: string, attributes?: any[], nodes?: IrisNode[] }): IrisElementNode {
  return { ...irisNodeProto, tag: 'element', element: { tagName, attributes }, nodes }
}

export function partialTemplate({ name, nodes = [] }: { name: string, nodes?: IrisNode[] }): IrisPartialTemplateNode {
  return { ...irisNodeProto, tag: 'partialTemplate', partialTemplate: { name }, nodes }
}

export function rootTemplate({ nodes = [], partialTemplates = [] }: { nodes?: IrisNode[], partialTemplates?: IrisPartialTemplateNode[], }): IrisRootTemplateNode {
  return { ...irisNodeProto, tag: 'rootTemplate', nodes, rootTemplate: { partialTemplates } }
}