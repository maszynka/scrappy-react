/* global chrome */

export default {
  env: (typeof chrome.browserAction === 'object') ? 'ext' : 'web',
  xhrAdditionalHeaders: {
    'X-Requested-With': 'XmlHttpRequest'
  },
  xhr: {
    additionalHeaders: {
      'X-Requested-With': 'XmlHttpRequest'
    },
    timeout: 1000 * 15,
    method: 'GET',
    corsProxyUrl: 'https://cors-anywhere.herokuapp.com/'
  },
  offersCheckInterval: 1005000000 // ms,
}
