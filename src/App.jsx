import React from 'react'
import xhrPromise from './components/Xhr/xhr'

// Offers
import OffersList from './components/OffersList'
import prepareOffers from './components/Model/Offers/prepare'
import updateCommon from './components/Model/Offers/updateCommon'

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
      offersList: []
    }
  }
  getOffers () {
    const testingUrl = `https://www.otodom.pl/wynajem/mieszkanie/wroclaw/?search%5Bdist%5D=0&search%5Bsubregion_id%5D=381&search%5Bcity_id%5D=39&search%5Bpaidads_listing%5D=1`
    xhrPromise('GET', testingUrl).then(response => {
      const testingServiceName = 'otodom'
      let offers = prepareOffers(response, testingServiceName)
      const initial = !this.state.offersList.length

      // const offersList = <OffersList offers={formattedOffers} />
      // console.log(offersList)

      if (!initial) {
        offers = updateCommon(offers, this.state.offersList)
      }

      this.setState({
        offersCount: offers.length,
        offersList: offers
      })
    }).catch(reason => {
      console.log('Xhr error (' + reason + ')')
    })
  }
  componentDidMount () {
    this.getOffers()
    window.setTimeout(() => {
      this.getOffers()
    }, 200000)
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

  render () {
    return (
      <div>
        <strong>Offers Count: {this.state.offersCount}</strong>
        <article>
          {
            this.state.offersList.length ? (
              <OffersList offers={this.state.offersList} />
            ) : ''
          }
        </article>

      </div>

    )
  }
}
