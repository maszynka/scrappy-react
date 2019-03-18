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
    offers => this.applyFilters(this.state.filters, offers).then(
      matchingOffers => this.displayOffers(matchingOffers)
    )
  )
}

// this.getOffers(otodom1).then(offers => this.applyFilters(this.state.filters, offers))
fullEventStack(services)

window.setInterval(
  () => fullEventStack(services),
  settings.offersCheckInterval
)