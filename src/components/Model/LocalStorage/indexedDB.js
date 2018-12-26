const open = (name, version = 1) => window.indexedDB.open(
  name,
  version
)

export const init = (name) => {
  let db = null
  let request = open(name)
  request.onerror = event => {
    console.log("Why didn't you allow my web app to use IndexedDB?!")
  }
  request.onsuccess = event => {
    db = event.target.result
  }
  return db
}

export default open
