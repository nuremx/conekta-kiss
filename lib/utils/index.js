module.exports.required = function(paramName) {
  throw new Error(`Missing argument' ${paramName}'`)
}
