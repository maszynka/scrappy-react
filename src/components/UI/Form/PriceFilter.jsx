import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PriceFilter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userDefined: false,
      value: null
    }
  }

  onChange (){
    this.setState({
      userDefinded: true
    }, ()=> props.onChange())
  }

  setValue(){
    this.setState({
      userDefinded: false
    }, () => props.onChange())
  }

  /*  resetValue() {
  } */

  render () {
    return (
      <input onChange={props.onChange} name={props.name} placeholder={placeholder} data-userDefined={props.userDefined} />
    )
  }
}

PriceFilter.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  userDefined: PropTypes.bool,
  onChange: PropTypes.func.isRequired
}

export default PriceFilter
