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
  children: null,
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

export function section({ path, children = [], inverted = false }: { path: string, children?: IrisNode[], inverted?: boolean }): IrisSectionNode {
  return { ...irisNodeProto, tag: 'section', path: { raw: path, keys: keys(path) }, section: { inverted }, children }
}

export function element({ tagName, children = [], attributes = [] }: { tagName: string, attributes?: any[], children?: IrisNode[] }): IrisElementNode {
  return { ...irisNodeProto, tag: 'element', element: { tagName, attributes }, children }
}

export function partialTemplate({ name, children = [] }: { name: string, children?: IrisNode[] }): IrisPartialTemplateNode {
  return { ...irisNodeProto, tag: 'partialTemplate', partialTemplate: { name }, children }
}

export function rootTemplate({ children = [], partialTemplates = [] }: { children?: IrisNode[], partialTemplates?: IrisPartialTemplateNode[], }): IrisRootTemplateNode {
  return { ...irisNodeProto, tag: 'rootTemplate', children, rootTemplate: { partialTemplates } }
}