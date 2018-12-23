import xhrPromise from './Xhr/xhr'
import cleanResponse from './Xhr/Data'
import extract from './Offers/extract'
import makeOffer from './Offer/makeOffer'
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

    this.state = {}
  }
  getOffers () {
    xhrPromise('GET', url).then(response => {
      const service = 'otodom'
      const bodyContent = cleanResponse(response)
      console.log(bodyContent)
      const offers = extract[service](bodyContent)

      for (let i = 0, len = 1/* offers.length */; i < len; i++) {
        const offerDOM = offers[i]
        console.log(makeOffer[service](offerDOM))
      }
    }).catch(reason => {
      console.log('Xhr error (' + reason + ')')
    })
  }
  componentDidMount () {
    this.getOffers()
  }

  render () {
    return (
      <article>
        <h1>Hi from DummyComponent.</h1>
        <em>Now let's play with React!</em>
      </article>
    )
  }
}
