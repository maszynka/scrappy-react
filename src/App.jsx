import React from 'react'
import xhrPromise from './components/Xhr/xhr'
import storageApi from './components/Model/Storage/storage'
import PriceFilter from './components/UI/Form/PriceFilter'
import settings from './settings'

// Offers
import OffersList from './components/OffersList'
import prepareOffers from './components/Model/Offers/prepare'
// import updateCommon from './components/Model/Offers/updateCommon'
import mergeNewOffers from './components/Model/Offers/mergeNew'

// even though Rollup is bundling all your files together, errors and
// logs will still point to your original source modules

/* const offer = {
  title: '',
  price: '',
  area: '',
  url: '',
  mainPhoto: ''
} */

/*
* TODO:
* Mapping: response => offer object for each service
* */

export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      offersCount: null,
      offersList: [],
      visibleOffersCount: [],
      visibleOffersList: [],
      filters: {
        min: null,
        max: null
      }
    }
    /*
    * TODO:
    * Geting new offers
    * Xhr +
    * Save unique to storage +
    * Filter matching results +
    * Set state from filtered results
    * Dispatch notification for current platform
    * */
  }

  storeNewOffers (fetchedOffers, currentOffers) {
    return new Promise((resolve, reject) => {
      const initial = !currentOffers.length
      let newOffers = !initial ? mergeNewOffers(
        fetchedOffers,
        currentOffers
      ) : fetchedOffers

      console.log(fetchedOffers, currentOffers)

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

  getOffers (url) {
    return new Promise((resolve, reject) => {
      xhrPromise('GET', url).then(response => {
        const testingServiceName = 'otodom'
        let fetchedOffers = prepareOffers(response, testingServiceName)

        resolve(fetchedOffers)
      }).catch(reason => {
        console.log('Xhr error (' + reason + ')')
        reject(reason)
      })
    })
  }

  componentDidMount () {
    let oddRun = true
    const switchBetweenServices = () => {
      const otodom1 = `http://localhost:7779/otodom1`
      const otodom2 = `http://localhost:7779/otodom2`
      oddRun = !oddRun
      return oddRun ? otodom2 : otodom1
    }

    // this.getOffers(otodom1).then(offers => this.applyFilters(this.state.filters, offers))
    window.setInterval(() => {
      this.getOffers(switchBetweenServices()).then(
        offers => this.storeNewOffers(offers, this.state.offersList).then(
          offers => this.applyFilters(this.state.filters, offers)).then(
          matchingOffers => this.setState({
            visibleOffersList: matchingOffers,
            visibleOffersCount: matchingOffers.length
          })
        )
      )
    }, settings.offersCheckInterval)
  }

  // updateOffers (offers) {
  //   console.log(offers)
  //   let currentStore = window.localStorage.offers
  //   console.log(currentStore)
  //   let newOffers = offers.filter(
  //     (obj) => currentStore.indexOf(obj) === -1
  //   )
  //   console.log(newOffers)
  //
  //   if (newOffers.length) {
  //     currentStore.unshift(newOffers)
  //     window.localStorage.offers = currentStore
  //   }
  // }

  applyFilters (filters) {
    const inRange = value => {
      return (
        filters.min == null || (filters.min != null && filters.min <= value)
      ) && (
        filters.max == null || (filters.max != null && filters.max >= value)
      )
    }
    !this.state.offersList && console.log('offersList empty filtering canceled')

    const matchingOffers = this.state.offersList.filter(
      offer => inRange(parseInt(offer.price))
    )

    this.setState(
      {
        visibleOffersList: matchingOffers,
        visibleOffersCount: matchingOffers.length
      },
      () => console.log(this.state.visibleOffersList)
    )
  }

  setFilter (name, value) {
    const newFilter = this.state.filters
    newFilter[name] = parseInt(value)

    this.setState(
      {
        filter: { newFilter }
      },
      () => {
        console.log('it runs')
        this.applyFilters(this.state.filters)
      }
    )
  }

  mutateOffer (offerId, mutation) {
    const index = this.state.offersList.map(offer => offer.id).indexOf(offerId)

    if (index === -1) {
      return false
    }

    let mutatedOffersList = this.state.offersList.slice()

    Object.assign(mutatedOffersList[index], mutation)

    this.setState(
      {
        offersList: mutatedOffersList
      }
    )
  }

  render () {
    return (
      <div className='main' style={{ 'minWidth': '240px' }}>
        <strong>Offers Count: {this.state.offersCount}</strong>
        <article>
          Cena:
          <PriceFilter name={'min'} placeholder={'Od'} initialValue={0} setFilter={this.setFilter.bind(this)} />
          <PriceFilter name={'max'} placeholder={'Do'} initialValue={2000} setFilter={this.setFilter.bind(this)} />
          {
            this.state.offersList.length ? (
              <OffersList offers={this.state.visibleOffersList} mutateOffer={this.mutateOffer.bind(this)} />
            ) : ''
          }
        </article>

        <style>{`
        .main {
          font-family: 'Roboto', sans-serif;
          font-size: 11px;
          color: #3e3e3e;
        }
        .offer-wrap {
          display: grid;
          font-size: 1rem;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          border: 1px solid #d2d2d2;
          margin: .5em .2em;
          padding: .5em;
        }
        .offer__link {
          text-decoration: none;
          font-weight: 500;
          color: #131313;
          grid-column: 1 / 3;
          grid-row: 1 / 2;
        }
        .offer__details {
          grid-column: 1 / 3;
          grid-row: 2 / 3;
        }
        .offer__link__label {
          margin: 0;
        }
        .offer__area {
          opacity: .7;
        }
      `}</style>
      </div>

    )
  }
}
