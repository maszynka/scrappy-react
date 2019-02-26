import { ui } from './common'

const _extract = {
  offersWrap: bodyContent => bodyContent.querySelector('.listingBox'),
  offers: offersWrap => offersWrap.querySelectorAll('.row--property-list')
}

export const extractOffers = bodyContent => _extract.offers(_extract.offersWrap(bodyContent))

export const makeOffer = offerDOM => ({
  id: `morizon-${offerDOM.dataset.id}`,
  title: offerDOM.querySelector('.offer-item-title').innerText,
  price: offerDOM.querySelector('.single-result__price').innerText.replace(/\D/g, ''),
  href: offerDOM.querySelector('.property_link').href,
  area: offerDOM.querySelector('.param li:nth-of-type(1) b').innerText.replace(/\D/g, ''),
  ui
})

export default {
  extractOffers,
  makeOffer
}
