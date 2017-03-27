import * as createNode from './createNode'
import parseTemplate, { hoganNodesOf } from './parseTemplate'
import parseHTML from './parseHTML'


export function parseDOM(template: string, partials: PartialTemplateStrings = {}): IrisRootTemplateNode {
  const partialNames = new Set(Object.keys(partials))

  const partialTemplates = Object.keys(partials).map(name =>
    createNode.partialTemplate(name, parseTemplate(partials[name], true, partialNames)))

  const rootTemplate = createNode.rootTemplate(partialTemplates, parseTemplate(template, false, partialNames))

  return rootTemplate
}

export function parseString(template: string, partials: PartialTemplateStrings = {}): IrisRootTemplateNode {
  const partialNames = new Set(Object.keys(partials))

  const partialTemplates = Object.keys(partials).map(name =>
    createNode.partialTemplate(name, parseTemplate(partials[name], true, partialNames)))

  return createNode.rootTemplate(partialTemplates, parseTemplate(template, false, partialNames))
}