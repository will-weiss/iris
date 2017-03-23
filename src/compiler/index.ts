import templates from './templates'

export default (data: IrisRootTemplateNode): string =>
  templates.template.render(data, templates)
