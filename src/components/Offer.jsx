import React from 'react'
import PropTypes from 'prop-types'
import respondToVisibility from './UI/Helpers/respondToVisibility'

const defaultWrapStyle = {
  display: 'grid',
  fontSize: '1.2r em',
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
    this.state = {
      wasRead: false,
      clicked: false,
      titleStyle: titleStyle
    }

    this.wrapStyle = props.read ? defaultWrapStyle : (
      Object.assign({},
        defaultWrapStyle,
        { fontSize: '1.5rem' }
      )
    )

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
          clicked: true,
          titleStyle: Object.assign(
            {},
            this.state.titleStyle,
            {
              color: 'yellow'
            })
        }, event => {

        })
      }
    }
  }

  handleClick (event) {
    console.log('smth')
    event.stopPropagation()
    this.setState({
      clicked: true,
      titleStyle: Object.assign(
        {},
        this.state.titleStyle,
        {
          color: 'yellow'
        })
    }, event => {

    })
  }

  componentDidMount () {
    // autofocus the input on mount
    window.requestAnimationFrame(() => (
      respondToVisibility(this.wrap, (v) => {
        console.log(v)
      })
    )
    )
  }

  render () {
    return (
      <div style={this.wrapStyle} ref={this.wrapRef} className={this.state.wasRead ? 'was-read' : ''}>
        <a className={this.state.clicked ? 'clicked' : ''} style={this.state.titleStyle} href={this.props.href} onClick={this.handleClick.bind(this)} target='_blank'><h5>{this.props.title}</h5></a>
        <span style={priceStyle}>Cena: {this.props.price} PLN</span>
        <span style={areaStyle}>Area: {this.props.area}</span>
      </div>
    )
  }
}

Offer.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  ui: PropTypes.object.isRequired,
  price: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired
}

export default Offer
