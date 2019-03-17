/* global chrome */

export default {
  env: (
    typeof chrome === 'object' &&
    typeof chrome.browserAction === 'object'
  ) ? 'ext' : 'web',
  xhr: {
    additionalHeaders: {
      'X-Requested-With': 'XmlHttpRequest'
    },
    timeout: 1000 * 105,
    method: 'GET',
    corsProxyUrl: 'https://cors-anywhere.herokuapp.com/'
  },
  offersCheckInterval: 1005000000 // ms,
}
