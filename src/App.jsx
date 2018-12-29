import React from 'react'
import xhrPromise from './components/Xhr/xhr'

// Offers
import OffersList from './components/OffersList'
import prepareOffers from './components/Model/Offers/prepare'
// import updateCommon from './components/Model/Offers/updateCommon'
import mergeNew from './components/Model/Offers/mergeNew'

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
      let fetchedOffers = prepareOffers(response, testingServiceName)
      const initial = !this.state.offersList.length

      console.log(this.state.offersList)

      const callbackAfterTest = () => {
        console.log(this.state.offersList)

        let newOffers = !initial ? mergeNew(
          fetchedOffers,
          this.state.offersList
        ) : fetchedOffers

        console.log(newOffers)

        this.setState({
          offersCount: fetchedOffers.length,
          offersList: newOffers
        })
      }

      if (!initial) {
        let _currOffers = this.state.offersList.slice()

        console.log(_currOffers.shift())
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
    this.getOffers()
    window.setTimeout(() => {
      this.getOffers()
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
