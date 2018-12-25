import React from 'react'

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

const Offer = props => {
  console.log(props.read)
  const wrapStyle = props.read ? defaultWrapStyle : (
    Object.assign({},
      defaultWrapStyle,
      { fontSize: '1.5rem' }
    )
  )

  return (
    <div style={wrapStyle}>
      <a style={titleStyle} href={props.href}><h5>{props.title}</h5></a>
      <span style={priceStyle}>Cena: {props.price} PLN</span>
      <span style={areaStyle}>Area: {props.area}</span>
    </div>
  )
}

export default Offer
