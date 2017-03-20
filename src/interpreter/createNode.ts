const setProto = Object.setPrototypeOf

const irisNodeProto = { tag: null, text: null, partial: null, keys: null, variable: null, section: null }
const textNodeProto = setProto({ tag: 'text' }, irisNodeProto)
const partialNodeProto = setProto({ tag: 'partial' }, irisNodeProto)
const variableNodeProto = setProto({ tag: 'variable' }, irisNodeProto)
const sectionNodeProto = setProto({ tag: 'section' }, irisNodeProto)


export function text(text: string): IrisTextNode {
  return setProto({ text }, textNodeProto)
}

export function partial(partial: string): IrisPartialNode {
  return setProto({ partial }, partialNodeProto)
}

export function section(keys: string[], inverted: boolean, nodes: IrisNode[]): IrisSectionNode {
  return setProto({ keys, section: { inverted, nodes } }, variableNodeProto)
}

export function variable(keys: string[], escaped: boolean): IrisVariableNode {
  return setProto({ keys, variable: { escaped } }, sectionNodeProto)
}
