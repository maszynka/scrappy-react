import xhrPromise from './xhr/xhr'
// import * as axios from 'axios'
import prepareOffers from '../store/model/offers/prepare'
import serviceOtodom from '../store/model/service/otodom'
import serviceMorizon from '../store/model/service/morizon'
import serviceOlx from '../store/model/service/olx'
import settings from '../settings'

import store from '../store/store'
import {
  addOffers,
  setOffers,
  mutateOffer,
  setFilteredOffers,
  setFilter
} from '../store/actions'

const getOffers = service => {
  const corsProxyUrl = (settings.env !== 'ext') ? settings.xhr.corsProxyUrl : '' // Same origin policy is disabled in extension so proxy is not needed
  const url = corsProxyUrl + service.url

  return new Promise((resolve, reject) => {
    xhrPromise(url).then(response => {
      let fetchedOffers = prepareOffers(response, service.name)

      resolve(fetchedOffers)
    }).catch(reason => {
        console.log('Xhr error (' + JSON.parse(reason) + ')')
      reject(new Error(reason))
    })
  })
}

const services = {
  otodom: serviceOtodom,
  morizon: serviceMorizon,
  olx: serviceOlx
}

const storeNewOffers = (fetchedOffers, currentOffers) => {
  return new Promise((resolve, reject) => {
    const initial = !currentOffers || currentOffers.length === 0
    let newOffers = !initial ? mergeNewOffers(
      fetchedOffers,
      currentOffers
    ) : fetchedOffers

    // console.log(fetchedOffers, currentOffers)

    // console.log(newOffers)
    // console.log(storageApi) // TODO: use internal consts of chrome.storage.sync to check if not writing to often

    storageApi.setItem('offersList', JSON.stringify(newOffers), () => {
      console.log('offersList is set to ' + newOffers)
    })

    console.log('storage is set : ' + !!storageApi.getItem('offersList'))

    return store.dispatch(addOffers(
      newOffers
    ))
  })
}

const getAllOffers = (services) => {
  return new Promise((resolve, reject) => {
    const servicesNames = Object.keys(services).filter(name => services.hasOwnProperty(name))
    const len = servicesNames.length
    let servicesFetched = 0

    for (let i = 0; i < len; i++) {
      const name = servicesNames[i]
      const service = services[name]
      Object.assign(service, { name })
      getOffers(service).then(
        newOffers => storeNewOffers(newOffers, store.getState().offersList).then(
          updatedOffers => {
            servicesFetched < (len - 1) ? servicesFetched++ : resolve(updatedOffers)
          }
        )
      ).catch(reason => {
        console.error(reason)
      })
    }
  })
}

const fullEventStack = (services) => {
  getAllOffers(services).then(
    offers => applyFilters(store.getState().filters, offers).then(
      matchingOffers => {
        store.dispatch(setOffers(matchingOffers))
        matchingOffers => displayOffers(matchingOffers)
      }

    )
  )
}

// this.getOffers(otodom1).then(offers => this.applyFilters(this.state.filters, offers))
fullEventStack(services)

window.setInterval(
  () => fullEventStack(services),
  settings.offersCheckInterval
)

const displayOffers = ()=> {
  /*
  * TODO: send message to api.js with visible offers
  * */
}

const applyFilters = (filters) => {
  return new Promise((resolve, reject) => {
    const inRange = value => {
      return (
        filters.min === '' || (filters.min !== '' && filters.min <= value)
      ) && (
        filters.max === '' || (filters.max !== '' && filters.max >= value)
      )
    }
    !store.getState().offersList && console.log('offersList empty filtering canceled')

    store.dispatch(setFilter())

    const matchingOffers = store.getState().offersList.filter(
      offer => inRange(parseInt(offer.price))
    )

    resolve(matchingOffers)
  })
}

/*const setFilter = (name, value) => {
  const newFilter = store.getState().filters
  newFilter[name] = parseInt(value)

  store.dispatch(setFilter(name))


  this.setState(
    {
      filter: { newFilter }
    },
    () => {
      console.log('it runs')
      applyFilters(store.getState().filters, store.getState().offersList).then(
        matchingOffers => this.displayOffers(matchingOffers)
      )
    }
  )
}*/

/*const _mutateOffer = (offerId, mutation) => {
  const index = this.state.offersList.map(offer => offer.id).indexOf(offerId)

  if (index === -1) { return false }

  let mutatedOffersList = this.state.offersList.slice()

  Object.assign(mutatedOffersList[index], mutation)

  this.setState(
    {
      offersList: mutatedOffersList
    }
  )
}*/
