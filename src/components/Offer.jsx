import React from 'react'
import PropTypes from 'prop-types'
import respondToVisibility from './UI/Helpers/respondToVisibility'

class Offer extends React.Component {
  constructor (props) {
    // console.log(props)
    super(props)

    this.wrap = null

    this.wrapRef = element => {
      this.wrap = element
    }
  }

  handle () {
    return {
      click: event => {
        console.log('smth')
        // event.stopPropagation()
        this.setState({
          clicked: true
        }, event => {

        })
      }
    }
  }

  handleClick (event) {
    console.log('smth')
    event.stopPropagation()
    this.props.ui.visited = true
    this.props.clickCallback(this.props.id)
  }

  componentDidMount () {
    // autofocus the input on mount
    respondToVisibility(this.wrap, (v) => {
      this.props.mutateOffer(this.props.id, {
        ui: {
          seen: true
        }
      })
      this.props.ui.seen = true
    })
  }

  render () {
    /* const = {
      this.props.ui.new
    } */

    return (
      <div ref={this.wrapRef} className={`offer-wrap${this.props.ui.new ? ' new' : ''}`}>
        <a className={`offer__link ${this.props.ui.visited ? 'clicked' : ''}`} href={this.props.href} onClick={this.handleClick.bind(this)} target='_blank'>
          <span className='offer__link__label'>{this.props.title}</span>
        </a>
        <div className='offer__details'>
          <span className='offer__price'>{this.props.price} PLN</span>
          <span className='offer__area'> / Area: {this.props.area} m<sup>2</sup></span>
        </div>

      </div>
    )
  }
}

Offer.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  ui: PropTypes.object.isRequired,
  price: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  clickCallback: PropTypes.func.isRequired
}

export default Offer
