import { join } from 'path'
import { readFileSync, readdirSync } from 'fs'
const Hogan = require('hogan.js')


const templatesDir = join(__dirname, '..', '..', 'templates')
const templateFilepaths = readdirSync(templatesDir)


export default templateFilepaths.reduce((templates, filepath) => {
  const [name] = filepath.split('.')
  const fileContents = readFileSync(join(templatesDir, filepath), 'utf8')
  const template = Hogan.compile(fileContents)
  return { ...templates, [name]: template }
}, {}) as any
