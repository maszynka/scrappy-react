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
    // this.props.ui.visited = true

    this.props.mutateOffer(this.props.id, {
      ui: {
        visited: true
      }
    }, () => {
      window.open(this.props.href, '_blank')
    })

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
    })
  }

  render () {
    /* const = {
      this.props.ui.new
    } */
    // const classes = `offer-wrap${(this.props.ui.new ? ' new' : '')}${(this.props.ui.seen ? ' seen' : '')}`
    let classNames = [
      `offer-wrap`
    ]

    this.props.ui.new && classNames.push('new')
    this.props.ui.seen && classNames.push('seen')
    this.props.ui.visited && classNames.push('visited')

    // console.log(classNames)

    return (
      <div ref={this.wrapRef} className={classNames.join(' ')}>
        <a className={`offer__link`} href={this.props.href} onClick={this.handleClick.bind(this)} target='_blank'>
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
  id: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  ui: PropTypes.object.isRequired,
  price: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  clickCallback: PropTypes.func.isRequired,
  mutateOffer: PropTypes.func.isRequired
}

export default Offer
