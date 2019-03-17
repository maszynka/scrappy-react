import settings from '../../../settings'

/* let addAditionalHeadersToXhrReq = (req, additionalHeaders) => {
  for (var header in additionalHeaders) {
    if (additionalHeaders.hasOwnProperty(header)) {
      const value = additionalHeaders[header]
      console.log(header, value)
      req.setRequestHeader(header, value)
    }
  }
} */

const xhrPromise = (
  url,
  xhrSettings = settings.xhr
) => {
  return new Promise((resolve, reject) => {
    let req = new window.XMLHttpRequest()
    const corsProxyUrl = (xhrSettings.env !== 'ext') ? xhrSettings.corsProxyUrl : '' // Same origin policy is disabled in extension so proxy is not needed
    url = corsProxyUrl + url

    req.open(xhrSettings.method, url, true)
    // addAditionalHeadersToXhrReq(req, {} /* settings.additionalHeaders */)
    req.timeout = xhrSettings.timeout

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
      console.error(
        `xhr request to ${url}, timed out (>${xhrSettings.timeout}. ${e}`)
    }

    req.onerror = e => reject(new Error('XHR request has failed' + e))

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
