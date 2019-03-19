// import xhrPromise from '../components/Xhr/xhr'
import axios from 'axios'
import prepareOffers from '../Model/Offers/prepare'
import serviceOtodom from '../Model/Service/otodom'
import serviceMorizon from '../Model/Service/morizon'
import serviceOlx from '../Model/Service/olx'
import settings from '../settings'

const getOffers = service => {
  const corsProxyUrl = (settings.env !== 'ext') ? xhrSettings.corsProxyUrl : '' // Same origin policy is disabled in extension so proxy is not needed
  const url = corsProxyUrl + service.url

  return new Promise((resolve, reject) => {
    axios.get(url).then(response => {
      let fetchedOffers = prepareOffers(response, service.name)

      resolve(fetchedOffers)
    }).catch(reason => {
      console.log(reason)
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
    const initial = !currentOffers.length
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

    this.setState({
      offersCount: newOffers.length,
      offersList: newOffers
    }, resolve(newOffers))
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
        offers => this.storeNewOffers(offers, this.state.offersList).then(
          offers => {
            servicesFetched < (len - 1) ? servicesFetched++ : resolve(this.state.offersList)
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
    offers => applyFilters(this.state.filters, offers).then(
      matchingOffers => displayOffers(matchingOffers)
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
    !this.state.offersList && console.log('offersList empty filtering canceled')

    const matchingOffers = this.state.offersList.filter(
      offer => inRange(parseInt(offer.price))
    )

    resolve(matchingOffers)
  })
}

const setFilter = (name, value) => {
  const newFilter = this.state.filters
  newFilter[name] = parseInt(value)

  this.setState(
    {
      filter: { newFilter }
    },
    () => {
      console.log('it runs')
      this.applyFilters(this.state.filters, this.state.offersList).then(
        matchingOffers => this.displayOffers(matchingOffers)
      )
    }
  )
}

const mutateOffer = (offerId, mutation) => {
  const index = this.state.offersList.map(offer => offer.id).indexOf(offerId)

  if (index === -1) { return false }

  let mutatedOffersList = this.state.offersList.slice()

  Object.assign(mutatedOffersList[index], mutation)

  this.setState(
    {
      offersList: mutatedOffersList
    }
  )
}
