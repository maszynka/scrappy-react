import settings from '../../../settings'

const apiByClients = {
  'ext': () => window.localStorage, // chrome.storage.sync,
  'web': () => window.localStorage
}

const storageApi = apiByClients[settings.env]()

/* if (settings.env === 'ext') {
  Object.assign(
    storageApi,
    {
      setItem: (key, value, callback) => chrome.storage.sync.set({ key: value }, callback),
      getItem: (key, callback) => chrome.storage.sync.get([key], callback),
      removeItem: key => chrome.storage.sync.remove(key)
    }
  )
} */

export default storageApi
