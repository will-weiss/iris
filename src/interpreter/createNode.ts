const irisNodeProto = { tag: null, linestart: null, text: null, partial: null, keys: null, variable: null, section: null }

const textNodeProto = Object.setPrototypeOf({ tag: 'text' }, irisNodeProto)
const partialNodeProto = Object.setPrototypeOf({ tag: 'partial' }, irisNodeProto)
const variableNodeProto = Object.setPrototypeOf({ tag: 'variable' }, irisNodeProto)
const sectionNodeProto = Object.setPrototypeOf({ tag: 'section' }, irisNodeProto)


export function text(text: string): IrisTextNode {
  return Object.setPrototypeOf({ text }, textNodeProto)
}

export function partial(name: string, indentation: string): IrisPartialNode {
  return Object.setPrototypeOf({ partial: { name, indentation } }, partialNodeProto)
}

export function section(keys: string[], inverted: boolean, nodes: IrisNode[]): IrisSectionNode {
  return Object.setPrototypeOf({ keys, section: { inverted, nodes } }, variableNodeProto)
}

export function variable(keys: string[], escaped: boolean): IrisVariableNode {
  return Object.setPrototypeOf({ keys, variable: { escaped } }, sectionNodeProto)
}

export const linestart: IrisLinestartNode = Object.setPrototypeOf({ tag: 'linestart', linestart: true }, irisNodeProto)

export const newline: IrisNewlineNode = Object.setPrototypeOf({ tag: 'newline' }, irisNodeProto)
