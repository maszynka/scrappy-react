const stripScripts = htmlStr => {
  console.log('stripScripts')
  var div = document.createElement('div')
  div.innerHTML = htmlStr
  var scripts = div.getElementsByTagName('script')
  var i = scripts.length
  while (i--) {
    scripts[i].parentNode.removeChild(scripts[i])
  }
  return div
}

const stripFromBody = htmlStr => {
  console.log('stripFromBody')
  return `<div${htmlStr.substring(htmlStr.indexOf('<body') + 5, htmlStr.indexOf('</body>'))}</div>`
}

const cleanResponse = response => (stripScripts(stripFromBody(response)))

export default cleanResponse
