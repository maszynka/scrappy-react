import cleanResponse from './cleanResponse'
import extractDOM from './extractDOM'
import makeOffer from '../offer/makeOffer'

export default (response, service) => {
  const bodyContent = cleanResponse(response)
  // console.log(bodyContent)
  // console.log(service)
  const _offersDOM = extractDOM[service](bodyContent)
  let offers = []

  for (let i = 0, len = _offersDOM.length; i < len; i++) {
    const offerDOM = _offersDOM[i]
    offers.push(makeOffer[service](offerDOM))
  }
  return offers
}
