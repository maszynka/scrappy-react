import { ui } from './common'

const _extract = {
  offersWrap: bodyContent => {
    console.log(bodyContent.querySelector('.section-listing__row-content'))
    return bodyContent.querySelector('.section-listing__row-content')
  },
  offers: offersWrap => {
    console.log(offersWrap.querySelectorAll('.offer-item'))
    return offersWrap.querySelectorAll('.offer-item')
  }
}

export const extractOffers = bodyContent => {
  const offersWrap = _extract.offersWrap(bodyContent)
  return offersWrap && _extract.offers(_extract.offersWrap(bodyContent))
}

export const makeOffer = offerDOM => ({
  id: `otodom-${offerDOM.dataset.itemId}`,
  title: `${offerDOM.querySelector('.offer-item-title').innerText}(otodom)`,
  price: offerDOM.querySelector('.offer-item-price').innerText.replace(/\D/g, ''),
  href: offerDOM.dataset.url,
  area: offerDOM.querySelector('.offer-item-area').innerText.replace(/\D/g, ''),
  ui
})

export default {
  extractOffers,
  makeOffer,
  url: 'https://www.otodom.pl/wynajem/mieszkanie/wroclaw/'
}
