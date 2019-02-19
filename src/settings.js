/* global chrome */

export default {
  env: (typeof chrome.browserAction === 'object') ? 'ext' : 'web'
}
