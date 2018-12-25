import React from 'react'
import Offer from './Offer'

class OffersList extends React.Component {
  constructor (props) {
    super(props)
    console.log(this.props)
    this.state = {
      offers: this.props.offers.length ? (
        this.listOffers(this.props.offers)
      ) : ''
    }

    console.log(this.props)
  }

  // componentDidMount () {
  //   this.listOffers(this.props.offers)
  // }

  listOffers (offers) {
    return offers.map(offer =>
      <Offer key={offer.id} {...offer} />
    )
  }

  render () {
    return (
      <div>
        {this.state.offers}
      </div>
    )
  }
}

export default OffersList
