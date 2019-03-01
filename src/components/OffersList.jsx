import React from 'react'
import PropTypes from 'prop-types'
import Offer from './Offer'

class OffersList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      offers: typeof Array.isArray(this.props.offers) && (
        this.listOffers(this.props.offers)
      )
    }
  }

  // componentDidMount () {
  //   this.listOffers(this.props.offers)
  // }
  offerClicked (id) {
    console.log(id + ' was clicked')
  }

  listOffers (offers) {
    return offers.map(offer =>
      <Offer key={offer.id} clickCallback={this.offerClicked} mutateOffer={this.props.mutateOffer} {...offer} />
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

OffersList.propTypes = {
  offers: PropTypes.array.isRequired
}

export default OffersList
