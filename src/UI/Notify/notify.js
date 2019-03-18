import settings from '../../settings'

/* global chrome */
const notify = str => {
  const byType = {
    ext: () => chrome.browserAction.setBadgeText({ text: str }),
    web: () => console.log(str)
  }

  return byType[settings.env]()
}

export default notify
