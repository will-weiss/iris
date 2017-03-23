import * as createNode from './createNode'
import parseTemplate from './parseTemplate'


export default function parse(template: string, partials: PartialTemplateStrings = {}): IrisRootTemplateNode {
  const partialNames = new Set(Object.keys(partials))

  const partialTemplates = Object.keys(partials).map(name =>
    createNode.partialTemplate(name, parseTemplate(partials[name], true, partialNames)))

  return createNode.rootTemplate(partialTemplates, parseTemplate(template, false, partialNames))
}

