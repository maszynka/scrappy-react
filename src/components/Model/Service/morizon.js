import { ui } from './common'

const _extract = {
  offersWrap: bodyContent => {
    console.log(bodyContent.querySelector('.listingBox'))
    return bodyContent.querySelector('.listingBox')
  },
  offers: offersWrap => {
    console.log(offersWrap.querySelectorAll('.row--property-list'))
    return offersWrap.querySelectorAll('section > .row--property-list')
  }
}

export const extractOffers = bodyContent => _extract.offers(
  _extract.offersWrap(bodyContent))

export const makeOffer = offerDOM => {
  const titleEl = offerDOM.querySelector('.single-result__title')
  const priceEl = offerDOM.querySelector('.single-result__price')
  const linkEl = offerDOM.querySelector('.property_link')
  const areaEl = offerDOM.querySelector('.param li:nth-of-type(2) b')

  return {
    id: `morizon-${offerDOM.dataset.id}`,
    title: `${titleEl ? titleEl.innerText : 'could not find title element'}(morizon)`,
    price: priceEl ? priceEl.innerText.replace(/\D/g, '') : 'could not find price element',
    href: linkEl ? linkEl.href : 'could not find link element',
    area: areaEl ? areaEl.innerText.replace(/\D/g, '') : 'could not find area element',
    ui
  }
}

export default {
  extractOffers,
  makeOffer,
  url: 'https://www.morizon.pl/do-wynajecia/mieszkania/wroclaw/'
}
