import templates from './templates'

export default (opts: IrisCompilerOpts) => (nodes: IrisNode[], partials: any): string => {
  const data = Object.setPrototypeOf({ nodes, partials }, opts)
  return templates.template.render(data, templates)
}
