import xhrPromise from './components/Xhr/xhr'
import prepareOffers from './components/Model/Offers/prepare'
import serviceOtodom from './components/Model/Service/otodom'
import serviceMorizon from './components/Model/Service/morizon'
import serviceOlx from './components/Model/Service/olx'
import settings from './settings'

export default function () {
  return 'dupa'
}


const getOffers => (service) {
  return new Promise((resolve, reject) => {
    xhrPromise(service.url).then(response => {
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
      this.getOffers(service).then(
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
window.setInterval(() => fullEventStack(services), settings.offersCheckInterval)