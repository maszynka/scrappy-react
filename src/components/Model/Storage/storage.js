import settings from '../../../settings'

/* global chrome */

const apiByClients = {
  'ext': () => chrome.storage.sync,
  'web': () => window.localStorage
}

const storageApi = apiByClients[settings.env]()

if (settings.env === 'ext') {
  Object.assign(
    storageApi,
    {
      setItem: (key, value, callback) => {
        const storageItem = {}
        storageItem[key] = value
        storageApi.set(storageItem, callback)
      },
      getItem: (key, callback) => storageApi.get([key], callback),
      removeItem: key => storageApi.remove(key)
    }
  )
}

export default storageApi
