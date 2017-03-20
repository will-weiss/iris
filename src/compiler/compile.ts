import templates from './templates'

export default (opts: IrisCompilerOpts) => (nodes: IrisNode[]): string => {
  const data = Object.setPrototypeOf({ nodes }, opts)
  return templates.function.render(data, templates)
}
