const stripScripts = htmlStr => {
  let div = document.createElement('div')
  div.innerHTML = htmlStr
  let scripts = div.getElementsByTagName('script')
  let i = scripts.length
  while (i--) {
    scripts[i].parentNode.removeChild(scripts[i])
  }
  return div
}

const stripFromBody = htmlStr => `<div${htmlStr.substring(htmlStr.indexOf('<body') + 5, htmlStr.indexOf('</body>'))}</div>`

const cleanResponse = response => (
  stripScripts(
    stripFromBody(response)
  )
)

export default cleanResponse
