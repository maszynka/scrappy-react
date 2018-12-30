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

  getOffers (url) {
    xhrPromise('GET', url).then(response => {
      const testingServiceName = 'otodom'
      let fetchedOffers = prepareOffers(response, testingServiceName)
      const initial = !this.state.offersList.length

      const callbackAfterTest = () => {
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

  render () {
    return (
      <div className='main' style={{ 'minWidth': '240px' }}>
        <strong>Offers Count: {this.state.offersCount}</strong>
        <article>
          {
            this.state.offersList.length ? (
              <OffersList offers={this.state.offersList} />
            ) : ''
          }
        </article>

        <style jsx global>{`
        .main {
          color: red;
        }
      `}</style>
      </div>

    )
  }
}
