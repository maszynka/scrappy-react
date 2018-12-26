import React from 'react'
import PropTypes from 'prop-types'
import Offer from './Offer'

class OffersList extends React.Component {
  constructor (props) {
    super(props)
    console.log(this.props)
    this.state = {
      offers: typeof Array.isArray(this.props.offers) && (
        this.listOffers(this.props.offers)
      )
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

OffersList.propTypes = {
  offers: PropTypes.array.isRequired
}

export default OffersList
