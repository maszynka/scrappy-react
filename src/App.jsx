import xhrPromise from './components/Xhr/xhr'
import cleanResponse from './components/Xhr/Data'
import extract from './components/Model/Offers/extract'
import makeOffer from './components/Model/Offer/makeOffer'
import OffersList from './components/OffersList'
import React from 'react'

// even though Rollup is bundling all your files together, errors and
// logs will still point to your original source modules
const url = `https://www.otodom.pl/wynajem/mieszkanie/wroclaw/?search%5Bdist%5D=0&search%5Bsubregion_id%5D=381&search%5Bcity_id%5D=39&search%5Bpaidads_listing%5D=1`

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
      minPrice: '-',
      offersList: []
    }
  }
  getOffers () {
    xhrPromise('GET', url).then(response => {
      const service = 'otodom'
      const bodyContent = cleanResponse(response)
      console.log(bodyContent)
      const offers = extract[service](bodyContent)
      let formattedOffers = []

      for (let i = 0, len = offers.length; i < len; i++) {
        const offerDOM = offers[i]
        formattedOffers.push(makeOffer[service](offerDOM))
      }

      const minPrice = Math.min(...formattedOffers.map(offer => offer.price))
      // const offersList = <OffersList offers={formattedOffers} />
      // console.log(offersList)

      console.log(formattedOffers)
      this.setState({
        offersCount: formattedOffers.length,
        minPrice: minPrice,
        offersList: formattedOffers

      })
    }).catch(reason => {
      console.log('Xhr error (' + reason + ')')
    })
  }
  componentDidMount () {
    this.getOffers()
  }

  render () {
    return (
      <div>
        <strong>Offers Count: {this.state.offersCount}</strong>
        <strong>Min price: {this.state.minPrice}</strong>
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
