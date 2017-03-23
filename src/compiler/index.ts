import templates from './templates'

export default (data: IrisRootTemplateNode): string =>
  templates.template.render(data, templates)

export const toDOM = (data: IrisRootTemplateNode): string =>
  templates.templateHTML.render(data, templates)
