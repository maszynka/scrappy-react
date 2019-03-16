let onError = (err, reject) => {
  console.error('XHR request has failed', err)
  reject()
}
let addAditionalHeadersToXhrReq = (req, additionalHeaders) => {
  for (var header in additionalHeaders) {
    if (additionalHeaders.hasOwnProperty(header)) {
      req.setRequestHeader(header, additionalHeaders[header])
    }
  }
}

const xhrPromise = (
  url,
  settings
) => {
  return new Promise((resolve, reject) => {
    let req = new window.XMLHttpRequest()
    url = settings.corsProxyUrl + url

    req.open(settings.method, url, true)
    req.timeout = settings.timeout
    addAditionalHeadersToXhrReq(req, settings.additionalHeaders)

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

    req.ontimeout = (e) => {
      console.error(`xhr request to ${url}, timed out (>${settings.timeout}. ${e}`)
    }

    req.onerror = (err, reject) => onError(err, reject)

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

/*  export const post = (url, onReadyCallback, data) => {
    xhr('POST', url, onReadyCallback, data)
  }
  export const get = (url, onReadyCallback) => {
    xhr('GET', url, onReadyCallback)
  } */

export default xhrPromise
