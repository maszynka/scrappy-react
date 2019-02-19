import React from 'react'
import PropTypes from 'prop-types'

const PriceFilter = props => {
  const placeholder = (props.placeholder === 'string' && props.placeholder.length > 0) ? props.placeholder : props.name
  return (
    <input onChange={props.onChange} name={props.name} placeholder={placeholder} />
  )
}

PriceFilter.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default PriceFilter
