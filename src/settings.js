/* global chrome */

export default {
  env: (typeof chrome.browserAction === 'object') ? 'ext' : 'web',
  xhrAdditionalHeaders: {
    'X-Requested-With': 'XmlHttpRequest'
  },
  offersCheckInterval: 1005000000 // ms
}
