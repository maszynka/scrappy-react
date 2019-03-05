/* global chrome */

export default {
  env: (typeof chrome.browserAction === 'object') ? 'ext' : 'web',
  offersCheckInterval: 25000 // ms
}
