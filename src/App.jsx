import React from 'react'
import xhrPromise from './components/Xhr/xhr'
import storageApi from './components/Model/Storage/storage'
import PriceFilter from './components/UI/Form/PriceFilter'

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
      visibleOffers: [],
      filters: {
        min: null,
        max: null
      }
    }
  }

  getOffers (url) {
    xhrPromise('GET', url).then(response => {
      const testingServiceName = 'otodom'
      let fetchedOffers = prepareOffers(response, testingServiceName)
      const initial = !this.state.offersList.length

      const callbackAfterTest = () => {
        let newOffers = !initial ? mergeNewOffers(
          fetchedOffers,
          this.state.offersList
        ) : fetchedOffers

        console.log(newOffers)
        console.log(storageApi) // TODO: use internal consts of chrome.storage.sync to check if not writing to often

        storageApi.setItem('offersList', JSON.stringify(newOffers), () => {
          console.log('offersList is set to ' + newOffers)
        })

        this.setState({
          offersCount: newOffers.length,
          offersList: newOffers
        })
      }

      if (!initial) {
        let _currOffers = this.state.offersList.slice()

        // console.log(_currOffers.shift())
        this.setState({
          offersList: _currOffers
        },
        callbackAfterTest()
        )
      } else {
        callbackAfterTest()
      }
    }).catch(reason => {
      console.log('Xhr error (' + reason + ')')
    })
  }

  componentDidMount () {
    const otodom1 = `http://localhost:7779/otodom1`
    const otodom2 = `http://localhost:7779/otodom2`

    this.getOffers(otodom1)
    window.setTimeout(() => {
      this.getOffers(otodom2)
    }, 2000)
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
      console.log(filters)
      console.log(value)
      return (
        filters.min == null || (filters.min != null && filters.min <= value)
      ) && (
        filters.max == null || (filters.max != null && filters.max >= value)
      )
    }

    const matchingOffers = this.state.offersList.filter(
      offer => inRange(offer.price)
    )
    console.log(matchingOffers)
  }

  filtersChange (event) {
    const target = event.target
    const value = target.value ? target.value : null
    const name = target.name

    const newFilter = {}
    newFilter[name] = value

    this.setState(
      Object.assign(
        {},
        this.state.filter,
        newFilter
      ), () => this.applyFilters(this.state.filters)
    )
    // const handler = event['[[Handler]]']
    // const target = event['[[Target]]']
  }

  render () {
    return (
      <div className='main' style={{ 'minWidth': '240px' }}>
        <strong>Offers Count: {this.state.offersCount}</strong>
        <article>
          Cena:
          <PriceFilter onChange={this.filtersChange.bind(this)} name={'min'} placeholder={'Od'} />
          <PriceFilter onChange={this.filtersChange.bind(this)} name={'max'} placeholder={'Do'} />
          {
            this.state.offersList.length ? (
              <OffersList offers={this.state.offersList} />
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
