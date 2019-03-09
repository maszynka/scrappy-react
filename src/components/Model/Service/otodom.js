import { ui } from './common'

const _extract = {
  offersWrap: bodyContent => bodyContent.querySelector('.section-listing__row-content'),
  offers: offersWrap => offersWrap.querySelectorAll('.offer-item')
}

export const extractOffers = bodyContent => _extract.offers(_extract.offersWrap(bodyContent))

export const makeOffer = offerDOM => ({
  id: `otodom-${offerDOM.dataset.itemId}`,
  title: offerDOM.querySelector('.offer-item-title').innerText,
  price: offerDOM.querySelector('.offer-item-price').innerText.replace(/\D/g, ''),
  href: offerDOM.dataset.url,
  area: offerDOM.querySelector('.offer-item-area').innerText.replace(/\D/g, ''),
  ui
})

export default {
  extractOffers,
  makeOffer,
  url: 'https://www.olx.pl/nieruchomosci/mieszkania/wroclaw/'
}
