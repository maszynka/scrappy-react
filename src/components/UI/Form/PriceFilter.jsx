import React from 'react'
import PropTypes from 'prop-types'

class PriceFilter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: this.props.initialValue
    }
    this.placeholder = (this.props.placeholder === 'string' && this.props.placeholder.length > 0) ? this.props.placeholder : this.props.name
    console.log(this.props.name, this.props.initialValue)
    this.props.setFilter(this.props.name, this.props.initialValue)
  }

  filtersChange (event) {
    console.log(event)
    const target = event.target
    const value = target.value ? target.value : null
    const name = target.name
    this.setState(
      { value }, () => this.props.setFilter(name, value)
    )
    // const handler = event['[[Handler]]']
    // const target = event['[[Target]]']
  }

  render () {
    return (
      <input onChange={this.filtersChange.bind(this)} name={this.props.name} placeholder={this.placeholder} value={this.state.value} />
    )
  }
}

PriceFilter.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  setFilter: PropTypes.func.isRequired,
  initialValue: PropTypes.number.isRequired
}

export default PriceFilter
