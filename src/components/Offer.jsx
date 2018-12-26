import React from 'react'
import PropTypes from 'prop-types'
import respondToVisibility from './UI/Helpers/respondToVisibility'

const defaultWrapStyle = {
  display: 'grid',
  fontSize: '1.2rem',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: '1.5em, 1em'
}

const titleStyle = {
  gridColumn: '1 / 2'
}

const priceStyle = {
  display: 'block',
  gridColumn: '1 / 1'
}
const areaStyle = {
  display: 'block',
  gridColumn: '2 / 2'
}

class Offer extends React.Component {
  constructor (props) {
    super(props)
    this.wrapStyle = props.read ? defaultWrapStyle : (
      Object.assign({},
        defaultWrapStyle,
        { fontSize: '1.5rem' }
      )
    )
    this.wrapRef = React.createRef()
    respondToVisibility(this.wrapRef, (v) => {
      console.log(v)
    })
  }

  render () {
    return (
      <div style={this.wrapStyle} ref={this.wrapRef}>
        <a style={titleStyle} href={this.props.href}><h5>{this.props.title}</h5></a>
        <span style={priceStyle}>Cena: {this.props.price} PLN</span>
        <span style={areaStyle}>Area: {this.props.area}</span>
      </div>
    )
  }
}

Offer.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  read: PropTypes.bool.isRequired,
  price: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired
}

export default Offer
