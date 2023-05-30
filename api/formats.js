const toPascalCase = string => {
  const trimedString = string.trim()
  const cleanString = trimedString.replace(/\s+/g, ' ')
  const arrayString = cleanString.split(' ')

  const pascalArray = arrayString.map(
    s => s.substring(0, 1).toUpperCase() + s.substring(1).toLowerCase()
  )
  return pascalArray.join(' ')
}

module.exports = {
  toPascalCase
}
