export default function iris(template: string) {
  return `
    function(data, partials) {
      return document.createTextNode("1234567890")
    }
  `
}
