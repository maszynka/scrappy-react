import { extractOffers as extractOfferOtodom } from '../Service/otodom'
import { extractOffers as extractOfferMorizon } from '../Service/morizon'
import { extractOffers as extractOfferOlx } from '../Service/olx'

const extractDOM = {
  otodom: extractOfferOtodom,
  morizon: extractOfferMorizon,
  olx: extractOfferOlx
}

export default extractDOM
