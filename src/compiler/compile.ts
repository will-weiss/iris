import templates from './templates'

export default (opts: IrisCompilerOpts) => (data: RootTemplateData): string =>
  templates.template.render({ ...data, ...opts }, templates)
