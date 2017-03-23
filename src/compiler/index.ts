import templates from './templates'

export default (data: RootTemplateData): string =>
  templates.template.render(data, templates)
