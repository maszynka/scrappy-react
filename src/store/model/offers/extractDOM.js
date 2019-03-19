import { extractOffers as extractOfferOtodom } from '../service/otodom'
import { extractOffers as extractOfferMorizon } from '../service/morizon'
import { extractOffers as extractOfferOlx } from '../service/olx'

const extractDOM = {
  otodom: extractOfferOtodom,
  morizon: extractOfferMorizon,
  olx: extractOfferOlx
}

export default extractDOM
