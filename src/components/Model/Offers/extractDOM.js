import { extractOffers as extractOfferOtodom } from '../Service/otodom'
import { extractOffers as extractOfferMorizon } from '../Service/morizon'

const extractDOM = {
  otodom: extractOfferOtodom,
  morizon: extractOfferMorizon
}

export default extractDOM
