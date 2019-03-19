/*  const stripScripts = htmlStr => {
    let div = document.createElement('div')
    div.innerHTML = htmlStr
    let scripts = div.getElementsByTagName('script')
    let i = scripts.length
    while (i--) {
      scripts[i].parentNode.removeChild(scripts[i])
    }
    return div
  } */

const stripElements = (htmlStr, tagNames) => { // remove unneaded elements from body
  let div = document.createElement('div')
  div.innerHTML = htmlStr

  const stripTag = name => {
    let elements = div.getElementsByTagName(name)
    let j = elements.length
    while (j--) {
      elements[j].parentNode.removeChild(elements[j])
    }

    return div
  }

  tagNames.forEach(tagName => {
    div = stripTag(tagName)
  })

  return div
}

const stripFromBody = htmlStr => `<div${htmlStr.substring(htmlStr.indexOf('<body') + 5, htmlStr.indexOf('</body>'))}</div>`

const cleanResponse = response => (

  stripElements(
    stripFromBody(response),
    [
      'script',
      'img',
      'canvas',
      'svg',
      'picture'
    ]
  )
)

export default cleanResponse
