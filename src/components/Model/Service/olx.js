import { ui } from './common'

const _extract = {
  offersWrap: bodyContent => {
    console.log(bodyContent.querySelector('#offers_table'))
    return bodyContent.querySelector('#offers_table')
  },
  offers: offersWrap => offersWrap.querySelectorAll('.offers .wrap')
}

export const extractOffers = bodyContent => {
  const offersWrap = _extract.offersWrap(bodyContent)
  return offersWrap && _extract.offers(_extract.offersWrap(bodyContent))
}

export const makeOffer = offerDOM => {
  const titleEl = offerDOM.querySelector('a.link.linkWithHash strong')
  const priceEl = offerDOM.querySelector('p.price strong')
  const linkEl = offerDOM.querySelector('a.linkWithHash')

  return {
    id: `olx-${offerDOM.querySelector('.offer-wrapper table').dataset.id}`,
    title: `${titleEl ? titleEl.innerText : 'could not find title element'}(olx)`,
    price: priceEl ? priceEl.innerText.replace(/\D/g, '') : 'could not find price element',
    href: linkEl ? offerDOM.querySelector('a.linkWithHash').href : 'could not find link element',
    area: `N/A`,
    ui
  }
}

export default {
  extractOffers,
  makeOffer,
  url: 'https://www.olx.pl/nieruchomosci/mieszkania/wroclaw/'
}
