/* global chrome */
const notify = (str) => {
  const handle = {
    ext: () => {
      chrome.browserAction.setBadgeText({ text: str })
    },
    web: () => {
      console.log(str)
    }
  }

  const env = (typeof chrome.browserAction === 'object') ? 'ext' : 'web'

  handle[env]()
}

export default notify
