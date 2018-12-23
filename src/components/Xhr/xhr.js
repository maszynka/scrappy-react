let onError = (event, url) => {
  throw new Error('XHR request has failed with status: ' + event.target.status + '.')
}
let addAditionalHeadersToXhrReq = (req, additionalHeaders) => {
  for (var header in additionalHeaders) {
    if (additionalHeaders.hasOwnProperty(header)) {
      req.setRequestHeader(header, additionalHeaders[header])
    }
  }
}

export function xhr (
  requestMethod,
  url,
  onReadyCallback,
  additionalHeaders,
  data = null) {
  let req = new window.XMLHttpRequest()
  req.open(requestMethod, url, true)

  if (additionalHeaders) { addAditionalHeadersToXhrReq(req, additionalHeaders) };

  req.onload = event => onReadyCallback(event, req.response)

  req.onerror = onError
  req.send(data)
}

const xhrPromise = (
  requestMethod,
  url
) => {
  return new Promise((resolve, reject) => {
    let req = new window.XMLHttpRequest()
    req.open(requestMethod, url, true)
    // addAditionalHeadersToXhrReq(req, additionalHeaders);
    req.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(req.response)
      } else {
        reject(new Error({
          status: this.status,
          statusText: req.statusText
        }))
      }
    }
    req.onerror = reject
    req.send()
  })

  /* cacheProxy(
    arguments,
    () => new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.open(requestMethod, url, true);
        addAditionalHeadersToXhrReq(req, additionalHeaders);
        req.onload = resolve(event, req.response);
        req.onerror = reject(req.statusText);
        req.send(data);
      }
  )); */
}

export const post = (url, onReadyCallback, data) => {
  xhr('POST', url, onReadyCallback, data)
}
export const get = (url, onReadyCallback) => {
  xhr('GET', url, onReadyCallback)
}

export default xhrPromise
