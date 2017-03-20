export const asDOM: IrisCompilerOpts = {
  initialResultExpr: 'document.createDocumentFragment()',
  addToResultLeft: 'result.appendChild(document.createTextNode(',
  addToResultRight: '))',
}

export const asString: IrisCompilerOpts = {
  initialResultExpr: '""',
  addToResultLeft: 'result +=',
  addToResultRight: '',
}
