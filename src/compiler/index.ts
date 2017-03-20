import * as opts from './opts'
import compile from './compile'


export const compileToDOM = compile(opts.asDOM)
export const compileToString = compile(opts.asString)
