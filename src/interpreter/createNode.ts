const irisNodeProto = {
  linestart: false,
  newline: false,
  text: null, 
  partial: null, 
  path: null,
  variable: null, 
  section: null,
}

export function text(text: string): IrisTextNode {
  return { ...irisNodeProto, tag: 'text', text }
}

export function partial(name: string, exists: boolean, indentation: string): IrisPartialNode {
  return { ...irisNodeProto, tag: 'partial', partial: { name, exists, indentation } }
}

export function section(keys: string[], inverted: boolean, nodes: IrisNode[]): IrisSectionNode {
  return { ...irisNodeProto, tag: 'section', path: { keys }, section: { inverted, nodes } }
}

export function variable(keys: string[], escaped: boolean): IrisVariableNode {
  return { ...irisNodeProto, tag: 'variable', path: { keys }, variable: { escaped } }
}

export const linestart: IrisLinestartNode = { ...irisNodeProto, tag: 'linestart', linestart: true }

export const newline: IrisNewlineNode = { ...irisNodeProto, tag: 'newline', newline: true }
